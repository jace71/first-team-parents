"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { homeNav, site } from "@/lib/site";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
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
        <div>
          <nav className="footer-nav" aria-label="Footer">
            <ul>
              {homeNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="footer-meta">{site.footerMeta}</p>
        </div>
      </div>
    </footer>
  );
}
