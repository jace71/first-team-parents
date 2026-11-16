import { notFound } from "next/navigation";
import GuideLayout from "@/components/GuideLayout";
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
    <GuideLayout>
      <div className="prose-block">
        {article.placeholder ? (
          <p className="sample-note">
            Sample — this article is a placeholder, not a finished guide
          </p>
        ) : null}
        <h1 className="page-title">{article.title}</h1>
        {article.dek ? <p className="page-dek">{article.dek}</p> : null}
        <p className="page-meta">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
        </p>
      </div>
      <div className="guide-body">{await renderBody(article.body)}</div>
    </GuideLayout>
  );
}
