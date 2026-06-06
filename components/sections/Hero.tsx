'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button3D } from '../ui/Button3D';
import { Link } from '@/navigation';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const t = useTranslations('Index');

  return (
    <section className="relative py-24 md:py-40 lg:py-52 overflow-hidden bg-[url('/hero.png')] bg-cover bg-center bg-no-repeat min-h-[85vh] flex items-center">
      {/* Dark gradient overlay for a premium "HD" look and better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight max-w-3xl drop-shadow-2xl">
            {t('title')}
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium drop-shadow-md">
            {t('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button3D href="/request" variant="secondary" size="lg" className="w-full">
              {t('cta.primary')}
            </Button3D>
            <Button3D href="/products" variant="ghost" size="lg" className="w-full">
              {t('cta.secondary')}
            </Button3D>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
