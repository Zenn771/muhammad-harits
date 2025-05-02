
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
import InteractiveTiltCard from '@/components/animations/InteractiveTiltCard';
import { Image } from 'lucide-react';

interface MacBookFrameProps {
  imageSrc?: string;
  className?: string;
  altText?: string;
  fallbackText?: string;
}

const MacBookFrame: React.FC<MacBookFrameProps> = ({
  imageSrc,
  className,
  altText = 'Profile Photo',
  fallbackText = 'ME',
}) => {
  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <InteractiveTiltCard className="rounded-xl overflow-hidden bg-gradient-to-b from-gray-700 to-gray-800">
        {/* MacBook Top Bezel */}
        <div className="bg-gray-800 p-2 rounded-t-xl relative">
          {/* Camera */}
          <div className="w-2 h-2 bg-gray-900 rounded-full mx-auto absolute left-1/2 transform -translate-x-1/2 opacity-70 mb-1" />
          
          {/* Screen Container */}
          <div className="bg-black rounded-md overflow-hidden border border-gray-700">
            {/* Screen Content - Profile Image */}
            <AspectRatio ratio={16/10} className="bg-gradient-to-br from-gray-900 to-black">
              {imageSrc ? (
                <div className="w-full h-full overflow-hidden bg-gradient-to-b from-gray-900 to-black">
                  <div className="relative w-full h-full">
                    <Avatar className="w-full h-full rounded-none">
                      <AvatarImage src={imageSrc} alt={altText} className="object-cover" />
                      <AvatarFallback className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-2xl text-gray-400">
                        <Image className="w-12 h-12 opacity-50" />
                      </AvatarFallback>
                    </Avatar>
                    
                    {/* Screen Glare Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-20 pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.15),transparent_70%)] pointer-events-none" />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
                  <div className="text-2xl font-semibold text-gray-500 flex items-center gap-2">
                    <Image className="w-8 h-8 opacity-50" />
                    <span>{fallbackText}</span>
                  </div>
                </div>
              )}
            </AspectRatio>
          </div>
        </div>
        
        {/* MacBook Bottom Part (Keyboard Area) */}
        <div className="bg-gradient-to-b from-gray-700 to-gray-800 p-1 rounded-b-xl">
          {/* Hinge Area */}
          <div className="h-[3px] bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full mb-2" />
          
          {/* Keyboard Area (Simplified) */}
          <div className="pt-4 pb-3 px-2 relative">
            {/* Trackpad */}
            <div className="w-1/2 h-8 mx-auto bg-gradient-to-b from-gray-600 to-gray-700 rounded-md mb-2" />
            
            {/* Front Edge Light Reflection */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-gray-500/30 to-transparent" />
          </div>
        </div>
        
        {/* Bottom Shadow */}
        <div className="h-2 bg-gradient-to-b from-black/20 to-transparent -mt-1 mx-2 rounded-b-full blur-sm" />
      </InteractiveTiltCard>
    </div>
  );
};

export default MacBookFrame;
