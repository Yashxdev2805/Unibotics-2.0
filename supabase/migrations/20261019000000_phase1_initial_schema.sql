-- Unibotics Phase 1 Initial Schema Migration
-- Sourced directly from Documentation/schema.sql

create extension if not exists pgcrypto;

-- ---------- Enums ----------
create type app_role as enum ('super_admin','team_member','institute_admin','student');
create type lead_status as enum ('new','contacted','closed');
create type application_type as enum ('mentor','intern','institutional_partner','channel_partner');
create type application_status as enum ('pending','approved','rejected');
create type booking_status as enum ('pending','confirmed','scheduled','completed','cancelled');
create type payment_status as enum ('unpaid','partial','paid');
create type session_status as enum ('planned','done','cancelled');
create type certificate_status as enum ('valid','revoked');

-- ---------- Core tables ----------
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now()
);

create table institutes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  institute_type text,           -- school, ITI, diploma, engineering
  city text,
  created_at timestamptz not null default now()
);

create table memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  institute_id uuid references institutes(id) on delete cascade,
  approved boolean not null default false,
  approved_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  constraint institute_admin_needs_institute
    check (role <> 'institute_admin' or institute_id is not null),
  unique (user_id, role, institute_id)
);
create index on memberships (user_id);

create table leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  organisation text,
  institute_type text,
  city text,
  phone text,
  email text not null,
  need text,
  message text,
  status lead_status not null default 'new',
  consent_given boolean not null default false,
  created_at timestamptz not null default now()
);

create table applications (
  id uuid primary key default gen_random_uuid(),
  applicant_type application_type not null,
  name text not null,
  email text not null,
  phone text,
  organisation text,
  details jsonb not null default '{}'::jsonb,
  status application_status not null default 'pending',
  reviewed_by uuid references auth.users(id),
  consent_given boolean not null default false,
  created_at timestamptz not null default now()
);

create table workshops (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  days int not null check (days in (2,5,7)),
  audience text[] not null default '{}',
  topics text[] not null default '{}',
  outcomes text,
  description text,
  sample_agenda jsonb,
  active boolean not null default true
);

create table bookings (
  id uuid primary key default gen_random_uuid(),
  workshop_id uuid not null references workshops(id),
  institute_id uuid references institutes(id),
  requester_id uuid references auth.users(id),
  requester_name text not null,
  requester_email text not null,
  requester_phone text,
  institute_name text,
  city text,
  venue_type text,
  student_count int check (student_count > 0),
  preferred_dates text,
  status booking_status not null default 'pending',
  quoted_price numeric(12,2),
  payment_status payment_status not null default 'unpaid',
  notes text,
  created_at timestamptz not null default now()
);
create index on bookings (institute_id);
create index on bookings (requester_id);

create table sessions (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id) on delete cascade,
  start_date date not null,
  end_date date not null,
  venue text,
  status session_status not null default 'planned',
  check (end_date >= start_date)
);

create table session_mentors (
  session_id uuid not null references sessions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  primary key (session_id, user_id)
);

create table participants (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id) on delete cascade,
  full_name text not null,
  email text,
  user_id uuid references auth.users(id),
  created_at timestamptz not null default now()
);
create index on participants (booking_id);

create table attendance (
  session_id uuid not null references sessions(id) on delete cascade,
  participant_id uuid not null references participants(id) on delete cascade,
  present boolean not null default false,
  marked_by uuid references auth.users(id),
  primary key (session_id, participant_id)
);

create table certificate_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  layout jsonb not null default '{}'::jsonb,
  signatory_name text,
  signatory_title text,
  logo_path text,
  active boolean not null default true
);

create table certificates (
  id uuid primary key default gen_random_uuid(),
  public_code text not null unique,
  participant_id uuid not null references participants(id),
  booking_id uuid not null references bookings(id),
  template_id uuid references certificate_templates(id),
  holder_name text not null,
  workshop_title text not null,
  issued_at timestamptz not null default now(),
  status certificate_status not null default 'valid',
  pdf_path text,
  revoked_at timestamptz,
  revoked_reason text
);
create index on certificates (booking_id);

create table audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid,
  action text not null,
  entity text not null,
  entity_id text,
  details jsonb,
  created_at timestamptz not null default now()
);

-- ---------- Signup trigger: always student ----------
create or replace function handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, full_name) values (new.id, new.raw_user_meta_data->>'full_name');
  insert into memberships (user_id, role, approved) values (new.id, 'student', true);
  return new;
end $$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function handle_new_user();

-- ---------- RLS helper functions ----------
create or replace function has_role(r app_role) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from memberships
    where user_id = auth.uid() and role = r and approved
  );
$$;

create or replace function my_institutes() returns setof uuid
language sql stable security definer set search_path = public as $$
  select institute_id from memberships
  where user_id = auth.uid() and role = 'institute_admin'
    and approved and institute_id is not null;
$$;

create or replace function is_assigned_mentor(p_session uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from session_mentors
    where session_id = p_session and user_id = auth.uid()
  );
$$;

create or replace function session_institute(p_session uuid) returns uuid
language sql stable security definer set search_path = public as $$
  select b.institute_id from sessions s join bookings b on b.id = s.booking_id
  where s.id = p_session;
$$;

