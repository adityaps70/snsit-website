export const CONTACT = {
  email: "info@snsit.co.in",
  phone: "+91 82990 44462",
  phoneRaw: "+918299044462",
  whatsapp: "918299044462",
  company: "Sea N Shore IT Solutions LLP",
  domain: "snsit.co.in",
}

export const NAV = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
]

export type Project = {
  name: string
  url: string
  domain: string
  bar: string
  phone: string
  desktop: string
  sector: string
  place?: string
  desc: string
  did: string[]
  color: string
}

export const WORK: Project[] = [
  {
    name: "Sea N Shore",
    url: "https://seanshore.in/",
    domain: "seanshore.in",
    bar: "seanshore.in",
    phone: "assets/work/seanshore.jpg",
    desktop: "assets/work/seanshore-desktop.jpg",
    sector: "Maritime professional network · Platform",
    desc: "A free professional network for seafarers and shore staff. Jobs with a Maritime Match score, a Maritime Passport that holds rank, sea service and certificates and exports a DG-format PDF, courses with certificates, events, a feed, messaging and verified company pages.",
    did: ["Product design", "Web platform", "Learning & certificates", "Payments", "Cloud hosting"],
    color: "#1A8C86",
  },
  {
    name: "Marine Tanks",
    url: "https://marinetanks.in/",
    domain: "marinetanks.in",
    bar: "marinetanks.in",
    phone: "assets/work/marinetanks.jpg",
    desktop: "assets/work/marinetanks-desktop.jpg",
    sector: "Maritime news & intelligence · Media + AI",
    desc: "India's maritime newsroom. Shipping, Merchant Navy, ports, safety and regulation coverage, an Intelligence feed that tracks IMO, DG Shipping and UK MCA updates every four hours, a monthly magazine, podcasts, and Ask Marine Tanks AI, which answers questions with citations to its own reporting.",
    did: ["News platform", "AI Q&A", "Regulatory automation", "Podcast & video", "SEO"],
    color: "#2D58C8",
  },
  {
    name: "VerifyU",
    url: "https://verifyu.in/",
    domain: "verifyu.in",
    bar: "verifyu.in",
    phone: "assets/work/verifyu.jpg",
    desktop: "assets/work/verifyu-desktop.jpg",
    sector: "Emergency identity & safety · Mobile app",
    desc: "Your face, your lifeline. In an emergency, a responder can scan a registered person's face to reach their emergency details and the people they trust. We designed the app experience and built the marketing site.",
    did: ["App UX/UI", "Website", "Brand system", "Motion"],
    color: "#8A4BD6",
  },
  {
    name: "Cloud Trails",
    url: "https://cloudtrails.in/",
    domain: "cloudtrails.in",
    bar: "cloudtrails.in",
    phone: "assets/work/cloudtrails.jpg",
    desktop: "assets/work/cloudtrails-desktop.jpg",
    sector: "Bike rentals & guided tours · Website",
    place: "Shillong",
    desc: "Scooty and Royal Enfield rentals, day tours and a six-day group expedition in Meghalaya, with a clear rate card and WhatsApp-first booking.",
    did: ["Website", "Booking flow", "Local SEO"],
    color: "#C98A2E",
  },
  {
    name: "inFAMOUS Gaming Cafe",
    url: "https://adityaps70.github.io/INFAMOUSGAMINGCAFE/",
    domain: "GitHub Pages",
    bar: "adityaps70.github.io/INFAMOUSGAMINGCAFE",
    phone: "assets/work/infamous.jpg",
    desktop: "assets/work/infamous-desktop.jpg",
    sector: "Gaming café · Website",
    place: "Lucknow",
    desc: "PC, PlayStation, VR, simulators, billiards and table tennis under one roof. A bold mobile-first site with a session picker, rates and one-tap WhatsApp booking.",
    did: ["Mobile-first", "WhatsApp booking", "Google Maps"],
    color: "#6E9A16",
  },
]

