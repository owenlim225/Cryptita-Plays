import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="constraint-content py-16">
      <article className="mx-auto max-w-3xl space-y-6 rounded-2xl border border-(--border-subtle) bg-white p-8">
        <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
        <p className="text-(--text-muted)">
          Cryptita Plays values your privacy. This page can be expanded with your complete privacy policy
          details, including data collection, usage, retention, and contact procedures.
        </p>
        <p className="text-(--text-muted)">
          For questions, contact{" "}
          <a className="text-(--primary) underline" href="mailto:cryptitaplays@gmail.com">
            cryptitaplays@gmail.com
          </a>
          .
        </p>
        <Link href="/" className="inline-block text-sm font-semibold text-(--primary) hover:underline">
          Back to home
        </Link>
      </article>
    </main>
  );
}
