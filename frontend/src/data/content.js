// Central content + imagery for the Bill Farr photography site.
// All imagery is Bill Farr's own work, optimized and served from /public.
export const PORTRAIT = "/portrait.webp";
export const HERO_HORSES = "/hero-sunburst.webp";

// Western grid uses fixed-height grid rows + object-cover, so no empty frames.
export const western = [
    {
        src: "/west-horsedrive.webp",
        title: "The Drive",
        location: "Westcliffe, Colorado",
        cls: "md:col-span-8 md:row-span-2",
    },
    {
        src: "/west-wrangler.webp",
        title: "Before the Ride",
        location: "Westcliffe, Colorado",
        cls: "md:col-span-4 md:row-span-2",
    },
    {
        src: "/west-riders.webp",
        title: "The Wranglers",
        location: "Westcliffe, Colorado",
        cls: "md:col-span-6 md:row-span-2",
    },
    {
        src: "/west-roping.webp",
        title: "The Catch",
        location: "Moab, Utah",
        cls: "md:col-span-6 md:row-span-2",
    },
    {
        src: "/west-herd.webp",
        title: "The Remuda",
        location: "Westcliffe, Colorado",
        cls: "md:col-span-7 md:row-span-2",
    },
    {
        src: "/west-longhorn.webp",
        title: "Longhorn",
        location: "West Texas Ranch",
        cls: "md:col-span-5 md:row-span-2",
    },
    {
        src: "/west-sunburst.webp",
        title: "First Light",
        location: "Moab, Utah",
        cls: "md:col-span-7 md:row-span-2",
    },
    {
        src: "/west-mustangs.webp",
        title: "Wild Mustangs",
        location: "Open Range",
        cls: "md:col-span-5 md:row-span-2",
    },
];

export const travel = [
    {
        src: "/travel-fog-bike.webp",
        title: "Morning Fog",
        location: "Greenwich Park, London",
    },
    {
        src: "/travel-caddo.webp",
        title: "Cypress Water",
        location: "Caddo Lake, Texas",
    },
    {
        src: "/travel-bigben.webp",
        title: "Westminster After Dark",
        location: "London, England",
    },
    {
        src: "/travel-prague.webp",
        title: "Bridges of the Vltava",
        location: "Prague, Czechia",
    },
    {
        src: "/travel-thames.webp",
        title: "The Shard After Dark",
        location: "River Thames, London",
    },
    {
        src: "/travel-prague-square.webp",
        title: "Old Town Square",
        location: "Prague, Czechia",
        lowres: true,
        maxW: 848,
    },
    {
        src: "/travel-charles-bridge.webp",
        title: "Charles Bridge",
        location: "Vltava River, Prague",
        lowres: true,
        maxW: 377,
    },
    {
        src: "/travel-folk.webp",
        title: "Folk Dancers",
        location: "Prague, Czechia",
        lowres: true,
        maxW: 750,
    },
];

// "View Galleries" showcase cards — each scrolls to a section on the site.
export const galleries = [
    { title: "The Western Series", copy: "Horses, riders & open range", src: "/west-sunburst.webp", target: "western" },
    { title: "Travel & Landscape", copy: "Far horizons & city nights", src: "/travel-prague.webp", target: "travel" },
    { title: "Behind the Lens", copy: "The story behind the work", src: "/portrait.webp", target: "about" },
];

export const prints = [
    {
        src: "/west-roping.webp",
        title: "The Catch",
        edition: "Edition of 25 · Archival Pigment",
        price: "$480",
    },
    {
        src: "/sunburst-print.webp",
        title: "First Light, Moab",
        edition: "Edition of 15 · Museum Fine Art",
        price: "$680",
    },
    {
        src: "/travel-caddo.webp",
        title: "Cypress Water",
        edition: "Edition of 30 · Archival Pigment",
        price: "$390",
    },
];

export const journal = [
    {
        src: "/west-horsedrive.webp",
        date: "May 2026",
        readtime: "3 min read",
        title: "The Quiet Art of Horsemanship",
        excerpt:
            "Not through strength, but through patience, skill, and trust — a cowgirl reads the herd and lets the horse decide.",
        body: [
            "With calm confidence, she guided her own horse into position. Every movement was deliberate. Instead of chasing or forcing the horse away, she used pressure and timing, allowing the horse to make the decision to leave the herd. The rest of the horses shifted and swirled, but her focus never wavered.",
            "Finally, the horse broke away from the herd and moved into the open. The cowgirl relaxed the reins and gave her horse a gentle pat on the neck. The job was done—not through strength, but through patience, skill, and trust.",
            "The picture captures more than a routine ranch task. It tells the story of horsemanship at its finest: a cowgirl and her horse working in harmony, demonstrating the quiet art of reading livestock, making split-second decisions, and earning respect rather than demanding it. In that single moment frozen in time, years of practice, partnership, and western tradition come to life.",
        ],
    },
    {
        src: "/west-roping.webp",
        date: "Mar 2026",
        readtime: "3 min read",
        title: "The Spirit of the Wrangler",
        excerpt:
            "Ropes whirling against a golden sky — a moment of wild energy on the open range.",
        body: [
            "The photograph freezes a moment of wild energy on the open range. A group of wranglers gallops across the dusty plain, their horses stretching forward with powerful strides. Sunlight catches the clouds of dust rising behind them, turning the air golden. Above their heads, ropes whirl in wide circles, tracing loops against the bright sky.",
            "For these riders, the rope is more than a tool—it is part of a tradition passed down through generations. As they race together, each swing is guided by skill, timing, and trust between horse and rider. The scene captures both movement and teamwork, telling a story of life on the frontier where courage, hard work, and horsemanship shaped every day.",
            "Though the moment lasts only a fraction of a second, the image preserves the spirit of the West: freedom, adventure, and the enduring bond between wranglers and their horses.",
        ],
    },
    {
        src: "/travel-fog-bike.webp",
        date: "Jan 2026",
        readtime: "3 min read",
        title: "Between Visibility and Mystery",
        excerpt:
            "A lone cyclist emerges from the fog, pressing forward into the unknown.",
        body: [
            "A lone bicyclist emerges from a thick blanket of fog, riding steadily down a quiet road. The mist hides what lies behind him and obscures what is ahead, creating an air of mystery and uncertainty. Despite the limited visibility, the cyclist continues forward with determination, trusting the path beneath his wheels.",
            "The scene tells a story of perseverance and courage. The fog can symbolize life's challenges, moments when the future is unclear and the destination is unknown. Yet the rider does not stop or turn back. Instead, he presses on, guided by hope and confidence that the road will eventually reveal itself.",
            "The photograph captures not just a cyclist on a road but a powerful reminder that even when our journey is clouded by uncertainty, moving forward is what leads us out of the fog.",
        ],
    },
];
