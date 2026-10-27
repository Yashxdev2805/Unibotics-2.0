"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/db/server";
import { getAdminClient } from "@/lib/db/admin";
import { logAuditEvent } from "@/lib/db/audit";

export async function grantUserRole(
  targetUserId: string,
  role: "super_admin" | "team_member" | "institute_admin" | "student",
  instituteId?: string
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Super Admin verification
  const { data: callerMemberships } = await supabase
    .from("memberships")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "super_admin")
    .eq("approved", true);

  if (!callerMemberships || callerMemberships.length === 0) {
    throw new Error("Forbidden: Super Admin privilege required.");
  }

  const adminClient = getAdminClient();

  // If institute_admin, ensure instituteId is provided or handle default
  const { data: newMembership, error } = await adminClient
    .from("memberships")
    .upsert(
      {
        user_id: targetUserId,
        role,
        institute_id: instituteId || null,
        approved: true,
        approved_by: user.id,
      },
      { onConflict: "user_id,role,institute_id" }
    )
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to grant role: ${error.message}`);
  }

  // Record audit event
  await logAuditEvent({
    actorId: user.id,
    action: "GRANT_ROLE",
    entity: "memberships",
    entityId: newMembership.id,
    details: { targetUserId, role, instituteId },
  });

  revalidatePath("/admin/users");
  return { success: true };
}

export async function revokeUserMembership(membershipId: string, roleToRevoke: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Super Admin verification
  const { data: callerMemberships } = await supabase
    .from("memberships")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "super_admin")
    .eq("approved", true);

  if (!callerMemberships || callerMemberships.length === 0) {
    throw new Error("Forbidden: Super Admin privilege required.");
  }

  const adminClient = getAdminClient();

  // Fail-Safe: Do not allow revoking super_admin if only 1 super_admin exists
  if (roleToRevoke === "super_admin") {
    const { count } = await adminClient
      .from("memberships")
      .select("*", { count: "exact", head: true })
      .eq("role", "super_admin");

    if (count && count <= 1) {
      throw new Error("Action Aborted: Cannot revoke the only remaining Super Admin account.");
    }
  }

  const { error } = await adminClient
    .from("memberships")
    .delete()
    .eq("id", membershipId);

  if (error) {
    throw new Error(`Failed to revoke membership: ${error.message}`);
  }

  // Record audit event
  await logAuditEvent({
    actorId: user.id,
    action: "REVOKE_MEMBERSHIP",
    entity: "memberships",
    entityId: membershipId,
    details: { roleToRevoke },
  });

  revalidatePath("/admin/users");
  return { success: true };
}
