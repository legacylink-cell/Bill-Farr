import { motion } from "framer-motion";
import { prints } from "../../data/content";

export const Prints = ({ onInquire }) => {
    return (
        <section
            id="prints"
            data-testid="prints"
            className="mx-auto max-w-[1500px] px-6 py-24 md:px-12 md:py-32"
        >
            <div className="mb-14 flex flex-col justify-between gap-4 border-t border-[var(--border-light)] pt-8 md:flex-row md:items-end">
                <div>
                    <p className="overline mb-4">03 — The Print Shop</p>
                    <h2 className="font-serif text-4xl font-light tracking-tight text-walnut md:text-6xl">
                        Prints for the wall
                    </h2>
                </div>
                <p className="max-w-md text-sm leading-relaxed text-ink md:text-right">
                    Limited-edition archival prints, signed and numbered. Each one
                    printed to order on museum-grade paper.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
                {prints.map((p, i) => (
                    <motion.div
                        key={i}
                        data-testid={`print-item-${i}`}
                        className="group flex flex-col"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="overflow-hidden bg-dune">
                            <img
                                src={p.src}
                                alt={p.title}
                                className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                        </div>
                        <div className="mt-5 flex items-start justify-between gap-4 border-t border-[var(--border-light)] pt-4">
                            <div>
                                <h3 className="font-serif text-2xl text-walnut">{p.title}</h3>
                                <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-ink">
                                    {p.edition}
                                </p>
                            </div>
                            <span className="font-mono text-lg text-clay">{p.price}</span>
                        </div>
                        <button
                            data-testid={`print-inquire-${i}`}
                            onClick={() => onInquire(p.title)}
                            className="mt-4 border border-walnut py-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-walnut transition-colors duration-300 hover:bg-walnut hover:text-sand"
                        >
                            Inquire to purchase
                        </button>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
