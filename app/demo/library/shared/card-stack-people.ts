import { CARD_STACK_MASK_IDS, type CardStackItem } from "@/animata/card/card-stack";

export const DEMO_PEOPLE: CardStackItem[] = [
  {
    id: "maya",
    image:
      "https://assets.lummi.ai/assets/QmPyqQgSM8sDVrcQxRwUA6fTDaeXkLMvpf6Z3Kx4aCg3pU?auto=format&w=500",
    title: "Maya Chen",
    tagline: "Portrait photographer · Brooklyn",
    counts: { like: 142, comment: 23 },
    maskId: CARD_STACK_MASK_IDS[0],
  },
  {
    id: "jordan",
    image:
      "https://assets.lummi.ai/assets/QmVDPTUj31YYC4ycLmn3r1FhuSZDHBdK4d3Pk4gdbyB5MZ?auto=format&w=500",
    title: "Jordan Okonkwo",
    tagline: "Editorial · Lagos",
    counts: { like: 98, comment: 17 },
    maskId: CARD_STACK_MASK_IDS[1],
  },
  {
    id: "elena",
    image:
      "https://assets.lummi.ai/assets/QmXp6StB1i36XHbbmppop5AwtQgnyom8bYTZqPkLVNGJnk?auto=format&w=500",
    title: "Elena Ruiz",
    tagline: "Food stylist · Mexico City",
    counts: { like: 176, comment: 41 },
    maskId: CARD_STACK_MASK_IDS[2],
  },
  {
    id: "sam",
    image:
      "https://assets.lummi.ai/assets/QmWmYYozQAtxLohY8Hy1yopo4ds25KokJfNdtqybXnR5cw?auto=format&w=500",
    title: "Sam Ortiz",
    tagline: "Documentary · Austin",
    counts: { like: 64, comment: 12 },
    maskId: CARD_STACK_MASK_IDS[3],
  },
  {
    id: "priya",
    image:
      "https://assets.lummi.ai/assets/QmdybQRQqnqUKugP2e9hTaQi9GUciQkBADkrMVJ6GERsS2?auto=format&w=500",
    title: "Priya Nair",
    tagline: "Fashion · Mumbai",
    counts: { like: 211, comment: 33 },
    maskId: CARD_STACK_MASK_IDS[0],
  },
  {
    id: "leo",
    image:
      "https://assets.lummi.ai/assets/QmaEVTC9eFZtSLTJmMVNpd2t9ctw1BXPzQKV4rhja62Y5z?auto=format&w=500",
    title: "Leo Bergström",
    tagline: "Architecture · Stockholm",
    counts: { like: 87, comment: 9 },
    maskId: CARD_STACK_MASK_IDS[1],
  },
];

export const CREATOR_META: Record<
  string,
  { city: string; rate: string; specialty: string; available: string }
> = {
  maya: {
    city: "Brooklyn, NY",
    rate: "$320 / hr",
    specialty: "Natural light portraits",
    available: "Thu – Sat",
  },
  jordan: {
    city: "Lagos, NG",
    rate: "$280 / hr",
    specialty: "Editorial campaigns",
    available: "Mon – Wed",
  },
  elena: {
    city: "Mexico City",
    rate: "$240 / hr",
    specialty: "Recipe & table scenes",
    available: "Fri – Sun",
  },
  sam: {
    city: "Austin, TX",
    rate: "$300 / hr",
    specialty: "Long-form documentary",
    available: "By request",
  },
  priya: {
    city: "Mumbai",
    rate: "$360 / hr",
    specialty: "Runway & lookbooks",
    available: "Tue – Thu",
  },
  leo: {
    city: "Stockholm",
    rate: "$290 / hr",
    specialty: "Spatial & interior",
    available: "Mon – Fri",
  },
};

export const CANDIDATE_META: Record<string, { role: string; stage: string; skills: string[] }> = {
  maya: {
    role: "Senior product designer",
    stage: "Phone screen",
    skills: ["Figma", "Design systems", "Prototyping"],
  },
  jordan: {
    role: "Staff frontend engineer",
    stage: "Portfolio review",
    skills: ["React", "Motion", "Accessibility"],
  },
  elena: {
    role: "Brand designer",
    stage: "Take-home",
    skills: ["Typography", "Art direction", "Print"],
  },
  sam: {
    role: "Design engineer",
    stage: "Technical interview",
    skills: ["TypeScript", "CSS", "Storybook"],
  },
  priya: {
    role: "Visual designer",
    stage: "Culture fit",
    skills: ["Illustration", "Motion", "3D"],
  },
  leo: {
    role: "UX researcher",
    stage: "Panel",
    skills: ["Interviews", "Synthesis", "Workshops"],
  },
};

export const LOOKBOOK_ITEMS: CardStackItem[] = [
  {
    id: "shell",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&w=800&q=80",
    title: "Shell track",
    tagline: "Drop 04 · outerwear",
    counts: { like: 148, comment: 42 },
    maskId: CARD_STACK_MASK_IDS[2],
  },
  {
    id: "oxide",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&w=800&q=80",
    title: "Oxide tee",
    tagline: "Drop 04 · knits",
    counts: { like: 68, comment: 38 },
    maskId: CARD_STACK_MASK_IDS[3],
  },
  {
    id: "cargo",
    image: "https://images.unsplash.com/photo-1624378515194-6fc7111942f2?auto=format&w=800&q=80",
    title: "Cargo wide",
    tagline: "Drop 04 · bottoms",
    counts: { like: 124, comment: 34 },
    maskId: CARD_STACK_MASK_IDS[0],
  },
  {
    id: "mesh",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&w=800&q=80",
    title: "Mesh layer",
    tagline: "Drop 04 · layers",
    counts: { like: 92, comment: 36 },
    maskId: CARD_STACK_MASK_IDS[1],
  },
  {
    id: "cap",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c036e952?auto=format&w=800&q=80",
    title: "Wax cap",
    tagline: "Drop 04 · accessories",
    counts: { like: 44, comment: 32 },
    maskId: CARD_STACK_MASK_IDS[3],
  },
];

export const GUEST_ITEMS: CardStackItem[] = DEMO_PEOPLE.map((person) => ({
  ...person,
  tagline: person.tagline.split(" · ")[0] ?? person.tagline,
}));
