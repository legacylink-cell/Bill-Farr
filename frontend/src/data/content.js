// Central content + imagery for the Bill Farr photography site.
// All imagery is Bill Farr's own work, optimized and served from /public.
export const PORTRAIT = "/portrait.png";
export const HERO_HORSES = "/hero-sunburst.jpg";

// Western grid uses fixed-height grid rows + object-cover, so no empty frames.
export const western = [
    {
        src: "/west-horsedrive.jpg",
        title: "The Drive",
        location: "Westcliffe, Colorado",
        cls: "md:col-span-8 md:row-span-2",
    },
    {
        src: "/west-wrangler.jpg",
        title: "Before the Ride",
        location: "Westcliffe, Colorado",
        cls: "md:col-span-4 md:row-span-2",
    },
    {
        src: "/west-roping.jpg",
        title: "The Catch",
        location: "Moab, Utah",
        cls: "md:col-span-5 md:row-span-2",
    },
    {
        src: "/west-longhorn.jpg",
        title: "Longhorn",
        location: "Texas Hill Country",
        cls: "md:col-span-7 md:row-span-2",
    },
    {
        src: "/west-herd.jpg",
        title: "The Remuda",
        location: "Westcliffe, Colorado",
        cls: "md:col-span-12 md:row-span-2",
    },
];

export const travel = [
    {
        src: "/travel-fog-bike.jpg",
        title: "Morning Fog",
        location: "Greenwich Park, London",
    },
    {
        src: "/travel-caddo.jpg",
        title: "Cypress Water",
        location: "Caddo Lake, Texas",
    },
    {
        src: "/travel-bigben.jpg",
        title: "Westminster After Dark",
        location: "London, England",
    },
    {
        src: "/travel-stpauls.jpg",
        title: "St Paul's After Dark",
        location: "Millennium Bridge, London",
    },
];

export const prints = [
    {
        src: "/west-roping.jpg",
        title: "The Catch",
        edition: "Edition of 25 · Archival Pigment",
        price: "$480",
    },
    {
        src: "/hero-sunburst.jpg",
        title: "First Light, Moab",
        edition: "Edition of 15 · Museum Fine Art",
        price: "$680",
    },
    {
        src: "/travel-caddo.jpg",
        title: "Cypress Water",
        edition: "Edition of 30 · Archival Pigment",
        price: "$390",
    },
];

export const journal = [
    {
        src: "/west-horsedrive.jpg",
        date: "May 2026",
        readtime: "6 min read",
        title: "Chasing the last light over the divide",
        excerpt:
            "Three days above treeline waiting for a storm to break — and the ten minutes that made it all worth it.",
        body: [
            "Some photographs you plan for months. Others you simply have to be present for. This one was both. I'd been tracking the weather over the divide for the better part of a week, watching a slow front push in from the west and hoping it would clear just before sundown.",
            "It didn't clear. Not really. But in the last ten minutes of light, a single seam opened in the clouds and dropped a band of gold across the ridge. I made maybe forty frames. This is the one I keep coming back to.",
            "The lesson, if there is one, is patience. The mountains don't owe you anything. You show up, you wait, and every so often the light decides to run wild for a moment — and your only job is to be ready when it does.",
        ],
    },
    {
        src: "/west-roping.jpg",
        date: "Mar 2026",
        readtime: "4 min read",
        title: "Notes from a week on the working ranch",
        excerpt:
            "What a week among horses and the people who work them taught me about photographing honest moments.",
        body: [
            "There's a rhythm to a working ranch that you can't fake and can't rush. The horses know it before you do. My first morning I put the camera down for a few hours and just watched — and that was the best decision I made all week.",
            "By the third day the herd had stopped noticing me. That's when the real photographs started: the quiet ones, between the action, where you see the trust between an animal and the hands that care for it.",
            "I came home with a hard drive full of frames and a deeper respect for a way of life that's slower, harder, and more honest than anything I'm used to.",
        ],
    },
    {
        src: "/travel-fog-bike.jpg",
        date: "Jan 2026",
        readtime: "8 min read",
        title: "Why I still shoot film in the backcountry",
        excerpt:
            "In an age of infinite frames, choosing 36 exposures forces you to see differently. Here's why I still carry a film body.",
        body: [
            "Digital is a gift. I'd never argue otherwise. But there's something about loading a roll of film, knowing you have thirty-six frames and no screen to check, that changes how you move through a landscape.",
            "You slow down. You wait. You commit. Every frame costs something, so you only press the shutter when it truly matters — and that discipline bleeds into everything else I shoot.",
            "I don't think film is better. I think it makes me better. And out in the backcountry, far from any charger, a fully mechanical camera and a few rolls of film feel less like nostalgia and more like freedom.",
        ],
    },
];
