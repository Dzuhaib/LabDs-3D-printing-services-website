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
    primary: "bg-brand text-white border-b-4 border-brand-dark hover:border-b-2 hover:translate-y-[2px] active:border-b-0 active:translate-y-[4px]",
    secondary: "bg-white text-brand border-b-4 border-slate-200 hover:border-b-2 hover:translate-y-[2px] active:border-b-0 active:translate-y-[4px] border-x border-t border-slate-100",
    outline: "bg-transparent text-brand border-2 border-brand border-b-4 hover:border-b-2 hover:translate-y-[2px] active:border-b-0 active:translate-y-[4px]",
    ghost: "bg-slate-50 text-brand border-b-4 border-slate-200 hover:border-b-2 hover:translate-y-[2px] active:border-b-0 active:translate-y-[4px]"
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
        "matte-plastic layer-lines overflow-hidden",
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {/* Side grain simulation */}
      <div className="absolute inset-y-0 -left-1 w-1 bg-black/5 pointer-events-none" />
      <div className="absolute inset-y-0 -right-1 w-1 bg-black/5 pointer-events-none" />
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
