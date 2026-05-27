import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import recipes, { getRecipeBySlug, getLatestRecipes } from "@/data/recipes";
import EmailSignup from "@/components/EmailSignup";
import AdZone from "@/components/AdZone";
import RecipeCard from "@/components/RecipeCard";

export async function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return {};
  return {
    title: recipe.title,
    description: recipe.teaser,
    openGraph: {
      images: [
        {
          url: `https://dinnerforme.com${recipe.heroImage}`,
          alt: recipe.title,
        },
      ],
    },
  };
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  const related = getLatestRecipes(4)
    .filter((r) => r.slug !== recipe.slug)
    .slice(0, 3);

  const galleryImages = recipe.images.slice(0, 3);

  // Convert image filename to readable alt text e.g. /img/red-bell-peppers.png → "Red bell peppers"
  function imgAlt(src: string): string {
    return (src.split("/").pop() ?? src)
      .replace(/\.[^.]+$/, "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  const recipeSchema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.teaser,
    url: `https://dinnerforme.com/recipes/${recipe.slug}/`,
    image: `https://dinnerforme.com${recipe.heroImage}`,
    datePublished: recipe.publishedAt,
    author: {
      "@type": "Person",
      name: "Pallavi Misra",
      url: "https://dinnerforme.com/about/",
    },
    recipeCategory: recipe.categoryLabel,
    recipeYield: recipe.serves,
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.method.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text: step,
    })),
    keywords: [recipe.categoryLabel, "recipe", "dinner for me"].join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://dinnerforme.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: recipe.categoryLabel,
        item: `https://dinnerforme.com/category/${recipe.category}/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: recipe.title,
        item: `https://dinnerforme.com/recipes/${recipe.slug}/`,
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero image */}
      <div className="recipe-hero-img">
        <img src={recipe.heroImage} alt={recipe.title} />
      </div>

      {/* Recipe header */}
      <div className="recipe-header">
        <div className="r-cat">
          <span className={`tag ${recipe.tagClass}`}>{recipe.categoryLabel}</span>
        </div>
        <h1 className="recipe-title">{recipe.title}</h1>
        <div className="recipe-meta">
          <div className="meta-item">
            <span className="meta-lbl">Serves</span>
            <span className="meta-val">{recipe.serves}</span>
          </div>
          <div className="meta-item">
            <span className="meta-lbl">Effort</span>
            <span className="meta-val">{recipe.energyLevel}</span>
          </div>
        </div>
      </div>

      {/* Recipe body */}
      <div className="recipe-body">
        {/* Story */}
        <div className="story-intro">
          {recipe.story.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <AdZone type="inline" />

        {/* Recipe card: ingredients + method */}
        <div className="section-sep">The Recipe</div>
        <div className="recipe-cols">
          <div>
            <p className="col-lbl">Ingredients</p>
            <ul className="ing-list">
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="col-lbl">Method</p>
            <ol className="method-list">
              {recipe.method.map((step, i) => (
                <li key={i}><span>{step}</span></li>
              ))}
            </ol>
          </div>
        </div>

        <AdZone type="inline" />

        {/* Notes */}
        {recipe.notes.length > 0 && (
          <>
            <div className="section-sep">Notes</div>
            {recipe.notes.map((note, i) => (
              <p key={i}>{note}</p>
            ))}
          </>
        )}

        {/* SG version */}
        {recipe.sgVersion && recipe.sgVersion.length > 0 && (
          <>
            <div className="section-sep">The Singapore Version</div>
            {recipe.sgVersion.map((note, i) => (
              <p key={i}>{note}</p>
            ))}
          </>
        )}

        {/* Why it works */}
        {recipe.whyItWorks.length > 0 && (
          <>
            <div className="section-sep">Why It Works</div>
            {recipe.whyItWorks.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </>
        )}

        {/* Image gallery */}
        {galleryImages.length > 1 && (
          <div className={`recipe-gallery${galleryImages.length === 2 ? " two" : ""}`}>
            {galleryImages.map((img, i) => (
              <img key={i} src={img} alt={imgAlt(img)} />
            ))}
          </div>
        )}

        {/* How I ate it */}
        {recipe.howIAteIt.length > 0 && (
          <>
            <div className="section-sep">How I Ate It</div>
            {recipe.howIAteIt.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </>
        )}

        {/* What I'd do differently */}
        {recipe.whatIDoDifferently.length > 0 && (
          <>
            <div className="section-sep">{"What I'd Do Differently"}</div>
            {recipe.whatIDoDifferently.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </>
        )}

        <AdZone type="inline" />
      </div>

      {/* Email signup */}
      <EmailSignup variant="recipe" />

      {/* Related recipes */}
      {related.length > 0 && (
        <section className="related">
          <div className="grid-header">
            <h2 className="grid-title">More Recipes</h2>
            <Link href="/" className="link-all">
              All recipes →
            </Link>
          </div>
          <div className="related-grid">
            {related.map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
