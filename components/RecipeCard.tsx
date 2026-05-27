import Link from "next/link";
import type { Recipe } from "@/data/recipes";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipes/${recipe.slug}/`} className="recipe-card">
      <div className="card-img">
        <img src={recipe.heroImage} alt={recipe.title} />
      </div>
      <div className="card-tag">
        <span className={`tag ${recipe.tagClass}`}>{recipe.categoryLabel}</span>
      </div>
      <h3 className="card-title">{recipe.title}</h3>
      <p className="card-teaser">{recipe.teaser}</p>
    </Link>
  );
}
