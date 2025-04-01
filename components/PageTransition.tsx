"use client";

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isPageLoading, setIsPageLoading] = useState(false);
  
  useEffect(() => {
    // When pathname changes, trigger loading state
    setIsPageLoading(true);
    
    // Add a small delay to simulate page transition
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [pathname]);
  
  return (
    <div className="page-transition-wrapper min-h-screen flex flex-col">
      {isPageLoading ? (
        <div className="loading-indicator flex items-center justify-center flex-grow">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}