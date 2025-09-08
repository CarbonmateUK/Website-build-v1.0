import Link from "next/link";

export const dynamic = 'force-static';

export const metadata = {
  title: "Thank you — Carbonmate",
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-slate-50">
      <div className="max-w-lg bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-3xl font-bold text-slate-900">Thank you 🎉</h1>
        <p className="mt-4 text-slate-600">
          Your request has been received. A member of the Carbonmate team will
          be in touch within 1 business day to onboard you as a founding customer.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-emerald-700 active:translate-y-px"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
