export const cardUsage =`import React from 'react';
import { 
  ImageCard, 
  ProfileCard, 
  StatCard, 
  GlassCard,
  type ImageCardData,
  type ProfileCardData,
  type StatCardData,
  type GlassCardData
} from './components/CardLibrary';
import { DollarSign, Users, Activity } from 'lucide-react';

const App: React.FC = () => {
  // Sample data
  const imageCardData: ImageCardData = {
    id: 1,
    title: "Advanced React Patterns",
    description: "Master complex React patterns including render props, higher-order components, and compound components.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    category: "Tutorial",
    author: "John Doe",
    readTime: "8 min read",
    date: "Aug 31, 2025"
  };

  const profileData: ProfileCardData = {
    id: 1,
    name: "Emma Wilson",
    role: "Full Stack Developer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    location: "New York, NY",
    bio: "Building scalable web applications with React, Node.js, and TypeScript. Open source contributor.",
    stats: { followers: 2840, following: 180, posts: 127 },
    socialLinks: [
      { type: 'github', url: 'https://github.com/emma', label: 'GitHub' },
      { type: 'linkedin', url: 'https://linkedin.com/in/emma', label: 'LinkedIn' }
    ]
  };

  const statData: StatCardData = {
    id: 1,
    title: "Monthly Revenue",
    value: 125000,
    change: { value: 15.2, type: 'increase', period: 'last month' },
    icon: <DollarSign className="w-5 h-5" />,
    description: "Total revenue generated this month"
  };

  const glassData: GlassCardData = {
    id: 1,
    title: "Pro Membership",
    subtitle: "Premium",
    content: "Get access to exclusive content, advanced features, and priority customer support.",
    badge: "Recommended",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        
        <ImageCard
          data={imageCardData}
          onLike={() => console.log('Liked!')}
          onShare={() => console.log('Shared!')}
          onReadMore={() => console.log('Read more!')}
        />
        
        <ProfileCard
          data={profileData}
          onFollow={() => console.log('Followed!')}
          onMessage={() => console.log('Message sent!')}
        />
        
        <StatCard
          data={statData}
          variant="gradient"
          onClick={() => console.log('Stat clicked!')}
        />
        
        <GlassCard
          data={glassData}
          variant="blue"
          intensity="medium"
          onAction={() => console.log('Action clicked!')}
          actionLabel="Upgrade Now"
        />
        
      </div>
    </div>
  );
};

export default App;`;