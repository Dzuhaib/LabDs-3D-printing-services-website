'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/navigation';
import { ShoppingBag, Menu, X, User, Heart, Home, Package, ClipboardList, Info, Phone } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { CartDrawer } from '../shop/CartDrawer';
import { LogoPlate } from '../ui/LogoPlate';

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
      <header className="sticky top-0 z-50 pt-3 px-4 sm:px-6">
        <div className="container mx-auto">
          {/* Physical Header Slab (The "Baseplate") */}
          <div className="relative">
            {/* Side Wall Layer (Provides vertical thickness) */}
            <div className="absolute inset-0 translate-y-[8px] bg-slate-300 rounded-2xl side-layers opacity-90" />
            
            {/* Main Top Surface */}
            <div className="relative bg-white rounded-2xl plastic-matte top-infill printed-bevel print-base overflow-visible">
              {/* Nozzle Corner Accents (Simulated "Screw" holes for mounting) */}
              <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-slate-200 recessed-slot" />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-slate-200 recessed-slot" />
              <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-slate-200 recessed-slot md:hidden" />
              <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-slate-200 recessed-slot md:hidden" />

              <div className="px-4 py-4 md:py-6 flex items-center justify-between relative h-10 md:h-16">
                {/* Left: Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-4 lg:gap-8 flex-1 md:pr-20 lg:pr-32">
                  <Link href="/" className="group flex items-center gap-2 text-[10px] lg:text-xs font-black text-slate-500 hover:text-brand transition-all uppercase tracking-widest whitespace-nowrap">
                    <Home size={16} className="extruded-detail group-hover:scale-110 transition-transform" />
                    {t('home')}
                  </Link>
                  <Link href="/products" className="group flex items-center gap-2 text-[10px] lg:text-xs font-black text-slate-500 hover:text-brand transition-all uppercase tracking-widest whitespace-nowrap">
                    <Package size={16} className="extruded-detail group-hover:scale-110 transition-transform" />
                    {t('products')}
                  </Link>
                  <Link href="/request" className="group flex items-center gap-2 text-[10px] lg:text-xs font-black text-slate-500 hover:text-brand transition-all uppercase tracking-widest whitespace-nowrap">
                    <ClipboardList size={16} className="extruded-detail group-hover:scale-110 transition-transform" />
                    {t('request')}
                  </Link>
                </nav>

                {/* Mobile Menu Toggle (Left) */}
                <div className="md:hidden flex-1 flex items-center">
                  <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    className="p-2 text-slate-600 hover:text-brand transition-all active:scale-95"
                    aria-label="Toggle menu"
                  >
                    {isMenuOpen ? <X size={26} className="extruded-detail" /> : <Menu size={26} className="extruded-detail" />}
                  </button>
                </div>

                {/* Center: Large Fabricated Round Logo (Overflowing) */}
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
                  <LogoPlate 
                    href="/" 
                    className="mt-8 md:mt-12"
                  />
                </div>

                {/* Right: Utility Icons & Locale */}
                <div className="flex items-center justify-end gap-1 sm:gap-4 md:gap-5 lg:gap-8 flex-1 md:pl-20 lg:pl-32">
                  <Link href="/about" className="hidden lg:flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-brand transition-all uppercase tracking-widest whitespace-nowrap group">
                    <Info size={16} className="extruded-detail group-hover:scale-110 transition-transform" />
                    {t('about')}
                  </Link>
                  <Link href="/contact" className="hidden lg:flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-brand transition-all uppercase tracking-widest whitespace-nowrap group">
                    <Phone size={16} className="extruded-detail group-hover:scale-110 transition-transform" />
                    {t('contact')}
                  </Link>

                  <div className="h-4 w-px bg-slate-200 hidden md:block" />

                  <button 
                    onClick={toggleLocale}
                    className="hidden md:block text-[10px] font-black text-slate-400 hover:text-brand transition-all cursor-pointer w-8 extruded-detail active:scale-90"
                  >
                    {switcherLabel}
                  </button>

                  <button className="text-slate-400 hover:text-brand transition-all hidden sm:block p-1 group" aria-label="Wishlist">
                    <Heart size={22} className="extruded-detail group-hover:scale-110 transition-transform" />
                  </button>

                  <button className="text-slate-400 hover:text-brand transition-all hidden sm:block p-1 group" aria-label="Account">
                    <User size={22} className="extruded-detail group-hover:scale-110 transition-transform" />
                  </button>

                  <button 
                    onClick={() => setIsCartOpen(true)}
                    className="relative text-slate-700 hover:text-brand transition-all p-2 -mr-2 group active:scale-95"
                    aria-label="Cart"
                  >
                    <ShoppingBag size={24} className="sm:w-7 sm:h-7 extruded-detail group-hover:scale-110 transition-transform" />
                    {items.length > 0 && (
                      <span className="absolute top-1 right-1 bg-brand text-white text-[8px] sm:text-[9px] font-black rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center border border-white shadow-sm printed-bevel">
                        {items.length}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden pt-[160px]">
            <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
            <div className="relative mx-4 bg-white rounded-2xl plastic-matte top-infill printed-bevel print-base p-6 flex flex-col gap-5 animate-in slide-in-from-top duration-300">
              <Link href="/" className="text-lg font-black text-slate-900 hover:text-brand flex items-center gap-4 group" onClick={() => setIsMenuOpen(false)}>
                <Home size={20} className="extruded-detail text-slate-400" />
                {t('home')}
              </Link>
              <Link href="/products" className="text-lg font-black text-slate-900 hover:text-brand flex items-center gap-4 group" onClick={() => setIsMenuOpen(false)}>
                <Package size={20} className="extruded-detail text-slate-400" />
                {t('products')}
              </Link>
              <Link href="/request" className="text-lg font-black text-slate-900 hover:text-brand flex items-center gap-4 group" onClick={() => setIsMenuOpen(false)}>
                <ClipboardList size={20} className="extruded-detail text-slate-400" />
                {t('request')}
              </Link>
              <Link href="/about" className="text-lg font-black text-slate-900 hover:text-brand flex items-center gap-4 group" onClick={() => setIsMenuOpen(false)}>
                <Info size={20} className="extruded-detail text-slate-400" />
                {t('about')}
              </Link>
              <Link href="/contact" className="text-lg font-black text-slate-900 hover:text-brand flex items-center gap-4 group" onClick={() => setIsMenuOpen(false)}>
                <Phone size={20} className="extruded-detail text-slate-400" />
                {t('contact')}
              </Link>
              
              <div className="h-px bg-slate-100 w-full my-1" />
              
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-50 rounded-xl text-slate-600 font-bold text-sm hover:text-brand plastic-matte printed-bevel">
                  <Heart size={18} className="extruded-detail" /> Wishlist
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-50 rounded-xl text-slate-600 font-bold text-sm hover:text-brand plastic-matte printed-bevel">
                  <User size={18} className="extruded-detail" /> Account
                </button>
              </div>

              <button 
                onClick={() => { toggleLocale(); setIsMenuOpen(false); }}
                className="w-full py-4 rounded-xl bg-brand text-white font-black text-center text-sm uppercase tracking-widest hover:bg-brand-dark transition-all printed-bevel print-base active:translate-y-1 active:shadow-none"
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
