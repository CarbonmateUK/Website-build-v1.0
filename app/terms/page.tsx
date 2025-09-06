import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Carbonmate",
  description: "Terms of service for Carbonmate UK Ltd.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-8">Terms of Service</h1>
        
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          <strong>Last updated:</strong> {new Date().toLocaleDateString('en-GB')}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">1. Agreement to Terms</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            By accessing and using Carbonmate&apos;s services, you agree to be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">2. Description of Service</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Carbonmate provides software-as-a-service for SECR and PPN 06/21 compliance reporting. 
            Our service includes:
          </p>
          <ul className="list-disc pl-6 text-slate-600 dark:text-slate-300 mb-4">
            <li>Automated emissions calculations using UK government factors</li>
            <li>Generation of audit-ready SECR and Carbon Reduction Plan reports</li>
            <li>Data import and management tools</li>
            <li>Customer support and guidance</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">3. User Responsibilities</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            You are responsible for:
          </p>
          <ul className="list-disc pl-6 text-slate-600 dark:text-slate-300 mb-4">
            <li>Providing accurate and complete data for emissions calculations</li>
            <li>Ensuring compliance with all applicable laws and regulations</li>
            <li>Maintaining the security of your account credentials</li>
            <li>Using the service only for lawful purposes</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">4. Payment Terms</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Subscription fees are billed monthly in advance. Founding customers receive special pricing 
            for 12 months from signup. All prices exclude VAT unless otherwise stated.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">5. Data and Privacy</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Your data is processed in accordance with our Privacy Policy. We implement appropriate 
            security measures to protect your information, but you acknowledge that no system is 
            completely secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">6. Limitation of Liability</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            To the maximum extent permitted by law, Carbonmate shall not be liable for any indirect, 
            incidental, special, or consequential damages arising from your use of our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">7. Termination</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Either party may terminate this agreement with 30 days&apos; written notice. Upon termination, 
            you will lose access to the service and your data may be deleted after a reasonable period.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">8. Governing Law</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            These terms are governed by English law and subject to the exclusive jurisdiction of 
            the English courts.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">9. Contact Information</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            For questions about these Terms of Service, please contact us at:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <p className="text-slate-700 dark:text-slate-300">
              <strong>Carbonmate UK Ltd</strong><br />
              Email: legal@carbonmate.co.uk<br />
              Address: [Company Address]
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
