import Link from "next/link";
import EmailSignup from "@/components/EmailSignup";

export default function Footer() {
  return (
    <footer>
      <EmailSignup variant="footer" />
      <p className="footer-logo">Dinner for Me</p>
      <p className="footer-tagline">
        Cooking for one, accidental feasts, and the occasional unhinged culinary spirals.
      </p>
      <ul className="footer-links">
        <li><Link href="/category/things-in-jars/">Things in Jars</Link></li>
        <li><Link href="/category/bowls-of-comfort/">Bowls of Comfort</Link></li>
        <li><Link href="/category/starters/">Starters</Link></li>
        <li><Link href="/category/mains/">The Main Event</Link></li>
        <li><Link href="/category/sweet/">Something Sweet</Link></li>
        <li><Link href="/about/">About</Link></li>
      </ul>
    </footer>
  );
}
