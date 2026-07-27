import { Instagram } from "lucide-react";
import { track } from "../../lib/analytics";


export const Footer = () => {
    return (
        <footer data-testid="footer" className="bg-walnut text-sand">
            <div className="mx-auto max-w-[1500px] border-t border-[var(--border-dark)] px-6 py-10 md:px-12">
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                    <div>
                        <img
                            src="/logo-light.webp"
                            alt="Bill Farr Photography"
                            className="h-14 w-auto md:h-16"
                        />
                        <a
                            href="https://www.instagram.com/billfarr_photography59/"
                            target="_blank"
                            rel="noreferrer"
                            data-testid="footer-instagram"
                            onClick={() => track("cta_click", { label: "Instagram" })}
                            className="mt-4 inline-flex items-center gap-2 font-mono text-[0.7rem] normal-case tracking-[0.15em] text-sand/60 transition-colors hover:text-clay"
                        >
                            <Instagram size={16} strokeWidth={1.4} />
                            @billfarr_photography59
                        </a>
                    </div>
                    <p className="max-w-xs font-serif text-lg italic text-sand/60">
                        "The best photographs are the ones you had to be present for."
                    </p>
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-sand/40">
                        © {new Date().getFullYear()} Bill Farr — All rights reserved
                    </p>
                </div>

                <div className="mt-8 flex justify-center border-t border-[var(--border-dark)] pt-6">
                    <a
                        href="https://mozeid.com/"
                        target="_blank"
                        rel="noreferrer"
                        data-testid="footer-credit"
                        className="link-underline font-mono text-[0.6rem] uppercase tracking-[0.25em] text-sand/50 transition-colors hover:text-clay"
                    >
                        Designed by Mo Studio
                    </a>
                </div>
            </div>
        </footer>
    );
};
