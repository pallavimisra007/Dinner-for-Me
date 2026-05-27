import type { Category } from "./recipes";

export interface CategoryMeta {
  slug: Category;
  label: string;
  image: string;
  href: string;
  description: string;
}

export const CATEGORY_META: CategoryMeta[] = [
  {
    slug: "things-in-jars",
    label: "Things in Jars",
    image: "/img/cat-things-in-jars.png",
    href: "/category/things-in-jars/",
    description:
      "Chutneys, sambals, dips, and condiments. The things you make once and then reach for constantly. Most of them improve significantly after a day in the fridge.",
  },
  {
    slug: "bowls-of-comfort",
    label: "Bowls of Comfort",
    image: "/img/cat-bowls-of-comfort.png",
    href: "/category/bowls-of-comfort/",
    description:
      "Soups, broths, and anything that gets better the longer it sits on the stove. For cold evenings, rough weeks, or when you just need to be fed properly.",
  },
  {
    slug: "starters",
    label: "Starters & Small Things",
    image: "/img/cat-starters.png",
    href: "/category/starters/",
    description:
      "The bits before the meal, or sometimes the meal itself. Snacks, bites, and small plates that tend to disappear faster than expected.",
  },
  {
    slug: "mains",
    label: "The Main Event",
    image: "/img/cat-mains.png",
    href: "/category/mains/",
    description:
      "Proper dinners. The recipes that take a bit more effort and are completely worth it.",
  },
  {
    slug: "sweet",
    label: "Something Sweet",
    image: "/img/cat-sweet.png",
    href: "/category/sweet/",
    description:
      "Not a dedicated baker. But occasionally the mood strikes and something turns out better than expected. These are those recipes.",
  },
];
