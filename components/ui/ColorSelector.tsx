'use client';

import React from 'react';
import { BAMBU_FILAMENTS, type Filament } from '@/lib/constants/filaments';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface ColorSelectorProps {
  selectedId: string;
  onSelect: (filament: Filament) => void;
  label?: string;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({ selectedId, onSelect, label }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const selectedFilament = BAMBU_FILAMENTS.find(f => f.id === selectedId);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
          {label}
        </span>
      )}
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-slate-200 bg-white hover:border-slate-300 transition-colors"
        >
          {selectedFilament && (
            <>
              <div
                className="w-7 h-7 rounded-full shrink-0 border border-slate-200"
                style={{ backgroundColor: selectedFilament.hex }}
              />
              <span className="flex-1 text-left text-sm font-semibold text-slate-900">
                {selectedFilament.name}
              </span>
            </>
          )}
          <ChevronDown
            size={18}
            className={cn(
              "text-slate-400 transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 mt-2 w-full max-h-80 overflow-y-auto rounded-xl border-2 border-slate-200 bg-white shadow-xl"
            >
              <div className="p-2">
                <div className="px-3 py-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                  Primary Colors
                </div>
                {BAMBU_FILAMENTS.map((filament) => (
                  <button
                    key={filament.id}
                    type="button"
                    onClick={() => {
                      onSelect(filament);
                      setOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left",
                      selectedId === filament.id
                        ? "bg-brand/10 text-brand"
                        : "hover:bg-slate-100 text-slate-700"
                    )}
                  >
                    <div
                      className="w-6 h-6 rounded-full shrink-0 border border-slate-200"
                      style={{ backgroundColor: filament.hex }}
                    />
                    <span className="text-sm font-medium">{filament.name}</span>
                  </button>
                ))}
              </div>

              <div className="border-t border-slate-100" />

              <div className="p-2">
                <div className="px-3 py-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                  Secondary Colors
                </div>
                {BAMBU_FILAMENTS.map((filament) => (
                  <button
                    key={filament.id}
                    type="button"
                    onClick={() => {
                      onSelect(filament);
                      setOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left",
                      selectedId === filament.id
                        ? "bg-brand/10 text-brand"
                        : "hover:bg-slate-100 text-slate-700"
                    )}
                  >
                    <div
                      className="w-6 h-6 rounded-full shrink-0 border border-slate-200"
                      style={{ backgroundColor: filament.hex }}
                    />
                    <span className="text-sm font-medium">{filament.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
