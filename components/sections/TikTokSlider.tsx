'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { TikTokEmbed } from '../ui/TikTokEmbed';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const videoIds = [
  '7646538936575216929',
  '7645746426999262496',
  '7645022221617876257',
  '7643785333062044961',
  '7642438252804230432',
  '7640227099491568929',
  '7639070617714674977'
];

export const TikTokSlider: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth / 1.5 
        : scrollLeft + clientWidth / 1.5;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      {/* Navigation Buttons */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-3d-button flex items-center justify-center text-slate-900 hover:text-brand opacity-0 group-hover:opacity-100 transition-all hidden md:flex"
      >
        <ChevronLeft size={24} />
      </button>

      <button 
        onClick={() => scroll('right')}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-3d-button flex items-center justify-center text-slate-900 hover:text-brand opacity-0 group-hover:opacity-100 transition-all hidden md:flex"
      >
        <ChevronRight size={24} />
      </button>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 px-4 md:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {videoIds.map((id) => (
          <motion.div 
            key={id}
            className="flex-shrink-0 w-[325px] snap-center bg-white rounded-3xl overflow-hidden shadow-3d-soft border border-slate-100"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <TikTokEmbed videoId={id} />
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};
