import { Loader2 } from "lucide-react";
import Image from "next/image";

interface LocalGuideLoadingProps {
  message?: string;
  fullPage?: boolean;
}

export default function LocalGuideLoading({
  message = "Loading...",
  fullPage = true
}: LocalGuideLoadingProps) {
  if (fullPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="text-center">
          {/* Animated Logo/Icon */}
          <div className="relative mb-8">
            {/* Outer Ring - Rotating */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>

            {/* Middle Ring - Counter Rotating */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 border-4 border-primary/20 border-b-primary rounded-full animate-spin [animation-direction:reverse] [animation-duration:1.5s]"></div>
            </div>

            {/* Center Icon */}
            <div className="relative flex items-center justify-center h-32">
              <div className="w-20 h-20 bg-white border-2 border-primary/20 rounded-full flex items-center justify-center shadow-lg">
                <Image 
                  src="/localGuide.png" 
                  width={50} 
                  height={50} 
                  alt="Local Guide Logo" 
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Local Guide
          </h2>
          <p className="text-gray-600 mb-6">{message}</p>

          {/* Animated Dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    );
  }

  // Inline loading (for components)
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
        <p className="text-gray-600 text-sm">{message}</p>
      </div>
    </div>
  );
}
