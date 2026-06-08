import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { ProductCard } from "@/components/shop/ProductCard";
import { fetch3DProductImages, type PixabayImage } from "@/lib/services/pixabay";
import { Button3D } from "@/components/ui/Button3D";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RequestForm } from "@/components/forms/RequestForm";
import { TikTokSlider } from "@/components/sections/TikTokSlider";

interface HomeProps {
  params: Promise<{ locale: string }>;
}

import { PRODUCTS } from "@/lib/constants/products";

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Index' });
  const prodT = await getTranslations({ locale, namespace: 'Products' });
  const requestT = await getTranslations({ locale, namespace: 'Request' });

  // Fetch images for featured products if needed
  const featuredIds = ['calendar', 'pikachu-stitch', 'nescafe'];
  const featuredProductsData = PRODUCTS.filter(p => featuredIds.includes(p.id));
  
  const images: PixabayImage[] = await Promise.all(
    featuredProductsData.filter(p => !p.image).map(p => 
      fetch3DProductImages(p.pixabayQuery!, 1)
        .then(imgs => imgs[0])
        .catch(() => null)
    )
  ).then(res => res.filter((img): img is PixabayImage => !!img));

  const previewProducts = featuredProductsData.map(product => {
    const items = prodT.raw('items');
    const itemT = items ? items[product.id] : null;
    
    if (!itemT) {
      return {
        id: product.id,
        slug: product.slug,
        name: product.id,
        price: product.price,
        description: '',
        image: product.image || 'https://images.pexels.com/photos/4241704/pexels-photo-4241704.jpeg?auto=compress&cs=tinysrgb&w=800'
      };
    }

    let image = product.image;
    
    if (!image && product.pixabayQuery) {
      const pixabayImg = images.find(img => img.tags.toLowerCase().includes(product.id));
      image = pixabayImg?.webformatURL || 'https://images.pexels.com/photos/4241704/pexels-photo-4241704.jpeg?auto=compress&cs=tinysrgb&w=800';
    }

    return {
      id: product.id,
      slug: product.slug,
      name: itemT.name,
      price: product.price,
      description: itemT.shortDescription || itemT.description,
      image: image
    };
  });

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      
      {/* 2. Ready-to-Buy Products Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{prodT('title')}</h2>
              <p className="text-slate-500 mt-2">{prodT('description')}</p>
            </div>
            <Button3D href="/products" variant="primary" size="sm">{t('cta.secondary')}</Button3D>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             {previewProducts.map(product => (
               <ProductCard key={product.id} product={product} />
             ))}
          </div>
        </div>
      </section>

      {/* TikTok Slider Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
            {t('tiktok.title')}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto italic">
            {t('tiktok.subtitle')}
          </p>
        </div>
        <div className="container mx-auto px-4 md:px-0">
          <TikTokSlider />
        </div>
      </section>

      {/* Request Form Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
            {requestT('title')}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            {requestT('description')}
          </p>
        </div>
        <div className="container mx-auto px-4">
          <RequestForm />
        </div>
      </section>
    </main>
  );
}
