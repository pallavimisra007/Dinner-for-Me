"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import recipes from "@/data/recipes";

const fuse = new Fuse(recipes, {
  keys: [
    { name: "title", weight: 3 },
    { name: "categoryLabel", weight: 2 },
    { name: "teaser", weight: 2 },
    { name: "ingredients", weight: 1.5 },
    { name: "story", weight: 1 },
  ],
  threshold: 0.35,
  includeScore: true,
  minMatchCharLength: 2,
});

export default function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results =
    query.trim().length >= 2
      ? fuse.search(query).slice(0, 8).map((r) => r.item)
      : [];

  useEffect(() => {
    inputRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-box">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className="search-icon"
          >
            <circle cx="8.5" cy="8.5" r="6" stroke="currentColor" strokeWidth="1.6" />
            <path d="M14 14l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search recipes, ingredients, categories…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
            aria-label="Search recipes"
          />
          <button onClick={onClose} className="search-close" aria-label="Close search">
            ✕
          </button>
        </div>

        {results.length > 0 && (
          <ul className="search-results">
            {results.map((recipe) => (
              <li key={recipe.slug}>
                <Link
                  href={`/recipes/${recipe.slug}/`}
                  onClick={onClose}
                  className="search-result"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={recipe.heroImage} alt={recipe.title} />
                  <div className="sr-text">
                    <span className={`tag ${recipe.tagClass}`}>
                      {recipe.categoryLabel}
                    </span>
                    <p className="sr-title">{recipe.title}</p>
                    <p className="sr-teaser">{recipe.teaser}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {query.trim().length >= 2 && results.length === 0 && (
          <p className="search-empty">No recipes found for &ldquo;{query}&rdquo;</p>
        )}

        {query.trim().length < 2 && (
          <p className="search-hint">
            Try searching for an ingredient, dish, or category
          </p>
        )}
      </div>
    </div>
  );
}
