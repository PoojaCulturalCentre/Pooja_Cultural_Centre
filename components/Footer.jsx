"use client";

import Image from "next/image";
import Link from "next/link";
import { FOOTER_STRIP_PHOTOS } from "@/lib/photos";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import pccLogo from "@/app/images/pcc_logo.png";

const FOOTER_STRIP = FOOTER_STRIP_PHOTOS.map((photo) => ({
  photo,
  shape: "rounded-full",
  size: "w-14 h-14 sm:w-16 sm:h-16",
}));

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-maroon-dark text-cream pt-4">
      <div className="flex justify-center items-center gap-5 sm:gap-6 py-8">
        {FOOTER_STRIP.map(({ photo, shape, size }, i) => (
          <span
            key={photo.id}
            className={`relative ${size} ${shape} overflow-hidden border-2 border-gold/60 shadow-md animate-float shrink-0`}
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            <Image src={photo.src} alt={photo.alt} fill sizes="64px" className="object-cover" />
          </span>
        ))}
      </div>

      <div className="section-container grid sm:grid-cols-2 lg:grid-cols-4 gap-10 py-10 border-t border-cream/10">
        <div>
          <a href="#home" className="flex items-center mb-3">
            <Image src={pccLogo} alt="Pooja Cultural Centre" className="h-24 w-auto" />
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

      <div className="section-container flex justify-center pb-6">
        <Link
          href="/admin/login"
          className="rounded-full border border-gold/40 text-gold text-xs font-semibold px-5 py-2 hover:bg-gold/10 hover:border-gold transition-colors"
        >
          Admin Login
        </Link>
      </div>

      <div className="text-center text-xs py-6 border-t border-cream/10">
        <span className="bg-gold-gradient bg-clip-text text-transparent font-medium">
          © {year} Pooja Cultural Centre. {t.footer.copyright}
        </span>
        <a
          href="https://vikrams.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block text-black/60 hover:text-black transition-colors"
        >
          Developed by <span className="font-semibold text-black/60">Vikram</span>
        </a>
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
