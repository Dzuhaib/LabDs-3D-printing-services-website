'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button3D } from '../ui/Button3D';
import { motion } from 'framer-motion';
import { ClipboardList, Package } from 'lucide-react';
import Image from 'next/image';

export const Hero: React.FC = () => {
  const t = useTranslations('Index');

  return (
    <section className="relative overflow-hidden bg-black min-h-[70vh] lg:min-h-[85vh] flex flex-col justify-end pt-40 pb-12 md:pb-20 lg:pb-24">
      {/* Background for Mobile - Absolute position to be behind everything */}
      <div className="lg:hidden absolute inset-0 z-0">
        <Image 
          src="/mobile.jpeg"
          alt="Hero Background Mobile"
          fill
          className="object-cover"
          priority
          quality={100}
          unoptimized
        />
      </div>

      {/* Background for Desktop - Absolute position to be behind everything */}
      <div className="hidden lg:block absolute inset-0 z-0">
        <Image 
          src="/desktop.jpeg"
          alt="Hero Background Desktop"
          fill
          className="object-cover"
          priority
          quality={100}
          unoptimized
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 w-full">
        <div className="max-w-3xl mx-auto lg:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            {/* Pure white text, no shadows */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-4">
              {t('title')}
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-white max-w-xl leading-relaxed font-bold mb-8">
              {t('description')}
            </p>

            {/* Standard sized buttons without extra padding in className */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button3D 
                href="/request" 
                variant="primary" 
                size="lg" 
                className="w-full sm:w-auto"
              >
                <ClipboardList size={20} className="extruded-detail" />
                {t('cta.primary')}
              </Button3D>
              
              <Button3D 
                href="/products" 
                variant="secondary" 
                size="lg" 
                className="w-full sm:w-auto"
              >
                <Package size={20} className="extruded-detail" />
                {t('cta.secondary')}
              </Button3D>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
