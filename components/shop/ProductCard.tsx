'use client';

import React from 'react';
import Image from 'next/image';
import { Card3D } from '../ui/Card3D';
import { Button3D } from '../ui/Button3D';
import { ColorSelector } from '../ui/ColorSelector';
import { BAMBU_FILAMENTS, Filament } from '@/lib/constants/filaments';
import { ShoppingCart, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

import { Link } from '@/navigation';

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    description: string;
    image: string;
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const t = useTranslations('Products.actions');
  const [primaryColor, setPrimaryColor] = React.useState<Filament>(BAMBU_FILAMENTS[0]);
  const [secondaryColor, setSecondaryColor] = React.useState<Filament>(BAMBU_FILAMENTS[1] ?? BAMBU_FILAMENTS[0]);
  const [added, setAdded] = React.useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: `${product.id}-${primaryColor.id}-${secondaryColor.id}`,
      name: product.name,
      price: product.price,
      quantity: 1,
      colors: [primaryColor.name, secondaryColor.name],
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Card3D className="group flex flex-col h-full p-0 overflow-hidden">
      <Link 
        href={{
          pathname: '/products/[slug]',
          params: { slug: product.slug }
        }} 
        className="flex flex-col h-full p-4"
      >
        {/* Image Preview */}
        <div className="relative aspect-square rounded-xl overflow-hidden mb-6 bg-slate-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={primaryColor.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
               <Image 
                 src={product.image}
                 alt={product.name}
                 fill
                 className="object-cover group-hover:scale-105 transition-transform duration-500"
               />
               {product.id !== 'nescafe' && (
                 <div 
                   className="absolute inset-0 opacity-20 mix-blend-multiply" 
                   style={{ backgroundColor: primaryColor.hex }}
                 />
               )}
            </motion.div>
          </AnimatePresence>
          
          {/* Layer Lines Overlay for tactile feel */}
          <div className="absolute inset-0 layer-lines opacity-10 pointer-events-none" />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-black text-slate-900 leading-tight">{product.name}</h3>
            <span className="text-lg font-bold text-slate-900">{product.price.toFixed(2)}€</span>
          </div>
          
          <p className="text-sm text-slate-500 mb-6 flex-1">{product.description}</p>

          <div className="space-y-3">
            <div onClick={(e) => e.preventDefault()}>
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                {t('selectColor')}
              </span>
              <ColorSelector
                selectedId={primaryColor.id}
                onSelect={setPrimaryColor}
                label="Primary Color"
              />
            </div>

            <div onClick={(e) => e.preventDefault()}>
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Secondary Color
              </span>
              <ColorSelector
                selectedId={secondaryColor.id}
                onSelect={setSecondaryColor}
                label="Secondary Color"
              />
            </div>

            <Button3D 
              onClick={handleAddToCart}
              variant="primary"
              size="sm"
              className={cn("w-full gap-2", added && "bg-green-600")}
            >
              {added ? <Check size={18} className="extruded-detail" /> : <ShoppingCart size={18} className="extruded-detail" />}
              {added ? t('added') : t('addToCart')}
            </Button3D>
          </div>
        </div>
      </Link>
    </Card3D>
  );
};
