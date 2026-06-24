'use client';

import React from 'react';
import { Button3D } from "@/components/ui/Button3D";
import { ColorSelector } from "@/components/ui/ColorSelector";
import { BAMBU_FILAMENTS, Filament } from '@/lib/constants/filaments';
import { ShoppingCart, Check } from "lucide-react";
import { useCartStore } from '@/store/useCartStore';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Card3D } from '@/components/ui/Card3D';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductClientContentProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    gallery?: string[];
  };
}

export const ProductClientContent: React.FC<ProductClientContentProps> = ({ product }) => {
  const t = useTranslations('Products.actions');
  const [primaryColor, setPrimaryColor] = React.useState<Filament>(BAMBU_FILAMENTS[0]);
  const [secondaryColor, setSecondaryColor] = React.useState<Filament>(BAMBU_FILAMENTS[1] ?? BAMBU_FILAMENTS[0]);
  const [activeImage, setActiveImage] = React.useState(product.image);
  const [added, setAdded] = React.useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
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

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
      {/* Left: Product Images */}
      <div className="space-y-6 sticky top-32">
        <Card3D className="p-4" animate={false}>
          <div className="relative aspect-square rounded-xl overflow-hidden bg-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <Image 
                  src={activeImage} 
                  alt={product.name} 
                  fill 
                  className="object-cover"
                  priority
                />
                {product.id !== 'nescafe' && (
                  <div 
                    className="absolute inset-0 opacity-10 mix-blend-multiply pointer-events-none" 
                    style={{ backgroundColor: primaryColor.hex }}
                  />
                )}
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 layer-lines opacity-10 pointer-events-none" />
          </div>
        </Card3D>

        {/* Thumbnail Gallery */}
        {images.length > 1 && (
          <div className="grid grid-cols-5 gap-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className={cn(
                  "relative aspect-square rounded-lg overflow-hidden border-2 transition-all",
                  activeImage === img ? "border-brand scale-105 shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                )}
              >
                <Image src={img} alt={`${product.name} ${i}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: Interaction */}
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
            {t('selectColor')}
          </span>
          <ColorSelector
            selectedId={primaryColor.id}
            onSelect={setPrimaryColor}
            label="Primary Color"
          />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Secondary Color
          </span>
          <ColorSelector
            selectedId={secondaryColor.id}
            onSelect={setSecondaryColor}
            label="Secondary Color"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button3D 
            onClick={handleAddToCart}
            variant="primary"
            size="lg"
            className={cn("flex-1 gap-3", added && "bg-green-600")}
          >
            {added ? <Check size={20} className="extruded-detail" /> : <ShoppingCart size={20} className="extruded-detail" />}
            {added ? t('added') : t('addToCart')}
          </Button3D>
        </div>
      </div>
    </div>
  );
};
