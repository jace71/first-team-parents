// Turns files in /content into page data.
//
// A guide page is a file in content/pages. An article is a file in
// content/articles. The App Router pages call `listPages` / `listArticles`
// from `generateStaticParams`, so adding a .md or .mdx file creates a URL
// the next time the site builds. No database and no CMS.
//
// Frontmatter (the block between --- lines at the top of a file) holds the
// title and description. The rest of the file is Markdown, plus a few tags
// such as <Card> when a page needs the designed cards or tables. Those tags
// are provided in src/components/mdx-components.js — authors do not import them.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { CORE_SCHEMA, load as loadYaml } from "js-yaml";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import * as devRuntime from "react/jsx-dev-runtime";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx-components";

const CONTENT_ROOT = path.join(process.cwd(), "content");

// The filename becomes the URL, so it has to be a plain slug.
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// The default YAML parser turns an unquoted 2026-11-01 into a Date, and the
// calendar day can shift on servers that are not in UTC. CORE_SCHEMA keeps
// that value as text. Booleans like `placeholder: true` still parse.
const frontmatterOptions = {
  engines: {
    yaml: {
      parse: (input) => loadYaml(input, { schema: CORE_SCHEMA }) ?? {},
    },
  },
};

function assertSlug(slug, filePath) {
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(
      `${filePath} must use a lowercase filename of letters, numbers, and hyphens. "${slug}" cannot be a page address.`,
    );
  }
}

function requiredText(value, filePath, field) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${filePath} is missing ${field} in its frontmatter.`);
  }
  return value.trim();
}

function readDocument(filePath, folder) {
  const filename = path.basename(filePath);
  const slug = filename.replace(/\.mdx?$/, "");
  assertSlug(slug, filePath);

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw, frontmatterOptions);

  const title = requiredText(data.title, filePath, "a title");
  const description = requiredText(data.description, filePath, "a description");

  let date = "";
  if (data.date != null && String(data.date).trim() !== "") {
    date = String(data.date).trim();
  }
  if (folder === "articles" && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(
      `${filePath} needs a date in its frontmatter, written as YYYY-MM-DD.`,
    );
  }

  const metaTitle =
    typeof data.metaTitle === "string" && data.metaTitle.trim()
      ? data.metaTitle.trim()
      : title;

  return {
    slug,
    title,
    description,
    metaTitle,
    dek: typeof data.dek === "string" ? data.dek.trim() : "",
    lede: typeof data.lede === "string" ? data.lede.trim() : "",
    date,
    placeholder: data.placeholder === true,
    // The Markdown body, compiled later by renderBody.
    body: content,
  };
}

function listFolder(folder) {
  const dir = path.join(CONTENT_ROOT, folder);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md") || name.endsWith(".mdx"))
    .map((name) => readDocument(path.join(dir, name), folder));
}

export function listPages() {
  return listFolder("pages");
}

export function listArticles() {
  return listFolder("articles").sort((a, b) => {
    if (a.date === b.date) return a.title.localeCompare(b.title);
    return a.date < b.date ? 1 : -1;
  });
}

export function getPage(slug) {
  return listPages().find((page) => page.slug === slug) ?? null;
}

export function getArticle(slug) {
  return listArticles().find((article) => article.slug === slug) ?? null;
}

// Pinned to UTC so the label does not change with the machine's time zone.
export function formatDate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

// Compiles one file's body into React. Markdown tables, lists, and links
// work, and the tags in mdxComponents (Card, Checklist, Next, and so on)
// are available with no import line in the file.
export async function renderBody(source) {
  const development = process.env.NODE_ENV === "development";
  const { default: Content } = await evaluate(source, {
    ...(development ? devRuntime : runtime),
    remarkPlugins: [remarkGfm],
    development,
  });

  return <Content components={mdxComponents} />;
}
