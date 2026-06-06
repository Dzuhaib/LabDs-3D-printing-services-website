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
  const baseStyles = "relative inline-flex items-center justify-center font-bold transition-all duration-300 rounded-xl active:translate-y-1 focus:outline-none cursor-pointer";
  
  const variants = {
    primary: "bg-brand text-white depth-brand hover:translate-y-[1px] active:translate-y-[4px] active:shadow-none",
    secondary: "bg-white text-brand depth-slate hover:translate-y-[1px] active:translate-y-[4px] active:shadow-none border-t border-x border-slate-100",
    outline: "bg-transparent text-brand border-2 border-brand depth-brand hover:translate-y-[1px] active:translate-y-[4px] active:shadow-none",
    ghost: "bg-slate-50 text-brand depth-slate hover:translate-y-[1px] active:translate-y-[4px] active:shadow-none"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl"
  };

  const content = (
    <div
      className={cn(
        baseStyles, 
        variants[variant], 
        sizes[size], 
        "plastic-part infill-top plastic-grain plastic-fillet",
        "overflow-hidden select-none",
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2 drop-shadow-sm">{children}</span>
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
