'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button3D } from '../ui/Button3D';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const t = useTranslations('Index');

  return (
    <section className="relative py-24 md:py-40 lg:py-52 overflow-hidden bg-slate-50 min-h-[70vh] flex items-center">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight max-w-3xl">
            {t('title')}
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            {t('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <Button3D href="/request" variant="primary" size="lg" className="w-full">
              {t('cta.primary')}
            </Button3D>
            <Button3D href="/products" variant="secondary" size="lg" className="w-full">
              {t('cta.secondary')}
            </Button3D>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
