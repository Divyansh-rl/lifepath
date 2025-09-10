import React from 'react';
import { Button } from './ui/button';
import { Home, ArrowLeft } from 'lucide-react';

interface BackToHomeProps {
  onBackToHome: () => void;
  showInHeader?: boolean;
  variant?: 'home' | 'back';
}

export function BackToHome({ onBackToHome, showInHeader = false, variant = 'home' }: BackToHomeProps) {
  if (showInHeader) {
    return (
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onBackToHome}
        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs px-2 py-1 h-8"
      >
        <Home className="h-3 w-3 mr-1" />
        Landing
      </Button>
    );
  }

  if (variant === 'back') {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onBackToHome}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-700 border-gray-200 hover:border-gray-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Landing
      </Button>
    );
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={onBackToHome}
      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300"
    >
      <Home className="h-4 w-4" />
      Back to Landing
    </Button>
  );
}