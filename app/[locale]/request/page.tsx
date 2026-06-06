import { Header } from "@/components/layout/Header";
import { RequestForm } from "@/components/forms/RequestForm";
import { useTranslations } from "next-intl";

export default function RequestPage() {
  const t = useTranslations('Request');
  const common = useTranslations('Common');

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
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

      <footer className="py-12 border-t border-slate-100 bg-white">
        <div className="container mx-auto px-4 text-center">
           <p className="text-slate-400 text-sm font-medium">© 2026 LABDS 3D Print. {common('rights')}</p>
        </div>
      </footer>
    </main>
  );
}
