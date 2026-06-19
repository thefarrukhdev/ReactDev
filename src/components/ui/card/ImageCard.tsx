"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, Share2, BookOpen, ArrowUpRight } from "lucide-react";

// Class merge helper
const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

// Image Card data interface
export interface ImageCardData {
  id: string | number;
  title: string;
  description: string;
  image: string;
  category?: string;
  readTime?: string;
  author?: string;
  date?: string;
}

// Props for component
interface ImageCardProps {
  data: ImageCardData;
  className?: string;
  showLike?: boolean;
  showShare?: boolean;
  onLike?: () => void;
  onShare?: () => void;
  onReadMore?: () => void;
  onClick?: () => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  data,
  showLike = true,
  showShare = true,
  onLike,
  onShare,
  onReadMore,
  className,
  onClick,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked((prev) => !prev);
    onLike?.();
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.();
  };

  const handleReadMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReadMore?.();
  };

  return (
    <article
      onClick={onClick}
      role="article"
      aria-label={`Article: ${data.title}`}
      className={cn(
        // Main container styles
        "group relative rounded-2xl overflow-hidden",
        "bg-white/10 backdrop-blur-2xl border border-white/20 shadow-xl shadow-black/20",
        "transition-transform duration-500 ease-out hover:scale-[1.03] hover:-translate-y-2",
        "cursor-pointer w-full max-w-sm mx-auto",
        className
      )}
    >
      {/* Background gradient layers for liquid glass */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent pointer-events-none" />
      <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-t from-white/0 to-white/10 pointer-events-none" />

      {/* Image Section */}
      <div className="relative overflow-hidden">
        <Image
          src={data.image}
          alt={data.title}
          width={400}
          height={300}
          className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Category Badge */}
        {data.category && (
          <div className="absolute top-3 left-3">
            <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {data.category}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex space-x-2">
          {showLike && (
            <button
              onClick={handleLike}
              aria-label={isLiked ? "Unlike" : "Like"}
              className={cn(
                "p-2 rounded-full backdrop-blur-md border border-white/30 transition-transform duration-300 hover:scale-110",
                isLiked
                  ? "bg-rose-500/80 text-white shadow-lg shadow-rose-500/30"
                  : "bg-white/20 text-white hover:bg-white/30"
              )}
            >
              <Heart
                className={cn("w-4 h-4 transition-colors", isLiked && "fill-current")}
              />
            </button>
          )}

          {showShare && (
            <button
              onClick={handleShare}
              aria-label="Share"
              className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-transform duration-300 hover:scale-110"
            >
              <Share2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="relative p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between text-xs text-white/60 mb-3 gap-2">
          {data.author && <span className="truncate">By {data.author}</span>}
          {data.readTime && <span>{data.readTime}</span>}
          {data.date && <span>{data.date}</span>}
        </div>

        <h3 className="text-white text-lg font-semibold mb-2 line-clamp-2">
          {data.title}
        </h3>

        <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">
          {data.description}
        </p>

        {onReadMore && (
          <button
            onClick={handleReadMore}
            className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 text-sm font-medium transition-all duration-300 group/btn"
          >
            <BookOpen className="w-4 h-4" />
            <span>Read More</span>
            <ArrowUpRight className="w-3 h-3 transform transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-cyan-400/10 via-violet-400/10 to-fuchsia-400/10 blur-xl pointer-events-none" />
    </article>
  );
};
