export const dynamic = 'force-static';

export default function TimelinePage() {
  const timeline = [
    {
      quarter: "Q3 2025",
      title: "MVP Launch",
      description: "Founding customer onboarding, SECR & PPN report generation MVP."
    },
    {
      quarter: "Q4 2025", 
      title: "Report Generation & Enhanced Dashboards",
      description: "Advanced report generation, live dashboards, reduction tracking, and data upload refinements."
    },
    {
      quarter: "Q1 2026",
      title: "Integrations",
      description: "API & integrations with accounting / procurement tools."
    },
    {
      quarter: "Q2 2026",
      title: "Framework Expansion", 
      description: "Expansion to cover all GHG Protocol Categories and additional ESG/compliance frameworks."
    }
  ];

  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-8">Product timeline</h1>
      </div>
      
      <div className="space-y-6">
        {timeline.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex-shrink-0 w-20">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 text-sm font-semibold">
                {item.quarter}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                {item.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}