"use client";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="constraint-content py-16">
      <div className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-8">
        <h1 className="text-2xl font-bold text-red-900">Something went wrong</h1>
        <p className="mt-3 text-red-800">Please try again. If this persists, contact support.</p>
        <p className="mt-3 text-xs text-red-700">{error.message}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-full bg-red-700 px-5 py-2 text-sm font-semibold text-white hover:bg-red-800"
        >
          Retry
        </button>
      </div>
    </main>
  );
}
