import Link from "next/link";

export default function LearnMorePage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12 text-slate-900 sm:px-10">
      <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-medium uppercase tracking-wide text-sky-700">
          Learn More
        </p>
        <h1 className="mt-2 text-4xl font-bold leading-tight">More about this app.</h1>
        <p className="mt-4 text-slate-600">
          This is a simple information page. Use it for project details,
          documentation links, or team notes.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 p-4">
            <h2 className="font-semibold">App Router</h2>
            <p className="mt-1 text-sm text-slate-600">
              Routes are created by folders in the `app` directory.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <h2 className="font-semibold">Tailwind CSS</h2>
            <p className="mt-1 text-sm text-slate-600">
              Utility classes make styling fast and consistent.
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Back Home
        </Link>
      </div>
    </main>
  );
}
