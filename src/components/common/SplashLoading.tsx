'use client'

import Image from "next/image";

export default function SplashLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#EBF4FE] via-blue-500 to-[#E7812C]">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {/* Logo/Icon Container */}
        <div className="relative mb-8">
          {/* Outer Ring - Rotating */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
          
          {/* Middle Ring - Counter Rotating */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 border-4 border-white/20 border-b-white rounded-full animate-spin [animation-direction:reverse] [animation-duration:1.5s]"></div>
          </div>

          {/* Center Icon */}
          <div className="relative flex items-center justify-center h-32">
            <div className="w-30 h-30 bg-white rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <Image 
                src="/localGuide.png" 
                width={100} 
                height={100} 
                alt="Local Guide Logo"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Brand Name with Animation */}
        <div className="mb-6 overflow-hidden">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 animate-fade-in">
            Local Guide
          </h1>
          <div className="flex items-center justify-center gap-2 text-white/90 text-lg animate-fade-in [animation-delay:0.2s]">
            <span>Discover</span>
            <span className="inline-block w-1 h-1 bg-white/90 rounded-full"></span>
            <span>Explore</span>
            <span className="inline-block w-1 h-1 bg-white/90 rounded-full"></span>
            <span>Experience</span>
          </div>
        </div>

        {/* Loading Text */}
        <div className="flex items-center justify-center gap-3 text-white/80 animate-fade-in [animation-delay:0.4s]">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.1s]"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>
          </div>
          <span className="text-sm font-medium">Loading your adventure</span>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
