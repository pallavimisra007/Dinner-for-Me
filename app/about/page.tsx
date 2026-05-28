import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  openGraph: {
    images: [
      {
        url: "https://dinnerforme.com/img/me-portrait.png",
        alt: "Pallavi Misra — Dinner for Me",
      },
    ],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pallavi Misra",
  url: "https://dinnerforme.com/about/",
  image: "https://dinnerforme.com/img/me-portrait.png",
  description:
    "Home cook based in Singapore writing about cooking for one, adapted recipes, and the occasional unhinged culinary spiral.",
  knowsAbout: [
    "Indian cuisine",
    "Levantine food",
    "Indonesian sambals",
    "Home cooking",
    "Recipe development",
  ],
};

export default function AboutPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <div className="about-hero">
        <svg
          className="about-wc"
          viewBox="0 0 1440 420"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <filter id="af1"><feGaussianBlur stdDeviation="24" /></filter>
            <filter id="af2"><feGaussianBlur stdDeviation="18" /></filter>
          </defs>
          <ellipse cx="120" cy="100" rx="140" ry="90" fill="#4A9A5A" opacity="0.38" transform="rotate(-15,120,100)" filter="url(#af1)" />
          <ellipse cx="1320" cy="80" rx="130" ry="85" fill="#E82C1A" opacity="0.28" transform="rotate(20,1320,80)" filter="url(#af1)" />
          <ellipse cx="700" cy="380" rx="220" ry="55" fill="#E8B020" opacity="0.16" filter="url(#af2)" />
          <ellipse cx="1380" cy="340" rx="100" ry="65" fill="#D06838" opacity="0.28" transform="rotate(-14,1380,340)" filter="url(#af2)" />
        </svg>
        <h1 className="about-title">
          About <em>this place</em>
        </h1>
      </div>

      <div className="about-body">
        <aside>
          <blockquote className="pull-quote">
            "Most nights, cooking is just the thing that needs to happen before
            eating. But sometimes it turns into something else."
          </blockquote>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/me-portrait.png"
            alt="Pallavi"
            className="about-portrait"
          />
        </aside>

        <div className="about-text">
          <p>
            Tired of recipes that assume you&rsquo;re cooking for a family of
            six. Tired of making something delicious and then realising you now
            have leftovers for the next four days, except you&rsquo;re barely
            home because life in Singapore is busy and everyone has work,
            friends, obligations, events, dinners, plans. And honestly?
            Sometimes I just want one really good meal.
          </p>
          <p>
            I love to cook. I love feeding my friends. I also love cooking for
            myself. Cooking for one is its own particular kind of freedom.
            Sometimes it means making exactly enough for dinner and one slightly
            exciting lunch the next day. Sometimes it means spending an entire
            afternoon making a completely unnecessary feast because, well,
            sometimes that is the mood.
          </p>
          <p>
            Over the years, I&rsquo;ve learnt how to scale recipes down
            properly. Chicken for one. Soup for one. Kebabs for one. Biryani
            for one in a rice cooker, which is admittedly a little unhinged
            because biryani is meant to be shared, but here we are.
          </p>
          <p>
            I also hate excessive leftovers and unnecessary clean-up. So a lot
            of the recipes here are designed around real life. Small kitchens.
            Stocked pantries. Minimal washing up unless I&rsquo;ve decided to
            disappear into a full cooking spiral for the afternoon.
          </p>
          <p>
            I grew up eating Indian food at home and my mother is an exceptional
            cook. But I also live in Singapore, which means eating across
            cultures constantly. You can&rsquo;t really live here and not end up
            cooking that way too. So the recipes here wander everywhere. Indian.
            Middle Eastern. Southeast Asian. European. Sometimes all at once.
          </p>
          <p>
            Some recipes are adapted from cooks I admire like Yotam Ottolenghi
            and Nigella Lawson. Some came from holidays where I got obsessed
            with remembering a particular taste. Some exist because I had random
            things in the fridge that needed clearing before they died quietly
            in the vegetable drawer. And many of them started with me having
            lengthy, slightly chaotic discussions with ChatGPT trying to reverse
            engineer a craving or flavour profile in my head.
          </p>
          <p>
            The recipes here are not meant to be perfect. They&rsquo;re meant
            to be cooked, adjusted, improvised, scribbled on, and adapted
            depending on what you already have at home. Most importantly,
            they&rsquo;re meant to work for actual life.
          </p>
          <p>
            And if you make something from here and it goes gloriously right,
            slightly wrong, or completely off the rails, I&rsquo;d genuinely
            love to hear about it.
          </p>

          <div className="contact-block">
            <p>
              Get in touch:{" "}
              <a href="mailto:milliv.paras@gmail.com">
                milliv.paras@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
