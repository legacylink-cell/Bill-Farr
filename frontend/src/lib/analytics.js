import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Cookieless, privacy-friendly first-party tracking. Fire-and-forget.
export const track = (type, meta = {}) => {
    try {
        axios
            .post(`${API}/analytics/track`, {
                type,
                path: window.location.pathname,
                referrer: document.referrer || "",
                ...meta,
            })
            .catch(() => {});
    } catch {
        /* never block the UI */
    }
};

// Pageview with real page-load time (Navigation Timing API).
export const trackPageview = () => {
    const send = () => {
        let loadMs = null;
        try {
            const nav = performance.getEntriesByType("navigation")[0];
            if (nav && nav.loadEventEnd) loadMs = Math.round(nav.loadEventEnd);
            else loadMs = Math.round(performance.now());
        } catch {
            /* ignore */
        }
        track("pageview", loadMs ? { load_ms: loadMs } : {});
    };
    if (document.readyState === "complete") send();
    else window.addEventListener("load", send, { once: true });
};
