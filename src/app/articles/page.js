import Link from "next/link";
import GuideLayout from "@/components/GuideLayout";
import { formatDate, listArticles } from "@/lib/content";

export const metadata = {
  title: "Articles",
  description:
    "Longer reads for parents navigating travel and club sports. New articles are added as files.",
};

export default function ArticlesPage() {
  const articles = listArticles();

  return (
    <GuideLayout>
      <div className="prose-block">
        <h1 className="page-title">Articles</h1>
        <p className="page-dek">Longer reads, added one file at a time.</p>
        <p className="page-lede">
          The main guides stay short. An article is for one question that needs
          more room. A piece marked Sample is a placeholder, not a finished
          guide.
        </p>
      </div>
      {articles.length === 0 ? (
        <p className="page-lede">No articles yet.</p>
      ) : (
        <div className="card-stack">
          {articles.map((article) => (
            <article className="card" key={article.slug}>
              <p className="page-meta">
                <time dateTime={article.date}>{formatDate(article.date)}</time>
                {article.placeholder ? " · Sample" : null}
              </p>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <Link className="card-link" href={`/articles/${article.slug}`}>
                Read <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      )}
    </GuideLayout>
  );
}
