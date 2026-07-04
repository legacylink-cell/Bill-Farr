import { motion } from "framer-motion";
import { HERO_HORSES } from "../../data/content";

const go = (id) => {
    const el = document.getElementById(id);
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20 });
    else el?.scrollIntoView({ behavior: "smooth" });
};

export const Hero = () => {
    return (
        <section
            id="hero"
            data-testid="hero"
            className="relative flex h-[100svh] w-full items-end overflow-hidden"
        >
            <motion.img
                src={HERO_HORSES}
                alt="Wild horses running across the high plains"
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-walnut/90 via-walnut/45 to-walnut/50" />

            <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 pb-16 md:px-12 md:pb-24 [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
                <motion.p
                    className="mb-5 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-sand"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    Western & Travel Photographer
                </motion.p>
                <motion.h1
                    className="max-w-4xl font-serif text-5xl font-light leading-[0.95] tracking-tight text-sand sm:text-6xl md:text-8xl"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                    Where the light
                    <br />
                    <span className="italic text-dune">still runs wild.</span>
                </motion.h1>
                <motion.div
                    className="mt-9 flex flex-col items-start gap-6 sm:flex-row sm:items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.95, duration: 0.8 }}
                >
                    <button
                        data-testid="hero-view-work"
                        onClick={() => go("western")}
                        className="border border-sand px-7 py-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-sand transition-colors duration-300 hover:bg-sand hover:text-walnut"
                    >
                        View the work
                    </button>
                    <p className="max-w-sm text-sm leading-relaxed text-sand/75">
                        Honest photographs of open country and far horizons — made
                        for people who feel the pull of both.
                    </p>
                </motion.div>
            </div>

            <motion.div
                className="absolute bottom-8 right-6 z-10 hidden items-center gap-3 md:right-12 md:flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 1 }}
            >
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-sand/60">
                    Scroll
                </span>
                <motion.span
                    className="h-10 w-px bg-sand/50"
                    animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
                    transition={{ repeat: Infinity, duration: 2 }}
                />
            </motion.div>
        </section>
    );
};
