import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Subtle scroll-linked parallax for showcase images.
export const ParallaxImage = ({ src, alt, className = "", range = 4 }) => {
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
                className="w-full scale-[1.1] object-cover will-change-transform"
            />
        </div>
    );
};
