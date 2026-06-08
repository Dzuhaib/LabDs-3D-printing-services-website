'use client';

import React from 'react';
import { Button3D } from "@/components/ui/Button3D";
import { ColorSelector } from "@/components/ui/ColorSelector";
import { BAMBU_FILAMENTS, Filament } from '@/lib/constants/filaments';
import { ShoppingCart, Check } from "lucide-react";
import { useCartStore } from '@/store/useCartStore';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface ProductClientContentProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

export const ProductClientContent: React.FC<ProductClientContentProps> = ({ product }) => {
  const t = useTranslations('Products.actions');
  const [selectedColor, setSelectedColor] = React.useState<Filament>(BAMBU_FILAMENTS[0]);
  const [added, setAdded] = React.useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedColor.id}`,
      name: product.name,
      price: product.price,
      quantity: 1,
      colors: [selectedColor.name],
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-8">
      <ColorSelector 
        selectedId={selectedColor.id} 
        onSelect={setSelectedColor}
        label={t('selectColor')}
      />

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
  );
};