export const CLIENTS = [
  { name: "Sea N Shore", logo: "assets/clients/seanshore.png", url: "https://seanshore.in/", tag: "Maritime network", bg: "#f2f8f8", h: "h-14" },
  { name: "Marine Tanks", logo: "assets/clients/marinetanks.png", url: "https://marinetanks.in/", tag: "Maritime news & AI", bg: "#f2f5fd", h: "h-9" },
  { name: "VerifyU", logo: "assets/clients/verifyu.png", url: "https://verifyu.in/", tag: "Safety-tech app", bg: "#f7f2fd", h: "h-20" },
  { name: "Cloud Trails", logo: "assets/clients/cloudtrails.png", url: "https://cloudtrails.in/", tag: "Travel & rentals", bg: "#1a1f1b", h: "h-16", dark: true },
  { name: "inFAMOUS Gaming Cafe", logo: "assets/clients/infamous.png", url: "https://adityaps70.github.io/INFAMOUSGAMINGCAFE/", tag: "Gaming café", bg: "#0b0b0b", h: "h-28", dark: true },
]

export const SERVICES = [
  {
    t: "Websites & web apps",
    one: "Fast, good-looking sites that bring in enquiries.",
    pts: ["Business and landing sites", "Booking and enquiry flows", "WhatsApp and call integration", "On-page SEO, analytics, hosting"],
  },
  {
    t: "Platforms & SaaS",
    one: "Networks, marketplaces, job boards and learning platforms.",
    pts: ["Accounts and profiles", "Job boards and matching", "Courses and certificates", "Payments and admin dashboards"],
  },
  {
    t: "Mobile apps",
    one: "Android and iPhone apps people keep on their home screen.",
    pts: ["App UX/UI and prototypes", "Android and iOS builds", "Onboarding and push", "Store listing and companion site"],
  },
  {
    t: "AI automation & agents",
    one: "AI that saves hours, answers customers and cites its sources.",
    pts: ["Source-grounded Q&A", "AI voice calling agents", "WhatsApp assistants", "Automated alerts and feeds"],
  },
]

export const WHY = [
  { icon: "Code", t: "Design and code together", d: "The people who design your screens also ship them, so what you approve is what goes live." },
  { icon: "MessageCircle", t: "Built for how India buys", d: "WhatsApp-first enquiries, Indian payment gateways, Hindi and English content, fast on budget phones." },
  { icon: "Zap", t: "AI where it earns its place", d: "Source-grounded Q&A, voice agents and automations that cut real work, not chatbots for show." },
  { icon: "ShieldCheck", t: "Launch, host and look after it", d: "Domains, hosting, SEO basics and updates after launch, so the site keeps working." },
  { icon: "FileText", t: "Clear scope, clear price", d: "A written scope and a fixed quote after one discovery call. No surprise invoices." },
] as const

export const STEPS = [
  { k: "Discover", t: "Talk it through", d: "A call to understand the business, the audience and what success looks like. You get a written scope and quote." },
  { k: "Design", t: "See it first", d: "Clickable designs for mobile and desktop. We revise until it feels right before any code is written." },
  { k: "Build", t: "Ship in rounds", d: "Short build rounds with a live preview link, so you see progress every week." },
  { k: "Launch", t: "Go live and grow", d: "Domain, hosting, analytics and search setup. Then updates and new features as you need them." },
]

export const FAQ: [string, string][] = [
  ["What do you build?", "Websites, web platforms, mobile apps and AI automation. That covers a one-page business site through to a full platform with accounts, payments and an admin panel."],
  ["How long does a project take?", "It depends on scope. A business website is usually quicker than a platform or app. After the discovery call we give you a written timeline with dates, and we share a live preview as we build."],
  ["How is pricing worked out?", "We scope first, then quote a fixed price for that scope. If you want to add something later, we quote it separately before starting."],
  ["Which industries do you work with?", "Anyone with a clear goal. We have deep experience in maritime, safety-tech, travel and leisure, and local businesses that sell through WhatsApp."],
  ["Do you help after launch?", "Yes. We can host the site, handle updates and fixes, and add features as your business grows."],
]

export const NEEDS = ["Website", "Platform / SaaS", "Mobile app", "AI automation", "Redesign"]
