import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Star, X, Loader2, Quote, ImagePlus } from "lucide-react";
import { track } from "../../lib/analytics";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const BACKEND = process.env.REACT_APP_BACKEND_URL;

const Stars = ({ value, onChange, size = 18 }) => (
    <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
            <button
                key={n}
                type={onChange ? "button" : undefined}
                onClick={onChange ? () => onChange(n) : undefined}
                data-testid={onChange ? `star-${n}` : undefined}
                className={onChange ? "transition-transform hover:scale-110" : "cursor-default"}
                aria-label={`${n} star${n > 1 ? "s" : ""}`}
                tabIndex={onChange ? 0 : -1}
            >
                <Star
                    size={size}
                    strokeWidth={1.4}
                    className={n <= value ? "fill-clay text-clay" : "text-walnut/25"}
                />
            </button>
        ))}
    </div>
);

const empty = { name: "", location: "", purchased: "", rating: 5, text: "" };

export const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(empty);
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const [sending, setSending] = useState(false);
    const fileRef = useRef(null);

    const fetchReviews = () => {
        axios.get(`${API}/reviews`).then((r) => setReviews(r.data)).catch(() => {});
    };
    useEffect(fetchReviews, []);

    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const onPhoto = (e) => {
        const f = e.target.files?.[0];
        if (!f) return;
        if (f.size > 8 * 1024 * 1024) {
            toast.error("Please choose an image under 8MB.");
            return;
        }
        setPhoto(f);
        setPreview(URL.createObjectURL(f));
    };

    const openModal = () => {
        track("cta_click", { label: "Leave a Review" });
        setModal(true);
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.text.trim()) {
            toast.error("Please add your name and a few words.");
            return;
        }
        setSending(true);
        try {
            const fd = new FormData();
            fd.append("name", form.name);
            fd.append("text", form.text);
            fd.append("rating", String(form.rating));
            fd.append("location", form.location);
            fd.append("purchased", form.purchased);
            if (photo) fd.append("photo", photo);
            await axios.post(`${API}/reviews`, fd);
            toast.success("Thank you — your review matters to us. It'll appear once Bill approves it.");
            setForm(empty);
            setPhoto(null);
            setPreview(null);
            setModal(false);
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setSending(false);
        }
    };

    return (
        <section id="reviews" data-testid="reviews" className="mx-auto max-w-[1500px] px-6 py-24 md:px-12 md:py-32">
            <div className="mb-12 flex flex-col justify-between gap-6 border-t border-[var(--border-light)] pt-8 md:flex-row md:items-end">
                <div>
                    <p className="overline mb-4">Kind words</p>
                    <h2 className="font-serif text-4xl font-light tracking-tight text-walnut md:text-6xl">
                        What people say
                    </h2>
                </div>
                <button
                    data-testid="leave-review-btn"
                    onClick={openModal}
                    className="self-start border border-walnut px-6 py-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-walnut transition-colors duration-300 hover:bg-walnut hover:text-sand md:self-auto"
                >
                    Leave a review
                </button>
            </div>

            {reviews.length === 0 ? (
                <div className="border border-dashed border-[var(--border-light)] py-16 text-center">
                    <Quote className="mx-auto text-clay" strokeWidth={1.2} />
                    <p className="mt-4 font-serif text-xl italic text-ink">
                        Be the first to share your experience.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {reviews.map((r) => (
                        <motion.article
                            key={r.id}
                            data-testid={`review-card-${r.id}`}
                            className="flex flex-col border border-[var(--border-light)] p-6"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="flex items-center gap-4">
                                {r.photo ? (
                                    <img
                                        src={`${BACKEND}${r.photo}`}
                                        alt={r.name}
                                        loading="lazy"
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-walnut/10 font-serif text-lg text-walnut">
                                        {r.name.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <p className="font-serif text-lg text-walnut">{r.name}</p>
                                    {r.location && (
                                        <p className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-ink">{r.location}</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4">
                                <Stars value={r.rating} size={15} />
                            </div>
                            <p className="mt-4 flex-1 leading-relaxed text-ink">"{r.text}"</p>
                            {r.purchased && (
                                <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-clay">
                                    {r.purchased}
                                </p>
                            )}
                            {r.reply && (
                                <div className="mt-5 border-l-2 border-clay bg-walnut/5 pl-4 py-3">
                                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-clay">Bill's response</p>
                                    <p className="mt-1 font-serif italic leading-relaxed text-walnut">{r.reply}</p>
                                </div>
                            )}
                        </motion.article>
                    ))}
                </div>
            )}

            <AnimatePresence>
                {modal && (
                    <motion.div
                        data-testid="review-modal"
                        data-lenis-prevent
                        className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto overscroll-contain bg-walnut/60 p-4 backdrop-blur-sm md:p-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setModal(false)}
                    >
                        <motion.form
                            onSubmit={submit}
                            className="relative my-auto w-full max-w-lg bg-sand p-6 md:p-10"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                type="button"
                                data-testid="review-modal-close"
                                onClick={() => setModal(false)}
                                className="absolute right-4 top-4 text-walnut hover:text-clay"
                                aria-label="Close"
                            >
                                <X strokeWidth={1.4} />
                            </button>
                            <p className="overline mb-2">Share your experience</p>
                            <h3 className="font-serif text-3xl font-light text-walnut">Leave a review</h3>

                            <div className="mt-6 space-y-5">
                                <div className="flex items-center gap-4">
                                    <button
                                        type="button"
                                        onClick={() => fileRef.current?.click()}
                                        data-testid="review-photo-btn"
                                        className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-dashed border-walnut/40 text-walnut/50 transition-colors hover:border-clay hover:text-clay"
                                    >
                                        {preview ? (
                                            <img src={preview} alt="preview" className="h-full w-full object-cover" />
                                        ) : (
                                            <ImagePlus size={22} strokeWidth={1.3} />
                                        )}
                                    </button>
                                    <div>
                                        <p className="text-sm text-walnut">Add your photo</p>
                                        <p className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-ink">Optional · JPG/PNG</p>
                                    </div>
                                    <input ref={fileRef} type="file" accept="image/*" onChange={onPhoto} className="hidden" data-testid="review-photo-input" />
                                </div>

                                <input data-testid="review-name" className="w-full border-0 border-b border-walnut/30 bg-transparent py-2 text-walnut placeholder:text-ink/50 focus:border-clay focus:outline-none" placeholder="Your name" value={form.name} onChange={set("name")} />
                                <input data-testid="review-location" className="w-full border-0 border-b border-walnut/30 bg-transparent py-2 text-walnut placeholder:text-ink/50 focus:border-clay focus:outline-none" placeholder="State / Country" value={form.location} onChange={set("location")} />
                                <input data-testid="review-purchased" className="w-full border-0 border-b border-walnut/30 bg-transparent py-2 text-walnut placeholder:text-ink/50 focus:border-clay focus:outline-none" placeholder="What did you purchase? (e.g. First Light — 24×36 print)" value={form.purchased} onChange={set("purchased")} />

                                <div className="flex items-center gap-4 pt-1">
                                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-ink">Rating</span>
                                    <Stars value={form.rating} onChange={(n) => setForm((f) => ({ ...f, rating: n }))} />
                                </div>

                                <textarea data-testid="review-text" rows={4} className="w-full resize-none border-0 border-b border-walnut/30 bg-transparent py-2 text-walnut placeholder:text-ink/50 focus:border-clay focus:outline-none" placeholder="Tell us about your experience…" value={form.text} onChange={set("text")} />

                                <button
                                    type="submit"
                                    data-testid="review-submit"
                                    disabled={sending}
                                    className="flex w-full items-center justify-center gap-3 border border-walnut bg-walnut py-3 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-sand transition-colors duration-300 hover:bg-transparent hover:text-walnut disabled:opacity-60"
                                >
                                    {sending && <Loader2 size={16} className="animate-spin" />}
                                    {sending ? "Sending" : "Submit review"}
                                </button>
                            </div>
                        </motion.form>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
