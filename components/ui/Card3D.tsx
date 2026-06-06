'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export const Card3D: React.FC<Card3DProps> = ({ children, className, animate = true }) => {
  const content = (
    <div className={cn(
      "bg-white rounded-2xl p-6 shadow-3d-soft border border-slate-100 overflow-hidden relative",
      "beveled-edge layer-lines",
      className
    )}>
      {children}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
      transition={{ duration: 0.3 }}
    >
      {content}
    </motion.div>
  );
};
