import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main>
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
        </aside>

        <div className="about-text">
          <p>
            I started writing these recipes down because I kept forgetting them.
            Not just the quantities. The things that actually mattered. The
            moment I realised the pomegranate molasses needed to be doubled. The
            afternoon a sambal turned out exactly right and I had no idea what
            I had done differently. The first time a chutney worked and I stood
            in my kitchen eating it off the spoon.
          </p>
          <p>
            Most of these recipes are things I make for myself. I live in
            Singapore, I cook in a small kitchen, and I mostly eat alone, which
            is not a complaint. Sometimes that means figuring out what to do
            with leftovers and trying not to waste food. Sometimes it means
            making enough for exactly one meal and one slightly exciting lunch
            the next day. And sometimes it means spending an entire afternoon
            making a completely unnecessary feast because, honestly, sometimes
            that's the mood. Cooking for one is its own particular kind of
            freedom. You can make the same thing three nights running because
            you like it. You can have just a bowl of something and call it
            dinner. You can go on completely unhinged ingredient spirals
            (walnut-pomegranate, tamarind-green chilli, kumquat-everything)
            with no one to negotiate with.
          </p>
          <p>
            I grew up eating Indian food at home, with a mother who is an
            excellent cook, and a fairly chaotic mix of everything else
            everywhere else. Singapore helped with that. You cannot live here
            and not end up eating and cooking across cuisines. So the recipes here are a mix:
            Levantine dips, Indonesian sambals, a Yemeni hot sauce, Indian
            chutneys, soups, roasted things, and whatever else I made that
            seemed worth remembering.
          </p>
          <p>
            Some of these are adapted from cooks and writers I admire. Yotam
            Ottolenghi sent me down several very enjoyable rabbit holes. Some
            are cobbled together from things I cooked until they became
            versions I preferred. A few are entirely my own, born out of
            curiosity, stubbornness, cravings, travel memories, or a long
            conversation with ChatGPT while trying to reverse-engineer something
            I tasted somewhere. I write about what I was thinking, what didn't
            work the first time, and what I'd do differently. Not because
            that's information you strictly need, but because that's what I
            actually want to read when I'm looking at a recipe.
          </p>
          <p>
            The recipes here are not meant to be perfect. They're meant to be
            cooked. Adjusted. Improvised. Scribbled on. If you make something
            from here and it went a different way (or went brilliantly), I'd
            genuinely love to hear about it.
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
