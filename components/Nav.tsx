"use client";

import Link from "next/link";
import { useState } from "react";
import SearchModal from "./SearchModal";

const links = [
  { href: "/category/things-in-jars/", label: "Things in Jars" },
  { href: "/category/bowls-of-comfort/", label: "Bowls of Comfort" },
  { href: "/category/starters/", label: "Starters & Small Things" },
  { href: "/category/mains/", label: "The Main Event" },
  { href: "/category/sweet/", label: "Something Sweet" },
  { href: "/about/", label: "About" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
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

        <div className="nav-actions">
          <button
            className="nav-search-btn"
            aria-label="Search recipes"
            onClick={() => setSearchOpen(true)}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="8.5" cy="8.5" r="6" stroke="currentColor" strokeWidth="1.6" />
              <path d="M14 14l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          <button
            className="nav-hamburger"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
              <rect y="0" width="22" height="2" fill="currentColor" />
              <rect y="7" width="22" height="2" fill="currentColor" />
              <rect y="14" width="22" height="2" fill="currentColor" />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <ul className="nav-mobile open">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setMenuOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}
