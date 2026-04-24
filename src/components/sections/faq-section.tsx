import { FaqSections } from "@/components/ui/faq-sections";

const FAQ_ITEMS = [
  {
    question: "What is Cryptita Plays?",
    answer:
      "Cryptita Plays is a community-driven social impact initiative in the Philippines that connects Web3 education with real support for youth and underserved communities through programs, partnerships, and learning resources.",
  },
  {
    question: "Do I need Web3 or crypto experience to join?",
    answer:
      "No. Programs are designed to be beginner-friendly, with clear explanations and mentors who meet learners where they are—curiosity and willingness to learn matter most.",
  },
  {
    question: "How can schools or communities work with you?",
    answer:
      "We collaborate through educational partners, local organizers, and community groups to run workshops, share materials, and grow Mini-Library style learning hubs. Reach out and we can explore what fits your context.",
  },
  {
    question: "How is long-term support sustained?",
    answer:
      "We focus on repeat engagement—Mini-Library communities, materials that stay useful, and partnerships (including the ACIS coverage model) that help more students get sustained access over time rather than one-off events.",
  },
] as const;

/** Stock photo: workspace / design — `photo-1555212697-194d092e3b8f` on Unsplash. */
const FAQ_IMAGE =
  "https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=830&h=844&auto=format&fit=crop";

export function FaqSection() {
  return (
    <section id="faq" className="py-20" aria-labelledby="faq-heading">
      <div className="constraint-content relative z-10">
        <FaqSections
          variant="split"
          eyebrow="FAQs"
          headingId="faq-heading"
          title="Looking for answers?"
          description="Quick answers about who we are, how to get involved, and how our education and community programs work."
          items={[...FAQ_ITEMS]}
          imageSrc={FAQ_IMAGE}
          imageAlt="Person reviewing notes and laptop at a desk"
        />
      </div>
    </section>
  );
}
