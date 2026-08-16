import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container-page grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-h1 tracking-tight">{site.name}</p>
          <p className="mt-4 max-w-sm text-fg-muted">{site.tagline}</p>
        </div>

        <nav aria-label="Footer navigation">
          <p className="font-mono text-micro uppercase tracking-widest2 text-fg-subtle">Navigate</p>
          <ul className="mt-4 space-y-3">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-fg-muted transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-mono text-micro uppercase tracking-widest2 text-fg-subtle">Contact</p>
          <ul className="mt-4 space-y-3">
            <li>
              <a href={`mailto:${site.contactEmail}`} className="text-fg-muted transition-colors hover:text-fg">
                {site.contactEmail}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page flex flex-col gap-2 border-t border-border py-6 text-micro uppercase tracking-widest2 text-fg-subtle md:flex-row md:items-center md:justify-between">
        <span>
          © {year} {site.name}
        </span>
        <span>Wire → Structure → Experience</span>
      </div>
    </footer>
  );
}
