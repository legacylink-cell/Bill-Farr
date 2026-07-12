import { useEffect, useState } from "react";
import axios from "axios";
import { X, Eye, Send, TrendingUp } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Stat = ({ icon, label, value }) => (
    <div className="border border-[var(--border-light)] p-5">
        <div className="mb-3 flex items-center gap-2 text-clay">{icon}</div>
        <div className="font-serif text-4xl text-walnut">{value}</div>
        <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink">{label}</div>
    </div>
);

export const AnalyticsDashboard = () => {
    const [open, setOpen] = useState(window.location.hash === "#insights");
    const [key, setKey] = useState(localStorage.getItem("bf_ak") || "");
    const [data, setData] = useState(null);
    const [err, setErr] = useState("");

    useEffect(() => {
        const h = () => setOpen(window.location.hash === "#insights");
        window.addEventListener("hashchange", h);
        return () => window.removeEventListener("hashchange", h);
    }, []);

    const load = async () => {
        try {
            const r = await axios.get(`${API}/analytics/summary`, { params: { key } });
            setData(r.data);
            localStorage.setItem("bf_ak", key);
            setErr("");
        } catch {
            setErr("Invalid access key");
        }
    };

    useEffect(() => {
        if (open && key && !data) load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    if (!open) return null;

    const close = () => {
        window.location.hash = "";
        setOpen(false);
    };

    return (
        <div data-testid="analytics-dashboard" className="fixed inset-0 z-[90] overflow-y-auto bg-sand p-6 md:p-14">
            <button
                data-testid="analytics-close"
                onClick={close}
                className="absolute right-6 top-6 text-walnut hover:text-clay"
                aria-label="Close"
            >
                <X strokeWidth={1.4} />
            </button>

            <div className="mx-auto max-w-5xl">
                <p className="overline mb-3">Private · Insights</p>
                <h2 className="font-serif text-4xl font-light text-walnut md:text-5xl">Site Analytics</h2>

                {!data ? (
                    <div className="mt-10 max-w-sm">
                        <input
                            data-testid="analytics-key"
                            type="password"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && load()}
                            placeholder="Access key"
                            className="w-full border-0 border-b border-walnut/30 bg-transparent py-3 text-walnut focus:border-clay focus:outline-none"
                        />
                        {err && <p className="mt-2 font-mono text-xs text-red-700">{err}</p>}
                        <button
                            data-testid="analytics-unlock"
                            onClick={load}
                            className="mt-5 border border-walnut px-6 py-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-walnut transition-colors hover:bg-walnut hover:text-sand"
                        >
                            View insights
                        </button>
                    </div>
                ) : (
                    <div className="mt-10">
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            <Stat icon={<Eye size={18} strokeWidth={1.4} />} label="Total views" value={data.totals.views} />
                            <Stat icon={<Eye size={18} strokeWidth={1.4} />} label="Views · 7 days" value={data.last7} />
                            <Stat icon={<Send size={18} strokeWidth={1.4} />} label="Inquiries" value={data.totals.inquiries} />
                            <Stat icon={<TrendingUp size={18} strokeWidth={1.4} />} label="Conversion" value={`${data.totals.conversion}%`} />
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
                            <div>
                                <h3 className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-clay">Top sources</h3>
                                {data.topReferrers.length === 0 && <p className="text-sm text-ink">No data yet.</p>}
                                {data.topReferrers.map((r) => (
                                    <div key={r.host} className="flex justify-between border-b border-[var(--border-light)] py-2 text-sm text-walnut">
                                        <span>{r.host}</span>
                                        <span className="font-mono text-ink">{r.count}</span>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h3 className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-clay">Devices</h3>
                                <div className="flex justify-between border-b border-[var(--border-light)] py-2 text-sm text-walnut">
                                    <span>Mobile</span><span className="font-mono text-ink">{data.devices.mobile}</span>
                                </div>
                                <div className="flex justify-between border-b border-[var(--border-light)] py-2 text-sm text-walnut">
                                    <span>Desktop</span><span className="font-mono text-ink">{data.devices.desktop}</span>
                                </div>
                            </div>
                        </div>
                        <p className="mt-10 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink">
                            Cookieless · first-party · {data.totals.views} events tracked
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
