import { Header } from "@/components/layout/Header";
import { ProductCard } from "@/components/shop/ProductCard";
import { fetch3DProductImages, type PixabayImage } from "@/lib/services/pixabay";
import { getLocale } from "next-intl/server";
import { LogoSpacer } from "@/components/layout/LogoSpacer";

export default async function ProductsPage() {
  const locale = await getLocale();
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const t = messages.Products;

  const images: PixabayImage[] = await fetch3DProductImages('minimalist 3d print product', 6).catch((error) => {
    console.error("ProductsPage: Pixabay fetch failed", error);
    return [];
  });
  
  const dummyProducts = [
    {
      id: '1',
      name: t.items.planter.name,
      price: 19.99,
      description: t.items.planter.description,
      image: images[0]?.webformatURL || 'https://images.pexels.com/photos/4241704/pexels-photo-4241704.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      name: t.items.organizer.name,
      price: 24.50,
      description: t.items.organizer.description,
      image: images[1]?.webformatURL || 'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      name: t.items.lamp.name,
      price: 45.00,
      description: t.items.lamp.description,
      image: images[2]?.webformatURL || 'https://images.pexels.com/photos/1112498/pexels-photo-1112498.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '4',
      name: t.items.dragon.name,
      price: 29.00,
      description: t.items.dragon.description,
      image: images[3]?.webformatURL || 'https://images.pexels.com/photos/20967/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '5',
      name: t.items.headphones.name,
      price: 32.99,
      description: t.items.headphones.description,
      image: images[4]?.webformatURL || 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '6',
      name: t.items.container.name,
      price: 15.75,
      description: t.items.container.description,
      image: images[5]?.webformatURL || 'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      <LogoSpacer />
      
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
              {t.title}
            </h1>
            <p className="text-xl text-slate-500 max-w-xl">
              {t.description}
            </p>
          </div>
          <div className="flex gap-2">
             <span className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold shadow-sm">{t.categories.all}</span>
             <span className="px-4 py-2 bg-slate-100 border border-transparent rounded-full text-sm font-bold text-slate-400">{t.categories.decor}</span>
             <span className="px-4 py-2 bg-slate-100 border border-transparent rounded-full text-sm font-bold text-slate-400">{t.categories.home}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
           {dummyProducts.map((product) => (
             <ProductCard key={product.id} product={product} />
           ))}
        </div>
      </div>
    </main>
  );
}

