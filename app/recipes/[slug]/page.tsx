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
        <a
          href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(`https://dinnerforme.com/recipes/${recipe.slug}/`)}&media=${encodeURIComponent(`https://dinnerforme.com${recipe.heroImage}`)}&description=${encodeURIComponent(recipe.teaser)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="pinterest-save"
          aria-label="Save to Pinterest"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
          </svg>
          Save
        </a>
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

        {/* See also */}
        {recipe.relatedRecipes && recipe.relatedRecipes.length > 0 && (() => {
          const seeAlso = recipe.relatedRecipes!
            .map((s) => recipes.find((r) => r.slug === s))
            .filter(Boolean) as typeof recipes;
          return seeAlso.length > 0 ? (
            <p className="see-also">
              Also:{" "}
              {seeAlso.map((r, i) => (
                <span key={r.slug}>
                  {i > 0 && ", "}
                  <Link href={`/recipes/${r.slug}/`}>{r.title}</Link>
                </span>
              ))}
            </p>
          ) : null;
        })()}

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
