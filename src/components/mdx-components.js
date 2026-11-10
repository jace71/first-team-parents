// Tags an author can use inside a content file, without importing anything.
// Markdown already covers paragraphs, headings, lists, links, and tables.
// These components are only for the pieces the preview styles specially:
// the blue-edged cards, the checkbox list, and the "What to do next" box.
//
// See README.md for a short example of each.

import { Children, isValidElement } from "react";
import Link from "next/link";

export function MdxLink({ href = "", children }) {
  if (href.startsWith("/")) {
    return <Link href={href}>{children}</Link>;
  }
  return <a href={href}>{children}</a>;
}

export function MdxH2({ children }) {
  return <h2 className="section-heading">{children}</h2>;
}

// remark-gfm renders every body cell as <td>. The preview's first column
// is a row header (bolder, and announced as a header). Swap that first
// cell. Header-row cells are already <th> and stay column headers.
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
    <div
      className="table-wrap"
      role="region"
      tabIndex={0}
      aria-label="Comparison table"
    >
      <table {...props}>{children}</table>
    </div>
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

// The darker line at the bottom of a card ("Ask what's included…").
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
  return <section className="addup">{children}</section>;
}

export function Checklist({ children }) {
  return <div className="checklist-wrap">{children}</div>;
}

export function Next({ title = "What to do next", children }) {
  return (
    <aside className="next-box" aria-labelledby="next-heading">
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
        {children}{" "}
        <span className="arrow" aria-hidden="true">
          →
        </span>
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
