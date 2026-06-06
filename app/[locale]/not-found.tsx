'use client';

import React from 'react';
import { Button3D } from '@/components/ui/Button3D';
import { Card3D } from '@/components/ui/Card3D';
import { LogoPlate } from '@/components/ui/LogoPlate';
import { Home, HelpCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('Errors');

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 build-surface">
      <Card3D className="max-w-md w-full text-center p-8 sm:p-12">
        <div className="space-y-10">
          {/* Logo Plate */}
          <div className="flex justify-center">
            <LogoPlate size="lg" grayscale opacity={0.6} />
          </div>

          <div className="space-y-4">
            <div className="relative">
              <h1 className="text-8xl font-black text-slate-100 tracking-tighter leading-none select-none">404</h1>
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center shadow-3d-soft border border-slate-100">
                    <HelpCircle size={32} className="extruded-detail" />
                 </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {t('404.title')}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              {t('404.description')}
            </p>
          </div>

          <div className="pt-4">
            <Button3D 
              href="/"
              variant="primary"
              size="lg"
              className="w-full flex items-center justify-center gap-2"
            >
              <Home size={20} /> {t('actions.home')}
            </Button3D>
          </div>
        </div>
      </Card3D>
    </div>
  );
}
