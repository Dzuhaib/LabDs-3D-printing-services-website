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
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center sm:text-left">
          {/* Brand Column */}
          <div className="flex flex-col items-center sm:items-start space-y-6">
            <Link href="/" className="inline-block bg-white rounded-full p-2 shadow-3d-soft transition-transform hover:scale-110">
              <Image src="/logo.png" alt="LABDS 3D Logo" width={60} height={60} className="w-12 h-12 object-contain rounded-full" />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs italic text-slate-400">
              {t('tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-black uppercase tracking-widest text-[10px]">{t('links')}</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-wider">
              <li><Link href="/" className="text-slate-400 hover:text-white transition-colors">{navT('home')}</Link></li>
              <li><Link href="/products" className="text-slate-400 hover:text-white transition-colors">{navT('products')}</Link></li>
              <li><Link href="/request" className="text-slate-400 hover:text-white transition-colors">{navT('request')}</Link></li>
              <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors">{navT('about')}</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-6">
            <h4 className="text-white font-black uppercase tracking-widest text-[10px]">{t('social')}</h4>
            <div className="flex justify-center sm:justify-start gap-4 mb-8">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-slate-700 hover:text-white transition-all transform hover:-translate-y-1 shadow-3d-button text-slate-300">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-slate-700 hover:text-white transition-all transform hover:-translate-y-1 shadow-3d-button text-slate-300">
                <Send size={18} />
              </a>
            </div>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <Mail size={16} className="text-slate-500" />
                <span className="text-slate-400">info@labds3d.de</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <MessageCircle size={16} className="text-slate-500" />
                <span className="text-slate-400">+49 123 456789</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h4 className="text-white font-black uppercase tracking-widest text-[10px]">{t('legal')}</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-wider">
              <li><Link href="/imprint" className="text-slate-400 hover:text-white transition-colors">{t('imprint')}</Link></li>
              <li><Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">{t('privacy')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
          <p className="text-center md:text-left">© 2026 LABDS 3D Print. {commonT('rights')}</p>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 bg-slate-700 rounded-full" />
            <span>Black Forest Precision</span>
            <span className="w-1 h-1 bg-slate-700 rounded-full" />
          </div>
        </div>
      </div>
    </footer>
  );
};
