import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Subtle scroll-linked parallax for showcase images.
export const ParallaxImage = ({ src, alt, className = "", range = 7 }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`]);

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                style={{ y }}
                className="-mt-[12%] h-[125%] w-full object-cover will-change-transform"
            />
        </div>
    );
};
