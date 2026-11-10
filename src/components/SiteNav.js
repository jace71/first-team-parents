"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/lib/site";

// `pathname` is omitted in the loading fallback, so the links still render
// before the current page is known. Once it is known, the matching link
// gets aria-current, which is also what turns it blue.
export function NavList({ label, className, pathname }) {
  return (
    <nav className={className} aria-label={label}>
      <ul className="nav-list">
        {mainNav.map((item) => {
          const current = pathname === item.href;
          return (
            <li key={item.href}>
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
  );
}

export default function SiteNav(props) {
  const pathname = usePathname();
  return <NavList {...props} pathname={pathname} />;
}
