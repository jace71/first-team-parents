// Shared links. `chapters` is the guide order from the approved preview.
// A chapter without a file in content/pages still has a link; `plannedPages`
// is the short “still being written” page until that file exists.

export const site = {
  name: "First Team Parents",
  footerDescription:
    "Practical, honest information for parents navigating travel and club sports.",
  footerMeta: "A practical guide, written for parents",
};

// title: chapter list. navLabel: homepage header and footer.
// chip: the short label on the phone chapter row.
export const chapters = [
  {
    slug: "start-here",
    href: "/start-here",
    title: "Start here",
    navLabel: "Start here",
    chip: "Start here",
  },
  {
    slug: "costs",
    href: "/costs",
    title: "Costs",
    navLabel: "Costs",
    chip: "Costs",
  },
  {
    slug: "choosing-a-program",
    href: "/choosing-a-program",
    title: "Choosing a program",
    navLabel: "Choosing a program",
    chip: "Choosing",
  },
  {
    slug: "tryouts",
    href: "/tryouts",
    title: "Tryouts",
    navLabel: "Tryouts",
    chip: "Tryouts",
  },
  {
    slug: "family-life-and-burnout",
    href: "/family-life-and-burnout",
    title: "Family life & burnout",
    navLabel: "Family life",
    chip: "Family",
  },
  {
    slug: "safety",
    href: "/safety",
    title: "Safety",
    navLabel: "Safety",
    chip: "Safety",
  },
  {
    slug: "glossary",
    href: "/glossary",
    title: "Glossary",
    navLabel: "Glossary",
    chip: "Glossary",
  },
  {
    slug: "about",
    href: "/about",
    title: "About",
    navLabel: "About",
    chip: "About",
  },
];

export const articlesNav = { href: "/articles", label: "Articles" };

// Full topic list on the homepage header and in the footer on every page.
export const homeNav = [
  ...chapters.map((chapter) => ({
    href: chapter.href,
    label: chapter.navLabel,
  })),
  articlesNav,
];

// Interior pages use the short header: The guide, Articles, About.
export const shortNav = [
  { href: "/start-here", label: "The guide", key: "guide" },
  { href: "/articles", label: "Articles", key: "articles" },
  { href: "/about", label: "About", key: "about" },
];

export function chapterIndex(slug) {
  return chapters.findIndex((chapter) => chapter.slug === slug);
}

export function chapterLabel(slug) {
  const index = chapterIndex(slug);
  if (index < 0) return null;
  return `Chapter ${index + 1} of ${chapters.length}`;
}

// Card sentences from the approved homepage. Shown on a chapter until its file exists.
export const plannedPages = [
  {
    slug: "choosing-a-program",
    title: "Choosing a program",
    description:
      "Red flags, questions to ask, and what good actually looks like.",
    summary:
      "Red flags, questions to ask, and what good actually looks like.",
  },
  {
    slug: "tryouts",
    title: "Tryouts",
    description:
      "What to expect, what matters, and how to prepare without the panic.",
    summary:
      "What to expect, what matters, and how to prepare without the panic.",
  },
  {
    slug: "family-life-and-burnout",
    title: "Family life & burnout",
    description: "The time commitment is real—and it affects everyone.",
    summary: "The time commitment is real—and it affects everyone.",
  },
  {
    slug: "safety",
    title: "Safety",
    description:
      "Practical things parents can watch for, ask about, and expect from a program.",
    summary:
      "Practical things parents can watch for, ask about, and expect from a program.",
  },
  {
    slug: "glossary",
    title: "Glossary",
    description: "Plain-language definitions for the terms you will hear.",
    summary: "Plain-language definitions for the terms you will hear.",
  },
  {
    slug: "about",
    title: "About",
    description:
      "Who writes this guide and what you can expect from the advice on the site.",
    summary:
      "Who writes this guide and what you can expect from the advice on the site.",
  },
];
