import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
    { label: "Work", id: "western" },
    { label: "Travel", id: "travel" },
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
                    ? "border-b border-[var(--border-light)] bg-sand/85 backdrop-blur-md"
                    : "border-b border-transparent"
            }`}
        >
            <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4 md:px-12">
                <button
                    data-testid="nav-logo"
                    onClick={() => go("hero")}
                    className="text-left leading-none"
                >
                    <img
                        src={scrolled ? "/logo-dark.webp" : "/logo-light.webp"}
                        alt="Bill Farr Photography"
                        className="h-11 w-auto md:h-14"
                    />
                </button>

                <div className="hidden items-center gap-9 md:flex">
                    {links.map((l) => (
                        <button
                            key={l.id}
                            data-testid={`nav-${l.id}`}
                            onClick={() => go(l.id)}
                            className={`link-underline font-mono text-[0.7rem] uppercase tracking-[0.2em] transition-colors ${
                                scrolled
                                    ? "text-ink hover:text-walnut"
                                    : "text-sand/90 hover:text-sand [text-shadow:0_1px_10px_rgba(0,0,0,0.4)]"
                            }`}
                        >
                            {l.label}
                        </button>
                    ))}
                    <button
                        data-testid="nav-contact"
                        onClick={() => go("contact")}
                        className={`border px-5 py-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] transition-colors duration-300 ${
                            scrolled
                                ? "border-walnut text-walnut hover:bg-walnut hover:text-sand"
                                : "border-sand text-sand hover:bg-sand hover:text-walnut"
                        }`}
                    >
                        Book a shoot
                    </button>
                </div>

                <button
                    data-testid="nav-mobile-toggle"
                    className={`md:hidden ${scrolled ? "text-walnut" : "text-sand"}`}
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
                        className="overflow-hidden border-t border-[var(--border-light)] bg-sand/95 md:hidden"
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
