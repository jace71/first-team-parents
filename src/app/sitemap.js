import { listArticles, listPages } from "@/lib/content";
import { siteUrl, unlistedSlugs } from "@/lib/seo";
import { chapters } from "@/lib/site";

// Home, each chapter that has a file, any other real content page, the
// articles index, and each article. A chapter with no file still renders
// the “still being written” page and is left out. /more is left out too.
export default function sitemap() {
  const pages = listPages();
  const written = new Set(pages.map((page) => page.slug));
  const chapterSlugs = new Set(chapters.map((chapter) => chapter.slug));

  const chapterEntries = chapters
    .filter((chapter) => written.has(chapter.slug))
    .map((chapter) =>
      entry(chapter.href, { changeFrequency: "monthly", priority: 0.8 }),
    );

  const otherEntries = pages
    .filter(
      (page) => !chapterSlugs.has(page.slug) && !unlistedSlugs.has(page.slug),
    )
    .map((page) =>
      entry(`/${page.slug}`, { changeFrequency: "monthly", priority: 0.5 }),
    );

  const articles = listArticles();

  return [
    entry("/", { changeFrequency: "weekly", priority: 1 }),
    ...chapterEntries,
    ...otherEntries,
    entry("/articles", { changeFrequency: "weekly", priority: 0.7 }),
    ...articles.map((article) =>
      entry(`/articles/${article.slug}`, {
        lastModified: article.date,
        changeFrequency: "monthly",
        priority: 0.6,
      }),
    ),
  ];
}

function entry(path, extra) {
  return {
    url: path === "/" ? siteUrl : `${siteUrl}${path}`,
    ...extra,
  };
}
