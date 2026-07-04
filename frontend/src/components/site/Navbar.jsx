import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
    { label: "Work", id: "western" },
    { label: "Travel", id: "travel" },
    { label: "Prints", id: "prints" },
    { label: "Journal", id: "journal" },
    { label: "About", id: "about" },
];

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const go = (id) => {
        setOpen(false);
        const el = document.getElementById(id);
        if (!el) return;
        if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20 });
        else el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <header
            data-testid="navbar"
            className={`fixed inset-x-0 top-0 z-[70] transition-all duration-500 ${
                scrolled
                    ? "border-b border-[var(--border-light)] bg-sand/80 backdrop-blur-xl"
                    : "border-b border-transparent"
            }`}
        >
            <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4 md:px-12">
                <button
                    data-testid="nav-logo"
                    onClick={() => go("hero")}
                    className="text-left leading-none"
                >
                    <span className="block font-serif text-xl tracking-tight text-walnut md:text-2xl">
                        Bill Farr
                    </span>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-clay">
                        Western · Travel
                    </span>
                </button>

                <div className="hidden items-center gap-9 md:flex">
                    {links.map((l) => (
                        <button
                            key={l.id}
                            data-testid={`nav-${l.id}`}
                            onClick={() => go(l.id)}
                            className="link-underline font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink transition-colors hover:text-walnut"
                        >
                            {l.label}
                        </button>
                    ))}
                    <button
                        data-testid="nav-contact"
                        onClick={() => go("contact")}
                        className="border border-walnut px-5 py-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-walnut transition-colors duration-300 hover:bg-walnut hover:text-sand"
                    >
                        Book a shoot
                    </button>
                </div>

                <button
                    data-testid="nav-mobile-toggle"
                    className="text-walnut md:hidden"
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Menu"
                >
                    {open ? <X strokeWidth={1.4} /> : <Menu strokeWidth={1.4} />}
                </button>
            </nav>

            <AnimatePresence>
                {open && (
                    <motion.div
                        data-testid="nav-mobile-menu"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-[var(--border-light)] bg-sand/95 backdrop-blur-xl md:hidden"
                    >
                        <div className="flex flex-col px-6 py-4">
                            {[...links, { label: "Book a shoot", id: "contact" }].map((l) => (
                                <button
                                    key={l.id}
                                    data-testid={`nav-mobile-${l.id}`}
                                    onClick={() => go(l.id)}
                                    className="border-b border-[var(--border-light)] py-4 text-left font-serif text-2xl text-walnut"
                                >
                                    {l.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
