import { getLatestRecipes } from "@/data/recipes";
import recipes from "@/data/recipes";
import Carousel from "@/components/Carousel";
import RecipeCard from "@/components/RecipeCard";
import EmailSignup from "@/components/EmailSignup";
import AdZone from "@/components/AdZone";

export default function HomePage() {
  const latest = getLatestRecipes(5);
  const allRecipes = recipes;

  const firstRow = allRecipes.slice(0, 3);
  const secondRow = allRecipes.slice(3, 6);
  const thirdRow = allRecipes.slice(6, 9);
  const fourthRow = allRecipes.slice(9, 12);
  const fifthRow = allRecipes.slice(12, 15);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Dinner for Me",
    url: "https://dinnerforme.com/",
    description:
      "Cooking for one, accidental feasts, and the occasional unhinged culinary spirals.",
    author: {
      "@type": "Person",
      name: "Pallavi Misra",
      url: "https://dinnerforme.com/about/",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://dinnerforme.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <AdZone type="leaderboard" />

      {/* Hero */}
      <header className="hero">
        <svg
          className="hero-wc"
          viewBox="0 0 1440 580"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <filter id="f1"><feGaussianBlur stdDeviation="22" /></filter>
            <filter id="f2"><feGaussianBlur stdDeviation="16" /></filter>
            <filter id="f3"><feGaussianBlur stdDeviation="30" /></filter>
          </defs>
          <ellipse cx="55" cy="85" rx="130" ry="85" fill="#4A9A5A" opacity="0.45" transform="rotate(-20,55,85)" filter="url(#f1)" />
          <ellipse cx="95" cy="115" rx="70" ry="50" fill="#6AB870" opacity="0.30" transform="rotate(10,95,115)" filter="url(#f2)" />
          <ellipse cx="1390" cy="70" rx="130" ry="85" fill="#E82C1A" opacity="0.35" transform="rotate(18,1390,70)" filter="url(#f1)" />
          <ellipse cx="1360" cy="110" rx="80" ry="55" fill="#F04828" opacity="0.22" filter="url(#f2)" />
          <ellipse cx="1410" cy="360" rx="100" ry="68" fill="#E8B020" opacity="0.40" transform="rotate(-12,1410,360)" filter="url(#f2)" />
          <ellipse cx="70" cy="480" rx="110" ry="75" fill="#D84870" opacity="0.35" transform="rotate(22,70,480)" filter="url(#f3)" />
          <ellipse cx="1310" cy="510" rx="85" ry="58" fill="#D06838" opacity="0.30" transform="rotate(-18,1310,510)" filter="url(#f2)" />
          <ellipse cx="720" cy="540" rx="200" ry="44" fill="#F0B828" opacity="0.18" filter="url(#f3)" />
        </svg>
        <div className="hero-inner">
          <p className="hero-eyebrow">
            A personal recipe collection from a Singapore kitchen
          </p>
          <h1 className="hero-title">
            Dinner
            <br />
            <em>for Me</em>
          </h1>
          <div className="hero-rule" />
          <p className="hero-tagline">
            Cooking for one, accidental feasts, and the occasional unhinged
            culinary spirals.
          </p>
        </div>
      </header>

      {/* Featured carousel */}
      <Carousel recipes={latest} />

      {/* Email signup strip */}
      <EmailSignup variant="strip" />

      {/* Recipe grid */}
      <section className="grid-section">
        <div className="grid-header">
          <h2 className="grid-title">All Recipes</h2>
        </div>
        <div className="recipe-grid">
          {firstRow.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
          {secondRow.length > 0 && secondRow.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
          {secondRow.length > 0 && (
            <div className="ad-row">
              <AdZone type="fullrow" />
            </div>
          )}
          {thirdRow.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
          {fourthRow.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
          {fourthRow.length > 0 && (
            <div className="ad-row">
              <AdZone type="fullrow" />
            </div>
          )}
          {fifthRow.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
        </div>
      </section>

    </main>
  );
}
