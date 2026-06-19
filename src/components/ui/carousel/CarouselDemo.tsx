"use client";

import React from "react";
import { Glass3DCarousel } from "./Glass3DCarousel";

const sampleCards = [
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

export function CarouselDemo() {
  return (
    <Glass3DCarousel
      cards={sampleCards}
      onItemSelect={(_index, card) => console.log(card.title)}
      autoPlay={true}
      autoPlayInterval={4000}
      showControls={true}
      rotationIntensity={25}
    />
  );
}
