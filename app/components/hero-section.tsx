import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(16,185,129,0.15)_0%,rgba(255,255,255,0)_70%)] dark:bg-[radial-gradient(50%_50%_at_50%_0%,rgba(16,185,129,0.25)_0%,rgba(0,0,0,0)_70%)]"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300 dark:bg-emerald-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 text-xs font-medium text-emerald-800 dark:text-emerald-200">
              Built for UK SMEs
              <span className="h-1 w-1 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
              SECR & PPN 06/21
            </div>
                    <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl">
                      <span className="gradient-text">Streamlining Sustainability</span> for your business
                    </h1>
                    <p className="mt-4 text-lg leading-7 text-slate-600 dark:text-slate-300">
                      No buzzwords. No corporate consultants. No upselling.<br/>
                      Carbonmate helps you get sustainability done — without the fluff.<br/>
                      Supercharge your sustainability, future-proof your business, and win more work — powered by Carbonmate.
                    </p>
            <div className="mt-8 flex flex-col sm:flex-row items-stretch gap-3">
              <Link
                href="#lead"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 px-8 py-4 text-base font-semibold shadow-lg hover:shadow-xl active:translate-y-px transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Get Started Now (from £75/mo)
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-6 py-3 text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                See pricing
              </Link>
            </div>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300">Founding offer</span>: 50% off for 12 months, then 15% lifetime discount.
              Make your business more competitive in tendering.
            </p>
          </div>

          {/* Dashboard Preview */}
          <div className="relative">
            <div className="aspect-[16/10] w-full rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-700">
              {/* Mock Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">Company A Dashboard</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">2024 Emissions Report</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                  <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                </div>
              </div>

              {/* Mock Charts and Data */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Scope 1</span>
                    <span className="text-lg font-bold text-emerald-600">45.2 tCO₂e</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Scope 2</span>
                    <span className="text-lg font-bold text-blue-600">128.7 tCO₂e</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '80%'}}></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">173.9</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Total tCO₂e</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-emerald-600">-12%</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">vs Last Year</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-blue-600">2.1</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">tCO₂e/£1M</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <div className="flex-1 bg-emerald-600 text-white text-center py-2 px-4 rounded-lg text-sm font-medium">
                  Generate SECR Report
                </div>
                <div className="flex-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-center py-2 px-4 rounded-lg text-sm font-medium">
                  Export Data
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
