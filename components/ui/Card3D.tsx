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
      "bg-white rounded-2xl p-6 relative",
      "plastic-part infill-top plastic-grain plastic-fillet depth-slate",
      className
    )}>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      {content}
    </motion.div>
  );
};
