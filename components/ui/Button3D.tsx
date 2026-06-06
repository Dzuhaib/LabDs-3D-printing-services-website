'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Link } from '@/navigation';

interface Button3DProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
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
    primary: "bg-brand text-white shadow-3d-button hover:bg-brand-dark",
    secondary: "bg-white text-brand shadow-3d-button border border-slate-100 hover:bg-slate-50",
    outline: "bg-transparent text-brand border-2 border-brand hover:bg-brand hover:text-white hover:shadow-3d-button",
    ghost: "bg-white text-brand shadow-3d-button hover:bg-brand hover:text-white"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const content = (
    <motion.span
      whileHover={{ y: -2 }}
      whileTap={{ y: 2 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
    >
      <span className="relative z-10">{children}</span>
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block w-full sm:w-auto">
        {content}
      </Link>
    );
  }

  return (
    <button className="inline-block w-full sm:w-auto" {...(props as any)}>
      {content}
    </button>
  );
};
