import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import SiteNav, { NavList } from "@/components/SiteNav";

export default function Header() {
  return (
    <header className="site-header">
      {/* Full-width blue line. The pennant sits on top of it (see .brand). */}
      <div className="header-rule" aria-hidden="true" />
      <div className="container">
        <div className="header-bar">
          <Link className="brand" href="/" aria-label="First Team Parents home">
            {/* unoptimized serves the PNG from public/ unchanged. */}
            <Image
              src="/logo-header.png"
              alt="First Team Parents"
              width={809}
              height={546}
              preload
              unoptimized
              style={{ height: "auto" }}
            />
          </Link>
          <Suspense
            fallback={<NavList label="Main navigation" className="header-nav" />}
          >
            <SiteNav label="Main navigation" className="header-nav" />
          </Suspense>
        </div>
        <p className="motto">{site.motto}</p>
      </div>
    </header>
  );
}
