
export default function FAQSection() {
  const faqs = [
    {
      question: "What data do I need?",
      answer: "Typically: fuel purchases or meter data (Scope 1), electricity consumption (Scope 2), and relevant Scope 3 like business travel (mileage/booking data). We'll guide you."
    },
    {
      question: "Can I download reports?",
      answer: "Yes — SECR and Carbon Reduction Plan as PDF or DOCX, with methodology statements and intensity metrics."
    },
    {
      question: "Is this a replacement for consultants?",
      answer: "For most SMEs, yes. We automate the heavy lifting and offer support where needed — at a fraction of typical day rates."
    },
    {
      question: "Is my data secure?",
      answer: "Your uploads are encrypted in transit and at rest. We'll share full security details during onboarding."
    }
  ];

  return (
    <section aria-labelledby="faq-title" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 id="faq-title" className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">FAQs</h2>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">{faq.question}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
