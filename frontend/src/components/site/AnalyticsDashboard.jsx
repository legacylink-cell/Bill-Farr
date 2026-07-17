import { useEffect, useState } from "react";
import axios from "axios";
import { X, Eye, Send, TrendingUp, Gauge, Smartphone, Monitor } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const isInsightsRoute = () =>
    window.location.hash === "#insights" || window.location.pathname.replace(/\/$/, "") === "/insights";

const fmtMs = (v) => (v == null ? "—" : v >= 1000 ? `${(v / 1000).toFixed(1)}s` : `${v}ms`);

const Stat = ({ icon, label, value }) => (
    <div className="border border-[var(--border-light)] p-5">
        <div className="mb-3 flex items-center gap-2 text-clay">{icon}</div>
        <div className="font-serif text-4xl text-walnut">{value}</div>
        <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink">{label}</div>
    </div>
);

const RankList = ({ title, items, testid, empty = "No data yet." }) => {
    const max = Math.max(1, ...(items || []).map((x) => x.count));
    return (
        <div data-testid={testid}>
            <h3 className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-clay">{title}</h3>
            {(!items || items.length === 0) && <p className="text-sm text-ink">{empty}</p>}
            {items &&
                items.map((it) => (
                    <div key={it.label} className="mb-3">
                        <div className="flex items-baseline justify-between gap-3 text-sm text-walnut">
                            <span className="truncate">{it.label}</span>
                            <span className="font-mono text-ink">{it.count}</span>
                        </div>
                        <div className="mt-1.5 h-1 w-full bg-walnut/10">
                            <div className="h-1 bg-clay" style={{ width: `${(it.count / max) * 100}%` }} />
                        </div>
                    </div>
                ))}
        </div>
    );
};

const DailyChart = ({ data }) => {
    const max = Math.max(1, ...(data || []).map((d) => d.count));
    return (
        <div data-testid="analytics-daily">
            <h3 className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-clay">Views · last 30 days</h3>
            <div className="flex h-28 items-end gap-[3px]">
                {(data || []).map((d) => (
                    <div
                        key={d.date}
                        title={`${d.date}: ${d.count}`}
                        className="flex-1 bg-clay/70 transition-colors hover:bg-clay"
                        style={{ height: `${d.count ? Math.max(4, (d.count / max) * 100) : 2}%` }}
                    />
                ))}
            </div>
            <div className="mt-2 flex justify-between font-mono text-[0.55rem] uppercase tracking-[0.15em] text-ink">
                <span>{data?.[0]?.date}</span>
                <span>{data?.[data.length - 1]?.date}</span>
            </div>
        </div>
    );
};

export const AnalyticsDashboard = () => {
    const [open, setOpen] = useState(isInsightsRoute());
    const [key, setKey] = useState(localStorage.getItem("bf_ak") || "");
    const [data, setData] = useState(null);
    const [err, setErr] = useState("");

    useEffect(() => {
        const h = () => setOpen(isInsightsRoute());
        window.addEventListener("hashchange", h);
        window.addEventListener("popstate", h);
        return () => {
            window.removeEventListener("hashchange", h);
            window.removeEventListener("popstate", h);
        };
    }, []);

    // Lock background scroll while the dashboard overlay is open.
    useEffect(() => {
        if (!open) return;
        window.__lenis?.stop();
        document.body.style.overflow = "hidden";
        return () => {
            window.__lenis?.start();
            document.body.style.overflow = "";
        };
    }, [open]);

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
        if (window.location.pathname.replace(/\/$/, "") === "/insights") {
            window.history.replaceState(null, "", "/");
        } else {
            window.location.hash = "";
        }
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
                    <div className="mt-10 space-y-12">
                        {/* Headline stats */}
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            <Stat icon={<Eye size={18} strokeWidth={1.4} />} label="Total views" value={data.totals.views} />
                            <Stat icon={<Eye size={18} strokeWidth={1.4} />} label="Views · 7 days" value={data.last7} />
                            <Stat icon={<Send size={18} strokeWidth={1.4} />} label="Inquiries" value={data.totals.inquiries} />
                            <Stat icon={<TrendingUp size={18} strokeWidth={1.4} />} label="Conversion" value={`${data.totals.conversion}%`} />
                        </div>

                        {/* Speed */}
                        {data.speed && (
                            <div className="grid grid-cols-3 gap-4">
                                <Stat icon={<Gauge size={18} strokeWidth={1.4} />} label="Avg load" value={fmtMs(data.speed.avg)} />
                                <Stat icon={<Smartphone size={18} strokeWidth={1.4} />} label="Mobile load" value={fmtMs(data.speed.mobile)} />
                                <Stat icon={<Monitor size={18} strokeWidth={1.4} />} label="Desktop load" value={fmtMs(data.speed.desktop)} />
                            </div>
                        )}

                        {/* Traffic trend */}
                        <DailyChart data={data.viewsDaily} />

                        {/* Engagement */}
                        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                            <RankList testid="analytics-journals" title="Most-read journal stories" items={data.topJournals} />
                            <RankList testid="analytics-images" title="Most-viewed photos" items={data.topImages} />
                        </div>

                        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                            <RankList testid="analytics-cta" title="Button clicks (booking intent)" items={data.ctaClicks} />
                            <RankList testid="analytics-sections" title="How far visitors scroll" items={data.sectionReach} />
                        </div>

                        {/* Audience */}
                        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                            <RankList testid="analytics-referrers" title="Top sources" items={data.topReferrers} />
                            <RankList testid="analytics-countries" title="Top countries" items={data.topCountries} empty="No country data yet." />
                            <RankList testid="analytics-inquiry-types" title="Inquiry types" items={data.inquiryTypes} />
                        </div>

                        {/* Devices */}
                        <div>
                            <h3 className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-clay">Devices</h3>
                            <div className="grid max-w-md grid-cols-2 gap-4">
                                <div className="flex justify-between border-b border-[var(--border-light)] py-2 text-sm text-walnut">
                                    <span>Mobile</span><span className="font-mono text-ink">{data.devices.mobile}</span>
                                </div>
                                <div className="flex justify-between border-b border-[var(--border-light)] py-2 text-sm text-walnut">
                                    <span>Desktop</span><span className="font-mono text-ink">{data.devices.desktop}</span>
                                </div>
                            </div>
                        </div>

                        <p className="border-t border-[var(--border-light)] pt-6 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink">
                            Cookieless · first-party · {data.totals.views} views tracked · country via edge network
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
