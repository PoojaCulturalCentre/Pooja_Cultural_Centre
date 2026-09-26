"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import MandalaShape from "./Mandala";

const AUTO_SWIPE_MS = 4500;

function useAutoSwipe(count) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [count]);

  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTO_SWIPE_MS);
    return () => clearInterval(id);
  }, [count]);

  return [index, setIndex];
}

function EmptyState({ icon, message }) {
  return (
    <div className="h-72 sm:h-80 rounded-2xl border-2 border-dashed border-maroon/15 bg-maroon/[0.03] flex flex-col items-center justify-center gap-3 text-center px-6">
      <span className="text-4xl">{icon}</span>
      <p className="text-ink/50 text-sm">{message}</p>
    </div>
  );
}

function Dots({ count, index, onSelect }) {
  if (count <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => onSelect(i)}
          className={`h-2 rounded-full transition-all duration-300 ${
            i === index ? "w-6 bg-gold" : "w-2 bg-maroon/20 hover:bg-maroon/40"
          }`}
        />
      ))}
    </div>
  );
}

function PhotoCarousel({ images, tag, emptyMessage }) {
  const [index, setIndex] = useAutoSwipe(images.length);

  return (
    <div>
      <h3 className="font-heading text-lg font-bold text-maroon-dark mb-4 text-center">{tag}</h3>
      {images.length === 0 ? (
        <EmptyState icon="📸" message={emptyMessage} />
      ) : (
        <>
          <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden shadow-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={images[index].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[index].url}
                  alt={images[index].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 gallery-overlay opacity-90" />
                <span className="absolute bottom-4 left-5 text-cream font-heading font-semibold text-lg">
                  {images[index].title}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
          <Dots count={images.length} index={index} onSelect={setIndex} />
        </>
      )}
    </div>
  );
}

function VideoCarousel({ videos, tag, emptyMessage }) {
  const [index, setIndex] = useAutoSwipe(videos.length);

  return (
    <div>
      <h3 className="font-heading text-lg font-bold text-maroon-dark mb-4 text-center">{tag}</h3>
      {videos.length === 0 ? (
        <EmptyState icon="🎥" message={emptyMessage} />
      ) : (
        <>
          <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden shadow-card bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={videos[index].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <video
                  src={videos[index].url}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 gallery-overlay opacity-70 pointer-events-none" />
                <span className="absolute bottom-4 left-5 text-cream font-heading font-semibold text-lg">
                  {videos[index].title}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
          <Dots count={videos.length} index={index} onSelect={setIndex} />
        </>
      )}
    </div>
  );
}

export default function Gallery() {
  const { t } = useLanguage();
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const yTop = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const yBottom = useTransform(scrollYProgress, [0, 1], [70, -70]);

  useEffect(() => {
    fetch("/api/images")
      .then((res) => (res.ok ? res.json() : []))
      .then(setImages)
      .catch(() => setImages([]));

    fetch("/api/videos")
      .then((res) => (res.ok ? res.json() : []))
      .then(setVideos)
      .catch(() => setVideos([]));
  }, []);

  return (
    <section id="gallery" ref={ref} className="relative py-24 sm:py-32 bg-white overflow-hidden">
      <motion.svg
        style={{ y: yTop }}
        viewBox="0 0 200 200"
        className="absolute -top-20 -left-24 w-72 h-72 sm:w-96 sm:h-96 text-gold/10 animate-spin-slow pointer-events-none"
      >
        <MandalaShape />
      </motion.svg>
      <motion.svg
        style={{ y: yBottom }}
        viewBox="0 0 200 200"
        className="absolute -bottom-24 -right-16 w-64 h-64 sm:w-80 sm:h-80 text-maroon/5 animate-spin-slow-reverse pointer-events-none"
      >
        <MandalaShape />
      </motion.svg>

      <div className="section-container relative z-10">
        <span className="section-tag center block text-center">{t.gallery.tag}</span>
        <h2 className="section-title center">{t.gallery.title}</h2>

        <div className="grid md:grid-cols-2 gap-10 mt-12">
          <PhotoCarousel images={images} tag={t.gallery.photosTag} emptyMessage={t.gallery.photosEmpty} />
          <VideoCarousel videos={videos} tag={t.gallery.videosTag} emptyMessage={t.gallery.videosEmpty} />
        </div>
      </div>
    </section>
  );
}
