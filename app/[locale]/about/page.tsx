import { Header } from "@/components/layout/Header";
import { Card3D } from "@/components/ui/Card3D";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckCircle, Zap, Shield, Heart } from 'lucide-react';
import React from 'react';
import { LogoSpacer } from "@/components/layout/LogoSpacer";

interface AboutProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'About' });

  const steps = [
    { icon: <Zap className="text-blue-500" size={24} />, title: t('process.step1') },
    { icon: <Shield className="text-green-500" size={24} />, title: t('process.step2') },
    { icon: <CheckCircle className="text-brand" size={24} />, title: t('process.step3') },
    { icon: <Heart className="text-red-500" size={24} />, title: t('process.step4') }
  ];

  return (
    <main className="flex-1">
      <Header />
      <LogoSpacer />

      {/* Hero Section */}

      <section className="pt-20 pb-20 md:pt-24 md:pb-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-8 tracking-tighter">
              {t('title')}
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-12 max-w-2xl mx-auto md:mx-0">
              {t('story')}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Process */}
      <section className="py-20 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 uppercase tracking-widest text-center md:text-left">{t('process.title')}</h2>
              <div className="space-y-6 sm:space-y-8">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-5 sm:gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-2xl shadow-3d-soft flex items-center justify-center transition-transform group-hover:scale-110">
                      {step.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step 0{i+1}</span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">{step.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <Card3D className="aspect-square sm:aspect-video bg-white flex items-center justify-center p-8 sm:p-12 text-center max-w-[500px] lg:max-w-none mx-auto">
                <div className="max-w-md">
                   <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 italic">&quot;Quality is not an act, it is a habit.&quot;</h3>
                   <p className="text-sm sm:text-base text-slate-500">{t('mission')}</p>
                </div>
              </Card3D>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
