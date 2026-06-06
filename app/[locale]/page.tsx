import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { ProductCard } from "@/components/shop/ProductCard";
import { fetch3DProductImages } from "@/lib/services/pixabay";
import { Link } from "@/navigation";
import { Button3D } from "@/components/ui/Button3D";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RequestForm } from "@/components/forms/RequestForm";
import { TikTokSlider } from "@/components/sections/TikTokSlider";

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Index' });
  const prodT = await getTranslations({ locale, namespace: 'Products' });
  const common = await getTranslations({ locale, namespace: 'Common' });
  const requestT = await getTranslations({ locale, namespace: 'Request' });

  // Wrap in try-catch to prevent crash if Pixabay fails
  let images = [];
  try {
    // We could translate the search query too if needed
    const searchQuery = locale === 'de' ? 'minimalistischer 3d druck' : 'minimalist 3d print';
    images = await fetch3DProductImages(searchQuery, 3);
  } catch (error) {
    console.error("Home: Pixabay fetch failed", error);
  }
  
  const previewProducts = [
    {
      id: '1',
      name: prodT('items.planter.name'),
      price: 19.99,
      description: prodT('items.planter.description'),
      image: images[0]?.webformatURL || 'https://images.pexels.com/photos/4241704/pexels-photo-4241704.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      name: prodT('items.organizer.name'),
      price: 24.50,
      description: prodT('items.organizer.description'),
      image: images[1]?.webformatURL || 'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      name: prodT('items.lamp.name'),
      price: 45.00,
      description: prodT('items.lamp.description'),
      image: images[2]?.webformatURL || 'https://images.pexels.com/photos/1112498/pexels-photo-1112498.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

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
