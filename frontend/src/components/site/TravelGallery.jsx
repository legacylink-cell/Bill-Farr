import { motion } from "framer-motion";
import { travel } from "../../data/content";

export const TravelGallery = () => {
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

                <div className="space-y-16 md:space-y-28">
                    {travel.map((img, i) => (
                        <motion.figure
                            key={i}
                            data-testid={`travel-item-${i}`}
                            className={`group block w-full ${
                                i % 2 === 0 ? "md:pr-[18%]" : "md:ml-auto md:pl-[18%]"
                            }`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="overflow-hidden">
                                <img
                                    src={img.src}
                                    alt={img.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                                />
                            </div>
                            <figcaption className="mt-4 flex items-baseline justify-between gap-6">
                                <span className="font-serif text-3xl text-sand md:text-4xl">
                                    <span className="text-clay">{String(i + 1).padStart(2, "0")}</span>{" "}
                                    {img.title}
                                </span>
                                <span className="whitespace-nowrap font-mono text-[0.65rem] uppercase tracking-[0.2em] text-sand/50">
                                    {img.location}
                                </span>
                            </figcaption>
                        </motion.figure>
                    ))}
                </div>
            </div>
        </section>
    );
};
