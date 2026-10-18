import "server-only";

/**
 * Validates Cloudflare Turnstile anti-bot challenge token.
 * In development or mock environments, standard test keys pass automatically.
 */
export async function verifyTurnstileToken(token: string, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // Development / Test fallback
  if (!secret || secret.startsWith("0x4AAAAAA") || process.env.NODE_ENV === "test") {
    return token.length > 0;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secret);
    formData.append("response", token);
    if (ip) {
      formData.append("remoteip", ip);
    }

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });

    const outcome = await response.json();
    return Boolean(outcome.success);
  } catch (err) {
    console.error("Turnstile verification error:", err);
    // In fail-safe mode, allow if network fails only in development
    return process.env.NODE_ENV !== "production";
  }
}
