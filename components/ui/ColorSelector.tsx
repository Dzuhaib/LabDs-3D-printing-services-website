'use client';

import React from 'react';
import { BAMBU_FILAMENTS, type Filament } from '@/lib/constants/filaments';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ColorSelectorProps {
  selectedId: string;
  onSelect: (filament: Filament) => void;
  label?: string;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({ selectedId, onSelect, label }) => {
  return (
    <div className="flex flex-col gap-3">
      {label && <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{label}</span>}
      <div className="flex flex-wrap gap-3">
        {BAMBU_FILAMENTS.map((filament) => (
          <motion.button
            key={filament.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(filament)}
            className={cn(
              "w-10 h-10 rounded-full border-2 transition-all duration-200 shadow-sm relative overflow-hidden",
              selectedId === filament.id ? "border-brand scale-110" : "border-transparent"
            )}
            title={filament.name}
            type="button"
          >
            <div 
              className="w-full h-full" 
              style={{ backgroundColor: filament.hex }}
            />
            {/* Subtle layer line texture on the swatch */}
            <div className="absolute inset-0 layer-lines opacity-20" />
          </motion.button>
        ))}
      </div>
    </div>
  );
};
