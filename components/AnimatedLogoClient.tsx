// components/AnimatedLogoClient.tsx
'use client';

import React, { useEffect, useState } from 'react';

const AnimatedLogoClient: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const [textState, setTextState] = useState<number>(0);
  
  useEffect(() => {
    // Hide the logo after 2000ms (2 seconds)
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);
    
    // Create typing effect
    const typingTimer = setInterval(() => {
      setTextState(prev => {
        if (prev < 3) return prev + 1;
        return prev;
      });
    }, 300);
    
    return () => {
      clearTimeout(timer);
      clearInterval(typingTimer);
    };
  }, []);
  
  // If not visible, render nothing
  if (!visible) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900">
      <div className="animate-fadeIn">
        <div className="relative flex items-center justify-center text-blue-400 font-mono font-bold text-5xl">
          <span className={`${textState >= 1 ? 'visible' : 'invisible'} animate-slideLeft`}>&lt;</span>
          <span className={`${textState >= 2 ? 'visible' : 'invisible'} mx-1 animate-slideDown`}>/</span>
          <span className={`${textState >= 3 ? 'visible' : 'invisible'} animate-slideRight`}>&gt;</span>
          <span className={`h-8 w-2 bg-blue-400 ml-1 ${textState >= 3 ? 'animate-cursor' : 'invisible'}`}></span>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes slideLeft {
          0% { transform: translateX(10px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideRight {
          0% { transform: translateX(-10px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideDown {
          0% { transform: translateY(-10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in forwards;
        }
        
        .animate-slideLeft {
          animation: slideLeft 0.4s ease-out forwards;
        }
        
        .animate-slideRight {
          animation: slideRight 0.4s ease-out forwards;
        }
        
        .animate-slideDown {
          animation: slideDown 0.4s ease-out forwards;
        }
        
        .animate-cursor {
          animation: blink 0.8s infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedLogoClient;