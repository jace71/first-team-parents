import Link from "next/link";
import { familyLink, utilityNav } from "@/lib/site";

export const metadata = {
  title: {
    absolute: "First Team Parents — A practical guide to travel and club sports",
  },
  description:
    "A practical guide to travel and club sports, written for parents. Understand costs, choose a program, and prepare for tryouts.",
};

export default function Home() {
  return (
    <>
      <section className="topic-grid" aria-label="Guides for sports parents">
        <article className="topic-card">
          <h2>Start here</h2>
          <p>Rec vs. travel vs. club, in plain language.</p>
          <Link
            className="read-link"
            href="/start-here"
            aria-label="Read Start here"
          >
            Read <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </article>
        <article className="topic-card">
          <h2>Costs</h2>
          <p>The real price, including the extras teams don’t put on the flyer.</p>
          <Link className="read-link" href="/costs" aria-label="Read Costs">
            Read <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </article>
        <article className="topic-card">
          <h2>Choosing a program</h2>
          <p>Red flags, questions to ask, and what good actually looks like.</p>
          <Link
            className="read-link"
            href="/choosing-a-program"
            aria-label="Read Choosing a program"
          >
            Read <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </article>
        <article className="topic-card">
          <h2>Tryouts</h2>
          <p>What to expect, what matters, and how to prepare without the panic.</p>
          <Link className="read-link" href="/tryouts" aria-label="Read Tryouts">
            Read <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </article>
      </section>

      <section className="family-section" aria-labelledby="family-heading">
        <h1 id="family-heading">Is this right for your family?</h1>
        <ul>
          <li>The time commitment is real—and it affects everyone.</li>
          <li>The costs add up in ways that are easy to underestimate.</li>
          <li>The pressure can creep in, even when sports started as fun.</li>
        </ul>
        <Link className="family-link" href={familyLink.href}>
          {familyLink.label}
        </Link>
        <nav className="utility-nav" aria-label="Additional resources">
          {utilityNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </section>
    </>
  );
}
