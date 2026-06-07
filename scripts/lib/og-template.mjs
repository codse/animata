// Branded 1200x630 OG card that frames a real component (loaded in an iframe from the
// statically-built Storybook preview).
//   layout:  "stacked" (logo top, full-width demo, title below — WIDE components)
//        or  "side"    (tall demo left fills height, branding right — TALL/square components).
//   variant: "a" warm editorial (smoke glow + serif title glow)
//        or  "b" textured minimal (vertical hairlines, crisp serif).
// Brand type: Young Serif (display title), Outfit (wordmark/eyebrow), IBM Plex Sans (body) — self-hosted
// under public/og-fonts/ (see scripts/sync-og-fonts.mjs) so renders are offline-deterministic.
//
// Bump TEMPLATE_VERSION when the design changes — it's part of the cache hash.
export const TEMPLATE_VERSION = "24";

const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );

// animata mark (from components/icons.tsx) — #d4aa00 shadow layer under the #fc0 layer.
const LOGO = `<svg class="mark" viewBox="0 0 132.292 132.292" xmlns="http://www.w3.org/2000/svg">
  <g fill="#d4aa00" transform="translate(.617 -5.527)">
    <rect width="15.875" height="89.958" x="-76.052" y="51.638" ry="10.238" rx="7.938" transform="scale(-1 1) rotate(17.213)"/>
    <rect width="15.875" height="89.958" x="71.653" y="-48.84" ry="7.938" rx="7.938" transform="rotate(51.226)"/>
    <path d="M100.778 69.553a49.995 49.995 0 0 1-23.928 4.418c-25.89-1.6-35.298-20.516-41.123-20.876a7.937 7.937 0 0 0-8.412 7.432c-.077 1.888.457 3.884 1.635 5.389 11.252 13.618 27.898 22.724 46.92 23.9 11.199.692 20.37-.765 29.912-5.114l7.41-12.201z"/>
  </g>
  <g fill="#fc0" transform="translate(.617 -5.527)">
    <rect width="15.875" height="89.958" x="-77.96" y="51.678" ry="10.238" rx="7.938" transform="scale(-1 1) rotate(17.213)"/>
    <rect width="15.875" height="89.958" x="72.392" y="-50.599" ry="7.938" rx="7.938" transform="rotate(51.226)"/>
    <path d="M102.613 69.028a49.995 49.995 0 0 1-23.928 4.418c-25.89-1.601-35.3-20.516-41.124-20.877a7.937 7.937 0 0 0-8.412 7.433c-.077 1.888.457 3.884 1.635 5.388 11.252 13.619 27.898 22.724 46.921 23.9 11.198.693 20.369-.764 29.911-5.114l7.41-12.2z"/>
  </g>
</svg>`;

export function ogFontBaseUrl(port) {
  return `http://127.0.0.1:${port}/og-fonts`;
}

export function ogFontsCss(fontBaseUrl) {
  const base = fontBaseUrl.replace(/\/$/, "");
  const face = (family, file, weight) =>
    `@font-face{font-family:"${family}";font-style:normal;font-weight:${weight};font-display:swap;src:url("${base}/${file}") format("woff2");}`;
  const faces = [
    face("Outfit", "outfit-latin-400-normal.woff2", 400),
    face("Outfit", "outfit-latin-500-normal.woff2", 500),
    face("Outfit", "outfit-latin-600-normal.woff2", 600),
    face("Outfit", "outfit-latin-700-normal.woff2", 700),
    face("Young Serif", "young-serif-latin-400-normal.woff2", 400),
    face("IBM Plex Sans", "ibm-plex-sans-latin-400-normal.woff2", 400),
    face("IBM Plex Sans", "ibm-plex-sans-latin-500-normal.woff2", 500),
    face("IBM Plex Sans", "ibm-plex-sans-latin-600-normal.woff2", 600),
  ];
  return `<style>${faces.join("")}</style>`;
}

