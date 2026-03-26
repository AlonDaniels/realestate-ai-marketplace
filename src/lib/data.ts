export interface Tool {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  pricingModel?: "ONE_TIME" | "SUBSCRIPTION";
  category: "ai-agent" | "automation" | "analytics" | "marketing" | "lead-gen" | "property-mgmt";
  categoryLabel: string;
  creator: {
    name: string;
    avatar: string;
    title: string;
    bio?: string;
  };
  installs: number;
  rating: number;
  image: string;
  featured?: boolean;
  tags: string[];
}

export interface Creator {
  id: string;
  name: string;
  avatar: string;
  title: string;
  bio: string;
  listingCount: number;
}

export const categories = [
  { id: "ai-agent", label: "AI Agents", icon: "🤖" },
  { id: "automation", label: "Automation", icon: "⚡" },
  { id: "analytics", label: "Analytics", icon: "📊" },
  { id: "marketing", label: "Marketing", icon: "📣" },
  { id: "lead-gen", label: "Lead Generation", icon: "🎯" },
  { id: "property-mgmt", label: "Property Mgmt", icon: "🏠" },
];

export const tools: Tool[] = [
  {
    id: "realty-ai-assistant",
    name: "RealtyMind Pro",
    description: "Your AI real estate assistant — handles lead qualification, follow-ups, market analysis, and client communication automatically.",
    price: 149,
    category: "ai-agent",
    categoryLabel: "AI Agent",
    creator: { name: "Sarah Chen", avatar: "/avatars/sarah.svg", title: "Real Estate Tech Lead" },
    installs: 2340,
    rating: 4.9,
    image: "/tools/realty-mind.svg",
    featured: true,
    tags: ["lead-qualification", "follow-up", "market-analysis"],
  },
  {
    id: "property-valuation-ai",
    name: "ValuAI — Instant Property Valuations",
    description: "AI-powered property valuation engine using comparable sales, market trends, and neighborhood data. Get accurate estimates in seconds.",
    price: 99,
    category: "analytics",
    categoryLabel: "Analytics",
    creator: { name: "Marcus Webb", avatar: "/avatars/marcus.svg", title: "Data Scientist & Investor" },
    installs: 1890,
    rating: 4.8,
    image: "/tools/valu-ai.svg",
    featured: true,
    tags: ["valuation", "comps", "market-data"],
  },
  {
    id: "lead-magnet-generator",
    name: "LeadFlow AI",
    description: "Generate targeted real estate leads using AI-powered ad copy, landing pages, and automated nurture sequences.",
    price: 79,
    category: "lead-gen",
    categoryLabel: "Lead Generation",
    creator: { name: "Jessica Torres", avatar: "/avatars/jessica.svg", title: "Marketing Strategist" },
    installs: 3100,
    rating: 4.7,
    image: "/tools/leadflow.svg",
    featured: true,
    tags: ["leads", "ads", "nurture"],
  },
  {
    id: "listing-description-writer",
    name: "ListingGPT",
    description: "AI listing description writer that creates compelling, SEO-optimized property descriptions from photos and basic details.",
    price: 0,
    category: "marketing",
    categoryLabel: "Marketing",
    creator: { name: "David Park", avatar: "/avatars/david.svg", title: "Content & PropTech" },
    installs: 5200,
    rating: 4.6,
    image: "/tools/listing-gpt.svg",
    tags: ["listings", "copywriting", "seo"],
  },
  {
    id: "market-report-builder",
    name: "MarketPulse Reports",
    description: "Auto-generate branded market reports with local data, charts, and AI-written insights. Perfect for client presentations.",
    price: 59,
    category: "analytics",
    categoryLabel: "Analytics",
    creator: { name: "Sarah Chen", avatar: "/avatars/sarah.svg", title: "Real Estate Tech Lead" },
    installs: 1450,
    rating: 4.8,
    image: "/tools/market-pulse.svg",
    tags: ["reports", "market-data", "branding"],
  },
  {
    id: "tenant-screening-ai",
    name: "ScreenSmart AI",
    description: "AI-powered tenant screening that analyzes applications, verifies documents, and provides risk scores in minutes.",
    price: 49,
    category: "property-mgmt",
    categoryLabel: "Property Mgmt",
    creator: { name: "Rachel Kim", avatar: "/avatars/rachel.svg", title: "Property Manager & Dev" },
    installs: 980,
    rating: 4.5,
    image: "/tools/screen-smart.svg",
    tags: ["screening", "tenants", "risk-analysis"],
  },
  {
    id: "social-media-autopilot",
    name: "SocialAgent RE",
    description: "Automated social media posting for real estate agents. AI creates property showcases, market tips, and engagement content.",
    price: 0,
    category: "marketing",
    categoryLabel: "Marketing",
    creator: { name: "Alex Rivera", avatar: "/avatars/alex.svg", title: "Social Media & RE" },
    installs: 4100,
    rating: 4.4,
    image: "/tools/social-agent.svg",
    tags: ["social-media", "content", "automation"],
  },
  {
    id: "crm-automation-suite",
    name: "RE CRM Automator",
    description: "Plug-and-play automation workflows for Follow Up Boss, KVCore, and other real estate CRMs. Zero coding required.",
    price: 129,
    category: "automation",
    categoryLabel: "Automation",
    creator: { name: "Marcus Webb", avatar: "/avatars/marcus.svg", title: "Data Scientist & Investor" },
    installs: 1670,
    rating: 4.7,
    image: "/tools/crm-auto.svg",
    tags: ["crm", "workflows", "integration"],
  },
  {
    id: "cold-call-script-ai",
    name: "CallScript Pro",
    description: "AI-generated cold calling scripts tailored to property type, lead source, and objection handling. Includes role-play trainer.",
    price: 0,
    category: "lead-gen",
    categoryLabel: "Lead Generation",
    creator: { name: "Jessica Torres", avatar: "/avatars/jessica.svg", title: "Marketing Strategist" },
    installs: 2890,
    rating: 4.3,
    image: "/tools/callscript.svg",
    tags: ["cold-calling", "scripts", "training"],
  },
  {
    id: "rental-analysis-tool",
    name: "RentCast AI Analyzer",
    description: "Analyze rental properties with AI — cash flow projections, ROI estimates, and comp-based rent analysis in one click.",
    price: 69,
    category: "analytics",
    categoryLabel: "Analytics",
    creator: { name: "David Park", avatar: "/avatars/david.svg", title: "Content & PropTech" },
    installs: 2100,
    rating: 4.8,
    image: "/tools/rentcast-ai.svg",
    tags: ["rental", "analysis", "roi"],
  },
  {
    id: "open-house-ai",
    name: "OpenHouse Autopilot",
    description: "Digital sign-in, automated follow-up sequences, and AI-powered lead scoring for open house visitors.",
    price: 39,
    category: "automation",
    categoryLabel: "Automation",
    creator: { name: "Rachel Kim", avatar: "/avatars/rachel.svg", title: "Property Manager & Dev" },
    installs: 760,
    rating: 4.5,
    image: "/tools/open-house.svg",
    tags: ["open-house", "sign-in", "follow-up"],
  },
  {
    id: "contract-review-ai",
    name: "ContractAI Review",
    description: "AI-powered contract review for real estate transactions. Flags risks, missing clauses, and suggests improvements.",
    price: 199,
    category: "ai-agent",
    categoryLabel: "AI Agent",
    creator: { name: "Alex Rivera", avatar: "/avatars/alex.svg", title: "Social Media & RE" },
    installs: 890,
    rating: 4.9,
    image: "/tools/contract-ai.svg",
    featured: true,
    tags: ["contracts", "review", "legal"],
  },
];

