import { useState } from "react";
import { motion } from "framer-motion";
import { western } from "../../data/content";
import { Lightbox } from "./Lightbox";

export const WesternGallery = () => {
    const [idx, setIdx] = useState(null);
    const nav = (d) =>
        setIdx((i) => (i + d + western.length) % western.length);

    return (
        <section
            id="western"
            data-testid="western"
            className="mx-auto max-w-[1500px] px-6 py-20 md:px-12 md:py-28"
        >
            <div className="mb-12 flex flex-col justify-between gap-4 border-t border-[var(--border-light)] pt-8 md:flex-row md:items-end">
                <div>
                    <p className="overline mb-4">01 — Selected Work</p>
                    <h2 className="font-serif text-4xl font-light tracking-tight text-walnut md:text-6xl">
                        The Western Series
                    </h2>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-ink md:text-right">
                    Horses, riders, and open range. Made across the American West
                    between first light and last.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
                {western.map((img, i) => (
                    <motion.button
                        key={i}
                        data-testid={`western-item-${i}`}
                        onClick={() => setIdx(i)}
                        className={`group relative overflow-hidden ${img.span}`}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className={`w-full overflow-hidden ${img.ratio}`}>
                            <img
                                src={img.src}
                                alt={img.title}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover brightness-[0.96] transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-105"
                            />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-walnut/80 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                            <span className="font-serif text-2xl text-sand">{img.title}</span>
                            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-sand/70">
                                {img.location}
                            </span>
                        </div>
                    </motion.button>
                ))}
            </div>

            <Lightbox images={western} index={idx} onClose={() => setIdx(null)} onNav={nav} />
        </section>
    );
};
