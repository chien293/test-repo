'use client';

import React, { useState } from 'react';
import DragonSpine from '@/components/PixiSpineAnimation';

export default function SpineDemoPage() {
  const [currentAnimation, setCurrentAnimation] = useState<string>('animation');
  const [isLooping, setIsLooping] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Spine Animation Demo
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Dragon Animation</h2>
  
          <DragonSpine
          />
        </div>
        
      
      </div>
    </div>
  );
} 