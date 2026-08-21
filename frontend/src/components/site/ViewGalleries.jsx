import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { galleries } from "../../data/content";

const go = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20 });
    else el.scrollIntoView({ behavior: "smooth" });
};

export const ViewGalleries = () => {
    return (
        <section
            id="galleries"
            data-testid="galleries"
            className="mx-auto max-w-[1500px] px-6 py-20 md:px-12 md:py-28"
        >
            <div className="mb-10 border-t border-[var(--border-light)] pt-8">
                <p className="overline mb-4">Explore</p>
                <h2 className="font-serif text-4xl font-light tracking-tight text-walnut md:text-6xl">
                    View the galleries
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {galleries.map((g, i) => (
                    <motion.button
                        key={g.target}
                        data-testid={`gallery-card-${g.target}`}
                        onClick={() => go(g.target)}
                        className="group relative block aspect-[4/5] w-full overflow-hidden text-left"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <img
                            src={g.src}
                            alt={g.title}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover brightness-[0.85] transition-transform duration-[900ms] ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-walnut/90 via-walnut/20 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                            <div>
                                <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-sand/70">
                                    {g.copy}
                                </p>
                                <h3 className="mt-2 font-serif text-2xl font-light text-sand md:text-3xl">
                                    {g.title}
                                </h3>
                                <span className="mt-3 inline-flex items-center gap-1 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-clay">
                                    View gallery
                                    <ArrowUpRight size={13} strokeWidth={1.6} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </span>
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>
        </section>
    );
};
