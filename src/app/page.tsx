import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Wrench } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col">
      {/* Top Value Strip */}
      <section className="bg-ink text-surface py-2.5 px-4 text-xs font-medium border-b border-surface-border">
        <div className="max-w-container mx-auto flex items-center justify-between">
          <span>Empowering Innovation Across Schools, ITIs, Polytechnics & Engineering Colleges</span>
          <span className="text-ink-muted">Inquiries: 1 to 2 Working Days Response</span>
        </div>
      </section>

      {/* Hero Section: High Spatial Density Split Layout */}
      <section className="py-16 md:py-24 px-4 bg-surface-raised border-b border-surface-border">
        <div className="max-w-container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Institutional Pitch */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-light text-brand text-xs font-semibold rounded-md border border-brand/20">
              <ShieldCheck className="w-4 h-4" />
              <span>Turnkey Lab Infrastructure & Technical Workshops</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-ink leading-tight">
              Building the next generation of engineers and innovators.
            </h1>

            <p className="text-base md:text-lg text-ink-muted leading-relaxed max-w-xl">
              Turnkey Atal Tinkering Lab setup, NSDC-aligned vocational training, and intensive 
              multi-day STEM workshops for institutions across India.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand hover:bg-brand-hover text-white text-sm font-semibold rounded-md transition-colors shadow-card"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/workshops"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface hover:bg-surface-sunken text-ink text-sm font-semibold rounded-md border border-surface-border transition-colors"
              >
                <span>Explore Workshops</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-surface-border w-full">
              <div>
                <div className="text-2xl font-extrabold text-brand">Turnkey</div>
                <div className="text-xs text-ink-muted">ATL Lab Implementation</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-brand">2 / 5 / 7 Days</div>
                <div className="text-xs text-ink-muted">Intensive STEM Workshops</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-brand">Verifiable</div>
                <div className="text-xs text-ink-muted">Cryptographic QR Badges</div>
              </div>
            </div>
          </div>

          {/* Right Column: Balanced Hardware Telemetry Panel */}
          <div className="lg:col-span-5 bg-surface p-6 rounded-lg border border-surface-border flex flex-col gap-5 shadow-subtle">
            <div className="flex items-center justify-between border-b border-surface-border pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Platform Architecture
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-state-success">
                <span className="w-2 h-2 rounded-full bg-state-success"></span>
                <span>Operational</span>
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-surface-raised rounded-md border border-surface-border flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-ink">Atal Tinkering Labs</h3>
                  <p className="text-xs text-ink-muted mt-0.5">
                    3D printers, robotics kits, sensors, and continuous faculty enablement.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-surface-raised rounded-md border border-surface-border flex items-start gap-3">
                <Wrench className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-ink">Technical Bootcamps</h3>
                  <p className="text-xs text-ink-muted mt-0.5">
                    Robotics, IoT, embedded systems, drones, and AI/ML for engineering colleges.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-surface-raised rounded-md border border-surface-border flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-ink">Tamper-Proof Verification</h3>
                  <p className="text-xs text-ink-muted mt-0.5">
                    Instant public verification for all issued workshop certifications.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-xs text-ink-muted text-center pt-2 border-t border-surface-border">
              Kurukshetra, Haryana, India | directorunibotics@gmail.com
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
