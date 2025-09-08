"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function PricingPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const tiers = [
    {
      name: "Small",
      fte: "1-9 employees",
      price: 150,
      foundingPrice: 75,
      features: ["SECR & PPN 06/21 compliant carbon footprint", "Excel/CSV imports", "Up to 2 users", "Email support"],
      popular: false,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
      borderColor: "border-blue-200 dark:border-blue-700"
    },
    {
      name: "Medium", 
      fte: "10-99 employees",
      price: 250,
      foundingPrice: 125,
      features: ["Everything in Small", "Report generation", "Unlimited users", "Priority support"],
      popular: false,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20",
      borderColor: "border-emerald-200 dark:border-emerald-700"
    },
    {
      name: "Large",
      fte: "100-249 employees", 
      price: 450,
      foundingPrice: 225,
      features: ["Everything in Medium", "Dedicated support"],
      popular: false,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
      borderColor: "border-purple-200 dark:border-purple-700"
    },
    {
      name: "Very Large",
      fte: "250-500 employees",
      price: 650,
      foundingPrice: 325,
      features: ["Everything in Large", "Account manager"],
      popular: false,
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
      borderColor: "border-orange-200 dark:border-orange-700"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  };

  return (
    <main className="relative overflow-hidden min-h-screen">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-cyan-400/20 to-emerald-400/20 rounded-full animate-bounce"></div>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-transparent to-blue-50/30 dark:from-slate-900/50 dark:via-transparent dark:to-slate-800/30"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-slate-900 via-emerald-600 to-blue-600 dark:from-slate-100 dark:via-emerald-400 dark:to-blue-400 bg-clip-text text-transparent mb-6">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Scale your sustainability journey with plans designed for every business size. 
            <span className="font-semibold text-emerald-600 dark:text-emerald-400"> Founding customers get 50% off for 12 months!</span>
          </p>
        </motion.div>
        
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-8 lg:grid-cols-2 xl:grid-cols-4"
        >
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 }
              }}
              className={`relative rounded-3xl border-2 p-8 shadow-xl transition-all duration-300 bg-white dark:bg-slate-800 ${tier.borderColor} hover:shadow-2xl flex flex-col h-full`}
            >
              
              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${tier.color} mb-4 shadow-lg`}>
                  <span className="text-2xl font-bold text-white">
                    {tier.name === "Small" ? "🚀" : tier.name === "Medium" ? "⭐" : tier.name === "Large" ? "💎" : "👑"}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">{tier.name}</h3>
                <p className="text-slate-600 dark:text-slate-300 font-medium">{tier.fte}</p>
              </div>

              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">£{tier.foundingPrice}</span>
                  <span className="text-slate-600 dark:text-slate-300">/ month</span>
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-lg text-slate-500 dark:text-slate-400 line-through">£{tier.price}</span>
                  <span className="text-sm bg-gradient-to-r from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 text-emerald-800 dark:text-emerald-200 px-3 py-1 rounded-full font-bold">
                    50% OFF
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Founding customer pricing</p>
              </div>

              <ul className="space-y-3 text-slate-700 dark:text-slate-300 mb-8 flex-grow">
                {tier.features.map((feature, featureIndex) => (
                  <motion.li 
                    key={featureIndex} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.5 + featureIndex * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className={`text-emerald-600 dark:text-emerald-400 mt-1 text-lg`}>✓</span>
                    <span className="text-sm leading-relaxed">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-auto"
              >
                <Link
                  href="/#lead"
                  className="w-full inline-flex items-center justify-center rounded-2xl px-6 py-4 font-bold text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 shadow-lg hover:shadow-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200"
                >
                  Get Started Now
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 px-8 py-4 rounded-2xl shadow-lg">
            <span className="text-lg font-semibold text-slate-700 dark:text-slate-300">Enterprise (500+ employees)?</span>
            <Link 
              href="/#lead" 
              className="text-lg font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
            >
              Contact us for bespoke pricing →
            </Link>
          </div>
          <p className="mt-6 text-slate-500 dark:text-slate-400 text-lg">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Founding customers:</span> 50% off for 12 months, then 15% lifetime discount. VAT excluded.
          </p>
        </motion.div>
      </div>
    </main>
  );
}