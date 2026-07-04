import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { journal } from "../../data/content";

export const Journal = () => {
    const [hover, setHover] = useState(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const ref = useRef(null);

    const onMove = (e) => {
        const r = ref.current?.getBoundingClientRect();
        if (r) setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
    };

    return (
        <section
            id="journal"
            data-testid="journal"
            ref={ref}
            onMouseMove={onMove}
            className="relative mx-auto max-w-[1500px] px-6 py-24 md:px-12 md:py-32"
        >
            <div className="mb-10 border-t border-[var(--border-light)] pt-8">
                <p className="overline mb-4">04 — Field Notes</p>
                <h2 className="font-serif text-4xl font-light tracking-tight text-walnut md:text-6xl">
                    The Journal
                </h2>
            </div>

            <div className="flex flex-col">
                {journal.map((post, i) => (
                    <a
                        key={i}
                        href="#journal"
                        data-testid={`journal-item-${i}`}
                        onMouseEnter={() => setHover(i)}
                        onMouseLeave={() => setHover(null)}
                        className="group flex flex-col gap-2 border-b border-[var(--border-light)] py-8 transition-colors hover:border-clay md:flex-row md:items-center md:justify-between md:gap-8"
                    >
                        <div className="flex items-baseline gap-5">
                            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-clay">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <h3 className="font-serif text-3xl font-light leading-tight text-walnut transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
                                {post.title}
                            </h3>
                        </div>
                        <div className="ml-11 flex items-center gap-6 md:ml-0">
                            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink">
                                {post.date} · {post.readtime}
                            </span>
                            <ArrowUpRight
                                className="text-ink transition-all duration-300 group-hover:rotate-45 group-hover:text-clay"
                                strokeWidth={1.2}
                            />
                        </div>
                    </a>
                ))}
            </div>

            <AnimatePresence>
                {hover !== null && (
                    <motion.img
                        key={hover}
                        src={journal[hover].src}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="pointer-events-none absolute z-30 hidden h-64 w-48 object-cover shadow-2xl md:block"
                        style={{ left: pos.x + 24, top: pos.y - 130 }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};
