import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="constraint-content py-16">
      <div className="mx-auto max-w-3xl rounded-2xl border border-(--border-subtle) bg-white p-8">
        <h1 className="text-3xl font-bold text-foreground">Page not found</h1>
        <p className="mt-3 text-(--text-muted)">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link href="/" className="mt-6 inline-block text-sm font-semibold text-(--primary) hover:underline">
          Go back home
        </Link>
      </div>
    </main>
  );
}
