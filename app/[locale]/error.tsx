'use client';

import React from 'react';
import Image from 'next/image';
import { Button3D } from '@/components/ui/Button3D';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-12">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-32 h-32 bg-white rounded-full p-2 shadow-3d-soft border border-slate-100 flex items-center justify-center">
            <Image 
              src="/logo.png" 
              alt="LABDS 3D Logo" 
              width={120} 
              height={120} 
              className="w-full h-full object-contain rounded-full opacity-50 grayscale"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Something went wrong</h2>
          <p className="text-slate-500">
            An unexpected error occurred while rendering this page. Our team has been notified.
          </p>
        </div>

        <div className="flex justify-center">
          <Button3D 
            onClick={() => reset()}
            className="flex items-center gap-2"
          >
            <RotateCcw size={18} /> Try again
          </Button3D>
        </div>
      </div>
    </div>
  );
}
