// Central content + imagery for the Bill Farr photography site.
// User-provided originals:
export const PORTRAIT =
    "https://customer-assets.emergentagent.com/job_wanderlust-gallery-8/artifacts/2utfde32_image.png";
export const HERO_HORSES =
    "https://customer-assets.emergentagent.com/job_wanderlust-gallery-8/artifacts/lq4oab8k_image.png";

// Western grid uses fixed-height grid rows + object-cover, so no empty frames.
export const western = [
    {
        src: HERO_HORSES,
        title: "The Run",
        location: "High Plains, Wyoming",
        cls: "md:col-span-8 md:row-span-2",
    },
    {
        src: "https://images.unsplash.com/photo-1723750601235-d53a04a6e3a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwzfHx3ZXN0ZXJuJTIwY293Ym95JTIwaG9yc2UlMjBkZXNlcnQlMjBwaG90b2dyYXBoeXxlbnwwfHx8fDE3ODMxMjMzNDV8MA&ixlib=rb-4.1.0&q=85",
        title: "Rider at Dusk",
        location: "Monument Valley",
        cls: "md:col-span-4 md:row-span-2",
    },
    {
        src: "https://images.unsplash.com/photo-1624125278758-c0572f6ebc55?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwxfHx3ZXN0ZXJuJTIwY293Ym95JTIwaG9yc2UlMjBkZXNlcnQlMjBwaG90b2dyYXBoeXxlbnwwfHx8fDE3ODMxMjMzNDV8MA&ixlib=rb-4.1.0&q=85",
        title: "White Horse",
        location: "San Rafael Swell",
        cls: "md:col-span-5 md:row-span-2",
    },
    {
        src: "https://images.unsplash.com/photo-1624125276915-39e2afd37438?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHw0fHx3ZXN0ZXJuJTIwY293Ym95JTIwaG9yc2UlMjBkZXNlcnQlMjBwaG90b2dyYXBoeXxlbnwwfHx8fDE3ODMxMjMzNDV8MA&ixlib=rb-4.1.0&q=85",
        title: "Two Riders",
        location: "Front Range, Colorado",
        cls: "md:col-span-7 md:row-span-2",
    },
    {
        src: "https://images.unsplash.com/photo-1624125279186-5fb175476e80?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwyfHx3ZXN0ZXJuJTIwY293Ym95JTIwaG9yc2UlMjBkZXNlcnQlMjBwaG90b2dyYXBoeXxlbnwwfHx8fDE3ODMxMjMzNDV8MA&ixlib=rb-4.1.0&q=85",
        title: "Red Coat",
        location: "Big Sky, Montana",
        cls: "md:col-span-12 md:row-span-2",
    },
];

export const travel = [
    {
        src: "https://images.pexels.com/photos/15766210/pexels-photo-15766210.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400",
        title: "Analog Peaks",
        location: "Dolomites, Italy",
    },
    {
        src: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwzfHx0cmF2ZWwlMjBsYW5kc2NhcGUlMjBtb3VudGFpbnMlMjBjaW5lbWF0aWMlMjBwaG90b2dyYXBoeXxlbnwwfHx8fDE3ODMxMjMzNDV8MA&ixlib=rb-4.1.0&q=85",
        title: "Golden Ridge",
        location: "Atlas Mountains, Morocco",
    },
    {
        src: "https://images.pexels.com/photos/31385957/pexels-photo-31385957.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400",
        title: "Cloud Forest",
        location: "Patagonia, Chile",
    },
    {
        src: "https://images.unsplash.com/photo-1472791108553-c9405341e398?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwyfHx0cmF2ZWwlMjBsYW5kc2NhcGUlMjBtb3VudGFpbnMlMjBjaW5lbWF0aWMlMjBwaG90b2dyYXBoeXxlbnwwfHx8fDE3ODMxMjMzNDV8MA&ixlib=rb-4.1.0&q=85",
        title: "First Light",
        location: "Sierra Nevada, USA",
    },
];

export const prints = [
    {
        src: "https://images.unsplash.com/photo-1723750601235-d53a04a6e3a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwzfHx3ZXN0ZXJuJTIwY293Ym95JTIwaG9yc2UlMjBkZXNlcnQlMjBwaG90b2dyYXBoeXxlbnwwfHx8fDE3ODMxMjMzNDV8MA&ixlib=rb-4.1.0&q=85",
        title: "Rider at Dusk",
        edition: "Edition of 25 · Archival Pigment",
        price: "$420",
    },
    {
        src: HERO_HORSES,
        title: "The Run",
        edition: "Edition of 15 · Museum Fine Art",
        price: "$680",
    },
    {
        src: "https://images.pexels.com/photos/15766210/pexels-photo-15766210.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400",
        title: "Analog Peaks",
        edition: "Edition of 30 · Archival Pigment",
        price: "$390",
    },
];

export const journal = [
    {
        src: "https://images.unsplash.com/photo-1472791108553-c9405341e398?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwyfHx0cmF2ZWwlMjBsYW5kc2NhcGUlMjBtb3VudGFpbnMlMjBjaW5lbWF0aWMlMjBwaG90b2dyYXBoeXxlbnwwfHx8fDE3ODMxMjMzNDV8MA&ixlib=rb-4.1.0&q=85",
        date: "May 2026",
        readtime: "6 min read",
        title: "Chasing the last light over the divide",
    },
    {
        src: "https://images.unsplash.com/photo-1624125276915-39e2afd37438?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHw0fHx3ZXN0ZXJuJTIwY293Ym95JTIwaG9yc2UlMjBkZXNlcnQlMjBwaG90b2dyYXBoeXxlbnwwfHx8fDE3ODMxMjMzNDV8MA&ixlib=rb-4.1.0&q=85",
        date: "Mar 2026",
        readtime: "4 min read",
        title: "Notes from a week on the working ranch",
    },
    {
        src: "https://images.pexels.com/photos/31385957/pexels-photo-31385957.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400",
        date: "Jan 2026",
        readtime: "8 min read",
        title: "Why I still shoot film in the backcountry",
    },
];

// Lightweight image optimization: request smaller, faster-loading files.
const optimize = (url) => {
    if (url.includes("images.unsplash.com")) {
        return url.includes("&w=") ? url : `${url}&w=1200`;
    }
    if (url.includes("images.pexels.com")) {
        return url.replace("dpr=2", "dpr=1");
    }
    return url;
};

[western, travel, prints, journal].forEach((arr) =>
    arr.forEach((item) => {
        item.src = optimize(item.src);
    })
);
