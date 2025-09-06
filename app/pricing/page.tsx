import Link from "next/link";

export const dynamic = 'force-static';

export default function PricingPage() {
  const tiers = [
    {
      name: "Small",
      fte: "1-24 FTE",
      price: 150,
      foundingPrice: 75,
      features: ["SECR & PPN 06/21 reports", "Excel/CSV imports", "Up to 5 users", "Email support"],
      popular: false
    },
    {
      name: "Medium", 
      fte: "25-99 FTE",
      price: 250,
      foundingPrice: 125,
      features: ["Everything in Small", "Up to 25 users", "Priority support", "Custom templates"],
      popular: true
    },
    {
      name: "Big",
      fte: "100-249 FTE", 
      price: 450,
      foundingPrice: 225,
      features: ["Everything in Medium", "Unlimited users", "API access", "Dedicated support"],
      popular: false
    },
    {
      name: "Very Big",
      fte: "250-750 FTE",
      price: 650,
      foundingPrice: 325,
      features: ["Everything in Big", "Custom integrations", "White-label options", "Account manager"],
      popular: false
    }
  ];

  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-8">Pricing</h1>
        
        <div className="space-y-8">
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-7">
            Choose your tier based on company size. Founding customers get 50% off for 12 months, then 20% lifetime discount.
          </p>

          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {tiers.map((tier, index) => (
              <div 
                key={index}
                className={`card-hover relative rounded-2xl border p-6 shadow-sm ${
                  tier.popular 
                    ? 'border-emerald-500 dark:border-emerald-400 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 scale-105 ring-2 ring-emerald-200 dark:ring-emerald-800' 
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 inline-flex items-center rounded-full bg-emerald-600 dark:bg-emerald-500 px-4 py-1 text-xs font-semibold text-white shadow-lg">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{tier.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{tier.fte}</p>
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">£{tier.foundingPrice}</span>
                    <span className="text-sm text-slate-600 dark:text-slate-300">/ month</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-slate-500 dark:text-slate-400 line-through">£{tier.price}</span>
                    <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 px-2 py-1 rounded-full font-medium">
                      50% off
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Founding customer pricing</p>
                </div>
                <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-6">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/#lead"
                  className="w-full inline-flex items-center justify-center rounded-xl px-4 py-3 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 hover:shadow-lg"
                >
                  Get Started Now
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">
              <span className="text-sm text-slate-600 dark:text-slate-300">Enterprise (750+ FTE)?</span>
              <Link 
                href="/#lead" 
                className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
              >
                Contact us for bespoke pricing
              </Link>
            </div>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Founding customers get 50% off for 12 months, then 20% lifetime discount. VAT excluded.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}