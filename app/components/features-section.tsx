export default function FeaturesSection() {
  const deliverables = [
    {
      title: "Data Collection Guidance",
      description: "We guide you through the data collection process, helping you improve your data quality and permanently improve your internal processes.",
      icon: "📊"
    },
    {
      title: "Smart Calculations & Insights",
      description: "We crunch the numbers for you, walking you through what the results mean and comparing to previous years and other companies.",
      icon: "⚡"
    },
    {
      title: "Auto-Generated Reports",
      description: "We auto-generate compliance reports at the end of the year and guide you through what needs to be amended before submission.",
      icon: "📋"
    },
    {
      title: "Tender-Ready Materials",
      description: "You have readily available material to insert into tenders or to provide to clients requesting evidence of sustainability credentials, even before your first report.",
      icon: "💼"
    },
    {
      title: "Free Ongoing Guidance",
      description: "Free guidance to ensure you remain up to date with developments in sustainability reporting and best practices.",
      icon: "📚"
    },
    {
      title: "Future-Proof Platform",
      description: "Future functionality added to the website, such as compliance to additional standards, at no added cost to you.",
      icon: "🚀"
    }
  ];

  return (
    <section id="features" aria-labelledby="features-title" className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 text-xs font-medium text-emerald-800 dark:text-emerald-200">
            Purpose-built for Small & Medium Enterprises to comply with tightening sustainability requirements
          </div>
          <h2 id="features-title" className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            Six ways we deliver value to your business
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-4xl mx-auto">
            From data collection to compliance reports, we guide you through every step of your sustainability journey — making it simple, efficient, and profitable.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((deliverable, index) => (
            <div key={index} className="card-hover rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-sm">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 text-emerald-700 dark:text-emerald-400 text-3xl">
                {deliverable.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">{deliverable.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-6">
                {deliverable.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
