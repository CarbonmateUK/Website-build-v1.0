export default function FeaturesSection() {
  const features = [
    {
      title: "Automated calculations",
      description: "Upload Excel/CSV activity data. We apply the latest UK emissions factors to compute Scope 1, Scope 2 and relevant Scope 3."
    },
    {
      title: "Audit-ready reports",
      description: "Generate SECR and Carbon Reduction Plan (PPN 06/21) as PDF/DOCX with methodology, scope breakdowns, intensity metrics, and director sign-off sections."
    },
    {
      title: "Cheaper & faster than consultants",
      description: "Fixed monthly price, no day rates. Typical onboarding under a week once data is uploaded."
    },
    {
      title: "SME-friendly",
      description: "Unlimited users, simple imports, and clear guidance on what data you need (fuel, electricity, refrigerants, business travel, etc.)."
    }
  ];

  return (
    <section id="features" aria-labelledby="features-title" className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 id="features-title" className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            Purpose-built for SECR & PPN 06/21
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Everything you need to get compliant quickly, stay ready for audit, and win more work with bigger clients.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="card-hover rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 text-emerald-700 dark:text-emerald-400 font-bold text-lg">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">{feature.title}</h3>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
