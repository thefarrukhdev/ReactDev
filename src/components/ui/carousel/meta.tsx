import React from "react";
import { Glass3DCarousel } from "./Glass3DCarousel";
import { glass3DCarouselCode } from "./glass3DCarouselCode";
import { Glass3DCarouselUsage } from "./usage";
import { Glass3DCarouselInstall } from "./install";

// CarouselCard interfeysi
interface CarouselCard {
  id: number;
  title: string;
  description: string;
  image?: string;
  category?: string;
  badge?: string;
}

// 5 ta sample cards
const sampleCards: CarouselCard[] = [
  {
    id: 1,
    title: "AI Assistant",
    description: "Next-gen AI tool for productivity",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    category: "AI",
    badge: "Popular",
  },
  {
    id: 2,
    title: "VR Headset",
    description: "Immersive VR experience",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    category: "VR",
    badge: "New",
  },
  {
    id: 3,
    title: "Smart Home Hub",
    description: "Control your home with AI-powered hub",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    category: "IoT",
    badge: "Featured",
  },
  {
    id: 4,
    title: "Electric Bike",
    description: "Eco-friendly and fast e-bike",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    category: "Transport",
    badge: "Trending",
  },
  {
    id: 5,
    title: "Cloud Storage Pro",
    description: "Secure cloud storage solution",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    category: "Cloud",
    badge: "Recommended",
  },
];

export const meta = {
  id: "carousel",
  name: "3D Glass Carousel",
  element: (
    <Glass3DCarousel
      cards={sampleCards}
      onItemSelect={(_index, card) => console.log(card.title)}
      autoPlay={true}
      autoPlayInterval={4000}
      showControls={true}
      rotationIntensity={25}
    />
  ),
  code: glass3DCarouselCode,
  usage: Glass3DCarouselUsage,
  install: Glass3DCarouselInstall,
};
