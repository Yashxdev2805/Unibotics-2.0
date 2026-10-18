import "server-only";

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const ipMap = new Map<string, RateLimitRecord>();

/**
 * In-memory sliding rate limiter for server route handlers.
 * Standard rule for public writes: 5 requests per 10 minutes per IP.
 */
export function checkRateLimit(
  ip: string,
  limit: number = 5,
  windowMs: number = 10 * 60 * 1000
): { allowed: boolean; remaining: number; resetInMs: number } {
  const now = Date.now();
  const record = ipMap.get(ip);

  // Clean up expired records periodically
  if (ipMap.size > 10000) {
    for (const [key, val] of ipMap.entries()) {
      if (val.resetAt <= now) {
        ipMap.delete(key);
      }
    }
  }

  if (!record || record.resetAt <= now) {
    ipMap.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetInMs: windowMs };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0, resetInMs: record.resetAt - now };
  }

  record.count += 1;
  return { allowed: true, remaining: limit - record.count, resetInMs: record.resetAt - now };
}
