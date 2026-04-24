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
  {
    question: "Are your programs and events free to attend?",
    answer:
      "Many community and learning sessions are offered at no cost to participants, especially when we run them with school or nonprofit partners. When there is a fee, we say so up front and aim to keep access fair.",
  },
  {
    question: "What kinds of programs do you run?",
    answer:
      "We run workshops, study circles, and youth-facing sessions on Web3 basics, digital literacy, and responsible participation—plus Mini-Library style hubs where people can keep learning after a single event.",
  },
  {
    question: "Can I volunteer or mentor?",
    answer:
      "Yes. We welcome people who can facilitate sessions, share their journey in Web3, or help with logistics and local coordination. Tell us your skills and availability and we can match you where it makes sense.",
  },
  {
    question: "Where can I follow updates and announcements?",
    answer:
      "Follow our official channels and partner announcements for new workshops, community calls, and program milestones. We also share highlights from partners when we run joint initiatives.",
  },
] as const;

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
        />
      </div>
    </section>
  );
}
