import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import SiteNav, { NavList } from "@/components/SiteNav";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link className="footer-logo" href="/" aria-label="First Team Parents home">
            <Image
              src="/logo-footer.png"
              alt="FTP"
              width={405}
              height={273}
              unoptimized
              style={{ height: "auto" }}
            />
          </Link>
          <div>
            <Link className="footer-name" href="/">
              {site.name}
            </Link>
            <p className="footer-description">{site.footerDescription}</p>
          </div>
        </div>
        <Suspense
          fallback={
            <NavList label="Footer navigation" className="footer-nav" />
          }
        >
          <SiteNav label="Footer navigation" className="footer-nav" />
        </Suspense>
      </div>
    </footer>
  );
}
