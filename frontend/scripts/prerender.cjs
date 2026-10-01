/* Build-time pre-render (no headless browser).
   Injects real, crawlable marketing copy into the served HTML so search
   engines and no-JS clients receive the headline, body copy and footer.
   The sitemap is generated from the SAME explicit route list. */
const fs = require("fs");
const path = require("path");

const BUILD = path.join(__dirname, "..", "build");
const SITE = "https://billfarrphotography.com";

// Explicit route list — single source of truth for pre-render + sitemap.
const routes = [{ path: "/", changefreq: "monthly", priority: "1.0" }];

const lastmod = new Date().toISOString().slice(0, 10);

const prerenderHtml = `<div data-prerender style="max-width:860px;margin:0 auto;padding:48px 24px;color:#3a3330;font-family:Georgia,'Times New Roman',serif;line-height:1.65">
<p style="font-family:monospace;letter-spacing:.2em;text-transform:uppercase;font-size:12px;color:#b0724a">Western &amp; Travel Photographer</p>
<h1 style="font-size:40px;font-weight:300;line-height:1.05;margin:8px 0 16px">Where the light still runs wild.</h1>
<p>Honest photographs of open country and far horizons &mdash; made for people who feel the pull of both. Bill Farr is a Western and travel photographer based in the American West and traveling worldwide, making images of ranch life, wild horses, and the quiet drama of distant places.</p>

<h2 style="font-size:28px;font-weight:300;margin-top:40px">I photograph the space between people and the land.</h2>
<p>I'm a Western and travel photographer drawn to the edges of things &mdash; wide horizons, quiet roads, and the stories that live in the space between light and shadow. The American West taught me to slow down and pay attention. Dust rising from a horse's hooves, the creak of a saddle, the way a rancher's face carries both weather and wisdom &mdash; these are the details I try to honor. But my curiosity doesn't stop at the state line. I carry that same instinct with me across oceans and borders.</p>
<p>Taking advantage of my past life in London, I was drawn to the quiet drama of the Lake District, where mist drapes itself over the fells like a worn wool blanket. I've watched fog roll through Scottish glens, revealing a lone tree or a stone cottage with a kind of reverence that feels almost sacred. Europe offers its own rhythm &mdash; cobblestone streets glowing after rain, alpine valleys wrapped in cloud, coastal cliffs where the wind carries stories older than any photograph I could make.</p>
<p>My photographs are my way of gathering those fragments. I want them to feel like memories you can step into &mdash; warm, weathered, shaped by land and culture. Whether I'm riding alongside cowboys at sunrise, wandering through a market in Prague, or standing alone on a fog-soaked moor, I'm always searching for that quiet spark of truth. &mdash; Bill Farr</p>

<h2 style="font-size:28px;font-weight:300;margin-top:40px">The Western Series</h2>
<p>Horses, riders and open range &mdash; photographs made in Westcliffe, Colorado, Moab, Utah and the working ranches of West Texas, including wild mustangs, the morning drive, and first light over red-rock country.</p>

<h2 style="font-size:28px;font-weight:300;margin-top:40px">Travel &amp; Landscape</h2>
<p>Far horizons and city nights &mdash; from cypress water at Caddo Lake and London after dark to the bridges, old town square and folk dancers of Prague.</p>

<h2 style="font-size:28px;font-weight:300;margin-top:40px">Field Notes</h2>
<p>The Quiet Art of Horsemanship &mdash; not through strength, but through patience, skill and trust, a cowgirl reads the herd and lets the horse decide. The Spirit of the Wrangler &mdash; ropes whirling against a golden sky, a moment of wild energy on the open range. Between Visibility and Mystery &mdash; a lone cyclist emerges from the fog, pressing forward into the unknown.</p>

<h2 style="font-size:28px;font-weight:300;margin-top:40px">What people say</h2>
<p>Kind words from collectors and clients who have brought Bill Farr's prints into their homes.</p>

<h2 style="font-size:28px;font-weight:300;margin-top:40px">Booking travel, commissions &amp; prints</h2>
<p>Tell me about your ranch, your route, or the print you have in mind. I read every message myself and usually reply within a couple of days. Reach Bill directly at <a href="mailto:bill@billfarrphotography.com">bill@billfarrphotography.com</a> or on Instagram at <a href="https://www.instagram.com/billfarr_photography59/">@billfarr_photography59</a>.</p>

<p style="font-family:monospace;font-size:12px;letter-spacing:.2em;text-transform:uppercase;margin-top:40px">Bill Farr Photography &middot; Designed by Mo Studio</p>
</div>`;

function injectIntoRoot(html) {
  if (html.includes('<div id="root"></div>')) {
    return html.replace('<div id="root"></div>', `<div id="root">${prerenderHtml}</div>`);
  }
  if (html.includes('<div id="root">')) {
    return html.replace('<div id="root">', `<div id="root">${prerenderHtml}`);
  }
  console.warn("[prerender] #root div not found — HTML left unchanged");
  return html;
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
  .map(
    (r) =>
      `  <url>\n    <loc>${SITE}${r.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
  )
  .join("\n")}\n</urlset>\n`;

const baseIndex = fs.readFileSync(path.join(BUILD, "index.html"), "utf8");

for (const r of routes) {
  const outDir = r.path === "/" ? BUILD : path.join(BUILD, r.path.replace(/^\//, ""));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), injectIntoRoot(baseIndex));
}

fs.writeFileSync(path.join(BUILD, "sitemap.xml"), sitemap);
console.log(`[prerender] injected ${routes.length} route(s); sitemap.xml written (lastmod ${lastmod})`);
