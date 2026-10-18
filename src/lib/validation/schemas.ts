import { z } from "zod";

/**
 * Lead / Inbound Enquiry Schema (POST /api/leads)
 * From API.md Section 2
 */
export const leadSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  organisation: z.string().trim().max(150).optional(),
  instituteType: z.enum(["school", "iti", "diploma", "engineering", "other"]),
  city: z.string().trim().min(2, "City must be at least 2 characters").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\s\-()]{7,20}$/, "Please provide a valid contact number"),
  email: z.string().trim().email("Please provide a valid email address").max(150),
  need: z.enum([
    "atl_lab",
    "workshop",
    "teacher_training",
    "skill_development",
    "other",
  ]),
  message: z.string().trim().max(2000).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must accept the privacy policy to proceed" }),
  }),
  turnstileToken: z.string().min(1, "Anti-bot verification required"),
});

export type LeadInput = z.infer<typeof leadSchema>;

/**
 * Join Team Application Schema (POST /api/applications)
 * From API.md Section 2
 */
export const applicationSchema = z.object({
  applicantType: z.enum([
    "mentor",
    "intern",
    "institutional_partner",
    "channel_partner",
  ]),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(150),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\s\-()]{7,20}$/, "Valid phone number required"),
  organisation: z.string().trim().max(150).optional(),
  details: z.record(z.unknown()).default({}),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent required to process application" }),
  }),
  turnstileToken: z.string().min(1, "Anti-bot verification required"),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

/**
 * Workshop Booking Request Schema (POST /api/bookings)
 * From API.md Section 2
 */
export const bookingRequestSchema = z.object({
  workshopId: z.string().uuid("Invalid workshop identifier"),
  requesterName: z.string().trim().min(2).max(100),
  requesterEmail: z.string().trim().email().max(150),
  requesterPhone: z
    .string()
    .trim()
    .regex(/^[0-9+\s\-()]{7,20}$/, "Valid phone number required"),
  instituteName: z.string().trim().min(2).max(150),
  city: z.string().trim().min(2).max(100),
  venueType: z.string().trim().max(100).optional(),
  studentCount: z.number().int().positive().max(1000).optional(),
  preferredDates: z.string().trim().max(100).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent required to submit booking" }),
  }),
  turnstileToken: z.string().min(1, "Anti-bot verification required"),
});

export type BookingRequestInput = z.infer<typeof bookingRequestSchema>;
