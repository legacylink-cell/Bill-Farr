import { useEffect, useState } from "react";
import "@/App.css";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { WesternGallery } from "@/components/site/WesternGallery";
import { TravelGallery } from "@/components/site/TravelGallery";
import { Prints } from "@/components/site/Prints";
import { Journal } from "@/components/site/Journal";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

function App() {
    const [prefill, setPrefill] = useState(null);

    useEffect(() => {
        const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
        window.__lenis = lenis;
        let raf;
        const loop = (t) => {
            lenis.raf(t);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
            window.__lenis = null;
        };
    }, []);

    const inquirePrint = (title) => {
        setPrefill({ inquiry_type: "print", subject: `Print inquiry — ${title}` });
        const el = document.getElementById("contact");
        if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20 });
        else el?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="App grain">
            <Toaster
                position="bottom-center"
                toastOptions={{
                    style: {
                        background: "#2A2421",
                        color: "#F5F2EB",
                        border: "1px solid rgba(245,242,235,0.15)",
                        borderRadius: 0,
                        fontFamily: "Outfit, sans-serif",
                    },
                }}
            />
            <Navbar />
            <main>
                <Hero />
                <About />
                <WesternGallery />
                <TravelGallery />
                <Prints onInquire={inquirePrint} />
                <Journal />
                <Contact prefill={prefill} />
            </main>
            <Footer />
        </div>
    );
}

export default App;
