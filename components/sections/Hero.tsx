'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button3D } from '../ui/Button3D';
import { motion } from 'framer-motion';

import Image from 'next/image';

export const Hero: React.FC = () => {
  const t = useTranslations('Index');

  return (
    <section className="relative overflow-hidden bg-transparent min-h-screen lg:min-h-[85vh] flex flex-col lg:flex-row items-center">
      {/* Mobile-Only Top Image */}
      <div className="w-full lg:hidden pt-4 px-4">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-3d-soft border border-slate-200">
          <Image 
            src="/hero.jpeg"
            alt="Hero Background"
            fill
            className="object-cover brightness-[1.05] contrast-[1.05]"
            priority
            quality={100}
            unoptimized
          />
          {/* Subtle "Printed" texture overlay on mobile image */}
          <div className="absolute inset-0 top-infill opacity-5 pointer-events-none" />
        </div>
      </div>

      {/* Desktop Background Image (Hidden on Mobile) */}
      <div className="absolute inset-0 z-0 hidden lg:block">
        <Image 
          src="/hero.jpeg"
          alt="Hero Background"
          fill
          className="object-cover opacity-100 brightness-[1.05] contrast-[1.05]"
          priority
          quality={100}
          unoptimized
        />
        {/* Subtle "Printed" texture overlay on background */}
        <div className="absolute inset-0 top-infill opacity-5 pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-12 md:py-40 lg:py-52">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight drop-shadow-md">
              {t('title')}
            </h1>
            <p className="text-lg sm:text-xl text-slate-700 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-bold drop-shadow-sm">
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
      </div>
    </section>
  );
};
