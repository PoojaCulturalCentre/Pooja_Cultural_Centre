"use client";

import { motion } from "framer-motion";

const EVENTS = [
  {
    date: "05",
    month: "OCT",
    title: "Navratri Dance Showcase",
    place: "Main Auditorium, Chennai",
    desc: "An evening of devotional Bharathanatyam celebrating the nine nights of Navratri.",
  },
  {
    date: "18",
    month: "NOV",
    title: "Student Arangetrams",
    place: "Pooja Cultural Centre Hall",
    desc: "Solo debut performances by our senior batch students.",
  },
  {
    date: "21",
    month: "DEC",
    title: "Natyanjali Winter Festival",
    place: "Open Air Theatre",
    desc: "Our flagship annual festival featuring alumni and guest performers.",
  },
  {
    date: "14",
    month: "JAN",
    title: "Pongal Cultural Evening",
    place: "Community Hall",
    desc: "Celebrating the harvest festival with music, dance and community feasting.",
  },
];

export default function Events() {
  return (
    <section id="events" className="py-24 sm:py-32 bg-cream">
      <div className="section-container">
        <span className="section-tag center block text-center">Calendar</span>
        <h2 className="section-title center">Upcoming Events</h2>

        <div className="relative mt-16 max-w-3xl mx-auto">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] timeline-line hidden sm:block" />

          <div className="flex flex-col gap-10">
            {EVENTS.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`relative sm:w-1/2 ${i % 2 === 0 ? "sm:pr-10 sm:self-start sm:text-right" : "sm:pl-10 sm:self-end"}`}
              >
                <span
                  className={`hidden sm:flex absolute top-2 ${
                    i % 2 === 0 ? "-right-3" : "-left-3"
                  } w-6 h-6 rounded-full bg-gold border-4 border-cream shadow-md`}
                />
                <div className="bg-white rounded-2xl shadow-card p-6 flex gap-5 items-start hover:shadow-gold transition-shadow duration-300">
                  <div className={`flex flex-col items-center justify-center bg-maroon text-cream rounded-xl w-16 h-16 shrink-0 ${i % 2 === 0 ? "sm:order-2" : ""}`}>
                    <span className="font-heading font-bold text-xl leading-none">{e.date}</span>
                    <span className="text-[0.65rem] tracking-widest">{e.month}</span>
                  </div>
                  <div className={i % 2 === 0 ? "sm:order-1 sm:text-right" : ""}>
                    <h3 className="font-heading font-bold text-lg text-maroon-dark mb-1">{e.title}</h3>
                    <p className="text-xs text-gold-dark font-semibold mb-2">📍 {e.place}</p>
                    <p className="text-sm text-ink/60">{e.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
