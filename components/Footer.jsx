"use client";

export default function Footer() {
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
          <p className="text-cream/60 text-sm leading-relaxed">
            Preserving the art of Bharathanatyam through tradition, discipline and joyful
            expression.
          </p>
        </div>

        <FooterCol
          title="Quick Links"
          links={[
            ["About", "#about"],
            ["Classes", "#classes"],
            ["Gallery", "#gallery"],
            ["Contact", "#contact"],
          ]}
        />
        <FooterCol
          title="Programs"
          links={[
            ["Beginners", "#classes"],
            ["Advanced", "#classes"],
            ["Arangetram", "#classes"],
            ["Online", "#classes"],
          ]}
        />

        <div>
          <h4 className="font-heading font-semibold text-gold mb-3">Newsletter</h4>
          <p className="text-cream/60 text-sm mb-4">Get updates on events &amp; new batches.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
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
        © {year} Pooja Cultural Centre. All rights reserved.
      </div>
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