export const featuredCreators: Creator[] = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    avatar: "/avatars/sarah.svg",
    title: "Real Estate Tech Lead",
    bio: "10+ years in PropTech. Building AI tools that save agents 20+ hours/week.",
    listingCount: 4,
  },
  {
    id: "marcus-webb",
    name: "Marcus Webb",
    avatar: "/avatars/marcus.svg",
    title: "Data Scientist & Investor",
    bio: "Former Zillow data scientist. Now building AI analytics for independent agents.",
    listingCount: 3,
  },
  {
    id: "jessica-torres",
    name: "Jessica Torres",
    avatar: "/avatars/jessica.svg",
    title: "Marketing Strategist",
    bio: "Helped 500+ agents automate their lead gen. Marketing meets machine learning.",
    listingCount: 5,
  },
  {
    id: "david-park",
    name: "David Park",
    avatar: "/avatars/david.svg",
    title: "Content & PropTech",
    bio: "Content automation pioneer. Turning property data into compelling stories.",
    listingCount: 3,
  },
  {
    id: "rachel-kim",
    name: "Rachel Kim",
    avatar: "/avatars/rachel.svg",
    title: "Property Manager & Dev",
    bio: "Managing 200+ units while building tools to make it easier for everyone.",
    listingCount: 2,
  },
  {
    id: "alex-rivera",
    name: "Alex Rivera",
    avatar: "/avatars/alex.svg",
    title: "Social Media & RE",
    bio: "Built a 100K following for real estate content. Now automating the process.",
    listingCount: 3,
  },
];

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function getFeaturedTools(): Tool[] {
  return tools.filter((t) => t.featured);
}

export function getPopularTools(): Tool[] {
  return [...tools].sort((a, b) => b.installs - a.installs).slice(0, 6);
}

export function getFreeTools(): Tool[] {
  return tools.filter((t) => t.price === 0);
}

export function getToolById(id: string): Tool | undefined {
  return tools.find((t) => t.id === id);
}
