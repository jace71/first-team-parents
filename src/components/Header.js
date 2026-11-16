"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { chapters, homeNav, shortNav } from "@/lib/site";

function isCurrent(item, pathname, isHome) {
  if (isHome) return false;
  if (item.key === "articles") {
    return pathname === "/articles" || pathname.startsWith("/articles/");
  }
  if (item.key === "about") return pathname === "/about";
  if (item.key === "guide") {
    return (
      chapters.some((chapter) => chapter.href === pathname) &&
      pathname !== "/about"
    );
  }
  return pathname === item.href;
}

export default function Header() {
  const pathname = usePathname();
  // Remount when the address changes so the phone menu starts closed.
  return <HeaderBar key={pathname} pathname={pathname} />;
}

function HeaderBar({ pathname }) {
  const isHome = pathname === "/";
  const items = isHome ? homeNav : shortNav;
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="First Team Parents home">
          <Image
            src="/logo-header.png"
            alt="First Team Parents"
            width={809}
            height={546}
            unoptimized
            preload
            style={{ height: "auto" }}
          />
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-controls="site-nav"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="visually-hidden">Menu</span>
          <span className="menu-toggle-bar" aria-hidden="true" />
          <span className="menu-toggle-bar" aria-hidden="true" />
          <span className="menu-toggle-bar" aria-hidden="true" />
        </button>
        <nav
          id="site-nav"
          className={open ? "site-nav is-open" : "site-nav"}
          aria-label="Main"
        >
          <ul>
            {items.map((item) => {
              const current = isCurrent(item, pathname, isHome);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
