import type { SiteContent } from "@/types/content";

const brand = {
  name: "Mehrtek",
  tagline: "Build smarter. Grow faster.",
  description:
    "Mehrtek helps service businesses turn manual work and unclear marketing into simple systems that win better clients.",
};

export const site: SiteContent = {
  brand,
  navigation: [
    { label: "Services", href: "#services" },
    { label: "How it works", href: "#process" },
    { label: "Work", href: "#work" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  // PLACEHOLDER: replace fictional social-proof marks with approved client logos.
  logos: [
    { name: "Northstar", src: "/logos/northstar.svg", alt: "Northstar wordmark" },
    { name: "Brightline", src: "/logos/brightline.svg", alt: "Brightline wordmark" },
    { name: "Signal House", src: "/logos/signal-house.svg", alt: "Signal House wordmark" },
    { name: "Fieldwork", src: "/logos/fieldwork.svg", alt: "Fieldwork wordmark" },
    { name: "Common Thread", src: "/logos/common-thread.svg", alt: "Common Thread wordmark" },
    { name: "Good Orbit", src: "/logos/good-orbit.svg", alt: "Good Orbit wordmark" },
  ],
  hero: {
    eyebrow: "Automation, websites, and growth systems for lean teams",
    title: "Turn more of your best work into booked business.",
    description:
      "We build conversion-focused websites, practical automations, and clear growth campaigns so your team spends less time chasing admin and more time serving clients.",
    primaryCta: "Book a free call",
    secondaryCta: "See our services",
    trustLine: "A focused plan in 30 minutes · No pressure to buy",
    serviceChips: [
      { label: "Websites that convert", href: "#services" },
      { label: "Lead capture automation", href: "#services" },
      { label: "Content systems", href: "#services" },
      { label: "Paid campaign setup", href: "#services" },
      { label: "Reporting dashboards", href: "#services" },
    ],
  },
  servicesSection: {
    eyebrow: "What we do",
    title: "Practical systems that make growth easier to run",
    description:
      "Choose the bottleneck you want to remove first. Every engagement starts with a clear scope, useful deliverables, and a handoff your team can own.",
  },
  services: [
    {
      id: "conversion-websites",
      icon: "PanelsTopLeft",
      title: "Conversion websites",
      outcome: "Give the right prospects a clear reason to choose you.",
      deliverables: ["Messaging and page structure", "Responsive website build", "Analytics and conversion tracking"],
      bestFor: "Best for teams with an outdated or unclear website.",
    },
    {
      id: "lead-automation",
      icon: "Workflow",
      title: "Lead capture automation",
      outcome: "Respond to good enquiries quickly, even when your team is busy.",
      deliverables: ["Form and CRM connection", "Lead routing and follow-up emails", "Pipeline alerts and handoff notes"],
      bestFor: "Best for teams losing leads in inboxes and spreadsheets.",
    },
    {
      id: "content-systems",
      icon: "PenLine",
      title: "Content systems",
      outcome: "Keep showing up with useful content without starting from zero.",
      deliverables: ["Content themes and calendar", "Reusable post and email templates", "Simple approval workflow"],
      bestFor: "Best for founders who know their expertise but lack time to publish.",
    },
    {
      id: "paid-campaigns",
      icon: "MousePointerClick",
      title: "Paid campaign setup",
      outcome: "Put a measurable acquisition loop behind your strongest offer.",
      deliverables: ["Offer and audience plan", "Campaign and landing page setup", "Weekly test and optimisation plan"],
      bestFor: "Best for teams ready to spend carefully and learn quickly.",
    },
    {
      id: "reporting-dashboards",
      icon: "ChartNoAxesCombined",
      title: "Reporting dashboards",
      outcome: "Know which channels create conversations, not just clicks.",
      deliverables: ["Source and conversion tracking", "Decision-ready dashboard", "Monthly performance review"],
      bestFor: "Best for teams making marketing decisions from scattered numbers.",
    },
    {
      id: "operations-automation",
      icon: "Bot",
      title: "Operations automation",
      outcome: "Give your team back the hours hidden inside repeatable tasks.",
      deliverables: ["Process and tool audit", "Automated reminders and updates", "Documentation and team training"],
      bestFor: "Best for service teams growing faster than their processes.",
    },
  ],
  processSection: {
    eyebrow: "How it works",
    title: "A small, focused engagement with a useful finish line",
    description:
      "You will always know what we are solving, what is being built, and what happens next.",
  },
  process: [
    { number: "01", title: "Map the bottleneck", description: "We review your offer, customer journey, tools, and current numbers to find the highest-leverage constraint." },
    { number: "02", title: "Choose the smallest useful scope", description: "You get a plain-language plan with deliverables, timing, and a fixed starting point before any build begins." },
    { number: "03", title: "Build and test", description: "We create the pages, workflows, and campaigns, then test them against the real steps your team and customers take." },
    { number: "04", title: "Hand it over clearly", description: "You receive a working system, a short guide, and a next-step recommendation based on what the work taught us." },
  ],
  workSection: {
    eyebrow: "Selected work",
    title: "Examples of the work we are built to do",
    description:
      "These are representative project directions. Replace them with approved case studies, outcomes, and client permissions before launch.",
  },
  // PLACEHOLDER: replace these representative project cards with approved case studies.
  projects: [
    { title: "The service firm enquiry engine", category: "Website + automation", description: "A clearer offer page, qualification form, and instant routing for a growing consultancy.", outcome: "Placeholder project: replace with an approved case study and measured outcome.", accent: "bg-primary/15" },
    { title: "The founder content desk", category: "Content system", description: "A repeatable weekly workflow that turns one expert conversation into useful posts and emails.", outcome: "Placeholder project: replace with approved client details and publishing results.", accent: "bg-accent/25" },
    { title: "The campaign control room", category: "Paid growth + reporting", description: "A focused landing page and dashboard for learning which audience and offer create qualified calls.", outcome: "Placeholder project: replace with approved campaign evidence and metrics.", accent: "bg-primary/10" },
  ],
  featuresSection: {
    eyebrow: "Why Mehrtek",
    title: "Why Mehrtek",
    description:
      "You get direct access to the people shaping the work, decisions explained in plain language, and systems designed for your actual capacity.",
  },
  features: [
    { icon: "Target", title: "Start with the constraint", description: "We focus the work on the one bottleneck that is costing you the most time, attention, or opportunity." },
    { icon: "Blocks", title: "Build around your tools", description: "We improve the stack you already use where possible, instead of creating another system to maintain." },
    { icon: "MessageSquareText", title: "Keep decisions visible", description: "You see what changed, why it changed, and what signal will tell us whether it is working." },
    { icon: "Gauge", title: "Prefer useful over flashy", description: "Every page, automation, and report has a job tied to a customer action or a team decision." },
    { icon: "Handshake", title: "Leave you more capable", description: "We document the handoff and teach your team enough to run the system confidently." },
    { icon: "RefreshCw", title: "Improve in small loops", description: "We make the next smart improvement easier instead of promising a giant transformation upfront." },
  ],
  testimonials: [
    // PLACEHOLDER: replace with approved customer testimonial before launch.
    { quote: "The new enquiry flow made it obvious what to fix first. We stopped guessing and started following up consistently.", name: "Alex Morgan", role: "Owner", company: "Northstar Studio", initials: "AM", avatar: "/avatars/alex-morgan.svg" },
    // PLACEHOLDER: replace with approved customer testimonial before launch.
    { quote: "Mehrtek gave us a website our sales team can actually use. The message is clearer and every page has a purpose.", name: "Jordan Lee", role: "Growth lead", company: "Signal House", initials: "JL", avatar: "/avatars/jordan-lee.svg" },
    // PLACEHOLDER: replace with approved customer testimonial before launch.
    { quote: "The handoff was as valuable as the build. We know how the workflow works and what to improve next.", name: "Taylor Reed", role: "Founder", company: "Brightline Co.", initials: "TR", avatar: "/avatars/taylor-reed.svg" },
  ],
  testimonialsSection: {
    eyebrow: "Client perspective",
    title: "Clearer work creates calmer growth",
    description: "Placeholder perspectives from the kind of teams Mehrtek is designed to support.",
  },
  // PLACEHOLDER pricing; replace package scope, prices, and terms before launch.
  plans: [
    { id: "quick-win", name: "Quick Win", description: "Fix one visible bottleneck without committing to a long programme.", price: { monthly: 1500, yearly: 1200 }, features: ["One focused discovery session", "A defined conversion or automation improvement", "Handoff guide and next-step plan"], cta: "Book a Quick Win call", href: "#contact" },
    { id: "growth", name: "Growth", description: "Build the core website, campaign, or workflow your next stage needs.", price: { monthly: 3500, yearly: 2800 }, features: ["Strategy and implementation", "Connected tracking and reporting", "Two optimisation cycles", "Team handoff and training"], cta: "Discuss Growth", href: "#contact", highlighted: true },
    { id: "custom", name: "Custom", description: "A joined-up engagement for several connected growth constraints.", price: { monthly: null, yearly: null }, features: ["Multi-service roadmap", "Flexible delivery cadence", "Ongoing advisory and optimisation"], cta: "Plan a custom project", href: "#contact" },
  ],
  pricing: [
    { name: "Quick Win", description: "One focused improvement.", monthly: 1500, yearly: 1200, cta: "Book a Quick Win call", features: ["Focused scope", "Working deliverable", "Handoff guide"] },
    { name: "Growth", description: "A core system for your next stage.", monthly: 3500, yearly: 2800, cta: "Discuss Growth", highlighted: true, features: ["Strategy and build", "Tracking and reporting", "Team handoff"] },
    { name: "Custom", description: "Connected support across several constraints.", monthly: null, yearly: null, cta: "Plan a custom project", features: ["Joined-up roadmap", "Flexible cadence", "Ongoing optimisation"] },
  ],
  faqs: [
    { question: "What kind of businesses do you work with?", answer: "We work best with small service businesses and lean teams that have a proven offer but need clearer marketing or more reliable operations." },
    { question: "Can you work with our existing tools?", answer: "Usually. We start by mapping the tools you already use, then connect or simplify them before recommending anything new." },
    { question: "How do we choose the right package?", answer: "The free call is designed to answer that. We will identify the highest-value bottleneck and recommend Quick Win, Growth, or a custom scope." },
    { question: "How long does a project take?", answer: "A Quick Win typically takes two to four weeks. Growth projects commonly run six to ten weeks, depending on feedback and integrations." },
    { question: "Will you manage campaigns after launch?", answer: "We can provide a testing plan, reporting, and ongoing optimisation. The exact level of support is agreed in your scope." },
    { question: "Do you guarantee leads or revenue?", answer: "No responsible partner can guarantee those outcomes. We do guarantee a clear scope, honest measurement, and decisions based on evidence." },
    { question: "What happens after the project?", answer: "You receive the working system, documentation, and a recommendation for the next improvement. Ongoing support is optional." },
  ],
  finalCta: {
    headline: "Bring us the bottleneck. Leave with a clear next move.",
    description: "Book a free 30-minute call and we will talk through what is slowing growth, what to fix first, and whether Mehrtek is the right fit.",
    primaryCta: "Book a free call",
    secondaryLink: { label: "See our services", href: "#services" },
  },
  footer: {
    linkGroups: [
      { title: "Services", links: [{ label: "Services", href: "#services" }, { label: "How it works", href: "#process" }, { label: "Work", href: "#work" }] },
      { title: "Company", links: [{ label: "Why Mehrtek", href: "#features" }, { label: "Testimonials", href: "#testimonials" }, { label: "Contact", href: "#final-cta" }] },
      { title: "Legal", links: [{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }] },
    ],
    socialLinks: [{ label: "LinkedIn", href: "https://www.linkedin.com" }, { label: "X", href: "https://x.com" }],
  },
};
