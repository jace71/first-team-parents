import Link from "next/link";
import { chapterIndex, chapters } from "@/lib/site";

// The interior frame: numbered chapter list, phone chips, and prev/next.
// `slug` is the current chapter. Articles and other pages pass no slug.
export default function GuideLayout({ slug, children }) {
  const index = chapterIndex(slug);
  const previous = index > 0 ? chapters[index - 1] : null;
  const next = index >= 0 && index < chapters.length - 1 ? chapters[index + 1] : null;

  return (
    <div className="guide-shell">
      <aside className="guide-sidebar" aria-label="Guide chapters">
        <p className="kicker">The guide</p>
        <ol className="chapter-nav">
          {chapters.map((chapter, chapterNumber) => (
            <li key={chapter.slug}>
              <Link
                href={chapter.href}
                aria-current={chapter.slug === slug ? "page" : undefined}
              >
                <span className="num">{chapterNumber + 1}</span>
                {chapter.title}
              </Link>
            </li>
          ))}
        </ol>
      </aside>
      <div>
        <nav className="mobile-path" aria-label="Guide chapters">
          <p className="kicker">The guide</p>
          <div className="chip-row">
            {chapters.map((chapter, chapterNumber) => (
              <Link
                key={chapter.slug}
                className="chip"
                href={chapter.href}
                aria-current={chapter.slug === slug ? "page" : undefined}
              >
                {chapterNumber + 1} {chapter.chip}
              </Link>
            ))}
          </div>
        </nav>
        <main id="main" className="guide-main">
          {children}
          {index >= 0 ? (
            <nav className="chapter-pager" aria-label="Chapter">
              <div>
                <div className="dir">Previous</div>
                {previous ? (
                  <Link className="name" href={previous.href}>
                    {previous.title}
                  </Link>
                ) : (
                  <span className="name is-disabled">—</span>
                )}
              </div>
              <div className="next">
                <div className="dir">Next chapter</div>
                {next ? (
                  <Link className="name" href={next.href}>
                    {next.title}
                  </Link>
                ) : (
                  <span className="name is-disabled">—</span>
                )}
              </div>
            </nav>
          ) : null}
        </main>
      </div>
    </div>
  );
}
