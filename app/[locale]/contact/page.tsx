import { Header } from "@/components/layout/Header";
import { Card3D } from "@/components/ui/Card3D";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mail, MessageCircle, MapPin } from 'lucide-react';

interface ContactProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: ContactProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Contact' });

  const contactInfo = [
    { icon: <Mail size={24} />, label: t('info.email'), value: "info@labds3d.de" },
    { icon: <MessageCircle size={24} />, label: t('info.whatsapp'), value: "+49 123 456789" },
    { icon: <MapPin size={24} />, label: t('info.location'), value: "Black Forest, Germany" }
  ];

  return (
    <main className="flex-1">
      <Header />
      {/* Robust spacer for overflowing logo with Edge compatibility */}
      <div className="h-32 md:h-44 lg:h-56" />
      
      <section className="pt-20 pb-20 md:pt-24 md:pb-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter">
              {t('title')}
            </h1>
            <p className="text-lg sm:text-xl text-slate-500 px-4">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {contactInfo.map((info, i) => (
              <Card3D key={i} className="text-center p-8 md:p-10 flex flex-col items-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-brand text-white rounded-2xl flex items-center justify-center mb-6 shadow-3d-button">
                  {info.icon}
                </div>
                <h3 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{info.label}</h3>
                <p className="text-base md:text-lg font-bold text-slate-900 break-all sm:break-normal">{info.value}</p>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* Map or secondary contact area */}
      <section className="py-20 md:py-32 bg-slate-50 border-t border-slate-100">
         <div className="container mx-auto px-4 flex justify-center">
            <div className="w-full max-w-5xl h-[300px] md:h-[500px] bg-white rounded-[2rem] shadow-3d-soft border border-slate-200 overflow-hidden flex items-center justify-center relative p-8">
               <div className="absolute inset-0 opacity-5 layer-lines pointer-events-none" />
               <p className="text-slate-400 font-black uppercase tracking-widest text-center text-sm md:text-base">Interactive Map coming soon</p>
            </div>
         </div>
      </section>
    </main>
  );
}
