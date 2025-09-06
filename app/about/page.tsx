export const dynamic = 'force-static';

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-8">About Carbonmate</h1>
      </div>
      
      <div className="space-y-8">
        <p className="text-slate-600 dark:text-slate-300 leading-7 text-lg">
          Carbonmate helps SMEs comply with SECR & PPN 06/21 faster and cheaper than consultants.
          Our mission is to make carbon compliance accessible, automated, and audit-ready—helping you win more work with bigger clients.
        </p>
        
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-800">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Built for Smaller Organisations</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-7 mb-4">
            We understand that smaller organisations often lack the time, resources, or in-house expertise 
            to track and manage their sustainability criteria—but they want to do the right thing. 
            Carbonmate was founded in 2025 to bridge this gap, making professional-grade carbon 
            reporting accessible to businesses of all sizes.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-7">
            We believe that every business, regardless of size, should have access to the tools 
            and insights needed to understand and reduce their environmental impact. Our platform 
            removes the complexity and cost barriers that have traditionally made sustainability 
            reporting the domain of only the largest corporations.
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">The Business Case for Sustainability</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-7 mb-4">
            Companies that track their emissions and have carbon reduction ambitions don&apos;t just 
            help the planet—they build stronger, more successful businesses. Research consistently 
            shows that organisations with robust sustainability practices:
          </p>
          <ul className="space-y-3 text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-3">
              <span className="text-emerald-600 dark:text-emerald-400 mt-1">✓</span>
              <span><strong>Win more work</strong> with larger clients who increasingly require sustainability credentials in their supply chains</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-600 dark:text-emerald-400 mt-1">✓</span>
              <span><strong>Build better public perception</strong> and brand reputation, attracting customers who value environmental responsibility</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-600 dark:text-emerald-400 mt-1">✓</span>
              <span><strong>Have more satisfied employees</strong> who are proud to work for a company that takes its environmental impact seriously</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-600 dark:text-emerald-400 mt-1">✓</span>
              <span><strong>Access new opportunities</strong> in government contracts and tenders that require carbon reduction plans</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Our Approach</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-7">
            We combine automated calculations with expert guidance to deliver accurate, 
            audit-ready reports in days rather than months. Our platform uses the latest 
            UK government emissions factors and follows best practices for carbon accounting, 
            making sustainability reporting accessible to businesses without dedicated 
            environmental teams.
          </p>
        </div>
      </div>
    </main>
  );
}