'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Mail, MessageCircle, Globe, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const t = useTranslations('Footer');
  const navT = useTranslations('Navigation');
  const commonT = useTranslations('Common');

  return (
    <footer className="relative mt-auto pt-20 pb-12 px-4 sm:px-6">
      <div className="container mx-auto">
        {/* Physical Footer Slab (The "Baseplate") */}
        <div className="relative">
          {/* Side Wall Layer (Provides vertical thickness) */}
          <div className="absolute inset-0 translate-y-[8px] bg-slate-300 rounded-2xl side-layers opacity-90" />
          
          {/* Main Top Surface */}
          <div className="relative bg-white rounded-2xl plastic-matte top-infill printed-bevel print-base p-8 sm:p-12 lg:p-16 overflow-visible">
            {/* Nozzle Corner Accents (Mounting holes) */}
            <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-slate-200 recessed-slot" />
            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-slate-200 recessed-slot" />
            <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-slate-200 recessed-slot" />
            <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-slate-200 recessed-slot" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center sm:text-left">
              {/* Brand Column */}
              <div className="flex flex-col items-center sm:items-start space-y-6">
                <Link href="/" className="relative block group">
                  <div className="absolute inset-0 bg-slate-200 rounded-full translate-y-[3px] side-layers opacity-60" />
                  <div className="relative bg-white rounded-full p-2 printed-bevel plastic-matte top-infill print-base transition-transform group-hover:translate-y-[-1px] group-active:translate-y-[1.5px] flex items-center justify-center w-16 h-16">
                    <Image src="/logo.png" alt="LABDS 3D Logo" width={60} height={60} className="w-10 h-10 object-contain rounded-full extruded-detail opacity-90" />
                  </div>
                </Link>
                <p className="text-sm leading-relaxed max-w-xs italic text-slate-500 font-medium">
                  {t('tagline')}
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-6">
                <h4 className="text-slate-900 font-black uppercase tracking-widest text-[10px] extruded-detail">{t('links')}</h4>
                <ul className="space-y-4 text-xs font-bold uppercase tracking-wider">
                  <li><Link href="/" className="text-slate-400 hover:text-brand transition-colors flex items-center justify-center sm:justify-start gap-2 group">
                    <span className="w-1 h-1 bg-slate-200 rounded-full group-hover:bg-brand transition-colors" />
                    {navT('home')}
                  </Link></li>
                  <li><Link href="/products" className="text-slate-400 hover:text-brand transition-colors flex items-center justify-center sm:justify-start gap-2 group">
                    <span className="w-1 h-1 bg-slate-200 rounded-full group-hover:bg-brand transition-colors" />
                    {navT('products')}
                  </Link></li>
                  <li><Link href="/request" className="text-slate-400 hover:text-brand transition-colors flex items-center justify-center sm:justify-start gap-2 group">
                    <span className="w-1 h-1 bg-slate-200 rounded-full group-hover:bg-brand transition-colors" />
                    {navT('request')}
                  </Link></li>
                  <li><Link href="/about" className="text-slate-400 hover:text-brand transition-colors flex items-center justify-center sm:justify-start gap-2 group">
                    <span className="w-1 h-1 bg-slate-200 rounded-full group-hover:bg-brand transition-colors" />
                    {navT('about')}
                  </Link></li>
                </ul>
              </div>

              {/* Contact & Social */}
              <div className="space-y-6">
                <h4 className="text-slate-900 font-black uppercase tracking-widest text-[10px] extruded-detail">{t('social')}</h4>
                <div className="flex justify-center sm:justify-start gap-4 mb-8">
                  <a href="#" className="relative group w-10 h-10 bg-slate-200 rounded-xl side-layers">
                     <div className="absolute inset-0 plastic-matte top-infill printed-bevel rounded-xl bg-white flex items-center justify-center text-slate-400 hover:text-brand transition-all translate-y-[-3px] group-hover:translate-y-[-1px] group-active:translate-y-[0px]">
                        <Globe size={18} className="extruded-detail" />
                     </div>
                  </a>
                  <a href="#" className="relative group w-10 h-10 bg-slate-200 rounded-xl side-layers">
                     <div className="absolute inset-0 plastic-matte top-infill printed-bevel rounded-xl bg-white flex items-center justify-center text-slate-400 hover:text-brand transition-all translate-y-[-3px] group-hover:translate-y-[-1px] group-active:translate-y-[0px]">
                        <Send size={18} className="extruded-detail" />
                     </div>
                  </a>
                </div>
                <ul className="space-y-4 text-sm font-medium">
                  <li className="flex items-center justify-center sm:justify-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center recessed-slot">
                       <Mail size={16} className="text-slate-400 extruded-detail" />
                    </div>
                    <span className="text-slate-500">info@labds3d.de</span>
                  </li>
                  <li className="flex items-center justify-center sm:justify-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center recessed-slot">
                       <MessageCircle size={16} className="text-slate-400 extruded-detail" />
                    </div>
                    <span className="text-slate-500">+49 123 456789</span>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div className="space-y-6">
                <h4 className="text-slate-900 font-black uppercase tracking-widest text-[10px] extruded-detail">{t('legal')}</h4>
                <ul className="space-y-4 text-xs font-bold uppercase tracking-wider">
                  <li><Link href="/imprint" className="text-slate-400 hover:text-brand transition-colors flex items-center justify-center sm:justify-start gap-2 group">
                    <span className="w-1 h-1 bg-slate-200 rounded-full group-hover:bg-brand transition-colors" />
                    {t('imprint')}
                  </Link></li>
                  <li><Link href="/privacy" className="text-slate-400 hover:text-brand transition-colors flex items-center justify-center sm:justify-start gap-2 group">
                    <span className="w-1 h-1 bg-slate-200 rounded-full group-hover:bg-brand transition-colors" />
                    {t('privacy')}
                  </Link></li>
                </ul>
              </div>
            </div>

            <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <p className="text-center md:text-left">© 2026 LABDS 3D Print. {commonT('rights')}</p>
              <div className="flex items-center gap-2 extruded-detail">
                <div className="w-1.5 h-1.5 bg-brand/40 rounded-full recessed-slot" />
                <span>Black Forest Precision</span>
                <div className="w-1.5 h-1.5 bg-brand/40 rounded-full recessed-slot" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
