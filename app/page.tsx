import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Carbonmate — SECR & PPN 06/21 compliance for SMEs",
  description:
    "Upload your activity data (Excel/CSV) and automatically generate audit-ready SECR and PPN 06/21 (Carbon Reduction Plan) reports. Faster and cheaper than consultants.",
  openGraph: {
    title: "Carbonmate — SECR & PPN 06/21 compliance for SMEs",
    description:
      "Upload your activity data (Excel/CSV) and automatically generate audit-ready SECR and PPN 06/21 (Carbon Reduction Plan) reports.",
    url: "https://carbon-saas.vercel.app",
    siteName: "Carbonmate",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Carbonmate preview" }],
    locale: "en_GB",
    type: "website",
  },
  metadataBase: new URL("https://carbon-saas.vercel.app"),
};

export default function Page() {
  return (
    <>
      {/* Top nav */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="#" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold">
              C
            </span>
            <span className="font-semibold tracking-tight text-slate-900">Carbonmate</span>
          </Link>
          <nav aria-label="Primary" className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <Link href="#features" className="hover:text-slate-900">
              Features
            </Link>
            <Link href="#pricing" className="hover:text-slate-900">
              Pricing
            </Link>
            <Link href="#lead" className="hover:text-slate-900">
              Get early access
            </Link>
            <a
              href="#lead"
              className="inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-emerald-700 active:translate-y-px"
            >
              Join founding customers
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(16,185,129,0.15)_0%,rgba(255,255,255,0)_70%)]" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
                  Built for UK SMEs
                  <span className="h-1 w-1 rounded-full bg-emerald-600"></span>
                  SECR & PPN 06/21
                </div>
                <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                  SECR & PPN 06/21 compliance in days, not months
                </h1>
                <p className="mt-4 text-lg leading-7 text-slate-600">
                  Upload your activity data (fuel, electricity, business travel) as Excel or CSV. We calculate Scope 1,
                  Scope 2, and relevant Scope 3 emissions and generate audit-ready SECR and a Carbon Reduction Plan
                  aligned to PPN 06/21—without paying £££ for consultants.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-stretch gap-3">
                  <a
                    href="#lead"
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-700 active:translate-y-px"
                  >
                    Join founding customers (£250/mo)
                  </a>
                  <a
                    href="#pricing"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 text-base font-semibold text-slate-800 hover:bg-slate-50"
                  >
                    See pricing
                  </a>
                </div>
                <p className="mt-3 text-sm text-slate-500">
                  <span className="font-medium text-slate-700">Founding offer</span>: lock in £250/mo for 12 months.
                  Price will be £500/mo after launch.
                </p>
              </div>

              {/* Screenshot placeholder */}
              <div className="relative">
                <div className="aspect-[16/10] w-full rounded-2xl border border-dashed border-slate-300 bg-white/60 p-4 shadow-sm">
                  <div className="flex h-full w-full items-center justify-center text-center">
                    <div>
                      <div className="mx-auto mb-3 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        Dashboard preview
                      </div>
                      <p className="mx-auto max-w-sm text-slate-500">
                        Product screenshots coming soon. We’ll show emissions by scope, intensity metrics, and
                        downloadable SECR & CRP reports.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" aria-labelledby="features-title" className="py-16 sm:py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 id="features-title" className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Purpose-built for SECR & PPN 06/21
              </h2>
              <p className="mt-3 text-slate-600">
                Everything you need to get compliant quickly and stay ready for audit.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Feature 1 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Automated calculations</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Upload Excel/CSV activity data. We apply the latest UK emissions factors to compute Scope 1, Scope 2
                  and relevant Scope 3.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Audit-ready reports</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Generate SECR and Carbon Reduction Plan (PPN 06/21) as PDF/DOCX with methodology, scope breakdowns,
                  intensity metrics, and director sign-off sections.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Cheaper & faster than consultants</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Fixed monthly price, no day rates. Typical onboarding under a week once data is uploaded.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 font-bold">
                  4
                </div>
                <h3 className="text-lg font-semibold text-slate-900">SME-friendly</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Unlimited users, simple imports, and clear guidance on what data you need (fuel, electricity,
                  refrigerants, business travel, etc.).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" aria-labelledby="pricing-title" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 id="pricing-title" className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Simple pricing
              </h2>
              <p className="mt-3 text-slate-600">Founding customers get a year at the launch-prep rate below.</p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {/* Founding offer card */}
              <div className="relative rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
                <span className="absolute -top-3 left-6 inline-flex items-center rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow">
                  Founding offer
                </span>
                <h3 className="text-xl font-semibold text-slate-900">Founding Customer</h3>
                <p className="mt-2 text-sm text-slate-600">Lock in early access and pricing while we finish the MVP.</p>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-4xl font-extrabold text-slate-900">£250</span>
                  <span className="text-sm text-slate-600">/ month</span>
                  <span className="text-sm text-slate-500 line-through">£500</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li>✔ SECR & PPN 06/21 report generation</li>
                  <li>✔ Excel/CSV data imports</li>
                  <li>✔ Unlimited users & projects</li>
                  <li>✔ Priority onboarding & support</li>
                </ul>
                <div className="mt-6">
                  <a
                    href="#lead"
                    className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-700 active:translate-y-px"
                  >
                    Join as a founding customer
                  </a>
                </div>
                <p className="mt-3 text-xs text-slate-500">Price honoured for 12 months. VAT excluded.</p>
              </div>

              {/* Standard plan preview */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">Standard (coming soon)</h3>
                <p className="mt-2 text-sm text-slate-600">Public launch pricing once MVP is live.</p>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-4xl font-extrabold text-slate-900">£500</span>
                  <span className="text-sm text-slate-600">/ month</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li>✔ Everything in Founding</li>
                  <li>✔ Live dashboards & reduction tracking</li>
                  <li>✔ API & integrations</li>
                </ul>
                <div className="mt-6">
                  <a
                    href="#lead"
                    className="inline-flex items-center rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-800 hover:bg-slate-50"
                  >
                    Join the waitlist
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead capture */}
        <section id="lead" aria-labelledby="lead-title" className="py-16 sm:py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 id="lead-title" className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Get early access
              </h2>
              <p className="mt-3 text-slate-600">
                Tell us about your organisation and we’ll be in touch to onboard you as a founding customer.
              </p>
            </div>

            {/* Tally/Typeform embed — replace src with your form URL */}
            <div className="mt-8">
              <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                <iframe
                  title="Founding customer form"
                  src="https://tally.so/embed/wzk9Va?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                  className="w-full h-[560px] rounded-xl"
                  loading="lazy"
                  allow="fullscreen; geolocation; microphone; camera"
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                No form yet?{" "}
                <a className="underline" href="https://tally.so" target="_blank" rel="noreferrer">
                  Create a Tally form
                </a>{" "}
                and paste its embed URL here. As a quick fallback, link the buttons above to your email.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-title" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 id="faq-title" className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">FAQs</h2>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900">What data do I need?</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Typically: fuel purchases or meter data (Scope 1), electricity consumption (Scope 2), and relevant
                  Scope 3 like business travel (mileage/booking data). We’ll guide you.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900">Can I download reports?</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Yes — SECR and Carbon Reduction Plan as PDF or DOCX, with methodology statements and intensity metrics.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900">Is this a replacement for consultants?</h3>
                <p className="mt-2 text-sm text-slate-600">
                  For most SMEs, yes. We automate the heavy lifting and offer support where needed — at a fraction of
                  typical day rates.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900">Is my data secure?</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Your uploads are encrypted in transit and at rest. We’ll share full security details during onboarding.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Carbonmate UK Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#lead" className="hover:text-slate-700">
              Contact
            </Link>
            <Link href="#" className="hover:text-slate-700">
              Privacy
            </Link>
            <Link href="#" className="hover:text-slate-700">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
