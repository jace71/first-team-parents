// Tags a content file can use without an import.
// Markdown covers paragraphs, headings, lists, links, and tables.
// These match the interior pieces in the approved preview:
// term cards, the comparison table, the checklist, and the sage callout.

import { Children, cloneElement, isValidElement } from "react";
import Link from "next/link";

export function MdxLink({ href = "", children }) {
  if (href.startsWith("/")) {
    return <Link href={href}>{children}</Link>;
  }
  if (href.startsWith("#")) {
    return <a href={href}>{children}</a>;
  }
  return <a href={href}>{children}</a>;
}

export function MdxH2({ children }) {
  return <h2>{children}</h2>;
}

// remark-gfm renders body cells as <td>. The preview's first column is a
// row header, which is also the column that sticks on a narrow screen.
export function MdxRow({ children }) {
  const cells = Children.toArray(children);
  const firstBodyCell = cells.findIndex(
    (child) => isValidElement(child) && child.type === "td",
  );

  return (
    <tr>
      {cells.map((child, index) => {
        if (index !== firstBodyCell || !isValidElement(child)) return child;
        return (
          <th scope="row" key={child.key ?? index}>
            {child.props.children}
          </th>
        );
      })}
    </tr>
  );
}

export function MdxColumnHeader({ children, node, scope, ...props }) {
  return (
    <th scope={scope || "col"} {...props}>
      {children}
    </th>
  );
}

export function MdxTable({ children, node, ...props }) {
  return (
    <>
      <p className="table-scroll-hint">Swipe sideways to see the full comparison.</p>
      <div
        className="table-wrap"
        role="region"
        tabIndex={0}
        aria-label="Comparison table"
      >
        <table {...props}>{children}</table>
      </div>
    </>
  );
}

export function Cards({ children }) {
  return <div className="term-grid">{children}</div>;
}

export function Card({ title, label, id, children }) {
  return (
    <article className="term-card" id={id}>
      <h3>{title}</h3>
      {label ? <span className="term-label">{label}</span> : null}
      {children}
    </article>
  );
}

export function Ask({ children }) {
  return <p className="ask">{children}</p>;
}

export function Compare({ children }) {
  return <section className="compare">{children}</section>;
}

export function Note({ children }) {
  return <p className="table-note">{children}</p>;
}

export function AddUp({ children }) {
  return <section>{children}</section>;
}

export function Checklist({ children }) {
  return Children.map(children, (child) => {
    if (isValidElement(child) && child.type === "ul") {
      return cloneElement(child, { className: "checklist" });
    }
    return child;
  });
}

// `kicker` is the small sage label on the callout. Pass null to omit it.
export function Next({
  title = "What to do next",
  kicker = "Before you commit",
  children,
}) {
  return (
    <aside className="next-box" aria-labelledby="next-heading">
      {kicker ? <p className="kicker kicker-sage">{kicker}</p> : null}
      <h2 id="next-heading">{title}</h2>
      {children}
    </aside>
  );
}

export function NextLinks({ children }) {
  return <ul className="next-links">{children}</ul>;
}

export function NextLink({ href, description, children }) {
  return (
    <li>
      <Link href={href}>
        {children} <span aria-hidden="true">→</span>
      </Link>
      {description ? <span className="desc">{description}</span> : null}
    </li>
  );
}

export const mdxComponents = {
  a: MdxLink,
  h2: MdxH2,
  table: MdxTable,
  tr: MdxRow,
  th: MdxColumnHeader,
  Cards,
  Card,
  Ask,
  Compare,
  Note,
  AddUp,
  Checklist,
  Next,
  NextLinks,
  NextLink,
};
