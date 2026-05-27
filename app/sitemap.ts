import { MetadataRoute } from "next";
import recipes from "@/data/recipes";

export const dynamic = "force-static";

const BASE = "https://dinnerforme.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const recipeUrls = recipes.map((r) => ({
    url: `${BASE}/recipes/${r.slug}/`,
    lastModified: new Date(r.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryUrls = [
    "things-in-jars",
    "bowls-of-comfort",
    "starters",
    "mains",
    "sweet",
  ].map((cat) => ({
    url: `${BASE}/category/${cat}/`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: `${BASE}/`,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${BASE}/about/`,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
    ...categoryUrls,
    ...recipeUrls,
  ];
}
