// Shared links and the short bits of site copy that appear in more than one place.
// The header and footer read `mainNav`. A page that is not written yet still
// has a link here; `plannedPages` is what that link opens until a Markdown
// file with the same name exists in content/pages.

export const site = {
  name: "First Team Parents",
  motto: "A practical guide to travel and club sports, written for parents",
  footerDescription:
    "Practical, honest information for parents navigating travel and club sports.",
};

export const mainNav = [
  { href: "/start-here", label: "Start here" },
  { href: "/costs", label: "Costs" },
  { href: "/choosing-a-program", label: "Choosing a program" },
  { href: "/tryouts", label: "Tryouts" },
  { href: "/more", label: "More" },
];

export const utilityNav = [
  { href: "/safety", label: "Safety" },
  { href: "/glossary", label: "Glossary" },
  { href: "/about", label: "About" },
];

export const familyLink = {
  href: "/family-life-and-burnout",
  label: "Read more about family life and burnout.",
};

// Summaries here are the same sentences already used on the homepage cards
// and in the Costs "what to do next" links. They are not new claims.
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
    title: "Family life and burnout",
    description: "What the schedule costs beyond money.",
    summary: "What the schedule costs beyond money.",
  },
  {
    slug: "safety",
    title: "Safety",
    description: "This page is still being written.",
  },
  {
    slug: "glossary",
    title: "Glossary",
    description: "This page is still being written.",
  },
  {
    slug: "about",
    title: "About",
    description: "This page is still being written.",
  },
];
