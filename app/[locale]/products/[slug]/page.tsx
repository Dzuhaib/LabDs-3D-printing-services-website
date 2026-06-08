import { Header } from "@/components/layout/Header";
import { getProductBySlug } from "@/lib/constants/products";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { LogoSpacer } from "@/components/layout/LogoSpacer";
import Image from "next/image";
import { Card3D } from "@/components/ui/Card3D";
import { Button3D } from "@/components/ui/Button3D";
import { ColorSelector } from "@/components/ui/ColorSelector";
import { Check, ShoppingCart, Info, AlertTriangle, ShieldCheck, ListChecks, Heart } from "lucide-react";
import React from "react";
import { fetch3DProductImages } from "@/lib/services/pixabay";
import { ProductClientContent } from "./ProductClientContent";

interface ProductPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

import { Metadata } from "next";

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const t = await getTranslations({ locale, namespace: 'Products' });
  const itemT = t.raw('items')[product.id];
  if (!itemT) return {};

  return {
    title: `${itemT.name} | LABDS 3D`,
    description: itemT.shortDescription || itemT.description,
    openGraph: {
      title: itemT.name,
      description: itemT.shortDescription || itemT.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = getProductBySlug(slug);
  if (!product) notFound();

  const t = await getTranslations({ locale, namespace: 'Products' });
  const items = t.raw('items');
  const itemT = items ? items[product.id] : null;
  
  if (!itemT) notFound();

  // Fetch image if not provided
  let image = product.image;
  if (!image && product.pixabayQuery) {
    const images = await fetch3DProductImages(product.pixabayQuery, 1);
    image = images[0]?.webformatURL || 'https://images.pexels.com/photos/4241704/pexels-photo-4241704.jpeg?auto=compress&cs=tinysrgb&w=800';
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      <LogoSpacer />
      
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Product Image */}
          <div className="sticky top-32">
            <Card3D className="p-4" animate={false}>
              <div className="relative aspect-square rounded-xl overflow-hidden bg-white">
                <Image 
                  src={image} 
                  alt={itemT.name} 
                  fill 
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 layer-lines opacity-10 pointer-events-none" />
              </div>
            </Card3D>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-brand/10 text-brand text-[10px] font-black uppercase tracking-widest rounded-full">
                  {product.category}
                </span>
                <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1">
                  <ShieldCheck size={12} /> In Stock
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                {itemT.name}
              </h1>
              <p className="text-2xl font-bold text-slate-900 mb-6">
                {product.price.toFixed(2)}€
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                {itemT.shortDescription || itemT.description}
              </p>
            </div>

            <ProductClientContent product={{...product, name: itemT.name, image}} />

            {/* Detailed Sections (Only if available) */}
            {itemT.description && itemT.shortDescription && (
              <div className="space-y-8 pt-8 border-t border-slate-200">
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Info size={16} /> Description
                  </h3>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                    {itemT.description}
                  </p>
                </div>

                {itemT.compatibilityNotice && (
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
                    <AlertTriangle className="text-amber-500 shrink-0" size={20} />
                    <p className="text-sm text-amber-800 font-medium leading-relaxed italic">
                      {itemT.compatibilityNotice}
                    </p>
                  </div>
                )}

                {itemT.highlights && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <ListChecks size={16} /> Highlights
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {itemT.highlights.map((h: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                          <Check size={16} className="text-brand shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-8">
                  {itemT.specs && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Specifications</h3>
                      <div className="space-y-2">
                         <div className="flex justify-between text-xs py-2 border-b border-slate-100">
                           <span className="text-slate-400">Material</span>
                           <span className="font-bold text-slate-900">{itemT.material || 'PLA Plastic'}</span>
                         </div>
                         <div className="flex flex-col gap-1 py-2">
                           <span className="text-xs text-slate-400">Compatibility</span>
                           <span className="text-xs font-bold text-green-600">✓ {itemT.specs.fits}</span>
                           <span className="text-xs font-bold text-red-400">✗ {itemT.specs.notFits}</span>
                         </div>
                      </div>
                    </div>
                  )}

                  {itemT.care && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Care Instructions</h3>
                      <ul className="space-y-2">
                        {itemT.care.map((c: string, i: number) => (
                          <li key={i} className="text-xs text-slate-500 flex gap-2">
                            <span className="text-slate-300">•</span> {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {(itemT.included || itemT.notIncluded) && (
                   <div className="space-y-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-3d-soft">
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">What&#39;s in the box?</h3>
                      <div className="grid sm:grid-cols-2 gap-6">
                        {itemT.included && (
                          <div>
                            <span className="text-[10px] font-black text-green-600 uppercase mb-2 block tracking-wider">Included</span>
                            <ul className="space-y-1">
                              {itemT.included.map((x: string, i: number) => <li key={i} className="text-xs text-slate-600 font-medium leading-relaxed">{x}</li>)}
                            </ul>
                          </div>
                        )}
                        {itemT.notIncluded && (
                          <div>
                            <span className="text-[10px] font-black text-red-400 uppercase mb-2 block tracking-wider">Not Included</span>
                            <ul className="space-y-1">
                              {itemT.notIncluded.map((x: string, i: number) => <li key={i} className="text-xs text-slate-400 leading-relaxed italic">{x}</li>)}
                            </ul>
                          </div>
                        )}
                      </div>
                   </div>
                )}
                
                {itemT.recommendedUse && (
                  <div className="pt-8">
                     <p className="text-sm text-slate-500 italic text-center">
                        <Heart size={14} className="inline mr-2 text-red-400" />
                        {itemT.recommendedUse}
                     </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
