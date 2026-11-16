import GuideLayout from "@/components/GuideLayout";
import { Next, NextLink, NextLinks } from "@/components/mdx-components";
import { chapterLabel } from "@/lib/site";

// Shown for a chapter that does not have a content file yet.
// Adding content/pages/<slug>.mdx replaces this page on the next build.
export default function ComingSoon({ slug, title, summary }) {
  const kicker = chapterLabel(slug);

  return (
    <GuideLayout slug={slug}>
      <div className="prose-block">
        {kicker ? <p className="chapter-kicker">{kicker}</p> : null}
        <h1 className="page-title">{title}</h1>
        <p className="page-dek">This page is still being written.</p>
        {summary ? <p className="page-lede">{summary}</p> : null}
      </div>
      <Next kicker={null}>
        <p>The finished guides are here while this one is being written.</p>
        <NextLinks>
          <NextLink
            href="/start-here"
            description="Rec vs. travel vs. club vs. showcase."
          >
            Start here
          </NextLink>
          <NextLink href="/costs" description="The real price, including the extras.">
            Costs
          </NextLink>
        </NextLinks>
      </Next>
    </GuideLayout>
  );
}
