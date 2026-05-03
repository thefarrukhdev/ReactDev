export const siteConfig = {
  name: "React UI Components",
  description:
    "A curated collection of beautiful, reusable, and production-ready React components for your next project.",
  url: "https://your-domain.com",
  ogImage: "https://your-domain.com/og.jpg",
  links: {
    github: "https://github.com/yourusername/your-repo",
    twitter: "https://twitter.com/yourusername",
  },
  creator: {
    name: "Your Name",
    url: "https://your-website.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;
