import Link from "next/link";

export const metadata = {
  title: {
    absolute: "First Team Parents — A practical guide to travel and club sports",
  },
  description:
    "A practical guide to travel and club sports, written for parents. Understand costs, choose a program, and prepare for tryouts.",
};

const topics = [
  {
    href: "/start-here",
    title: "Start here",
    text: "Rec vs. travel vs. club, in plain language.",
  },
  {
    href: "/costs",
    title: "Costs",
    text: "The real price, including the extras teams don’t put on the flyer.",
  },
  {
    href: "/choosing-a-program",
    title: "Choosing a program",
    text: "Red flags, questions to ask, and what good actually looks like.",
  },
  {
    href: "/tryouts",
    title: "Tryouts",
    text: "What to expect, what matters, and how to prepare without the panic.",
  },
  {
    href: "/family-life-and-burnout",
    title: "Family life & burnout",
    text: "The time commitment is real—and it affects everyone.",
  },
  {
    href: "/safety",
    title: "Safety",
    text: "Practical things parents can watch for, ask about, and expect from a program.",
  },
  {
    href: "/glossary",
    title: "Glossary",
    text: "Plain-language definitions for the terms you will hear.",
  },
  {
    href: "/about",
    title: "About",
    text: "Who writes this guide and what you can expect from the advice on the site.",
  },
];

export default function Home() {
  return (
    <main id="main">
      <section className="hero">
        <h1>A practical guide to travel and club sports, written for parents.</h1>
        <p className="hero-dek">
          Practical, honest information for parents navigating travel and club
          sports — costs, tryouts, choosing a program, and family life, without
          the sales pitch.
        </p>
        <div className="btn-row">
          <Link className="btn btn-primary" href="/start-here">
            Start here
          </Link>
          <a className="btn btn-secondary" href="#topics">
            Browse topics
          </a>
        </div>
      </section>

      <section className="section" id="topics" aria-labelledby="topics-heading">
        <div className="section-head">
          <h2 id="topics-heading">Guide topics</h2>
        </div>
        <div className="topic-grid">
          {topics.map((topic) => (
            <article className="card" key={topic.href}>
              <h2>{topic.title}</h2>
              <p>{topic.text}</p>
              <Link className="card-link" href={topic.href}>
                Read the guide <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="family-band" aria-labelledby="family-heading">
        <div className="family-inner">
          <p className="kicker kicker-sage">Family life</p>
          <h2 id="family-heading">Is this right for your family?</h2>
          <ul className="checklist">
            <li>The time commitment is real—and it affects everyone.</li>
            <li>The costs add up in ways that are easy to underestimate.</li>
            <li>The pressure can creep in, even when sports started as fun.</li>
          </ul>
          <Link className="family-link" href="/family-life-and-burnout">
            Read more about family life and burnout <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
