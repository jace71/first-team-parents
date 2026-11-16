import { notFound } from "next/navigation";
import ComingSoon from "@/components/ComingSoon";
import GuideLayout from "@/components/GuideLayout";
import { getPage, listPages, renderBody } from "@/lib/content";
import { chapterLabel, plannedPages } from "@/lib/site";

// One route for every file in content/pages, plus a coming-soon page for
// each chapter that does not have a file yet.
export function generateStaticParams() {
  const fromFiles = listPages().map((page) => ({ slug: page.slug }));
  const written = new Set(fromFiles.map((page) => page.slug));
  const fromPlanned = plannedPages
    .filter((page) => !written.has(page.slug))
    .map((page) => ({ slug: page.slug }));

  return [...fromFiles, ...fromPlanned];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getPage(slug);
  if (page) {
    return {
      title: page.metaTitle,
      description: page.description,
    };
  }

  const planned = plannedPages.find((item) => item.slug === slug);
  if (planned) {
    return {
      title: planned.title,
      description: planned.description,
    };
  }

  return { title: "Page not found" };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const page = getPage(slug);
  const kicker = chapterLabel(slug);

  if (page) {
    return (
      <GuideLayout slug={slug}>
        <div className="prose-block">
          {kicker ? <p className="chapter-kicker">{kicker}</p> : null}
          <h1 className="page-title">{page.title}</h1>
          {page.dek ? <p className="page-dek">{page.dek}</p> : null}
          {page.lede ? <p className="page-lede">{page.lede}</p> : null}
        </div>
        <div className="guide-body">{await renderBody(page.body)}</div>
      </GuideLayout>
    );
  }

  const planned = plannedPages.find((item) => item.slug === slug);
  if (!planned) notFound();

  return <ComingSoon slug={slug} title={planned.title} summary={planned.summary} />;
}
