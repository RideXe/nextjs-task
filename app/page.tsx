import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12 text-slate-900 sm:px-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-sky-700">
            Simple Next.js App
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Build fast, keep it clean.
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            This is a lightweight starter UI using the App Router and Tailwind
            CSS. You can use it as your homepage and continue building from
            here.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/get-started"
              className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              Get Started
            </Link>
            <Link
              href="/learn-more"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Learn More
            </Link>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {["Fast Setup", "Modern Routing", "Simple Styling"].map((item) => (
            <article
              key={item}
              className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
            >
              <h2 className="text-lg font-semibold">{item}</h2>
              <p className="mt-2 text-sm text-slate-600">
                A clean section you can customize with your own content.
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
