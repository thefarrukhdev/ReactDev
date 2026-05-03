export const ImageCardCode = `import React, { useState } from 'react';
import { 
  Heart, 
  Share2, 
  BookOpen, 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  Github, 
  Twitter, 
  Linkedin,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  ArrowUpRight,
  ExternalLink,
  UserPlus,
  MessageCircle
} from 'lucide-react';

const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

interface BaseCardProps {
  className?: string;
  onClick?: () => void;
}

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

export interface ImageCardProps extends BaseCardProps {
  data: ImageCardData;
  showLike?: boolean;
  showShare?: boolean;
  onLike?: () => void;
  onShare?: () => void;
  onReadMore?: () => void;
}

export interface SocialLink {
  type: 'github' | 'twitter' | 'linkedin' | 'email' | 'phone';
  url: string;
  label?: string;
}

export interface ProfileCardData {
  id: string | number;
  name: string;
  role: string;
  avatar: string;
  location?: string;
  bio?: string;
  stats?: {
    followers?: number;
    following?: number;
    posts?: number;
  };
  socialLinks?: SocialLink[];
}

export interface ProfileCardProps extends BaseCardProps {
  data: ProfileCardData;
  showStats?: boolean;
  showSocial?: boolean;
  onFollow?: () => void;
  onMessage?: () => void;
}

export interface StatCardData {
  id: string | number;
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period?: string;
  };
  icon?: React.ReactNode;
  description?: string;
}

export interface StatCardProps extends BaseCardProps {
  data: StatCardData;
  variant?: 'default' | 'gradient' | 'minimal';
  showTrend?: boolean;
}

export interface GlassCardData {
  id: string | number;
  title: string;
  content: string;
  subtitle?: string;
  image?: string;
  badge?: string;
}

export interface GlassCardProps extends BaseCardProps {
  data: GlassCardData;
  variant?: 'blue' | 'purple' | 'pink' | 'emerald';
  intensity?: 'light' | 'medium' | 'strong';
  onAction?: () => void;
  actionLabel?: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  data,
  showLike = true,
  showShare = true,
  onLike,
  onShare,
  onReadMore,
  className,
  onClick
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
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
      className={cn(
        "group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden",
        "shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30",
        "transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2",
        "cursor-pointer max-w-sm",
        className
      )}
      onClick={onClick}
      role="article"
      aria-label={\`Article: \${data.title}\`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-transparent rounded-2xl" />
      <div className="absolute inset-[1px] bg-gradient-to-t from-white/0 to-white/10 rounded-2xl" />
      
      <div className="relative overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {data.category && (
          <div className="absolute top-4 left-4">
            <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              {data.category}
            </span>
          </div>
        )}
        
        <div className="absolute top-4 right-4 flex space-x-2">
          {showLike && (
            <button
              onClick={handleLike}
              className={cn(
                "p-2 rounded-full backdrop-blur-md border border-white/30 transition-all duration-300 hover:scale-110",
                isLiked 
                  ? "bg-rose-500/80 text-white shadow-lg shadow-rose-500/30" 
                  : "bg-white/20 text-white hover:bg-white/30"
              )}
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
            </button>
          )}
          
          {showShare && (
            <button
              onClick={handleShare}
              className="p-2 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="relative p-6">
        <div className="flex items-center justify-between text-xs text-white/60 mb-3">
          {data.author && <span>By {data.author}</span>}
          {data.readTime && <span>{data.readTime}</span>}
          {data.date && <span>{data.date}</span>}
        </div>
        
        <h3 className="text-white text-lg font-bold mb-3 leading-tight line-clamp-2">
          {data.title}
        </h3>
        
        <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">
          {data.description}
        </p>
        
        {onReadMore && (
          <button
            onClick={handleReadMore}
            className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 text-sm font-medium transition-colors duration-300 group/btn"
          >
            <BookOpen className="w-4 h-4" />
            <span>Read More</span>
            <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>
        )}
      </div>
      
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-cyan-400/10 via-violet-400/10 to-fuchsia-400/10 blur-xl pointer-events-none" />
    </article>
  );
};`;