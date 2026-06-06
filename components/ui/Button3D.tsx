'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from '@/navigation';

interface Button3DProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: React.ComponentProps<typeof Link>['href'];
}

export const Button3D: React.FC<Button3DProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  href,
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-bold transition-all duration-300 focus:outline-none cursor-pointer group";
  
  const variants = {
    primary: {
      base: "bg-brand-dark rounded-xl",
      top: "bg-brand text-white"
    },
    secondary: {
      base: "bg-slate-200 rounded-xl",
      top: "bg-white text-brand border border-slate-100"
    },
    outline: {
      base: "bg-brand-dark rounded-xl",
      top: "bg-transparent text-brand border-2 border-brand"
    },
    ghost: {
      base: "bg-slate-200 rounded-xl",
      top: "bg-slate-50 text-brand"
    }
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const content = (
    <div className={cn(baseStyles, variants[variant].base, className)}>
      {/* Side Walls (Horizontal Layer Lines) */}
      <div className="absolute inset-0 side-layers rounded-xl opacity-50" />
      
      {/* Top Surface */}
      <div
        className={cn(
          "relative w-full h-full plastic-matte top-infill printed-bevel rounded-xl transition-transform duration-150",
          "translate-y-[-4px] group-hover:translate-y-[-2px] group-active:translate-y-[0px]",
          variants[variant].top,
          sizes[size]
        )}
      >
        <span className="relative z-10 flex items-center justify-center gap-2 extruded-detail">
          {children}
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block w-full sm:w-auto">
        {content}
      </Link>
    );
  }

  return (
    <button className="inline-block w-full sm:w-auto" {...props}>
      {content}
    </button>
  );
};
