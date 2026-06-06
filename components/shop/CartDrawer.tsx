'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { Button3D } from '../ui/Button3D';
import { Card3D } from '../ui/Card3D';
import { X, Trash2, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import Image from 'next/image';
import { CheckoutButton } from './CheckoutButton';
import { useTranslations } from 'next-intl';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const t = useTranslations('Cart');
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const [showCheckout, setShowCheckout] = React.useState(false);
  const total = getTotal();

  // Reset showCheckout when drawer closes
  if (!isOpen && showCheckout) {
    setShowCheckout(false);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand text-white rounded-xl flex items-center justify-center shadow-3d-soft">
                  <ShoppingBag size={20} />
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  {showCheckout ? t('pay') : t('title')}
                </h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {showCheckout ? (
                <div className="space-y-6">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <h4 className="font-bold mb-2 text-slate-900">{t('summary')}</h4>
                    {items.map(item => (
                      <div key={item.id} className="flex justify-between text-sm py-1 text-slate-600">
                        <span>{item.quantity}x {item.name}</span>
                        <span>{(item.price * item.quantity).toFixed(2)}€</span>
                      </div>
                    ))}
                    <div className="border-t border-slate-200 mt-2 pt-2 flex justify-between font-black text-slate-900">
                      <span>{t('total')}</span>
                      <span>{(total + 4.99).toFixed(2)}€</span>
                    </div>
                  </div>
                  <CheckoutButton />
                  <button 
                    onClick={() => setShowCheckout(false)}
                    className="w-full text-slate-400 text-sm font-bold hover:text-slate-900 transition-colors"
                  >
                    {t('back')}
                  </button>
                </div>
              ) : (
                items.length === 0 ? (
                  <div className="text-center py-20">
                     <p className="text-slate-400 font-medium">{t('empty')}</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <Card3D key={item.id} animate={false} className="p-4 flex gap-4">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-50 flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-slate-900">{item.name}</h4>
                          <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-slate-400 mb-2">{item.colors.join(', ')}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-white rounded shadow-sm transition-all"><Minus size={12} /></button>
                            <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-white rounded shadow-sm transition-all"><Plus size={12} /></button>
                          </div>
                          <span className="font-bold text-slate-900">{(item.price * item.quantity).toFixed(2)}€</span>
                        </div>
                      </div>
                    </Card3D>
                  ))
                )
              )}
            </div>

            {!showCheckout && (
              <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
                <div className="flex justify-between text-slate-500 text-sm">
                  <span>{t('shipping')}</span>
                  <span>4.99€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-black text-slate-900">{t('total')}</span>
                  <span className="text-2xl font-black text-slate-900">{(total + (items.length > 0 ? 4.99 : 0)).toFixed(2)}€</span>
                </div>
                <Button3D 
                  className="w-full py-4 text-lg gap-2" 
                  disabled={items.length === 0}
                  onClick={() => setShowCheckout(true)}
                >
                  <CreditCard size={20} />
                  {t('checkout')}
                </Button3D>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