-- ---------- Mentor double-booking guard ----------
create or replace function check_mentor_conflict() returns trigger
language plpgsql as $$
declare s_new sessions%rowtype;
begin
  select * into s_new from sessions where id = new.session_id;
  if exists (
    select 1
    from session_mentors sm
    join sessions s on s.id = sm.session_id
    where sm.user_id = new.user_id
      and sm.session_id <> new.session_id
      and s.status <> 'cancelled'
      and daterange(s.start_date, s.end_date, '[]')
          && daterange(s_new.start_date, s_new.end_date, '[]')
  ) then
    raise exception 'Mentor already assigned to an overlapping session';
  end if;
  return new;
end $$;

create trigger session_mentors_conflict
before insert on session_mentors
for each row execute function check_mentor_conflict();

-- ---------- Enable RLS everywhere ----------
alter table profiles enable row level security;
alter table institutes enable row level security;
alter table memberships enable row level security;
alter table leads enable row level security;
alter table applications enable row level security;
alter table workshops enable row level security;
alter table bookings enable row level security;
alter table sessions enable row level security;
alter table session_mentors enable row level security;
alter table participants enable row level security;
alter table attendance enable row level security;
alter table certificate_templates enable row level security;
alter table certificates enable row level security;
alter table audit_log enable row level security;

-- ---------- Policies ----------
create policy profiles_select on profiles for select
  using (id = auth.uid() or has_role('super_admin'));
create policy profiles_update_own on profiles for update
  using (id = auth.uid()) with check (id = auth.uid());
create policy profiles_admin_all on profiles for all
  using (has_role('super_admin')) with check (has_role('super_admin'));

create policy memberships_select on memberships for select
  using (user_id = auth.uid() or has_role('super_admin'));
create policy memberships_admin_all on memberships for all
  using (has_role('super_admin')) with check (has_role('super_admin'));

create policy institutes_select on institutes for select
  using (id in (select my_institutes()) or has_role('super_admin'));
create policy institutes_admin_all on institutes for all
  using (has_role('super_admin')) with check (has_role('super_admin'));

create policy leads_admin_all on leads for all
  using (has_role('super_admin')) with check (has_role('super_admin'));
create policy applications_admin_all on applications for all
  using (has_role('super_admin')) with check (has_role('super_admin'));

create policy workshops_public_read on workshops for select
  using (active or has_role('super_admin'));
create policy workshops_admin_all on workshops for all
  using (has_role('super_admin')) with check (has_role('super_admin'));

create policy bookings_select on bookings for select using (
  has_role('super_admin')
  or institute_id in (select my_institutes())
  or requester_id = auth.uid()
  or exists (
    select 1 from sessions s join session_mentors sm on sm.session_id = s.id
    where s.booking_id = bookings.id and sm.user_id = auth.uid()
  )
);
create policy bookings_institute_insert on bookings for insert
  with check (institute_id in (select my_institutes()) and requester_id = auth.uid());
create policy bookings_admin_all on bookings for all
  using (has_role('super_admin')) with check (has_role('super_admin'));

create policy sessions_select on sessions for select using (
  has_role('super_admin')
  or is_assigned_mentor(id)
  or session_institute(id) in (select my_institutes())
);
create policy sessions_admin_all on sessions for all
  using (has_role('super_admin')) with check (has_role('super_admin'));

create policy session_mentors_select on session_mentors for select
  using (user_id = auth.uid() or has_role('super_admin'));
create policy session_mentors_admin_all on session_mentors for all
  using (has_role('super_admin')) with check (has_role('super_admin'));

create policy participants_select on participants for select using (
  has_role('super_admin')
  or user_id = auth.uid()
  or exists (select 1 from bookings b where b.id = participants.booking_id
             and b.institute_id in (select my_institutes()))
  or exists (select 1 from sessions s join session_mentors sm on sm.session_id = s.id
             where s.booking_id = participants.booking_id and sm.user_id = auth.uid())
);
create policy participants_admin_all on participants for all
  using (has_role('super_admin')) with check (has_role('super_admin'));

create policy attendance_select on attendance for select using (
  has_role('super_admin')
  or is_assigned_mentor(session_id)
  or session_institute(session_id) in (select my_institutes())
);
create policy attendance_mentor_write on attendance for insert
  with check (is_assigned_mentor(session_id));
create policy attendance_mentor_update on attendance for update
  using (is_assigned_mentor(session_id)) with check (is_assigned_mentor(session_id));
create policy attendance_admin_all on attendance for all
  using (has_role('super_admin')) with check (has_role('super_admin'));

create policy templates_admin_all on certificate_templates for all
  using (has_role('super_admin')) with check (has_role('super_admin'));

create policy certificates_select on certificates for select using (
  has_role('super_admin')
  or exists (select 1 from participants p
             where p.id = certificates.participant_id and p.user_id = auth.uid())
  or exists (select 1 from bookings b
             where b.id = certificates.booking_id
               and b.institute_id in (select my_institutes()))
);
create policy certificates_admin_all on certificates for all
  using (has_role('super_admin')) with check (has_role('super_admin'));

create policy audit_select on audit_log for select
  using (has_role('super_admin'));

-- ---------- Public certificate verification (minimal data) ----------
create or replace function verify_certificate(p_code text)
returns table (status certificate_status, holder_name text, workshop_title text, issued_on date)
language sql stable security definer set search_path = public as $$
  select c.status, c.holder_name, c.workshop_title, c.issued_at::date
  from certificates c where c.public_code = p_code;
$$;
revoke all on function verify_certificate(text) from public;
grant execute on function verify_certificate(text) to anon, authenticated;
