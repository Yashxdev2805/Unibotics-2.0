import { ImageResponse } from "next/og";

export const alt = "Unibotics | Atal Tinkering Lab Setup & STEM Workshops";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          backgroundColor: "#0F1115",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(249, 115, 22,  0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(2, 132, 199, 0.18) 0%, transparent 50%)",
          color: "#F8FAFC",
        }}
      >
        {/* Top bar with branding */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "#F97316",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 24px rgba(249, 115, 22,  0.6)",
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#0F1115">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "28px", fontWeight: "900", letterSpacing: "1px", color: "#FFFFFF" }}>
                UNIBOTICS
              </span>
              <span style={{ fontSize: "12px", color: "#F97316", fontWeight: "700", letterSpacing: "2px" }}>
                STEM &amp; ROBOTICS INFRASTRUCTURE
              </span>
            </div>
          </div>
          <div
            style={{
              padding: "8px 16px",
              borderRadius: "9999px",
              backgroundColor: "rgba(249, 115, 22,  0.1)",
              border: "1px solid rgba(249, 115, 22,  0.3)",
              color: "#38BDF8",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Kurukshetra, Haryana - India
          </div>
        </div>

        {/* Center headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "980px" }}>
          <div
            style={{
              fontSize: "52px",
              fontWeight: "900",
              lineHeight: "1.15",
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
            }}
          >
            Atal Tinkering Lab Setup &amp; Hands-On Robotics Workshops
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#94A3B8",
              lineHeight: "1.4",
              maxWidth: "850px",
            }}
          >
            P1 to P4 equipment packages, faculty training, and multi-day experiential bootcamps for Schools, ITIs, and Engineering Colleges.
          </div>
        </div>

        {/* Bottom features strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid rgba(26, 52, 89, 0.8)",
          }}
        >
          <div style={{ display: "flex", gap: "32px", fontSize: "16px", color: "#CBD5E1" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>P1-P4 Turnkey Packages</span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>2 / 5 / 7 Days Bootcamps</span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Verifiable QR Badges</span>
            </span>
          </div>
          <div style={{ fontSize: "18px", color: "#F97316", fontWeight: "700" }}>
            unibotics.in
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
