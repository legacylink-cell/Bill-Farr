import { useState } from "react";
import { motion } from "framer-motion";
import { travel } from "../../data/content";
import { Lightbox } from "./Lightbox";
import { track } from "../../lib/analytics";

export const TravelGallery = () => {
    const [idx, setIdx] = useState(null);
    const nav = (d) => setIdx((i) => (i + d + travel.length) % travel.length);

    return (
        <section
            id="travel"
            data-testid="travel"
            className="bg-walnut py-20 text-sand md:py-32"
        >
            <div className="mx-auto max-w-[1500px] px-6 md:px-12">
                <div className="mb-14 flex flex-col justify-between gap-4 border-t border-[var(--border-dark)] pt-8 md:flex-row md:items-end">
                    <div>
                        <p className="overline mb-4">02 — On the Road</p>
                        <h2 className="font-serif text-4xl font-light tracking-tight text-sand md:text-6xl">
                            Travel & Landscape
                        </h2>
                    </div>
                    <p className="max-w-sm text-sm leading-relaxed text-sand/60 md:text-right">
                        Far horizons, mountain weather, and the golden hour wherever it
                        finds me.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:auto-rows-[180px] md:gap-6">
                    {travel.map((img, i) => (
                        <motion.button
                            key={i}
                            data-testid={`travel-item-${i}`}
                            onClick={() => {
                                track("image_open", { label: img.title, gallery: "travel" });
                                setIdx(i);
                            }}
                            className={`group relative block overflow-hidden ${img.cls}`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <img
                                src={img.src}
                                alt={img.title}
                                loading="lazy"
                                decoding="async"
                                className="aspect-[4/3] w-full object-cover brightness-[0.96] transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-105 md:aspect-auto md:h-full"
                            />
                            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-walnut/90 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                <span className="font-serif text-2xl text-sand">{img.title}</span>
                                <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.2em] text-sand/70 sm:block">
                                    {img.location}
                                </span>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            <Lightbox images={travel} index={idx} onClose={() => setIdx(null)} onNav={nav} />
        </section>
    );
};
