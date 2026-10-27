"use client";

import dynamic from "next/dynamic";
import DashboardSkeleton from "./DashboardSkeleton";

// Client wrapper enabling ssr: false for zero-CLS deferred hydration
const DashboardPreview = dynamic(() => import("./DashboardPreview"), {
  ssr: false,
  loading: () => <DashboardSkeleton />,
});

export default function DeferredDashboard() {
  return <DashboardPreview />;
}
