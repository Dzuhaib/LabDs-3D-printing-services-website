import { Header } from "@/components/layout/Header";
import { setRequestLocale } from "next-intl/server";

interface PrivacyProps {
  params: Promise<{ locale: string }>;
}

export default async function PrivacyPage({ params }: PrivacyProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <h1 className="text-4xl font-black mb-12">Privacy Policy</h1>
        <div className="prose max-w-none text-slate-600 space-y-6">
          <p>Your privacy is important to us. It is LABDS 3D Print's policy to respect your privacy regarding any information we may collect from you across our website.</p>
          
          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Information we collect</h2>
          <p>We only ask for personal information when we truly need it to provide a service to you (such as your name and WhatsApp number for a 3D printing request). We collect it by fair and lawful means, with your knowledge and consent.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Use of Information</h2>
          <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Third-party services</h2>
          <p>Our website uses Google Fonts and may use external services for payment processing (like PayPal). These services have their own privacy policies.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Consent</h2>
          <p>Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.</p>
        </div>
      </div>
    </main>
  );
}
