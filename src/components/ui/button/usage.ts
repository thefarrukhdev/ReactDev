export const buttonUsage =`import React from 'react';
import { NeoGlassButton } from './components/NeoGlassButton';
import { Download, ArrowRight, Trash2 } from 'lucide-react';

const App: React.FC = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center space-x-4">
      <NeoGlassButton 
        variant="primary" 
        size="md" 
        leftIcon={<Download />}
        onClick={handleClick}
      >
        Download
      </NeoGlassButton>
      
      <NeoGlassButton 
        variant="secondary" 
        size="lg" 
        rightIcon={<ArrowRight />}
      >
        Continue
      </NeoGlassButton>
      
      <NeoGlassButton 
        variant="danger" 
        size="sm"
        loading={true}
      >
        Deleting...
      </NeoGlassButton>
    </div>
  );
};`;