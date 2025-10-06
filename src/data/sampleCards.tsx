// src/data/sampleCards.ts

export interface Card {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  badge: string;
}

export const sampleCards: Card[] = [
  {
    id: 1,
    title: "Neural Networks",
    description:
      "Deep dive into artificial intelligence and machine learning algorithms that power modern applications.",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1600&h=1200&auto=format&fit=crop&q=60",
    category: "AI/ML",
    badge: "Advanced",
  },
  {
    id: 2,
    title: "Quantum Computing",
    description:
      "Explore the revolutionary world of quantum mechanics applied to computational systems and algorithms.",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1600&h=1200&auto=format&fit=crop&q=60",
    category: "Physics",
    badge: "Research",
  },
  {
    id: 3,
    title: "Blockchain Technology",
    description:
      "Understand distributed ledger technology and its applications in cryptocurrency and smart contracts.",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&h=1200&auto=format&fit=crop&q=60",
    category: "FinTech",
    badge: "Popular",
  },
  {
    id: 4,
    title: "Space Exploration",
    description:
      "Journey through the cosmos and learn about modern space missions and astronomical discoveries.",
    image:
      "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1600&h=1200&auto=format&fit=crop&q=60",
    category: "Science",
    badge: "Featured",
  },
];
