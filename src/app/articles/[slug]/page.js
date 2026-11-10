import { notFound } from "next/navigation";
import { formatDate, getArticle, listArticles, renderBody } from "@/lib/content";

export function generateStaticParams() {
  const articles = listArticles();
  if (articles.length === 0) {
    throw new Error(
      "Add at least one file in content/articles. The articles route needs one page to build. content/articles/sample-article.mdx is the example.",
    );
  }
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Page not found" };
  return {
    title: article.metaTitle,
    description: article.description,
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <article>
      <header className="page-intro">
        {article.placeholder ? (
          <p className="sample-banner">
            Sample — this article is a placeholder, not a finished guide
          </p>
        ) : null}
        <h1>{article.title}</h1>
        {article.dek ? <p className="dek">{article.dek}</p> : null}
        <p className="article-date">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
        </p>
      </header>
      <div className="guide">{await renderBody(article.body)}</div>
    </article>
  );
}
