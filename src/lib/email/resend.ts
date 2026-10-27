import "server-only";

interface SendLeadNotificationParams {
  name: string;
  email: string;
  organisation?: string;
  need: string;
  city: string;
  phone: string;
  message?: string;
}

/**
 * Resend email dispatcher.
 * Gracefully logs and avoids crashing when RESEND_API_KEY is not yet configured.
 */
export async function sendLeadNotifications(data: SendLeadNotificationParams) {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_ALERT_EMAIL || "directorunibotics@gmail.com";
  const fromEmail = process.env.EMAIL_FROM || "Unibotics <contact@unibotics.in>";

  if (!apiKey || apiKey.startsWith("re_xxx")) {
    console.info(
      `[DEV EMAIL DISPATCH] Mocking lead emails for ${data.name} (${data.email}). Resend API key not configured.`
    );
    return { success: true, mocked: true };
  }

  try {
    // Alert to Unibotics Operations
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [adminEmail],
        subject: `[New Lead] ${data.need.toUpperCase()} - ${data.organisation || data.name} (${data.city})`,
        text: `New institutional enquiry received:\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nOrganisation: ${data.organisation || "Not specified"}\nCity: ${data.city}\nNeed: ${data.need}\nMessage: ${data.message || "None"}\n\nResponse Guarantee: 1 to 2 working days.`,
      }),
    });

    // Auto-Responder to Institutional Enquirer
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [data.email],
        subject: "We received your Unibotics institutional enquiry",
        text: `Dear ${data.name},\n\nThank you for reaching out to Unibotics India regarding ${data.need.replace("_", " ")}.\n\nOur operations team has received your enquiry and is reviewing your requirements. A dedicated technical coordinator will contact you at ${data.phone} within 1 to 2 working days.\n\nBest regards,\nUnibotics India Operations\nKurukshetra, Haryana\ndirectorunibotics@gmail.com`,
      }),
    });

    return { success: true, mocked: false };
  } catch (err) {
    console.error("Failed to dispatch Resend email notifications:", err);
    return { success: false, error: err };
  }
}
