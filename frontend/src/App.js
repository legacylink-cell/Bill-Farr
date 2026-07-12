import { useEffect, useState } from "react";
import "@/App.css";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { Loader } from "@/components/site/Loader";
import { AnalyticsDashboard } from "@/components/site/AnalyticsDashboard";
import { track } from "@/lib/analytics";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { WesternGallery } from "@/components/site/WesternGallery";
import { TravelGallery } from "@/components/site/TravelGallery";
import { Journal } from "@/components/site/Journal";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 1500);
        track("pageview");
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        const lenis = new Lenis({ lerp: 0.14, wheelMultiplier: 1, smoothWheel: true });
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

    return (
        <div className="App grain">
            <AnimatePresence>{loading && <Loader />}</AnimatePresence>
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
                <Journal />
                <Contact />
            </main>
            <Footer />
            <AnalyticsDashboard />
        </div>
    );
}

export default App;
