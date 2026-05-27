"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

type Variant = "strip" | "recipe" | "footer";

export default function EmailSignup({ variant }: { variant: Variant }) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        router.push("/subscribed");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (variant === "strip") {
    return (
      <section className="signup-strip">
        <svg
          className="signup-strip-wc"
          viewBox="0 0 1440 400"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <filter id="sf1"><feGaussianBlur stdDeviation="24" /></filter>
            <filter id="sf2"><feGaussianBlur stdDeviation="18" /></filter>
          </defs>
          <ellipse cx="80" cy="80" rx="120" ry="80" fill="#E82C1A" opacity="0.25" filter="url(#sf1)" />
          <ellipse cx="1380" cy="320" rx="140" ry="90" fill="#4A9A5A" opacity="0.22" filter="url(#sf2)" />
          <ellipse cx="720" cy="380" rx="200" ry="50" fill="#E8B020" opacity="0.14" filter="url(#sf1)" />
        </svg>
        <div className="signup-strip-inner">
          <p className="signup-eyebrow">Newsletter</p>
          <h2 className="signup-title">
            New recipes in <em>your inbox</em>
          </h2>
          <p className="signup-sub">
            Subscribe and I&apos;ll let you know when a new recipe goes up.
          </p>
          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder="your@email.com"
              required
              disabled={status === "loading"}
            />
            <button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </form>
          {status === "error" && (
            <p className="sub-error">Something went wrong — please try again.</p>
          )}
          <p className="signup-note">No spam. Unsubscribe any time.</p>
        </div>
      </section>
    );
  }

  if (variant === "recipe") {
    return (
      <div className="recipe-signup">
        <h3 className="recipe-signup-title">New recipes in your inbox</h3>
        <p className="recipe-signup-sub">
          Subscribe and I&apos;ll let you know when a new recipe goes up.
        </p>
        <form className="recipe-signup-form" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="your@email.com"
            required
            disabled={status === "loading"}
          />
          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </form>
        {status === "error" && (
          <p className="sub-error">Something went wrong — please try again.</p>
        )}
      </div>
    );
  }

  return (
    <div className="footer-signup">
      <p className="footer-signup-lbl">Newsletter</p>
      <p className="footer-signup-sub">New recipes in your inbox.</p>
      <form className="footer-signup-form" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="your@email.com"
          required
          disabled={status === "loading"}
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </form>
      {status === "error" && (
        <p className="sub-error">Something went wrong — please try again.</p>
      )}
    </div>
  );
}
