# First Team Parents

A phone-friendly guide for parents about travel ball and club sports. The pages live in Markdown files, so a new guide is a new file rather than a new database entry.

## Run it locally (Windows PowerShell)

Open PowerShell, go to this project folder, then:

```powershell
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The page refreshes when you save a file. Stop the server with Ctrl+C.

To check the production build the same way the host will:

```powershell
npm run build
```

## How the pieces fit

- `src/app` — the routes. `/` is the homepage. Everything else in the header is drawn from a file in `content/`.
- `src/components` — the header, footer, and the small set of tags used inside Markdown (cards, checklists, the “what to do next” box).
- `src/lib/content.js` — reads `content/` and turns a file into a page. This is the part that makes a new file into a new URL.
- `src/lib/site.js` — the header links, and the coming-soon pages for links that do not have a file yet.
- `content/pages` — the guides (Start here, Costs, More).
- `content/articles` — longer pieces, listed at `/articles`.
- `public` — the pennant logos. `src/fonts` — Inter.

## Add a guide page

1. Create a file in `content/pages`. The filename is the address: `content/pages/choosing-a-program.mdx` becomes `/choosing-a-program`. Use lowercase letters, numbers, and hyphens. `.md` and `.mdx` both work.
2. Start the file with frontmatter (the `---` block). `title` and `description` are required. `description` is the summary search engines and link previews use.

```md
---
title: "Choosing a program"
description: "Red flags, questions to ask, and what good actually looks like."
dek: "Red flags, questions to ask, and what good actually looks like."
lede: "The intro paragraph under the title. One or two sentences is enough."
---

## A section heading

Ordinary paragraphs, **bold**, and links to [Costs](/costs) are enough for most of a page.

- A plain list looks like this.
```

3. Save, and refresh the browser. If the new address does not show up, stop the dev server and run `npm run dev` again.

`dek` is the line directly under the title. `lede` is the longer intro under that. `metaTitle` is optional; use it when the browser-tab title should be longer than the on-page title (Costs does this).

If the filename matches a link that currently says “still being written” (for example `choosing-a-program`), the real page replaces that note. You do not have to delete anything from `src/lib/site.js` for that to happen.

To put a brand-new page in the header, add one line to `mainNav` in `src/lib/site.js`:

```js
{ href: "/your-page", label: "Your page" },
```

### When a page needs the designed blocks

You do not import these. Write the tag in the file.

```md
## Where the money goes

<Cards>

<Card title="Team fees" label="The flyer number">

The paragraph inside the card.

<Ask>The darker line at the bottom of a card.</Ask>

</Card>

</Cards>

## Side by side

<Compare>

| Cost | What it usually covers |
| --- | --- |
| Team fees | Dues and a basic uniform |

<Note>The small line under a table.</Note>

</Compare>

<AddUp>

## How to add it up

<Checklist>

- First question to ask.
- Second question to ask.

</Checklist>

</AddUp>

<Next>

A short lead-in to the links below.

<NextLinks>

<NextLink href="/costs" description="What the flyer leaves out.">Costs</NextLink>

</NextLinks>

</Next>
```

Leave a blank line between a tag and the Markdown inside it. That blank line is what lets the paragraphs and lists stay Markdown.

Start here (`content/pages/start-here.mdx`) and Costs (`content/pages/costs.mdx`) are the working examples. Copy from those.

## Add an article

1. Create `content/articles/your-question.mdx`. The address will be `/articles/your-question`.
2. Frontmatter needs `title`, `description`, and `date` as `YYYY-MM-DD`. `dek` is optional. Set `placeholder: true` only for a sample that should wear the Sample label.
3. Write the article under the frontmatter, the same way as a guide. It is listed on `/articles`, newest date first.

```md
---
title: "One question, answered plainly"
description: "The sentence that shows on the articles list."
dek: "The line under the title."
date: "2026-11-10"
---

The article starts here.
```

`content/articles/sample-article.mdx` is a labeled placeholder. Delete it once a real article is in the folder. The articles section needs at least one file in order to build.

Internal links start with `/`, for example `/costs`. Do not use the old `.html` names.
