'use client';

import React from 'react';
import Image from 'next/image';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';

interface LogoPlateProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
  className?: string;
  grayscale?: boolean;
  opacity?: number;
}

export const LogoPlate: React.FC<LogoPlateProps> = ({ 
  size = 'md', 
  href, 
  className,
  grayscale = false,
  opacity = 0.9
}) => {
  const sizes = {
    sm: "w-16 h-16 p-2",
    md: "w-[95px] h-[95px] sm:w-[115px] sm:h-[115px] md:w-[145px] md:h-[145px] p-2.5",
    lg: "w-32 h-32 p-2", // Used in current Error/NotFound
    xl: "w-40 h-40 md:w-48 md:h-48 p-4"
  };

  const wallOffsets = {
    sm: "translate-y-[3px]",
    md: "translate-y-[6px]",
    lg: "translate-y-[5px]",
    xl: "translate-y-[8px]"
  };

  const plateContent = (
    <div className={cn("relative group block", className)}>
      {/* Side wall of the logo plate */}
      <div className={cn(
        "absolute inset-0 bg-slate-200 rounded-full side-layers opacity-80",
        wallOffsets[size]
      )} />
      
      {/* Top surface of the logo plate */}
      <div className={cn(
        "bg-white rounded-full printed-bevel plastic-matte top-infill print-base transition-transform flex items-center justify-center",
        href && "group-hover:translate-y-[-2px] group-active:translate-y-[2px]",
        sizes[size]
      )}>
        <Image 
          src="/logo.png" 
          alt="LABDS 3D Logo" 
          width={200} 
          height={200} 
          className={cn(
            "w-full h-full object-contain rounded-full extruded-detail transition-all",
            grayscale && "grayscale",
          )}
          style={{ opacity }}
          priority
        />
      </div>
    </div>
  );

  if (href) {
    return <Link href={href as any}>{plateContent}</Link>;
  }

  return plateContent;
};
