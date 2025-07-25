import { useEffect, useState } from 'react';

export default function FullscreenLoader() {
  const [_, setRotation] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/80 backdrop-blur-sm">
      <div className="relative w-32 h-32">
        {/* Background glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl animate-pulse"></div>
        
        {/* Floating particles */}
        <div className="absolute w-3 h-3 bg-emerald-400 rounded-full top-0 left-1/2 animate-ping"></div>
        <div className="absolute w-3 h-3 bg-purple-400 rounded-full bottom-0 left-1/2 animate-ping" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute w-3 h-3 bg-pink-400 rounded-full left-0 top-1/2 animate-ping" style={{ animationDelay: '0.7s' }}></div>
        <div className="absolute w-3 h-3 bg-blue-400 rounded-full right-0 top-1/2 animate-ping" style={{ animationDelay: '0.2s' }}></div>
        
        {/* Additional particles */}
        <div className="absolute w-2 h-2 bg-yellow-300 rounded-full top-1/4 left-1/4 animate-ping" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute w-2 h-2 bg-rose-300 rounded-full bottom-1/4 right-1/4 animate-ping" style={{ animationDelay: '0.9s' }}></div>
        
        {/* Outer spinning ring with gradient */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent animate-spin" 
             style={{ 
               borderLeftColor: '#f472b6', 
               borderTopColor: '#60a5fa',
               animationDuration: '3s'
             }}>
        </div>
        
        {/* Middle ring with shadow effect */}
        <div className="absolute top-1/2 left-1/2 w-20 h-20 -mt-10 -ml-10 rounded-full border-4 border-transparent animate-spin"
             style={{ 
               borderRightColor: '#34d399', 
               borderBottomColor: '#a78bfa',
               animationDuration: '2s',
               animationDirection: 'reverse'
             }}>
        </div>
        
        {/* Inner rotating diamond */}
        <div className="absolute top-1/2 left-1/2 w-10 h-10 -mt-5 -ml-5 bg-transparent flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-sm transform rotate-45 animate-pulse shadow-lg shadow-purple-500/50"></div>
        </div>
        
        {/* Central glowing dot */}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 -mt-2 -ml-2 bg-white rounded-full animate-pulse shadow-lg shadow-white/70"></div>
      </div>
      
      {/* Loading text with typewriter effect */}
      <div className="absolute bottom-16 text-center">
        <p className="text-xl font-semibold text-white tracking-wider">
          Loading<span className="animate-pulse">.</span><span className="animate-pulse" style={{ animationDelay: '0.3s' }}>.</span><span className="animate-pulse" style={{ animationDelay: '0.6s' }}>.</span>
        </p>
      </div>
    </div>
  );
}