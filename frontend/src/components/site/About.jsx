import { motion } from "framer-motion";
import { PORTRAIT } from "../../data/content";

const fade = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

export const About = () => {
    return (
        <section
            id="about"
            data-testid="about"
            className="mx-auto grid max-w-[1500px] grid-cols-1 gap-12 px-6 py-24 md:grid-cols-12 md:px-12 md:py-36"
        >
            <motion.div className="md:col-span-5" {...fade}>
                <div className="relative">
                    <img
                        src={PORTRAIT}
                        alt="Portrait of Bill Farr"
                        className="w-full object-cover grayscale-[0.15]"
                    />
                    <span className="absolute -bottom-4 -right-4 hidden border border-clay px-4 py-2 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-clay md:block bg-sand">
                        Behind the lens
                    </span>
                </div>
            </motion.div>

            <motion.div
                className="flex flex-col justify-center md:col-span-6 md:col-start-7"
                {...fade}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
                <p className="overline mb-6">The Photographer</p>
                <h2 className="font-serif text-4xl font-light leading-tight tracking-tight text-walnut md:text-5xl">
                    I photograph the space
                    <br />
                    between people and the land
                    <span className="text-clay">.</span>
                </h2>
                <div className="mt-8 space-y-5 text-base leading-relaxed text-ink md:text-lg">
                    <p>
                        I'm Bill Farr — a Western and travel photographer chasing the
                        kind of light that only shows up when you've waited long enough
                        for it. My work lives out on the range and along the road: wild
                        horses, working hands, and the wide, unhurried country in
                        between.
                    </p>
                    <p>
                        Every frame is an attempt to hold onto a feeling — the hush
                        before a storm, the warmth of last light, the quiet dignity of
                        a place that doesn't need you to notice it. I hope you feel some
                        of that here.
                    </p>
                </div>
                <p className="mt-8 font-serif text-2xl italic text-walnut">
                    — Bill Farr
                </p>
            </motion.div>
        </section>
    );
};
