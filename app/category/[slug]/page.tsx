import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRecipesByCategory, CATEGORIES } from "@/data/recipes";
import type { Category } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";
import AdZone from "@/components/AdZone";

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return {};
  return { title: cat.label };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = slug as Category;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const categoryRecipes = getRecipesByCategory(category);
  const label = cat.label;

  return (
    <main>
      <AdZone type="leaderboard" />

      <div
        style={{
          padding: "64px 56px 48px",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--sans)",
            fontSize: "9px",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "var(--ink-muted)",
            marginBottom: "16px",
          }}
        >
          Category
        </p>
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(42px, 7vw, 72px)",
            fontWeight: 800,
            lineHeight: 1,
            color: "var(--ink)",
          }}
        >
          {label}
        </h1>
      </div>

      <section className="grid-section">
        <div className="recipe-grid">
          {categoryRecipes.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
          {categoryRecipes.length === 0 && (
            <p style={{ color: "var(--ink-mid)", fontStyle: "italic" }}>
              No recipes yet in this category.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
