"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { Recipe } from "@/data/recipes";

export default function Carousel({ recipes }: { recipes: Recipe[] }) {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % recipes.length);
  }, [recipes.length]);

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + recipes.length) % recipes.length);
  }, [recipes.length]);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="carousel-wrap">
      <p className="carousel-label">Latest Recipes</p>
      <div className="carousel">
        {recipes.map((recipe, i) => (
          <div
            key={recipe.slug}
            className={`carousel-slide${i === active ? " active" : ""}`}
          >
            <div className="carousel-img">
              <img src={recipe.heroImage} alt={recipe.title} />
            </div>
            <div>
              <div className="c-tag">
                <span className={`tag ${recipe.tagClass}`}>
                  {recipe.categoryLabel}
                </span>
              </div>
              <h2 className="c-title">{recipe.title}</h2>
              <p className="c-teaser">{recipe.teaser}</p>
              <Link href={`/recipes/${recipe.slug}/`} className="btn-read">
                Read the Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-nav">
        <button className="c-prev" onClick={prev} aria-label="Previous">
          ←
        </button>
        {recipes.map((_, i) => (
          <button
            key={i}
            className={`c-dot${i === active ? " active" : ""}`}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
        <button className="c-next" onClick={next} aria-label="Next">
          →
        </button>
      </div>
    </section>
  );
}
