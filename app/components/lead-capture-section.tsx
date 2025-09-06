"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function LeadCaptureSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="lead" aria-labelledby="lead-title" className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-2xl"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={fadeInUp}
        >
          <h2 id="lead-title" className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            Supercharge your sustainability journey now
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Tell us about your organisation and we&apos;ll be in touch to onboard you as a founding customer.
          </p>
        </motion.div>

        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 shadow-sm">
            <iframe
              title="Founding customer form"
              src="https://tally.so/embed/wzk9Va?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              className="w-full min-h-[700px] rounded-xl"
              loading="lazy"
              allow="fullscreen; geolocation; microphone; camera"
            ></iframe>
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            No form yet?{" "}
            <a className="underline hover:text-slate-700 dark:hover:text-slate-300 transition-colors" href="https://tally.so" target="_blank" rel="noreferrer">
              Create a Tally form
            </a>{" "}
            and paste its embed URL here. As a quick fallback, link the buttons above to your email.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
