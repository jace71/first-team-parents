import Link from "next/link";
import { formatDate, listArticles } from "@/lib/content";

export const metadata = {
  title: "Articles",
  description:
    "Longer reads for parents navigating travel and club sports. New articles are added as files.",
};

export default function ArticlesPage() {
  const articles = listArticles();

  return (
    <>
      <header className="page-intro">
        <h1>Articles</h1>
        <p className="dek">Longer reads, added one file at a time.</p>
        <p className="lede">
          The main guides stay short. An article is for one question that needs
          more room. A piece marked Sample is a placeholder, not a finished
          guide.
        </p>
      </header>

      {articles.length === 0 ? (
        <p className="lede">No articles yet.</p>
      ) : (
        <ul className="article-list">
          {articles.map((article) => (
            <li key={article.slug}>
              <article className="topic-card">
                <p className="article-meta">
                  <time dateTime={article.date}>{formatDate(article.date)}</time>
                  {article.placeholder ? (
                    <span className="term-label">Sample</span>
                  ) : null}
                </p>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <Link
                  className="read-link"
                  href={`/articles/${article.slug}`}
                  aria-label={`Read ${article.title}`}
                >
                  Read <span className="arrow" aria-hidden="true">→</span>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
