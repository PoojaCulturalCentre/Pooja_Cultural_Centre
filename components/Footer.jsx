"use client";

import { ALL_PHOTO_CREDITS } from "@/lib/photos";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-maroon-dark text-cream pt-4">
      <div className="flex justify-center gap-6 py-6 text-2xl text-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
            🔥
          </span>
        ))}
      </div>

      <div className="section-container grid sm:grid-cols-2 lg:grid-cols-4 gap-10 py-10 border-t border-cream/10">
        <div>
          <a href="#home" className="flex items-center gap-2 mb-3">
            <span className="text-gold text-xl">✦</span>
            <span className="font-heading font-bold text-lg">
              Pooja <em className="text-gold not-italic italic">Cultural Centre</em>
            </span>
          </a>
          <p className="text-cream/60 text-sm leading-relaxed">{t.footer.tagline}</p>
        </div>

        <FooterCol
          title={t.footer.quickLinks}
          links={[
            [t.footer.linkAbout, "#about"],
            [t.footer.linkClasses, "#classes"],
            [t.footer.linkGallery, "#gallery"],
            [t.footer.linkContact, "#contact"],
          ]}
        />
        <FooterCol
          title={t.footer.programs}
          links={[
            [t.footer.linkBeginners, "#classes"],
            [t.footer.linkAdvanced, "#classes"],
            [t.footer.linkArangetram, "#classes"],
            [t.footer.linkOnline, "#classes"],
          ]}
        />

        <div>
          <h4 className="font-heading font-semibold text-gold mb-3">{t.footer.newsletter}</h4>
          <p className="text-cream/60 text-sm mb-4">{t.footer.newsletterDesc}</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input
              type="email"
              placeholder={t.footer.emailPlaceholder}
              className="flex-1 min-w-0 rounded-full bg-cream/10 px-4 py-2.5 text-sm placeholder-cream/40 outline-none focus:ring-2 focus:ring-gold"
            />
            <button
              type="submit"
              className="w-10 h-10 shrink-0 rounded-full bg-gold text-maroon-dark flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Subscribe"
            >
              ➤
            </button>
          </form>
        </div>
      </div>

      <div className="text-center text-cream/50 text-xs py-6 border-t border-cream/10">
        © {year} Pooja Cultural Centre. {t.footer.copyright}
      </div>

      {/* <div className="section-container pb-6">
        <p className="text-cream/35 text-[0.7rem] text-center leading-relaxed">
          Photos via Wikimedia Commons:{" "}
          {ALL_PHOTO_CREDITS.map((c, i) => (
            <span key={c.url}>
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="hover:text-gold underline decoration-cream/20">
                {c.name} ({c.license})
              </a>
              {i < ALL_PHOTO_CREDITS.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      </div> */}
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="font-heading font-semibold text-gold mb-3">{title}</h4>
      <div className="flex flex-col gap-2">
        {links.map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="text-cream/60 text-sm hover:text-gold hover:pl-1 transition-all duration-300 w-fit"
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
