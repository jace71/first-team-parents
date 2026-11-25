// Canonical host, shared titles, and the metadata each page fills in.
//
// www.firstteamparents.com currently serves the same pages as this host.
// The redirect belongs in the Amplify console, not in this file. Every
// canonical URL points here so the two hosts are not treated as two sites.

import { site } from "@/lib/site";

export const siteUrl = "https://firstteamparents.com";

export const defaultTitle =
  "First Team Parents — A practical guide to travel and club sports";

export const defaultDescription =
  "A practical guide to travel and club sports, written for parents. Understand costs, choose a program, and prepare for tryouts.";

// Same suffix as title.template in the root layout.
export const titleSuffix = " — First Team Parents";

// /more is an old index of chapters that now appear in the header, the
// footer, and the homepage. Nothing links to it, and the page still says
// some of those chapters are not written. The address keeps working, and
// search engines are asked not to index it.
export const unlistedSlugs = new Set(["more"]);

const shareImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "First Team Parents pennant. A practical guide to travel and club sports, written for parents.",
};

// `path` is a site path such as "/" or "/costs". metadataBase turns it
// into an absolute URL on the canonical host.
export function pageMetadata({
  title,
  description,
  path,
  index = true,
  absoluteTitle = false,
  type = "website",
  publishedTime,
}) {
  const socialTitle = absoluteTitle ? title : `${title}${titleSuffix}`;
  const openGraph = {
    title: socialTitle,
    description,
    url: path,
    siteName: site.name,
    locale: "en_US",
    type,
    images: [shareImage],
  };

  if (publishedTime) {
    openGraph.publishedTime = publishedTime;
  }

  const metadata = {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [shareImage],
    },
  };

  if (!index) {
    metadata.robots = {
      index: false,
      follow: true,
    };
  }

  return metadata;
}
