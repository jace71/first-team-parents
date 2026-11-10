import { notFound } from "next/navigation";
import ComingSoon from "@/components/ComingSoon";
import { getPage, listPages, renderBody } from "@/lib/content";
import { plannedPages } from "@/lib/site";

// Build a page for every content file, plus a coming-soon page for each
// nav link that does not have a file yet. A new .md or .mdx file whose name
// matches one of those links replaces the coming-soon page automatically.
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

  if (page) {
    return (
      <article>
        <header className="page-intro">
          <h1>{page.title}</h1>
          {page.dek ? <p className="dek">{page.dek}</p> : null}
          {page.lede ? <p className="lede">{page.lede}</p> : null}
        </header>
        <div className="guide">{await renderBody(page.body)}</div>
      </article>
    );
  }

  const planned = plannedPages.find((item) => item.slug === slug);
  if (!planned) notFound();

  return <ComingSoon title={planned.title} summary={planned.summary} />;
}
