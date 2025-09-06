import Link from "next/link";

export const dynamic = 'force-static';

export default function CompliancePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            SECR & PPN 06/21 Compliance
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Everything you need to know about Streamlined Energy and Carbon Reporting (SECR) 
            and PPN 06/21 Carbon Reduction Plans for UK businesses. Make compliance your competitive advantage.
          </p>
        </div>

        {/* SECR Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-8 md:p-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-2 text-sm font-semibold text-blue-800 dark:text-blue-200 mb-6">
            SECR
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Streamlined Energy and Carbon Reporting
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            SECR is a UK government framework requiring large companies to disclose their energy use and greenhouse gas emissions in their annual reports.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Who it applies to</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Large UK companies and LLPs meeting at least 2 of: 250+ employees, £36M+ turnover, or £18M+ balance sheet.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">What you need to report</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Energy use, greenhouse gas emissions (Scope 1 & 2), energy efficiency measures, and intensity metrics.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">When it&apos;s due</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Annually, included in your company&apos;s annual report and accounts, due 9 months after financial year end.
              </p>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">How Carbonmate helps</h3>
          <p className="text-slate-600 dark:text-slate-300">
            We automate the complex calculations using the latest UK government emissions factors, generate 
            audit-ready reports with proper methodology statements, and ensure your disclosures meet all 
            regulatory requirements. Our platform handles the technical complexity so you can focus on 
            your business while staying compliant.
          </p>
        </section>

        {/* PPN 06/21 Section */}
        <section className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 md:p-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 text-sm font-semibold text-emerald-800 dark:text-emerald-200 mb-6">
            PPN 06/21
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Carbon Reduction Plans
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            PPN 06/21 requires suppliers bidding for major government contracts to have a Carbon Reduction Plan 
            demonstrating their commitment to achieving Net Zero by 2050.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Who it applies to</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Suppliers bidding for central government contracts worth £5M+ per annum (including framework agreements).
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">What you need to include</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Current emissions baseline, Net Zero commitment, environmental management measures, and carbon reduction targets.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">When it&apos;s required</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                From September 2021 onwards, for all qualifying government contracts and framework agreements.
              </p>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">How Carbonmate helps</h3>
          <p className="text-slate-600 dark:text-slate-300">
            We generate comprehensive Carbon Reduction Plans that meet PPN 06/21 requirements, including 
            your current emissions baseline, Net Zero commitment, and detailed environmental management 
            measures. Our plans are designed to help you win government contracts while demonstrating 
            your commitment to sustainability.
          </p>
        </section>

        {/* How Carbonmate Helps Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
            How Carbonmate Helps You Comply
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">Fast & Accurate</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Upload data in minutes, generate reports in days. No complex spreadsheets or lengthy consultations.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">Cost Effective</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Save thousands compared to consultants. Fixed monthly pricing with no hidden costs—invest in growth instead.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">Audit Ready</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Generate professional reports that meet all regulatory requirements and pass audits—win more work with bigger clients.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-emerald-600 dark:bg-emerald-500 text-white rounded-3xl p-8 md:p-12">
          <h2 className="text-4xl font-bold mb-4">Ready to get compliant?</h2>
          <p className="text-xl mb-8">Join our founding customers and make compliance your competitive advantage.</p>
          <Link
            href="/#lead"
            className="inline-flex items-center rounded-xl bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl active:translate-y-px transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          >
            Get Started Now
          </Link>
        </section>
      </div>
    </main>
  );
}