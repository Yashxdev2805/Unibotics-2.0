"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/db/server";
import { getAdminClient } from "@/lib/db/admin";
import { logAuditEvent } from "@/lib/db/audit";

export async function updateApplicationStatus(
  applicationId: string,
  newStatus: "pending" | "approved" | "rejected"
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Super Admin validation
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
    .from("applications")
    .update({
      status: newStatus,
      reviewed_by: user.id,
    })
    .eq("id", applicationId);

  if (error) {
    throw new Error(`Failed to update application status: ${error.message}`);
  }

  // Record audit log
  await logAuditEvent({
    actorId: user.id,
    action: "UPDATE_APPLICATION_STATUS",
    entity: "applications",
    entityId: applicationId,
    details: { newStatus },
  });

  revalidatePath("/admin/applications");
  revalidatePath("/admin");
  return { success: true };
}
