"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const INFO = [
  { icon: "📍", text: "123 Temple Street, Mylapore, Chennai, India" },
  { icon: "📞", text: "+91 98765 43210" },
  { icon: "✉️", text: "hello@poojaculturalcentre.com" },
  { icon: "🕐", text: "Mon – Sat: 4:00 PM – 8:00 PM" },
];

export default function Contact() {
  const [toast, setToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setToast(true);
    e.target.reset();
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-white relative">
      <div className="section-container grid md:grid-cols-2 gap-14">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">Begin Your Dance Journey</h2>
          <p className="section-desc">
            Have a question or ready to join? Reach out — we&rsquo;d love to welcome you to our
            Natya family.
          </p>

          <ul className="space-y-4 mb-8">
            {INFO.map((item) => (
              <li key={item.text} className="flex items-center gap-4 text-ink/75">
                <span className="w-10 h-10 rounded-full bg-maroon/10 flex items-center justify-center text-lg shrink-0">
                  {item.icon}
                </span>
                <span className="text-sm sm:text-base">{item.text}</span>
              </li>
            ))}
          </ul>

          <div className="flex gap-3">
            {["IG", "YT", "FB", "WA"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-10 h-10 rounded-full bg-maroon text-cream flex items-center justify-center text-xs font-bold hover:bg-gold hover:text-maroon-dark hover:-translate-y-1 transition-all duration-300"
              >
                {s}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="bg-cream rounded-3xl shadow-card p-8 sm:p-10 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field id="fname" label="Your Name" type="text" required />
            <Field id="femail" label="Email Address" type="email" required />
          </div>
          <Field id="finterest" label="Interested Program" type="text" />
          <Field id="fmessage" label="Your Message" as="textarea" required />

          <button type="submit" className="btn btn-gold w-full">
            Send Message ✉️
          </button>
        </motion.form>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-maroon text-cream px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-2 z-[95]"
          >
            ✅ Message sent successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Field({ id, label, type = "text", as, required }) {
  const commonClasses =
    "peer w-full bg-transparent border-b-2 border-ink/20 focus:border-gold outline-none py-2.5 text-ink placeholder-transparent transition-colors duration-300";
  return (
    <div className="relative">
      {as === "textarea" ? (
        <textarea id={id} rows={4} required={required} placeholder=" " className={commonClasses} />
      ) : (
        <input id={id} type={type} required={required} placeholder=" " className={commonClasses} />
      )}
      <label
        htmlFor={id}
        className="absolute left-0 -top-3.5 text-xs text-gold-dark font-medium transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:text-ink/40 peer-placeholder-shown:top-2.5 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-gold-dark"
      >
        {label}
      </label>
    </div>
  );
}
