import type { Metadata } from "next";
import Link from "next/link";
import { getLatestRecipes } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";

export const metadata: Metadata = {
  title: "You're in",
};

export default function SubscribedPage() {
  const suggestions = getLatestRecipes(3);

  return (
    <main>
      {/* Hero */}
      <div className="subscribed-hero">
        <svg
          className="subscribed-wc"
          viewBox="0 0 1440 480"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <filter id="swf1"><feGaussianBlur stdDeviation="28" /></filter>
            <filter id="swf2"><feGaussianBlur stdDeviation="20" /></filter>
          </defs>
          <ellipse cx="100" cy="120" rx="160" ry="100" fill="#4A9A5A" opacity="0.32" transform="rotate(-18,100,120)" filter="url(#swf1)" />
          <ellipse cx="1360" cy="100" rx="140" ry="90" fill="#E82C1A" opacity="0.25" transform="rotate(16,1360,100)" filter="url(#swf1)" />
          <ellipse cx="720" cy="440" rx="240" ry="60" fill="#E8B020" opacity="0.16" filter="url(#swf2)" />
          <ellipse cx="1400" cy="380" rx="110" ry="70" fill="#D06838" opacity="0.26" transform="rotate(-12,1400,380)" filter="url(#swf2)" />
          <ellipse cx="80" cy="400" rx="120" ry="80" fill="#9A5898" opacity="0.20" transform="rotate(22,80,400)" filter="url(#swf2)" />
        </svg>

        <div className="subscribed-inner">
          <p className="subscribed-eyebrow">Newsletter</p>
          <h1 className="subscribed-title">
            You&apos;re <em>in.</em>
          </h1>
          <div className="subscribed-rule" />
          <p className="subscribed-body">
            I&apos;ll let you know when a new recipe goes up. No noise, no spam —
            just something good in your inbox when there&apos;s something new to share.
          </p>
          <Link href="/" className="subscribed-cta">
            Back to recipes
          </Link>
        </div>
      </div>

      {/* Suggested reading */}
      {suggestions.length > 0 && (
        <section className="grid-section">
          <div className="grid-header">
            <h2 className="grid-title">While you&apos;re here</h2>
            <Link href="/" className="link-all">
              All recipes →
            </Link>
          </div>
          <div className="related-grid">
            {suggestions.map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
