import { Header } from "@/components/layout/Header";
import { RequestForm } from "@/components/forms/RequestForm";
import { useTranslations } from "next-intl";
import { LogoSpacer } from "@/components/layout/LogoSpacer";

export default function RequestPage() {
  const t = useTranslations('Request');

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      <LogoSpacer />
      
      <div className="container mx-auto px-4 py-20 pb-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <RequestForm />
      </div>
    </main>
  );
}

