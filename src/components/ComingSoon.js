import { Next, NextLink, NextLinks } from "@/components/mdx-components";

// Shown for a nav link that does not have a content file yet.
// Adding content/pages/<slug>.mdx replaces this page on the next build.
export default function ComingSoon({ title, summary }) {
  return (
    <article>
      <header className="page-intro">
        <h1>{title}</h1>
        <p className="dek">This page is still being written.</p>
        {summary ? <p className="lede">{summary}</p> : null}
      </header>
      <Next>
        <p>The finished guides are here while this one is being written.</p>
        <NextLinks>
          <NextLink
            href="/start-here"
            description="Rec vs. travel vs. club vs. showcase."
          >
            Start here
          </NextLink>
          <NextLink
            href="/costs"
            description="The real price, including the extras."
          >
            Costs
          </NextLink>
        </NextLinks>
      </Next>
    </article>
  );
}
