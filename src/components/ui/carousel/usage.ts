export const Glass3DCarouselUsage =`import React from 'react';
import { Glass3DCarousel } from './components/Glass3DCarousel';

const App: React.FC = () => {
  const myCards = [
    {
      id: 1,
      title: "React Development",
      description: "Master modern React patterns and advanced component architecture.",
      image: "https://example.com/react-image.jpg",
      category: "Frontend",
      badge: "Popular"
    },
    {
      id: 2,
      title: "TypeScript Mastery",
      description: "Build type-safe applications with advanced TypeScript features.",
      image: "https://example.com/typescript-image.jpg",
      category: "Language",
      badge: "Advanced"
    },
    // ... more cards
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900">
      <Glass3DCarousel
        cards={myCards}
        autoPlay={true}
        autoPlayInterval={4000}
        showControls={true}
        rotationIntensity={25}
      />
    </div>
  );
};

export default App;`;