"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 }
};

const fadeInUpStagger = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ContactPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <main ref={ref} className="mx-auto max-w-4xl px-4 py-16">
      <motion.div
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        variants={fadeInUp}
      >
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-8">Contact Us</h1>
        
        <motion.div
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.div 
            variants={fadeInUpStagger}
            className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6">Get in Touch</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-7 mb-6">
              Ready to streamline your SECR & PPN 06/21 compliance? Have questions about our platform? 
              We&apos;re here to help you get started on your sustainability journey.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📧</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Email</h3>
                  <p className="text-slate-600 dark:text-slate-300">hello@carbonmate.co.uk</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">We&apos;ll get back to you within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">💼</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">LinkedIn</h3>
                  <p className="text-slate-600 dark:text-slate-300">Connect with us on LinkedIn</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Follow for updates and insights</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={fadeInUpStagger}
            className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-800"
          >
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Ready to Get Started?</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Join our founding customers and start your compliance journey today. 
              Get 50% off for 12 months, then 20% lifetime discount.
            </p>
            <Link
              href="/#lead"
              className="inline-flex items-center rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm hover:shadow-md active:translate-y-px transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Start Your Free Trial
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
}
