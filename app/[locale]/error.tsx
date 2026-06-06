'use client';

import React from 'react';
import { Button3D } from '@/components/ui/Button3D';
import { Card3D } from '@/components/ui/Card3D';
import { LogoPlate } from '@/components/ui/LogoPlate';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Errors');

  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 build-surface">
      <Card3D className="max-w-md w-full text-center p-8 sm:p-12">
        <div className="space-y-10">
          {/* Logo Plate */}
          <div className="flex justify-center">
            <LogoPlate size="lg" grayscale opacity={0.6} />
          </div>

          <div className="space-y-4">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-3d-soft border border-red-100">
              <AlertTriangle size={32} className="extruded-detail" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {t('general.title')}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              {t('general.description')}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Button3D 
              onClick={() => reset()}
              variant="primary"
              className="w-full flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} /> {t('actions.retry')}
            </Button3D>
            
            <Button3D 
              href="/"
              variant="secondary"
              className="w-full flex items-center justify-center gap-2"
            >
              <Home size={18} /> {t('actions.home')}
            </Button3D>
          </div>
        </div>
      </Card3D>
    </div>
  );
}
