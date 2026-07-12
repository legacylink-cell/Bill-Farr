import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Cookieless, privacy-friendly first-party tracking. Fire-and-forget.
export const track = (type) => {
    try {
        axios
            .post(`${API}/analytics/track`, {
                type,
                path: window.location.pathname,
                referrer: document.referrer || "",
            })
            .catch(() => {});
    } catch {
        /* never block the UI */
    }
};
