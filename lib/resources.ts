export type Resource = {
  id: string;
  title: string;
  description: string;
  href: string;
  domain: string;
  ogImage: string;
};

export const RESOURCES_INTRO =
  "Sites we keep pinned while building animata. Other people run them. We're glad they do.";

export const RESOURCES_DISCLAIMER =
  "We don't run these sites and nobody paid us to list them. Some are free, some are paid or freemium — we link them because they're useful, not because we get a cut.";

export const RESOURCES_CLOSING = "Built one of these? Thank you. Send us others on GitHub.";

export const RESOURCES: Resource[] = [
  {
    id: "404s",
    title: "404s",
    description: "Designed 404 pages.",
    href: "https://404s.design/",
    domain: "404s.design",
    ogImage:
      "https://cdn.prod.website-files.com/65ba70a4bb6f912baf009423/6899c6b37147b1d3587301c5_2533.webp",
  },
  {
    id: "60fps",
    title: "60fps",
    description: "UI motion that runs smooth on real devices.",
    href: "https://60fps.design/",
    domain: "60fps.design",
    ogImage: "https://framerusercontent.com/images/mB8WqomRNWMwPrMEL90Vtl8JGrE.png",
  },
  {
    id: "a1-gallery",
    title: "A1 Gallery",
    description: "Hand-picked sites from around the web. Updated almost daily.",
    href: "https://www.a1.gallery/",
    domain: "a1.gallery",
    ogImage: "https://www.a1.gallery/images/og-default.webp",
  },
  {
    id: "appinspo",
    title: "AppInspo",
    description: "Mobile app UI inspiration. Quick scroll before opening Figma.",
    href: "https://appinspo.com/",
    domain: "appinspo.com",
    ogImage:
      "https://storage.googleapis.com/gpt-engineer-file-uploads/xsi2SKnwSogNjSZkh7wGLT80k933/social-images/social-1772816280331-opengraph.webp",
  },
  {
    id: "awesome-marketing-websites",
    title: "Awesome Marketing Websites",
    description: "Marketing sites with strong craft. Good when hero ideas run dry.",
    href: "https://awesomemarketingwebsites.com/",
    domain: "awesomemarketingwebsites.com",
    ogImage: "https://awesomemarketingwebsites.com/og_image.png",
  },
  {
    id: "awwwards",
    title: "Awwwards",
    description: "Still the place to see what top-tier web craft looks like.",
    href: "https://www.awwwards.com/",
    domain: "awwwards.com",
    ogImage: "https://assets.awwwards.com/assets/images/pages/about-certificates/awwwards.jpg",
  },
  {
    id: "bento-grids",
    title: "Bento Grids",
    description: "Bento-style grid layouts.",
    href: "https://bentogrids.com/",
    domain: "bentogrids.com",
    ogImage: "https://bentogrids.com/images/og.png",
  },
  {
    id: "best-designs-on-x",
    title: "Best Designs on X",
    description: "Curated design posts from X.",
    href: "https://bestdesignsonx.com/",
    domain: "bestdesignsonx.com",
    ogImage: "https://bestdesignsonx.com/og-image.png",
  },
  {
    id: "codrops",
    title: "Codrops",
    description:
      "Tutorials and inspo we have bookmarked for years. Where a lot of this stuff started.",
    href: "https://tympanus.net/codrops/",
    domain: "tympanus.net",
    ogImage:
      "https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2024/04/codrops_social_graph.jpg",
  },
  {
    id: "coolshapes",
    title: "Coolshapes",
    description:
      "Copy-paste shapes for layouts and backgrounds. Quick wins when you need something organic.",
    href: "https://coolshap.es/",
    domain: "coolshap.es",
    ogImage: "https://coolshap.es/preview.jpg?v1",
  },
  {
    id: "craftwork",
    title: "Craftwork",
    description:
      "UI kits, illustrations, and design assets. Good for when a component needs a starting point.",
    href: "https://craftwork.design/",
    domain: "craftwork.design",
    ogImage: "https://cfw6.b-cdn.net/opengraph-image.png",
  },
  {
    id: "cta-gallery",
    title: "CTA Gallery",
    description: "Call-to-action patterns.",
    href: "https://www.cta.gallery/",
    domain: "cta.gallery",
    ogImage: "https://framerusercontent.com/images/yXhxFS3RMgsD2U3vLGvsjBaE4Q.jpg",
  },
  {
    id: "dead-simple-sites",
    title: "Dead Simple Sites",
    description: "Minimal sites. Helps us delete before we animate.",
    href: "https://deadsimplesites.com/",
    domain: "deadsimplesites.com",
    ogImage: "https://deadsimplesites.com/opengraph-image.png?66bb510859eae437",
  },
  {
    id: "deck-gallery",
    title: "Deck Gallery",
    description: "Slide decks worth studying for docs and launch pages.",
    href: "https://deck.gallery/",
    domain: "deck.gallery",
    ogImage: "https://www.deck.gallery/og_image.webp",
  },
  {
    id: "principles",
    title: "Design Principles",
    description: "Design principles from real teams.",
    href: "https://principles.design/",
    domain: "principles.design",
    ogImage: "https://principles.design/images/design-principles-og.png",
  },
  {
    id: "design-spells",
    title: "Design Spells",
    description: "Tiny interaction ideas worth stealing.",
    href: "https://designspells.com/",
    domain: "designspells.com",
    ogImage: "https://designspells.com/og.png",
  },
  {
    id: "footer",
    title: "Footer",
    description: "Footer layouts. Yes, a whole site for that.",
    href: "https://footer.design/",
    domain: "footer.design",
    ogImage:
      "https://cdn.prod.website-files.com/64fe0870e6e4f3a42a145c1c/6514c4e3bcde78421b541de9_open-graph.webp",
  },
  {
    id: "framer-gallery",
    title: "Framer Gallery",
    description: "Published Framer sites. See what the tool can actually ship.",
    href: "https://www.framer.com/gallery/",
    domain: "framer.com",
    ogImage: "https://framerusercontent.com/assets/IZferQWxokzbzndAKyP3pdxA.jpg",
  },
  {
    id: "framer-university",
    title: "Framer University",
    description: "Framer tutorials, templates, and resources in one place.",
    href: "https://framer.university/resources",
    domain: "framer.university",
    ogImage: "https://framerusercontent.com/images/6DJtJPu5YDuZV1hElqfn1Xp57wM.png",
  },
  {
    id: "godly",
    title: "Godly",
    description: "Hand-picked sites with actual craft. AI, portfolios, the weird good stuff.",
    href: "https://godly.website/",
    domain: "godly.website",
    ogImage: "https://godly.website/og.png",
  },
  {
    id: "gsap",
    title: "GSAP",
    description: "When timelines get serious. Scroll, SVG, and DOM motion without guessing.",
    href: "https://gsap.com/",
    domain: "gsap.com",
    ogImage: "https://gsap.com/GSAP-share-image.png",
  },
  {
    id: "hero-gallery",
    title: "Hero Gallery",
    description: "Hero sections only.",
    href: "https://hero.gallery/",
    domain: "hero.gallery",
    ogImage: "https://framerusercontent.com/images/ybUcfNmqO5II2Wemlqj0aBDmjgA.jpg",
  },
  {
    id: "hoverstat-es",
    title: "Hoverstat.es",
    description:
      "Alternative web design with write-ups on hover states, transitions, and interaction craft.",
    href: "https://hoverstat.es/",
    domain: "hoverstat.es",
    ogImage:
      "https://i.vimeocdn.com/video/2164525302-f5fdbe292af6fe2845dcfa62ed4e28124d3dac7b337df188e4d31e200d8baa5f-d_640x360?&r=pad&region=us",
  },
  {
    id: "httpster",
    title: "Httpster",
    description: "Creative web design gallery. Award-winning sites worth scrolling through.",
    href: "https://httpster.net/",
    domain: "httpster.net",
    ogImage: "https://httpster.net/assets/media/zd/makingsoftware.com-01-ZdQlpt.webp",
  },
  {
    id: "interface-in-game",
    title: "Interface In Game",
    description: "Video game UI. HUDs, menus, and interaction patterns from games.",
    href: "https://interfaceingame.com/",
    domain: "interfaceingame.com",
    ogImage: "https://interfaceingame.com/wp-content/uploads/share_twitter_interfaceingame.jpg",
  },
  {
    id: "land-book",
    title: "Land-book",
    description: "Searchable landing page gallery.",
    href: "https://land-book.com/",
    domain: "land-book.com",
    ogImage: "https://cdn.land-book.com/assets/og-image.webp",
  },
  {
    id: "lapa-ninja",
    title: "Lapa Ninja",
    description: "Landing page inspiration gallery. Good for hero and layout ideas.",
    href: "https://lapa.ninja/",
    domain: "lapa.ninja",
    ogImage: "https://cdn.lapa.ninja/assets/og-lapa/og-image.jpg",
  },
  {
    id: "landing-love",
    title: "Landing Love",
    description: "Landing pages picked for layout and type, not hype.",
    href: "https://www.landing.love",
    domain: "landing.love",
    ogImage: "https://www.landing.love/img/social.jpg",
  },
  {
    id: "landingfolio",
    title: "Landingfolio",
    description: "Section-level landing page examples and templates.",
    href: "https://www.landingfolio.com/",
    domain: "landingfolio.com",
    ogImage: "https://www.landingfolio.com/_nuxt/img/main.68a8f7f.png",
  },
  {
    id: "lucide-animated",
    title: "Lucide Animated",
    description: "Lucide icons with motion baked in. Handy when a static glyph feels too flat.",
    href: "https://lucide-animated.com/",
    domain: "lucide-animated.com",
    ogImage: "https://lucide-animated.com/og.png",
  },
  {
    id: "maxibestof",
    title: "Maxibestof",
    description: "Lots of picks. Strong opinions.",
    href: "https://maxibestof.one/",
    domain: "maxibestof.one",
    ogImage: "https://maxibestof.one/og.jpg",
  },
  {
    id: "minimal-gallery",
    title: "Minimal Gallery",
    description: "Minimal web design, curated. Less noise, better references.",
    href: "https://minimal.gallery/",
    domain: "minimal.gallery",
    ogImage: "https://minimal.gallery/wp-content/themes/minimalgallery/assets/img/meta/og.jpg",
  },
  {
    id: "mobbin",
    title: "Mobbin",
    description: "Mobile app UI flows. We open this before sketching a new screen.",
    href: "https://mobbin.com/",
    domain: "mobbin.com",
    ogImage: "https://mobbin.com/og_image.png?v=4.0",
  },
  {
    id: "motion-dev",
    title: "Motion",
    description:
      "The animation library we reach for in React. Docs, examples, and the API we actually read.",
    href: "https://motion.dev/",
    domain: "motion.dev",
    ogImage:
      "https://api.motion.dev/site/og/page/home.png?title=Motion&description=The+production-grade+animation+library+for+React%2C+JavaScript+and+Vue.",
  },
  {
    id: "navbar-gallery",
    title: "Navbar Gallery",
    description: "Navigation patterns.",
    href: "https://navbar.gallery/",
    domain: "navbar.gallery",
    ogImage:
      "https://cdn.prod.website-files.com/65676438ff1c480b81cf0085/65d0d08ee366dcfc3c73aa94_ogimage%20(2).webp",
  },
  {
    id: "ogimage-gallery",
    title: "OG Image Gallery",
    description: "OG and social preview examples.",
    href: "https://www.ogimage.gallery/",
    domain: "ogimage.gallery",
    ogImage:
      "https://cdn.prod.website-files.com/6040b8a8176ad35fd8dbf709/606597ba2d86c0c02d518010_og.jpg",
  },
  {
    id: "one-page-love",
    title: "One Page Love",
    description: "Around since 2008. Still good.",
    href: "https://onepagelove.com/",
    domain: "onepagelove.com",
    ogImage:
      "https://assets.onepagelove.com/cdn-cgi/image/width=1200,height=628,fit=cover,gravity=top,format=jpg,quality=85/wp-content/uploads/global/one-page-love-meta.jpg",
  },
  {
    id: "phosphor-icons",
    title: "Phosphor Icons",
    description:
      "Flexible icon family with weight variants. We grab from here when we need more options.",
    href: "https://phosphoricons.com/",
    domain: "phosphoricons.com",
    ogImage: "https://phosphoricons.com/phosphor-opengraph.png?v=2.0.2",
  },
  {
    id: "readymag",
    title: "Readymag",
    description: "Sites built in Readymag — editorial layouts, type, and scroll craft.",
    href: "https://readymag.com/",
    domain: "readymag.com",
    ogImage:
      "https://c-p.rmcdn.net/5f747d54a0bfc900b69a5fea/Image-dae06291-eaaa-4d69-babf-c997a2f27a8c.jpg",
  },
  {
    id: "refero",
    title: "Refero",
    description: "Web and iOS UI screenshots with search that actually works.",
    href: "https://refero.design/",
    domain: "refero.design",
    ogImage: "https://refero.design/open-graph-4-1200x630.png",
  },
  {
    id: "relibrary",
    title: "Relibrary",
    description: "Framer remix kits.",
    href: "https://relibrary.framer.website/",
    domain: "relibrary.framer.website",
    ogImage: "https://framerusercontent.com/images/k0FSttHev4pRr4DtJCFkbjLI67Y.jpg",
  },
  {
    id: "saas-landing-page",
    title: "SaaS Landing Page",
    description: "Landing page examples from SaaS companies worth copying.",
    href: "https://saaslandingpage.com/",
    domain: "saaslandingpage.com",
    ogImage: "https://saaslandingpage.com/wp-content/uploads/2023/12/Link-Share-Img@2x.png",
  },
  {
    id: "saaspo",
    title: "Saaspo",
    description: "SaaS sites filtered by page type. Pricing pages, onboarding, the lot.",
    href: "https://saaspo.com/",
    domain: "saaspo.com",
    ogImage:
      "https://cdn.prod.website-files.com/639997ad49dddb11d0c0efba/677fac595cf6750df0bf1e05_SaaSpo%20-%20OG%20(5).jpg",
  },
  {
    id: "screensdesign",
    title: "ScreensDesign",
    description: "App store screenshots and mobile UI references.",
    href: "https://screensdesign.com/",
    domain: "screensdesign.com",
    ogImage: "https://screensdesign.com/img/sd_preview_v2.jpg?v=2",
  },
  {
    id: "scroll-driven-animations",
    title: "Scroll-driven Animations",
    description: "Scroll timeline docs from Braam et al.",
    href: "https://scroll-driven-animations.style/",
    domain: "scroll-driven-animations.style",
    ogImage: "https://scroll-driven-animations.style/social.jpg",
  },
  {
    id: "seesaw",
    title: "SEESAW",
    description: "Open this before picking easing curves.",
    href: "https://www.seesaw.website/",
    domain: "seesaw.website",
    ogImage: "https://seesaw.website/img/og.jpg",
  },
  {
    id: "spotted-in-prod",
    title: "Spotted in Prod",
    description: "Screenshots from real iOS apps in production.",
    href: "https://spottedinprod.com/",
    domain: "spottedinprod.com",
    ogImage: "https://www.spottedinprod.com/opengraph-image.png?opengraph-image.ab455828.png",
  },
  {
    id: "storefront",
    title: "Storefront",
    description: "E-commerce layout references.",
    href: "https://www.storefront.design/",
    domain: "storefront.design",
    ogImage:
      "https://cdn.sanity.io/images/jvzt8m05/production/9182a96145a40644fb61f2bc8cd2ef89c730ddb8-1200x630.png",
  },
  {
    id: "todays-design",
    title: "Today's Design",
    description: "One site, once a day.",
    href: "https://todays.design/",
    domain: "todays.design",
    ogImage: "https://media.todays.design/social.png",
  },
  {
    id: "transitions-dev",
    title: "Transitions.dev",
    description:
      "Essential UI transitions for web apps. We check this before shipping a panel or route change.",
    href: "https://www.transitions.dev/",
    domain: "transitions.dev",
    ogImage: "https://transitions.dev/assets/og-image.jpg",
  },
  {
    id: "unsection",
    title: "Unsection",
    description: "Thousands of page sections, searchable.",
    href: "https://www.unsection.com/",
    domain: "unsection.com",
    ogImage: "https://assets.animata.design/resources/unsection.webp",
  },
  {
    id: "view-transitions-toolkit",
    title: "View Transitions Toolkit",
    description: "Chrome's view transition demos.",
    href: "https://chrome.dev/view-transitions-toolkit/#demos",
    domain: "chrome.dev",
    ogImage: "https://chrome.dev/view-transitions-toolkit/img/opengraph.png",
  },
  {
    id: "viewport-ui",
    title: "Viewport UI",
    description: "Responsive UI patterns and viewport-aware layouts.",
    href: "https://viewport-ui.design/",
    domain: "viewport-ui.design",
    ogImage: "https://viewport-ui.design/images/meta-image.jpg",
  },
  {
    id: "wall-of-portfolios",
    title: "Wall of Portfolios",
    description: "UX and product design portfolios, curated monthly.",
    href: "https://www.wallofportfolios.in/",
    domain: "wallofportfolios.in",
    ogImage:
      "https://cdn.prod.website-files.com/65c14454c8e90beca1ee629a/67742e466cad467d16f6d301_wall%20of%20portfolios.png",
  },
  {
    id: "webflow-interactions",
    title: "Webflow Interactions",
    description:
      "Popular Made in Webflow sites — scroll, hover, and page-load motion worth studying.",
    href: "https://webflow.com/made-in-webflow/interactions/popular",
    domain: "webflow.com",
    ogImage: "https://d3e54v103j8qbb.cloudfront.net/img/marketplace-og-image-d2.e48193842c.jpg",
  },
];

export function getResources(): Resource[] {
  return RESOURCES;
}
