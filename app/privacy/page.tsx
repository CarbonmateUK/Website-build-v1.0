import type { Metadata } from "next";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Privacy Policy — Carbonmate",
  description: "Privacy policy for Carbonmate UK Ltd.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-8">Privacy Policy</h1>
        
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          <strong>Last updated:</strong> 15 September 2025
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">1. Information We Collect</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            We collect information you provide directly to us, such as when you create an account, 
            upload data, or contact us for support. This may include:
          </p>
          <ul className="list-disc pl-6 text-slate-600 dark:text-slate-300 mb-4">
            <li>Company information (name, address, contact details)</li>
            <li>Activity data for emissions calculations (fuel consumption, electricity usage, travel data)</li>
            <li>Account credentials and preferences</li>
            <li>Communication records</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">2. How We Use Your Information</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            We use your information to:
          </p>
          <ul className="list-disc pl-6 text-slate-600 dark:text-slate-300 mb-4">
            <li>Generate SECR and PPN 06/21 compliance reports</li>
            <li>Provide and improve our services</li>
            <li>Communicate with you about your account and our services</li>
            <li>Ensure data security and prevent fraud</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">3. Data Security</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            We implement appropriate technical and organisational measures to protect your personal data 
            against unauthorised access, alteration, disclosure, or destruction. Your data is encrypted 
            in transit and at rest.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">4. Data Sharing</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            We do not sell, trade, or otherwise transfer your personal data to third parties without 
            your consent, except as required by law or to provide our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">5. Your Rights</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Under UK GDPR, you have the right to:
          </p>
          <ul className="list-disc pl-6 text-slate-600 dark:text-slate-300 mb-4">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">6. Contact Us</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <p className="text-slate-700 dark:text-slate-300">
              <strong>Carbonmate UK Ltd</strong><br />
              Email: privacy@carbonmate.co.uk<br />
              Address: [Company Address]
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
