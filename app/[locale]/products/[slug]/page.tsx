import { Header } from "@/components/layout/Header";
import { getProductBySlug } from "@/lib/constants/products";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { LogoSpacer } from "@/components/layout/LogoSpacer";
import { Info, AlertTriangle, ShieldCheck, ListChecks, Heart, Check } from "lucide-react";
import React from "react";
import { fetch3DProductImages } from "@/lib/services/pixabay";
import { ProductClientContent } from "./ProductClientContent";
import { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

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
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-brand/10 text-brand text-[10px] font-black uppercase tracking-widest rounded-full">
              {product.category}
            </span>
            <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1">
              <ShieldCheck size={12} /> In Stock
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
            {itemT.name}
          </h1>
          <p className="text-2xl font-bold text-slate-900 mb-6">
            {product.price.toFixed(2)}€
          </p>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl">
            {itemT.shortDescription || itemT.description}
          </p>
        </div>

        <ProductClientContent product={{...product, name: itemT.name, image}} />

        {/* Detailed Sections */}
        {itemT.description && itemT.shortDescription && (
          <div className="mt-20 pt-20 border-t border-slate-200">
            <div className="grid lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2 space-y-12">
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Info size={16} /> Description
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-line">
                    {itemT.description}
                  </p>
                </div>

                {itemT.compatibilityNotice && (
                  <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
                    <AlertTriangle className="text-amber-500 shrink-0" size={24} />
                    <p className="text-amber-800 font-medium leading-relaxed italic">
                      {itemT.compatibilityNotice}
                    </p>
                  </div>
                )}

                {itemT.highlights && (
                  <div className="space-y-6">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <ListChecks size={16} /> Highlights
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-4">
                      {itemT.highlights.map((h: string, i: number) => (
                        <li key={i} className="flex items-center gap-3 text-slate-700 font-bold bg-white p-4 rounded-xl shadow-3d-soft border border-slate-100">
                          <Check size={20} className="text-brand shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-10">
                <div className="bg-white p-8 rounded-2xl shadow-3d-soft border border-slate-100 space-y-6">
                  {itemT.specs && (
                    <div className="space-y-4">
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Specifications</h3>
                      <div className="space-y-3">
                         <div className="flex justify-between text-sm py-2 border-b border-slate-100">
                           <span className="text-slate-400">Material</span>
                           <span className="font-bold text-slate-900">{itemT.material || 'PLA Plastic'}</span>
                         </div>
                         <div className="flex flex-col gap-2 py-2">
                           <span className="text-xs text-slate-400 uppercase font-black">Compatibility</span>
                           <span className="text-sm font-bold text-green-600 flex items-center gap-2">✓ {itemT.specs.fits}</span>
                           <span className="text-sm font-bold text-red-400 flex items-center gap-2">× {itemT.specs.notFits}</span>
                         </div>
                      </div>
                    </div>
                  )}

                  {itemT.care && (
                    <div className="space-y-4 pt-4 border-t border-slate-50">
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Care</h3>
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
                   <div className="space-y-6 p-8 bg-slate-900 rounded-3xl text-white shadow-xl">
                      <h3 className="text-xs font-black uppercase tracking-widest opacity-50">Package Details</h3>
                      <div className="space-y-8">
                        {itemT.included && (
                          <div>
                            <span className="text-[10px] font-black text-brand-light uppercase mb-3 block tracking-widest">Included</span>
                            <ul className="space-y-2">
                              {itemT.included.map((x: string, i: number) => <li key={i} className="text-sm font-bold flex gap-2"><Check size={14} className="text-brand-light shrink-0" /> {x}</li>)}
                            </ul>
                          </div>
                        )}
                        {itemT.notIncluded && (
                          <div>
                            <span className="text-[10px] font-black text-red-400 uppercase mb-3 block tracking-widest">Not Included</span>
                            <ul className="space-y-2">
                              {itemT.notIncluded.map((x: string, i: number) => <li key={i} className="text-sm font-medium opacity-50 italic flex gap-2">× {x}</li>)}
                            </ul>
                          </div>
                        )}
                      </div>
                   </div>
                )}
                
                {itemT.recommendedUse && (
                  <div className="p-6 bg-white rounded-2xl border border-slate-100 italic text-center">
                    <p className="text-sm text-slate-500">
                      <Heart size={16} className="inline mr-2 text-red-400" />
                      {itemT.recommendedUse}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
