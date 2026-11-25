"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// The root layout stays mounted, so the gtag config in the layout records
// only the first page. A later client navigation does not send another hit
// on its own: gtag('config') updates the tag without a page_view, and this
// version of Next.js changes the address in a way the tag's history listener
// does not report. Send the page_view event for each later address.
//
// Kept on the module, not a ref, so a development double render does not
// record the first page twice.
let trackedPath = "";
let trackedLocation = "";

export default function GoogleAnalyticsPageView() {
  const pathname = usePathname();

  useEffect(() => {
    const pageLocation = window.location.href;
    if (trackedPath === pathname) return;

    const isFirst = trackedPath === "";
    const pageReferrer = trackedLocation;
    trackedPath = pathname;
    trackedLocation = pageLocation;
    if (isFirst) return;

    let cancelled = false;
    let attempts = 0;

    function send() {
      if (cancelled) return;
      if (typeof window.gtag !== "function") {
        if (attempts < 20) {
          attempts += 1;
          window.setTimeout(send, 100);
        }
        return;
      }
      window.gtag("event", "page_view", {
        page_path: pathname,
        page_location: pageLocation,
        page_title: document.title,
        page_referrer: pageReferrer,
      });
    }

    send();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
