import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { journal } from "../../data/content";

export const Journal = () => {
    const [hover, setHover] = useState(null);
    const [open, setOpen] = useState(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const ref = useRef(null);

    const onMove = (e) => {
        const r = ref.current?.getBoundingClientRect();
        if (r) setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
    };

    useEffect(() => {
        if (open === null) return;
        const onKey = (e) => e.key === "Escape" && setOpen(null);
        window.addEventListener("keydown", onKey);
        window.__lenis?.stop();
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            window.__lenis?.start();
            document.body.style.overflow = "";
        };
    }, [open]);

    const post = open !== null ? journal[open] : null;

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
                {journal.map((entry, i) => (
                    <button
                        key={i}
                        type="button"
                        data-testid={`journal-item-${i}`}
                        onClick={() => setOpen(i)}
                        onMouseEnter={() => setHover(i)}
                        onMouseLeave={() => setHover(null)}
                        className="group flex flex-col gap-2 border-b border-[var(--border-light)] py-8 text-left transition-colors hover:border-clay md:flex-row md:items-center md:justify-between md:gap-8"
                    >
                        <div className="flex items-baseline gap-5">
                            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-clay">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <h3 className="font-serif text-3xl font-light leading-tight text-walnut transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
                                {entry.title}
                            </h3>
                        </div>
                        <div className="ml-11 flex items-center gap-6 md:ml-0">
                            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink">
                                {entry.date} · {entry.readtime}
                            </span>
                            <ArrowUpRight
                                className="text-ink transition-all duration-300 group-hover:rotate-45 group-hover:text-clay"
                                strokeWidth={1.2}
                            />
                        </div>
                    </button>
                ))}
            </div>

            <AnimatePresence>
                {hover !== null && open === null && (
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

            <AnimatePresence>
                {post && (
                    <motion.div
                        data-testid="journal-modal"
                        data-lenis-prevent
                        className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto overscroll-contain bg-walnut/60 p-4 backdrop-blur-sm md:p-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(null)}
                    >
                        <motion.article
                            className="relative my-auto w-full max-w-3xl bg-sand"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                data-testid="journal-modal-close"
                                onClick={() => setOpen(null)}
                                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center bg-walnut/70 text-sand transition-colors hover:bg-clay"
                                aria-label="Close"
                            >
                                <X strokeWidth={1.4} size={20} />
                            </button>
                            <img
                                src={post.src}
                                alt={post.title}
                                className="aspect-[16/9] w-full object-cover"
                            />
                            <div className="px-6 py-8 md:px-12 md:py-12">
                                <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-clay">
                                    {post.date} · {post.readtime}
                                </p>
                                <h3
                                    data-testid="journal-modal-title"
                                    className="mt-4 font-serif text-3xl font-light leading-tight tracking-tight text-walnut md:text-5xl"
                                >
                                    {post.title}
                                </h3>
                                <p className="mt-5 font-serif text-xl italic leading-relaxed text-ink">
                                    {post.excerpt}
                                </p>
                                <div className="mt-8 space-y-5 text-base leading-relaxed text-ink md:text-lg">
                                    {post.body.map((para, k) => (
                                        <p key={k}>{para}</p>
                                    ))}
                                </div>
                                <p className="mt-10 border-t border-[var(--border-light)] pt-6 font-serif text-2xl italic text-walnut">
                                    — Bill Farr
                                </p>
                            </div>
                        </motion.article>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
