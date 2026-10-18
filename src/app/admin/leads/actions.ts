"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/db/server";
import { getAdminClient } from "@/lib/db/admin";
import { logAuditEvent } from "@/lib/db/audit";

export async function updateLeadStatus(leadId: string, newStatus: "new" | "contacted" | "closed") {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Verify super_admin privileges
  const { data: memberships } = await supabase
    .from("memberships")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "super_admin")
    .eq("approved", true);

  if (!memberships || memberships.length === 0) {
    throw new Error("Forbidden: Super Admin privilege required.");
  }

  const adminClient = getAdminClient();
  const { error } = await adminClient
    .from("leads")
    .update({ status: newStatus })
    .eq("id", leadId);

  if (error) {
    throw new Error(`Failed to update lead status: ${error.message}`);
  }

  // Record audit log
  await logAuditEvent({
    actorId: user.id,
    action: "UPDATE_LEAD_STATUS",
    entity: "leads",
    entityId: leadId,
    details: { newStatus },
  });

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
  return { success: true };
}
