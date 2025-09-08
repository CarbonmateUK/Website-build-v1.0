"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Apply dark class based on system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = () => {
      document.documentElement.classList.toggle("dark", mediaQuery.matches);
    };
    
    updateTheme();
    mediaQuery.addEventListener("change", updateTheme);
    
    return () => mediaQuery.removeEventListener("change", updateTheme);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Global Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-lg">
            <Image
              src="/carbonmate-long-logo.jpg"
              alt="Carbonmate logo"
              width={250}
              height={45}
              priority
              className="transition-opacity hover:opacity-80"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-8 text-sm text-slate-900">
            <Link 
              href="/about" 
              className="hover:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1"
            >
              About us
            </Link>
            <Link 
              href="/compliance" 
              className="hover:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1"
            >
              SECR & PPN 06/21
            </Link>
            <Link 
              href="/timeline" 
              className="hover:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1"
            >
              Product timeline
            </Link>
            <Link 
              href="/pricing" 
              className="hover:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1"
            >
              Pricing
            </Link>
            <Link
              href="/#lead"
              className="inline-flex items-center rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 px-4 py-2 font-medium text-white shadow-sm active:translate-y-px transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Get started
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-200 dark:border-slate-700 bg-white"
            >
              <nav className="px-4 py-6 space-y-4" aria-label="Mobile navigation">
                <Link 
                  href="/about" 
                  className="block py-2 text-slate-900 hover:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About us
                </Link>
                <Link 
                  href="/compliance" 
                  className="block py-2 text-slate-900 hover:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  SECR & PPN 06/21
                </Link>
                <Link 
                  href="/timeline" 
                  className="block py-2 text-slate-900 hover:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Product timeline
                </Link>
                <Link 
                  href="/pricing" 
                  className="block py-2 text-slate-900 hover:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/#lead"
                  className="block w-full text-center rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 px-4 py-3 font-medium text-white shadow-sm active:translate-y-px transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get started
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Page content */}
      {children}

      {/* Global Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-700 py-10 bg-slate-50 dark:bg-slate-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
            <p>© {new Date().getFullYear()} Carbonmate UK Ltd. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link 
                href="/contact" 
                className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1"
              >
                Contact
              </Link>
              <Link 
                href="/privacy" 
                className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1"
              >
                Privacy
              </Link>
              <Link 
                href="/terms" 
                className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1"
              >
                Terms
              </Link>
                      {/* LinkedIn Badge */}
              <a 
                href="https://www.linkedin.com/company/carbonmate-uk/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-slate-700 dark:hover:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1"
                aria-label="Visit our LinkedIn page"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}