const COMMON = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body {
    font-family: "IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #16140f; padding: 64px; background: #f8f7f3;
    -webkit-font-smoothing: antialiased;
  }
  .brand { display: flex; align-items: center; gap: 13px; }
  .mark { width: 38px; height: 38px; display: block; }
  .word { font-family: "Outfit", sans-serif; font-size: 34px; font-weight: 600; letter-spacing: -0.01em; line-height: 1; }
  .eyebrow { font-family: "Outfit", sans-serif; font-size: 21px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #8c877d; }
  .accent { width: 52px; height: 5px; border-radius: 3px; background: #ffcc00; }
  .accent-row { display: flex; align-items: center; gap: 14px; }
  .accent-row .eyebrow { line-height: 1; }
  .title { font-family: "Young Serif", Georgia, serif; font-weight: 400; letter-spacing: -0.005em; line-height: 1.03; }
  .desc { font-family: "IBM Plex Sans", -apple-system, sans-serif; font-size: 22px; line-height: 1.45; color: #6b665c; max-width: 760px; margin-top: 16px;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .chips { display: flex; gap: 9px; flex-wrap: wrap; }
  .chip { font-size: 15px; font-weight: 500; color: #4a453c; background: rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.1); padding: 6px 13px; border-radius: 999px; }
  .frame-region { display: flex; align-items: center; justify-content: center; }
  .frame {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: transparent;
  }
  .frame iframe { width: 100%; height: 100%; border: 0; display: block; background: transparent; }
`;

const VARIANTS = {
  // a — cinematic: warm light + film grain + glowing serif (SHADER vibe)
  a: `
    body {
      background:
        radial-gradient(78% 120% at 50% 132%, rgba(165,140,185,0.16), transparent 55%),
        radial-gradient(62% 88% at 88% -16%, rgba(255,190,105,0.26), transparent 60%),
        #0a0807;
    }
    body::before {
      content: ""; position: absolute; inset: 0; pointer-events: none; z-index: 5;
      mix-blend-mode: overlay; opacity: 0.5;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }
    .title { color: #f7efe2; text-shadow: 0 0 1px rgba(255,244,222,0.45), 0 2px 52px rgba(255,188,105,0.45); }
    .desc { color: #b6afa3; }
  `,
  // b — clean white editorial (the component is the hero)
  b: `
    body { background: #f8f7f3; }
    .title { color: #16140f; }
  `,
  // c — light paper, dark text (bright editorial)
  c: `
    body {
      background:
        repeating-linear-gradient(90deg, rgba(0,0,0,0.035) 0 1px, transparent 1px 4px),
        radial-gradient(120% 120% at 80% -10%, #f7f5ef, #e8e5db 78%);
    }
    .word { color: #1a1814; }
    .eyebrow { color: #877f72; }
    .title { color: #15120c; }
    .desc { color: #6b655a; }
    .chip { color: #4a453c; background: rgba(0,0,0,0.05); border-color: rgba(0,0,0,0.12); }
    .frame { border-color: rgba(0,0,0,0.14); box-shadow: 0 18px 50px rgba(0,0,0,0.16); }
  `,
  // d — blueprint grid across the whole card
  d: `
    body {
      background:
        linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px),
        radial-gradient(120% 120% at 80% -10%, #14151b, #0a0a0c 66%);
      background-size: 40px 40px, 40px 40px, 100% 100%;
    }
    .title { color: #fafafa; }
  `,
  // e — dramatic spotlight on the demo + heavy vignette
  e: `
    body {
      background:
        radial-gradient(44% 58% at 35% 44%, rgba(255,243,214,0.20), transparent 56%),
        radial-gradient(110% 110% at 50% 50%, #1c1c24 0%, #050506 68%);
    }
    .title { color: #f7f3ec; text-shadow: 0 2px 42px rgba(255,214,150,0.30); }
    .desc { color: #a9a39a; }
  `,
};

export function ogTemplate({
  layout = "stacked",
  variant = "b",
  storyUrl,
  title,
  category,
  description = "",
  labels = [],
  fontBaseUrl,
}) {
  const fonts = ogFontsCss(fontBaseUrl);
  const chips = labels
    .slice(0, 4)
    .map((l) => `<span class="chip">${esc(l)}</span>`)
    .join("");
  const brand = `<div class="brand">${LOGO}<span class="word">animata</span></div>`;
  const eyebrow = `<div class="eyebrow">${esc(category)}</div>`;
  const iframe = `<div class="frame"><iframe src="${esc(storyUrl)}" loading="eager"></iframe></div>`;
  const desc = description ? `<div class="desc">${esc(description)}</div>` : "";
  const vcss = VARIANTS[variant] || VARIANTS.b;

  if (layout === "side") {
    return `<!doctype html><html><head><meta charset="utf-8"/>${fonts}<style>${COMMON}${vcss}
      body { display: flex; gap: 48px; }
      .side-region { flex: 0 0 560px; height: 100%; }
      .side { flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding: 4px 0; }
      .side .accent-row { margin-bottom: 20px; }
      .side .title { font-size: 62px; }
      .side .desc { font-size: 21px; -webkit-line-clamp: 3; }
      .side .chips { margin-top: 24px; }
    </style></head><body>
      <div class="frame-region side-region">${iframe}</div>
      <div class="side">
        <div class="head">${brand}</div>
        <div class="foot"><div class="accent-row"><div class="accent"></div>${eyebrow}</div><div class="title">${esc(title)}</div>${desc}<div class="chips">${chips}</div></div>
      </div>
    </body></html>`;
  }

  return `<!doctype html><html><head><meta charset="utf-8"/>${fonts}<style>${COMMON}${vcss}
    body { display: flex; flex-direction: column; }
    .top { display: flex; align-items: center; justify-content: space-between; }
    .stacked-region { flex: 1; margin: 30px 0; }
    .bottom { display: flex; align-items: flex-end; justify-content: space-between; gap: 32px; }
    .bottom .accent-row { margin-bottom: 16px; }
    .bottom .title { font-size: 72px; max-width: 880px; }
    .bottom .left { min-width: 0; }
    .bottom .chips { flex-shrink: 0; }
  </style></head><body>
    <div class="top">${brand}</div>
    <div class="frame-region stacked-region">${iframe}</div>
    <div class="bottom">
      <div class="left"><div class="accent-row"><div class="accent"></div>${eyebrow}</div><div class="title">${esc(title)}</div>${desc}</div>
      <div class="chips">${chips}</div>
    </div>
  </body></html>`;
}

// ─── Branded (no-component) template ────────────────────────────────────────────────────────────
// Used in hybrid mode for components that don't capture well as a still (scroll/interaction/idle).
// Pure typographic card: logo + animata, category eyebrow, big serif name, description, url.
// Three layout flavors (a/b/c) for variety — picked per component, but stable for a given slug.

const BRANDED_BASE = `
  * { margin:0; padding:0; box-sizing:border-box; }
  html, body { width:1200px; height:630px; }
  body {
    font-family: "IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color:#16140f; padding:72px; background:#f8f7f3; position:relative; overflow:hidden;
    -webkit-font-smoothing:antialiased;
  }
  .brand { display:flex; align-items:center; gap:13px; }
  .mark { width:40px; height:40px; display:block; }
  .word { font-family:"Outfit", sans-serif; font-size:34px; font-weight:600; letter-spacing:-0.01em; line-height:1; }
  .eyebrow { font-family:"Outfit", sans-serif; font-size:21px; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; color:#8c877d; }
  .accent { width:64px; height:6px; border-radius:3px; background:#ffcc00; }
  .title { font-family:"Young Serif", Georgia, serif; font-weight:400; letter-spacing:-0.01em; line-height:1.0; color:#16140f; }
  .desc { font-size:26px; line-height:1.45; color:#6b665c; max-width:880px;
    display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
  .url { font-family:"IBM Plex Sans", sans-serif; font-size:21px; font-weight:500; letter-spacing:0.01em; color:#8c877d; }
  .url b { color:#16140f; font-weight:600; }
  .chip { display:inline-flex; font-size:15px; font-weight:500; color:#4a453c; background:rgba(0,0,0,0.05);
    border:1px solid rgba(0,0,0,0.1); padding:6px 14px; border-radius:999px; }
`;

// a — editorial: top brand row, big serif name anchored low-left, url footer.
const TPL_A = `
  body { display:flex; flex-direction:column; justify-content:space-between; background:#f8f7f3; }
  .top { display:flex; align-items:center; justify-content:space-between; }
  .mid { display:flex; flex-direction:column; gap:24px; }
  .mid .accent { margin-bottom:6px; }
  .mid .title { font-size:89px; }
  .bot { display:flex; align-items:center; justify-content:space-between; }
`;
// b — centered spotlight: everything centered, glow behind the name.
const TPL_B = `
  body { text-align:center; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:26px;
    background:#f8f7f3; }
  .brand { position:absolute; top:64px; left:50%; transform:translateX(-50%); }
  .url { position:absolute; bottom:64px; left:50%; transform:translateX(-50%); }
  .accent { margin:0 auto; }
  .title { font-size:89px; }
  .desc { margin:0 auto; }
`;
// c — blueprint: light technical paper — faint grid + an inset dashed frame with corner ticks
// (OTHERKIND-style registration marks). Brand top-left + category chip top-right, giant name low.
const TPL_C = `
  body { display:flex; flex-direction:column; justify-content:space-between;
    background:linear-gradient(rgba(0,0,0,0.045) 1px, transparent 1px),
               linear-gradient(90deg, rgba(0,0,0,0.045) 1px, transparent 1px),
               #f8f7f3;
    background-size:44px 44px, 44px 44px, 100% 100%; }
  body::before { content:""; position:absolute; inset:40px; border:1px dashed rgba(0,0,0,0.22); pointer-events:none; }
  body::after { content:""; position:absolute; inset:32px; pointer-events:none;
    background:
      linear-gradient(#16140f,#16140f) left 0 top 8px/16px 1px no-repeat,
      linear-gradient(#16140f,#16140f) left 8px top 0/1px 16px no-repeat,
      linear-gradient(#16140f,#16140f) right 0 top 8px/16px 1px no-repeat,
      linear-gradient(#16140f,#16140f) right 8px top 0/1px 16px no-repeat,
      linear-gradient(#16140f,#16140f) left 0 bottom 8px/16px 1px no-repeat,
      linear-gradient(#16140f,#16140f) left 8px bottom 0/1px 16px no-repeat,
      linear-gradient(#16140f,#16140f) right 0 bottom 8px/16px 1px no-repeat,
      linear-gradient(#16140f,#16140f) right 8px bottom 0/1px 16px no-repeat; }
  .top, .mid, .bot { position:relative; z-index:1; }
  .top { display:flex; align-items:center; justify-content:space-between; }
  .mid { display:flex; flex-direction:column; gap:22px; }
  .mid .title { font-size:89px; line-height:0.98; }
  .bot { display:flex; align-items:flex-end; justify-content:space-between; gap:32px; }
`;

// d–h: original GENERATIVE patterns built FROM math (not literal diagrams) — used as faint full-bleed
// texture behind editorial text. d phyllotaxis (golden-angle sunflower), e Truchet tiles, f flow
// field, g halftone gradient, h phyllotaxis on dark. Each is seeded by the slug so it's stable.
function pSeed(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function pRng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function patPhyllo(seed, dark) {
  const fill = dark ? "rgba(150,225,200,0.16)" : "rgba(0,0,0,0.10)";
  const GA = Math.PI * (3 - Math.sqrt(5)); // golden angle ≈ 137.5°
  const r0 = pRng(seed)();
  const cx = 840 + r0 * 40,
    cy = 315,
    n = 660,
    c = 17;
  let s = "";
  for (let i = 1; i < n; i++) {
    const a = i * GA;
    const r = c * Math.sqrt(i);
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1 + i * 0.006).toFixed(2)}" fill="${fill}"/>`;
  }
  return s;
}
function patTruchet(seed) {
  const r = pRng(seed),
    cell = 84,
    h = cell / 2;
  let s = `<g fill="none" stroke="rgba(0,0,0,0.10)" stroke-width="2.5">`;
  for (let y = 0; y < 630 + cell; y += cell)
    for (let x = 0; x < 1200 + cell; x += cell) {
      if (r() < 0.5)
        s += `<path d="M${x} ${y + h} A ${h} ${h} 0 0 1 ${x + h} ${y}"/><path d="M${x + h} ${y + cell} A ${h} ${h} 0 0 1 ${x + cell} ${y + h}"/>`;
      else
        s += `<path d="M${x + h} ${y} A ${h} ${h} 0 0 1 ${x + cell} ${y + h}"/><path d="M${x} ${y + h} A ${h} ${h} 0 0 1 ${x + h} ${y + cell}"/>`;
    }
  return s + `</g>`;
}
function patFlow(seed) {
  const r = pRng(seed),
    step = 44,
    ph = r() * 6.283;
  let s = `<g stroke="rgba(0,0,0,0.14)" stroke-width="2" stroke-linecap="round">`;
  for (let y = 26; y < 630; y += step)
    for (let x = 26; x < 1200; x += step) {
      const a = Math.sin(x * 0.006 + ph) + Math.cos(y * 0.008) + Math.sin((x + y) * 0.004);
      s += `<line x1="${x}" y1="${y}" x2="${(x + Math.cos(a) * 16).toFixed(1)}" y2="${(y + Math.sin(a) * 16).toFixed(1)}"/>`;
    }
  return s + `</g>`;
}
function patHalftone(seed) {
  const r = pRng(seed),
    dir = r() < 0.5;
  let s = `<g fill="rgba(0,0,0,0.15)">`;
  const step = 30;
  for (let y = 20; y < 630; y += step)
    for (let x = 20; x < 1200; x += step) {
      const t = dir ? x / 1200 : y / 630;
      s += `<circle cx="${x}" cy="${y}" r="${(0.5 + t * 4.4).toFixed(2)}"/>`;
    }
  return s + `</g>`;
}
function patternSVG(kind, slug) {
  const seed = pSeed(slug);
  const inner =
    kind === "truchet"
      ? patTruchet(seed)
      : kind === "flow"
        ? patFlow(seed)
        : kind === "halftone"
          ? patHalftone(seed)
          : patPhyllo(seed, kind === "phyllo-dark");
  return `<svg class="pat" viewBox="0 0 1200 630" preserveAspectRatio="xMidYMid slice">${inner}</svg>`;
}
const PAT_KIND = { d: "phyllo", e: "truchet", f: "flow", g: "halftone", h: "phyllo-dark" };

// Editorial layout over a faint full-bleed generative pattern.
const PAT_CSS = `
  body { display:flex; flex-direction:column; justify-content:space-between; position:relative; overflow:hidden; background:#f8f7f3; }
  .top { display:flex; align-items:center; justify-content:space-between; position:relative; z-index:2; }
  .mid { display:flex; flex-direction:column; gap:18px; position:relative; z-index:2; max-width:680px; }
  .mid .accent { margin-bottom:4px; }
  .mid .title { font-size:89px; }
  .bot { display:flex; align-items:center; justify-content:space-between; position:relative; z-index:2; }
  .pat { position:absolute; inset:0; width:100%; height:100%; z-index:1; pointer-events:none; }
`;
const PAT_DARK = `
  body { display:flex; flex-direction:column; justify-content:space-between; position:relative; overflow:hidden;
    background:radial-gradient(120% 120% at 70% 30%, #16181d 0%, #0b0c0f 76%); color:#eef0f2; }
  .word{color:#f4f4f5;} .eyebrow{color:#9aa0a8;} .title{color:#f6f7f8;} .desc{color:#a6acb4;}
  .url{color:#9aa0a8;} .url b{color:#f6f7f8;}
  .top { display:flex; align-items:center; justify-content:space-between; position:relative; z-index:2; }
  .mid { display:flex; flex-direction:column; gap:18px; position:relative; z-index:2; max-width:680px; }
  .mid .accent { margin-bottom:4px; } .mid .title { font-size:89px; }
  .bot { display:flex; align-items:center; justify-content:space-between; position:relative; z-index:2; }
  .pat { position:absolute; inset:0; width:100%; height:100%; z-index:1; pointer-events:none; }
`;
const TPL_D = PAT_CSS;
const TPL_E = PAT_CSS;
const TPL_F = PAT_CSS;
const TPL_G = PAT_CSS;
const TPL_H = PAT_DARK;

const BRANDED = { a: TPL_A, b: TPL_B, c: TPL_C, d: TPL_D, e: TPL_E, f: TPL_F, g: TPL_G, h: TPL_H };

// Deterministic flavor for a slug/category so the same component always renders the same way.
export function pickBrandedFlavor(key = "") {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return ["a", "b", "c", "d", "e", "f", "g", "h"][h % 8];
}

export function brandedTemplate({
  slug = "",
  title,
  category,
  description = "",
  flavor,
  fontBaseUrl,
}) {
  const fonts = ogFontsCss(fontBaseUrl);
  const tpl = BRANDED[flavor] || BRANDED.a;
  const urlPath = String(slug).replace(/^\//, "");
  const url = `<div class="url"><b>animata.design</b>/${esc(urlPath)}</div>`;
  const brand = `<div class="brand">${LOGO}<span class="word">animata</span></div>`;
  const eyebrow = `<div class="eyebrow">${esc(category)}</div>`;
  const name = `<div class="title">${esc(title)}</div>`;
  const desc = description ? `<div class="desc">${esc(description)}</div>` : "";
  const head = `<head><meta charset="utf-8"/>${fonts}<style>${BRANDED_BASE}${tpl}</style></head>`;

  if (flavor === "b") {
    return `<!doctype html><html>${head}<body>${brand}${eyebrow}<div class="accent"></div>${name}${desc}${url}</body></html>`;
  }
  if (flavor === "c") {
    return `<!doctype html><html>${head}<body>
      <div class="top">${brand}<span class="chip">${esc(category)}</span></div>
      <div class="mid"><div class="accent"></div>${name}${desc}</div>
      <div class="bot">${url}</div>
    </body></html>`;
  }
  if (PAT_KIND[flavor]) {
    // d–h: editorial layout over a faint generative math pattern (seeded by slug).
    return `<!doctype html><html>${head}<body>
      ${patternSVG(PAT_KIND[flavor], slug)}
      <div class="top">${brand}${eyebrow}</div>
      <div class="mid"><div class="accent"></div>${name}${desc}</div>
      <div class="bot">${url}</div>
    </body></html>`;
  }
  return `<!doctype html><html>${head}<body>
    <div class="top">${brand}${eyebrow}</div>
    <div class="mid"><div class="accent"></div>${name}${desc}</div>
    <div class="bot">${url}</div>
  </body></html>`;
}
