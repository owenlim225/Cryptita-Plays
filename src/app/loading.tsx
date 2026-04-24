export default function Loading() {
  return (
    <main className="constraint-content py-16">
      <div className="mx-auto max-w-3xl animate-pulse rounded-2xl border border-(--border-subtle) bg-white p-8">
        <div className="h-6 w-48 rounded bg-slate-200" />
        <div className="mt-4 h-4 w-full rounded bg-slate-200" />
        <div className="mt-2 h-4 w-11/12 rounded bg-slate-200" />
      </div>
    </main>
  );
}
