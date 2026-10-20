import { describe, it, expect } from "vitest";
import {
  leadSchema,
  applicationSchema,
  bookingRequestSchema,
  loginSchema,
  signupSchema,
} from "@/lib/validation/schemas";

describe("Input Validation Schemas (API.md Contracts)", () => {
  describe("Lead Enquiry Schema (POST /api/leads)", () => {
    it("accepts a valid lead submission", () => {
      const payload = {
        name: "Dr. Rajesh Sharma",
        organisation: "DAV Public School",
        instituteType: "school",
        city: "Kurukshetra",
        phone: "+91 98765 43210",
        email: "principal@davkkr.edu.in",
        need: "atl_lab",
        message: "We would like to establish an Atal Tinkering Lab for 500 students.",
        consent: true,
        turnstileToken: "valid_cf_token_12345",
      };

      const result = leadSchema.safeParse(payload);
      expect(result.success).toBe(true);
    });

    it("rejects when consent is false", () => {
      const payload = {
        name: "Dr. Rajesh Sharma",
        instituteType: "school",
        city: "Kurukshetra",
        phone: "+91 98765 43210",
        email: "principal@davkkr.edu.in",
        need: "atl_lab",
        consent: false,
        turnstileToken: "valid_cf_token_12345",
      };

      const result = leadSchema.safeParse(payload);
      expect(result.success).toBe(false);
    });

    it("rejects when turnstile token is missing", () => {
      const payload = {
        name: "Dr. Rajesh Sharma",
        instituteType: "school",
        city: "Kurukshetra",
        phone: "+91 98765 43210",
        email: "principal@davkkr.edu.in",
        need: "atl_lab",
        consent: true,
        turnstileToken: "",
      };

      const result = leadSchema.safeParse(payload);
      expect(result.success).toBe(false);
    });
  });

  describe("Application Schema (POST /api/applications)", () => {
    it("accepts a valid mentor application", () => {
      const payload = {
        applicantType: "mentor",
        name: "Ananya Verma",
        email: "ananya.robotics@gmail.com",
        phone: "+91 90123 45678",
        organisation: "NIT Kurukshetra Alumni",
        details: { specialization: "Robotics Kinematics & ROS" },
        consent: true,
        turnstileToken: "valid_token",
      };

      const result = applicationSchema.safeParse(payload);
      expect(result.success).toBe(true);
    });
  });

  describe("Booking Request Schema (POST /api/bookings)", () => {
    it("accepts a valid booking request with UUID workshopId", () => {
      const payload = {
        workshopId: "123e4567-e89b-12d3-a456-426614174000",
        requesterName: "Prof. S. K. Gupta",
        requesterEmail: "dean.academics@enggcollege.ac.in",
        requesterPhone: "+91 99887 76655",
        instituteName: "Haryana Engineering College",
        city: "Yamunanagar",
        studentCount: 120,
        preferredDates: "15 Nov 2026 to 20 Nov 2026",
        consent: true,
        turnstileToken: "valid_token",
      };

      const result = bookingRequestSchema.safeParse(payload);
      expect(result.success).toBe(true);
    });

    it("accepts a valid booking request with workshopSlug", () => {
      const payload = {
        workshopSlug: "robotics-and-drones-accelerator",
        requesterName: "Prof. S. K. Gupta",
        requesterEmail: "dean.academics@enggcollege.ac.in",
        requesterPhone: "+91 99887 76655",
        instituteName: "Haryana Engineering College",
        city: "Yamunanagar",
        studentCount: 120,
        preferredDates: "15 Nov 2026 to 20 Nov 2026",
        consent: true,
        turnstileToken: "valid_token",
      };

      const result = bookingRequestSchema.safeParse(payload);
      expect(result.success).toBe(true);
    });

    it("rejects a malformed non-UUID workshopId", () => {
      const payload = {
        workshopId: "not-a-valid-uuid",
        requesterName: "Prof. S. K. Gupta",
        requesterEmail: "dean.academics@enggcollege.ac.in",
        requesterPhone: "+91 99887 76655",
        instituteName: "Haryana Engineering College",
        city: "Yamunanagar",
        consent: true,
        turnstileToken: "valid_token",
      };

      const result = bookingRequestSchema.safeParse(payload);
      expect(result.success).toBe(false);
    });
  });

  describe("Authentication Schemas", () => {
    it("accepts valid login credentials", () => {
      const payload = {
        email: "coordinator@school.edu.in",
        password: "securePassword123",
      };
      const result = loginSchema.safeParse(payload);
      expect(result.success).toBe(true);
    });

    it("rejects passwords shorter than 8 characters", () => {
      const payload = {
        email: "coordinator@school.edu.in",
        password: "short",
      };
      const result = loginSchema.safeParse(payload);
      expect(result.success).toBe(false);
    });

    it("accepts valid student signup", () => {
      const payload = {
        fullName: "Aarav Patel",
        email: "aarav@student.ac.in",
        password: "studentPassword456",
      };
      const result = signupSchema.safeParse(payload);
      expect(result.success).toBe(true);
    });
  });

  describe("Certificate Public Code Generation (Phase 5 Contract)", () => {
    it("generates correctly formatted unguessable public codes", async () => {
      const { generateCertificateCode, isValidCertificateCode } = await import("@/lib/security/certificateCode");
      const code = generateCertificateCode(2026);
      expect(code).toMatch(/^UB-2026-[A-F0-9]{4}-[A-F0-9]{4}$/);
      expect(isValidCertificateCode(code)).toBe(true);
    });

    it("detects invalid or tampered certificate codes", async () => {
      const { isValidCertificateCode } = await import("@/lib/security/certificateCode");
      expect(isValidCertificateCode("INVALID-CODE")).toBe(false);
      expect(isValidCertificateCode("UB-2026-123")).toBe(false);
      expect(isValidCertificateCode("UB-2026-ZZZZ-AAAA")).toBe(false); // Non-hex
      expect(isValidCertificateCode("")).toBe(false);
    });
  });
});


