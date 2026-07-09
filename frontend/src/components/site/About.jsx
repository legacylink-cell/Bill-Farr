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
                        loading="lazy"
                        decoding="async"
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
                        I'm a Western and travel photographer drawn to the edges of
                        things — wide horizons, quiet roads, and the stories that live
                        in the space between light and shadow. The American West taught
                        me to slow down and pay attention. Dust rising from a horse's
                        hooves, the creak of a saddle, the way a rancher's face carries
                        both weather and wisdom — these are the details I try to honor.
                        But my curiosity doesn't stop at the state line. I carry that
                        same instinct with me across oceans and borders.
                    </p>
                    <p>
                        Taking advantage of my past life in London, I was drawn to the
                        quiet drama of the Lake District, where mist drapes itself over
                        the fells like a worn wool blanket. I've watched fog roll through
                        Scottish glens, revealing a lone tree or a stone cottage with a
                        kind of reverence that feels almost sacred. Europe offers its own
                        rhythm — cobblestone streets glowing after rain, alpine valleys
                        wrapped in cloud, coastal cliffs where the wind carries stories
                        older than any photograph I could make. These places remind me
                        that clarity often arrives in fragments: a break in the fog, a
                        shaft of light, a moment of stillness in a crowded square.
                    </p>
                    <p>
                        My photographs are my way of gathering those fragments. I want
                        them to feel like memories you can step into — warm, weathered,
                        shaped by land and culture. Whether I'm riding alongside cowboys
                        at sunrise, wandering through a market in Prague, or standing
                        alone on a fog-soaked moor, I'm always searching for that quiet
                        spark of truth. Sometimes it's found in the sharpness of a clear
                        sky. Other times, it reveals itself only when the fog settles in
                        and the world becomes simple again.
                    </p>
                </div>
                <p className="mt-8 font-serif text-2xl italic text-walnut">
                    — Bill Farr
                </p>
            </motion.div>
        </section>
    );
};
