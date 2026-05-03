import { useEffect, useState } from "react";

// Email is stored as base64 to keep it out of the static HTML.
// Decoded and rendered only in the browser — bots scraping raw HTML won't see it.
const ENCODED = "aGlAY2VsaWF2YWxldHRlLmNvbQ==";

export default function ObfuscatedEmail({ className }: { className?: string }) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(atob(ENCODED));
  }, []);

  if (!email) return null;

  return (
    <a href={`mailto:${email}`} className={className}>
      {email}
    </a>
  );
}
