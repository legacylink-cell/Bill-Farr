import { motion } from "framer-motion";

export const Loader = () => (
    <motion.div
        data-testid="loader"
        className="fixed inset-0 z-[100] flex items-center justify-center bg-walnut"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
        <motion.img
            src="/logo-light.webp"
            alt="Bill Farr Photography"
            className="w-56 md:w-72"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-clay"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.3, ease: "easeInOut" }}
        />
    </motion.div>
);
