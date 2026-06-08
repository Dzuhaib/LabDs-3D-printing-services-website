import { Header } from "@/components/layout/Header";
import { ProductCard } from "@/components/shop/ProductCard";
import { fetch3DProductImages, type PixabayImage } from "@/lib/services/pixabay";
import { getLocale } from "next-intl/server";
import { LogoSpacer } from "@/components/layout/LogoSpacer";
import { PRODUCTS } from "@/lib/constants/products";

export default async function ProductsPage() {
  const locale = await getLocale();
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const t = messages.Products;

  // Fetch images for products that don't have one
  const pixabayProducts = PRODUCTS.filter(p => !p.image && p.pixabayQuery);
  const images: PixabayImage[] = await Promise.all(
    pixabayProducts.map(p => 
      fetch3DProductImages(p.pixabayQuery!, 1)
        .then(imgs => imgs[0])
        .catch(() => null)
    )
  ).then(res => res.filter((img): img is PixabayImage => img !== null));
  
  const products = PRODUCTS.map((product, index) => {
    const itemT = t.items[product.id];
    let image = product.image;
    
    if (!image && product.pixabayQuery) {
      // Find the image from our fetched results
      const pixabayImg = images.find(img => img.tags.toLowerCase().includes(product.id) || images.indexOf(img) === pixabayProducts.indexOf(product));
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
           {products.map((product) => (
             <ProductCard key={product.id} product={product} />
           ))}
        </div>
      </div>
    </main>
  );
}

