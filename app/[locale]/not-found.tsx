'use client';

import React from 'react';
import Image from 'next/image';
import { Link } from '@/navigation';
import { Button3D } from '@/components/ui/Button3D';
import { Home } from 'lucide-react';

export default function NotFound() {
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
          <h1 className="text-9xl font-black text-slate-200 tracking-tighter leading-none">404</h1>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Page not found</h2>
          <p className="text-slate-500">
            Oops! It seems like the page you are looking for has been moved or doesn't exist anymore.
          </p>
        </div>

        <div className="flex justify-center">
          <Button3D href="/" className="flex items-center gap-2">
            <Home size={18} /> Back to Home
          </Button3D>
        </div>
      </div>
    </div>
  );
}
