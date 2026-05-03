export const glass3DCarouselCode = `import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface Card {
  id: number;
  title: string;
  description: string;
  image?: string;
  category?: string;
  badge?: string;
}

interface Glass3DCarouselProps {
  cards: Card[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showControls?: boolean;
  rotationIntensity?: number;
}

export const Glass3DCarousel: React.FC<Glass3DCarouselProps> = ({
  cards,
  autoPlay = false,
  autoPlayInterval = 4000,
  showControls = true,
  rotationIntensity = 25
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying || isDragging) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, autoPlayInterval);
    
    return () => clearInterval(interval);
  }, [isPlaying, autoPlayInterval, cards.length, isDragging]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setDragStart(clientX);
  };

  const handleDragEnd = (clientX: number) => {
    if (!isDragging) return;
    
    const dragDistance = clientX - dragStart;
    const threshold = 50;
    
    if (dragDistance > threshold) {
      goToPrevious();
    } else if (dragDistance < -threshold) {
      goToNext();
    }
    
    setIsDragging(false);
  };

  const getCardTransform = (index: number) => {
    const diff = index - currentIndex;
    const absIndex = Math.abs(diff);
    
    if (absIndex === 0) {
      return {
        transform: 'translateX(0) translateZ(0) rotateY(0deg) scale(1)',
        opacity: 1,
        zIndex: 10
      };
    } else if (absIndex === 1) {
      const direction = diff > 0 ? 1 : -1;
      return {
        transform: \`translateX(\${direction * 320}px) translateZ(-100px) rotateY(\${-direction * rotationIntensity}deg) scale(0.85)\`,
        opacity: 0.7,
        zIndex: 5
      };
    } else if (absIndex === 2) {
      const direction = diff > 0 ? 1 : -1;
      return {
        transform: \`translateX(\${direction * 500}px) translateZ(-200px) rotateY(\${-direction * rotationIntensity * 1.5}deg) scale(0.7)\`,
        opacity: 0.4,
        zIndex: 1
      };
    } else {
      return {
        transform: 'translateX(1000px) translateZ(-300px) rotateY(90deg) scale(0.5)',
        opacity: 0,
        zIndex: 0
      };
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-12 px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-3xl opacity-20" />
      
      <div 
        ref={containerRef}
        className="relative h-96 flex items-center justify-center"
        style={{ perspective: '1000px' }}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseUp={(e) => handleDragEnd(e.clientX)}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
      >
        {cards.map((card, index) => {
          const style = getCardTransform(index);
          return (
            <div
              key={card.id}
              className="absolute w-80 h-80 cursor-pointer transition-all duration-700 ease-out"
              style={{
                ...style,
                transformStyle: 'preserve-3d'
              }}
              onClick={() => goToSlide(index)}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 rounded-2xl" />
                
                <div className="relative z-10 p-6 h-full flex flex-col">
                  {card.badge && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-pink-500 to-violet-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        {card.badge}
                      </span>
                    </div>
                  )}
                  
                  {card.image && (
                    <div className="relative mb-4 rounded-xl overflow-hidden">
                      <img 
                        src={card.image} 
                        alt={card.title}
                        className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  )}
                  
                  {card.category && (
                    <span className="text-blue-300 text-sm font-medium mb-2 tracking-wide">
                      {card.category}
                    </span>
                  )}
                  
                  <h3 className="text-white text-xl font-bold mb-3 leading-tight">
                    {card.title}
                  </h3>
                  
                  <p className="text-white/80 text-sm leading-relaxed flex-grow">
                    {card.description}
                  </p>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100" />
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-200" />
                    </div>
                    <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200 hover:scale-105">
                      Explore
                    </button>
                  </div>
                </div>
                
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-xl" />
              </div>
            </div>
          );
        })}
      </div>

      {showControls && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-full p-3 shadow-xl transition-all duration-300 hover:scale-110 z-20"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-full p-3 shadow-xl transition-all duration-300 hover:scale-110 z-20"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute top-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-full p-3 shadow-xl transition-all duration-300 hover:scale-110 z-20"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white" />
            )}
          </button>
        </>
      )}

      <div className="flex justify-center items-center space-x-3 mt-8">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative"
          >
            <div
              className={\`w-3 h-3 rounded-full transition-all duration-300 \${
                index === currentIndex
                  ? 'bg-white shadow-lg shadow-white/50'
                  : 'bg-white/40 hover:bg-white/60'
              }\`}
            />
            {index === currentIndex && (
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 w-full max-w-md mx-auto">
        <div className="h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full transition-all duration-700 ease-out"
            style={{ width: \`\${((currentIndex + 1) / cards.length) * 100}%\` }}
          />
        </div>
      </div>

      <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2 shadow-xl">
        <span className="text-white text-sm font-medium">
          {currentIndex + 1} / {cards.length}
        </span>
      </div>
    </div>
  );
};`;