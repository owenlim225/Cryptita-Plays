import { faqs } from "../site-data";

export function FaqSection() {
  return (
    <section id="faq" className="px-6 py-20">
      <div className="mx-auto w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
        <div className="mt-8 space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="rounded-xl border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer list-none text-lg font-semibold text-slate-900">
                {faq.question}
              </summary>
              <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
