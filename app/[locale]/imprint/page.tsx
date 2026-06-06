import { Header } from "@/components/layout/Header";
import { setRequestLocale } from "next-intl/server";

interface ImprintProps {
  params: Promise<{ locale: string }>;
}

export default async function ImprintPage({ params }: ImprintProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <h1 className="text-4xl font-black mb-12">Imprint</h1>
        <div className="prose max-w-none text-slate-600 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Information according to § 5 TMG</h2>
            <p>LABDS 3D Print<br />Black Forest, Germany</p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Contact</h2>
            <p>Email: info@labds3d.de<br />WhatsApp: +49 123 456789</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Represented by</h2>
            <p>Dzuhaib</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Dispute resolution</h2>
            <p>The European Commission provides a platform for online dispute resolution (OS): https://ec.europa.eu/consumers/odr. Our e-mail address can be found above in the imprint.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
