import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, MapPin, Loader2 } from "lucide-react";
import { track } from "../../lib/analytics";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const empty = { name: "", email: "", inquiry_type: "booking", subject: "", phone: "", message: "" };

const types = [
    { v: "booking", l: "Book a shoot" },
    { v: "general", l: "General" },
];

export const Contact = ({ prefill }) => {
    const [form, setForm] = useState(empty);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        if (prefill) setForm((f) => ({ ...f, ...prefill }));
    }, [prefill]);

    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            toast.error("Please fill in your name, email and message.");
            return;
        }
        setSending(true);
        try {
            await axios.post(`${API}/inquiries`, form);
            toast.success("Thank you — your message is on its way to Bill.");
            setForm(empty);
            track("inquiry");
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setSending(false);
        }
    };

    const inputCls =
        "w-full border-0 border-b border-[var(--border-dark)] bg-transparent py-3 text-sand placeholder:text-sand/40 focus:border-clay focus:outline-none transition-colors";

    return (
        <section
            id="contact"
            data-testid="contact"
            className="bg-walnut py-24 text-sand md:py-36"
        >
            <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-14 px-6 md:grid-cols-12 md:px-12">
                <motion.div
                    className="md:col-span-5"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="overline mb-6">Let's make something</p>
                    <h2 className="font-serif text-4xl font-light leading-tight tracking-tight text-sand md:text-6xl">
                        Booking travel,
                        <br />
                        commissions & prints.
                    </h2>
                    <p className="mt-8 max-w-md leading-relaxed text-sand/60">
                        Tell me about your ranch, your route, or the print you have in
                        mind. I read every message myself and usually reply within a
                        couple of days.
                    </p>

                    <div className="mt-12 space-y-5">
                        <a
                            href="mailto:bill@billfarrphotography.com"
                            data-testid="contact-email"
                            onClick={() => track("cta_click", { label: "Email Bill" })}
                            className="flex items-center gap-4 text-sand/80 transition-colors hover:text-clay"
                        >
                            <Mail strokeWidth={1.2} size={20} />
                            <span className="font-mono text-sm tracking-wide">bill@billfarrphotography.com</span>
                        </a>
                        <div className="flex items-center gap-4 text-sand/80">
                            <MapPin strokeWidth={1.2} size={20} />
                            <span className="font-mono text-sm tracking-wide">
                                Based in the American West · Traveling worldwide
                            </span>
                        </div>
                    </div>
                </motion.div>

                <motion.form
                    onSubmit={submit}
                    data-testid="contact-form"
                    className="flex flex-col gap-6 md:col-span-6 md:col-start-7"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                >
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <input
                            data-testid="contact-name"
                            autoComplete="off"
                            className={inputCls}
                            placeholder="Your name"
                            value={form.name}
                            onChange={set("name")}
                        />
                        <input
                            data-testid="contact-email-input"
                            type="email"
                            autoComplete="off"
                            className={inputCls}
                            placeholder="Email address"
                            value={form.email}
                            onChange={set("email")}
                        />
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {types.map((t) => (
                            <button
                                type="button"
                                key={t.v}
                                data-testid={`contact-type-${t.v}`}
                                onClick={() => setForm((f) => ({ ...f, inquiry_type: t.v }))}
                                className={`border px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] transition-colors ${
                                    form.inquiry_type === t.v
                                        ? "border-clay bg-clay text-sand"
                                        : "border-[var(--border-dark)] text-sand/60 hover:text-sand"
                                }`}
                            >
                                {t.l}
                            </button>
                        ))}
                    </div>

                    <input
                        data-testid="contact-subject"
                        autoComplete="off"
                        className={inputCls}
                        placeholder="Subject (optional)"
                        value={form.subject}
                        onChange={set("subject")}
                    />
                    <input
                        data-testid="contact-phone"
                        type="tel"
                        autoComplete="off"
                        className={inputCls}
                        placeholder="Phone number (optional)"
                        value={form.phone}
                        onChange={set("phone")}
                    />
                    <textarea
                        data-testid="contact-message"
                        autoComplete="off"
                        rows={4}
                        className={`${inputCls} resize-none`}
                        placeholder="Tell me a little about it…"
                        value={form.message}
                        onChange={set("message")}
                    />

                    <button
                        type="submit"
                        data-testid="contact-submit"
                        disabled={sending}
                        className="mt-2 flex items-center justify-center gap-3 border border-sand bg-sand py-4 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-walnut transition-colors duration-300 hover:bg-transparent hover:text-sand disabled:opacity-60"
                    >
                        {sending && <Loader2 size={16} className="animate-spin" />}
                        {sending ? "Sending" : "Send message"}
                    </button>

                    <a
                        href={`mailto:bill@billfarrphotography.com?subject=${encodeURIComponent(
                            form.subject || "Photography inquiry"
                        )}&body=${encodeURIComponent(form.message || "")}`}
                        data-testid="contact-email-direct"
                        onClick={() => track("cta_click", { label: "Email Bill" })}
                        className="-mt-1 flex items-center justify-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-sand/50 transition-colors hover:text-clay"
                    >
                        <Mail size={13} strokeWidth={1.4} />
                        Prefer email? Write to Bill directly
                    </a>
                </motion.form>
            </div>
        </section>
    );
};
