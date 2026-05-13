import Link from "next/link";

export default function GetStartedPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12 text-slate-900 sm:px-10">
      <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-medium uppercase tracking-wide text-sky-700">
          Get Started
        </p>
        <h1 className="mt-2 text-4xl font-bold leading-tight">Let&apos;s start building.</h1>
        <p className="mt-4 text-slate-600">
          This page is your starting point. Add your setup steps, key goals, and
          first milestones for the project.
        </p>

        <ol className="mt-6 list-decimal space-y-2 pl-5 text-slate-700">
          <li>Update the homepage content.</li>
          <li>Add your first feature route.</li>
          <li>Connect data or APIs when you are ready.</li>
        </ol>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          Back Home
        </Link>
      </div>
    </main>
  );
}
