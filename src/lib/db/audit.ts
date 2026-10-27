import "server-only";
import { getAdminClient } from "./admin";

interface AuditLogParams {
  actorId?: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: Record<string, unknown>;
}

/**
 * Inserts an immutable security audit entry into `audit_log`.
 * Uses service role to ensure audit trail integrity.
 */
export async function logAuditEvent({
  actorId,
  action,
  entity,
  entityId,
  details,
}: AuditLogParams): Promise<void> {
  try {
    const supabase = getAdminClient();
    await supabase.from("audit_log").insert({
      actor_id: actorId || null,
      action,
      entity,
      entity_id: entityId || null,
      details: details || {},
    });
  } catch (err) {
    console.error("Failed to write audit log entry:", err);
  }
}
