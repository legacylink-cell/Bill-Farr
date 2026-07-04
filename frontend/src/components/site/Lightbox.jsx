import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

export const Lightbox = ({ images, index, onClose, onNav }) => {
    const open = index !== null && index >= 0;

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onNav(1);
            if (e.key === "ArrowLeft") onNav(-1);
        };
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open, onClose, onNav]);

    const img = open ? images[index] : null;

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    data-testid="lightbox"
                    className="fixed inset-0 z-[80] flex items-center justify-center bg-walnut/97 px-4 py-16 md:px-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <button
                        data-testid="lightbox-close"
                        onClick={onClose}
                        className="absolute right-5 top-5 text-sand/70 transition-colors hover:text-sand"
                        aria-label="Close"
                    >
                        <X strokeWidth={1} size={30} />
                    </button>

                    <button
                        data-testid="lightbox-prev"
                        onClick={(e) => { e.stopPropagation(); onNav(-1); }}
                        className="absolute left-3 md:left-8 text-sand/50 transition-colors hover:text-sand"
                        aria-label="Previous"
                    >
                        <ChevronLeft strokeWidth={1} size={40} />
                    </button>
                    <button
                        data-testid="lightbox-next"
                        onClick={(e) => { e.stopPropagation(); onNav(1); }}
                        className="absolute right-3 md:right-8 text-sand/50 transition-colors hover:text-sand"
                        aria-label="Next"
                    >
                        <ChevronRight strokeWidth={1} size={40} />
                    </button>

                    <motion.figure
                        key={index}
                        className="flex max-h-full max-w-5xl flex-col items-center"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={img.src}
                            alt={img.title}
                            className="max-h-[78vh] w-auto object-contain"
                        />
                        <figcaption className="mt-5 flex w-full items-baseline justify-between gap-6 border-t border-sand/15 pt-3 text-sand">
                            <span className="font-serif text-2xl">{img.title}</span>
                            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-sand/50">
                                {img.location}
                            </span>
                        </figcaption>
                    </motion.figure>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
