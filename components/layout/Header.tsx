'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/navigation';
import { ShoppingBag, Menu, X, User, Heart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { CartDrawer } from '../shop/CartDrawer';
import { cn } from '@/lib/utils';

export const Header: React.FC = () => {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const items = useCartStore((state) => state.items);

  const toggleLocale = () => {
    const nextLocale = locale === 'de' ? 'en' : 'de';
    router.replace(pathname, { locale: nextLocale });
  };

  const switcherLabel = locale === 'de' ? 'EN' : 'DE';
  const mobileSwitcherLabel = locale === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln';

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between relative h-10 md:h-12">
            {/* Left: Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4 lg:gap-6 flex-1 md:pr-20 lg:pr-28">
              <Link href="/" className="text-[10px] lg:text-xs font-black text-slate-500 hover:text-brand transition-colors uppercase tracking-widest whitespace-nowrap">
                {t('home')}
              </Link>
              <Link href="/products" className="text-[10px] lg:text-xs font-black text-slate-500 hover:text-brand transition-colors uppercase tracking-widest whitespace-nowrap">
                {t('products')}
              </Link>
              <Link href="/request" className="text-[10px] lg:text-xs font-black text-slate-500 hover:text-brand transition-colors uppercase tracking-widest whitespace-nowrap">
                {t('request')}
              </Link>
            </nav>

            {/* Mobile Menu Toggle (Left) */}
            <div className="md:hidden flex-1 flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="p-2 -ml-2 text-slate-600 hover:text-brand transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Center: Large Overflowing Round Logo */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
              <Link href="/" className="relative block">
                <div className={cn(
                  "bg-white rounded-full p-1.5 shadow-3d-soft border border-slate-100 transition-transform hover:scale-105 flex items-center justify-center",
                  "w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px]",
                  "mt-4 md:mt-6" // Use margin instead of compound transforms for better Edge support
                )}>
                  <Image 
                    src="/logo.png" 
                    alt="LABDS 3D Logo" 
                    width={120} 
                    height={120} 
                    className="w-full h-full object-contain rounded-full"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Right: Utility Icons & Locale */}
            <div className="flex items-center justify-end gap-1 sm:gap-3 md:gap-4 lg:gap-6 flex-1 md:pl-20 lg:pl-28">
              <Link href="/about" className="hidden xl:block text-[10px] font-black text-slate-400 hover:text-brand transition-colors uppercase tracking-widest whitespace-nowrap">
                {t('about')}
              </Link>
              <Link href="/contact" className="hidden xl:block text-[10px] font-black text-slate-400 hover:text-brand transition-colors uppercase tracking-widest whitespace-nowrap">
                {t('contact')}
              </Link>

              <button 
                onClick={toggleLocale}
                className="hidden md:block text-[10px] font-black text-slate-400 hover:text-brand transition-colors cursor-pointer w-8"
              >
                {switcherLabel}
              </button>

              <button className="text-slate-400 hover:text-brand transition-colors hidden sm:block p-2" aria-label="Wishlist">
                <Heart size={20} />
              </button>

              <button className="text-slate-400 hover:text-brand transition-colors hidden sm:block p-2" aria-label="Account">
                <User size={20} />
              </button>

              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative text-slate-700 hover:text-brand transition-colors p-2 -mr-2"
                aria-label="Cart"
              >
                <ShoppingBag size={22} className="sm:w-6 sm:h-6" />
                {items.length > 0 && (
                  <span className="absolute top-1 right-1 bg-white text-brand text-[8px] sm:text-[10px] font-black rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center border-2 border-brand/10 shadow-sm">
                    {items.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden pt-[140px]">
            <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
            <div className="relative bg-white border-b border-slate-100 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
              <Link href="/" className="text-lg font-black text-slate-900 hover:text-brand flex items-center justify-between" onClick={() => setIsMenuOpen(false)}>
                {t('home')}
                <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
              </Link>
              <Link href="/products" className="text-lg font-black text-slate-900 hover:text-brand flex items-center justify-between" onClick={() => setIsMenuOpen(false)}>
                {t('products')}
                <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
              </Link>
              <Link href="/request" className="text-lg font-black text-slate-900 hover:text-brand flex items-center justify-between" onClick={() => setIsMenuOpen(false)}>
                {t('request')}
                <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
              </Link>
              <Link href="/about" className="text-lg font-black text-slate-900 hover:text-brand flex items-center justify-between" onClick={() => setIsMenuOpen(false)}>
                {t('about')}
                <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
              </Link>
              <Link href="/contact" className="text-lg font-black text-slate-900 hover:text-brand flex items-center justify-between" onClick={() => setIsMenuOpen(false)}>
                {t('contact')}
                <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
              </Link>
              
              <div className="h-px bg-slate-100 w-full my-2" />
              
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-50 rounded-xl text-slate-600 font-bold text-sm hover:text-brand">
                  <Heart size={18} /> Wishlist
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-50 rounded-xl text-slate-600 font-bold text-sm hover:text-brand">
                  <User size={18} /> Account
                </button>
              </div>

              <button 
                onClick={() => { toggleLocale(); setIsMenuOpen(false); }}
                className="w-full py-4 rounded-xl bg-brand text-white font-black text-center text-sm uppercase tracking-widest hover:bg-brand-dark transition-colors"
              >
                {mobileSwitcherLabel}
              </button>
            </div>
          </div>
        )}
      </header>
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
