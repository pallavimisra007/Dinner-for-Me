"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/category/things-in-jars/", label: "Things in Jars" },
  { href: "/category/bowls-of-comfort/", label: "Bowls of Comfort" },
  { href: "/category/starters/", label: "Starters & Small Things" },
  { href: "/category/mains/", label: "The Main Event" },
  { href: "/category/sweet/", label: "Something Sweet" },
  { href: "/about/", label: "About" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <Link href="/" className="nav-logo">
        Dinner for Me
      </Link>

      <ul className="nav-links">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
      </ul>

      <button
        className="nav-hamburger"
        aria-label="Toggle menu"
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
          <rect y="0" width="22" height="2" fill="currentColor" />
          <rect y="7" width="22" height="2" fill="currentColor" />
          <rect y="14" width="22" height="2" fill="currentColor" />
        </svg>
      </button>

      {open && (
        <ul className="nav-mobile open">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
