'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button3D } from '../ui/Button3D';
import { Card3D } from '../ui/Card3D';
import { Send, Upload, Link as LinkIcon, CheckCircle } from 'lucide-react';

export const RequestForm: React.FC = () => {
  const t = useTranslations('Request');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Smooth scroll to success message
    window.scrollTo({ top: document.getElementById('form-container')?.offsetTop || 0 - 100, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div id="form-container" className="scroll-mt-32 px-4">
        <Card3D className="max-w-2xl mx-auto text-center py-12 md:py-16">
          <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-3d-soft border-2 border-green-100">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">{t('success.title')}</h2>
          <p className="text-slate-600 mb-10 max-w-md mx-auto leading-relaxed">
            {t('success.description')}
          </p>
          <Button3D onClick={() => setSubmitted(false)} size="lg" className="w-full sm:w-auto">
            {t('success.new')}
          </Button3D>
        </Card3D>
      </div>
    );
  }

  return (
    <div id="form-container" className="scroll-mt-32 px-4">
      <Card3D className="max-w-3xl mx-auto p-6 sm:p-10 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            <div className="space-y-3">
              <label className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest">{t('form.name')}</label>
              <input 
                required
                className="w-full recessed rounded-xl px-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all border border-slate-200/50"
                placeholder={t('form.namePlaceholder')}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest">{t('form.whatsapp')}</label>
              <input 
                required
                type="tel"
                className="w-full recessed rounded-xl px-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all border border-slate-200/50"
                placeholder={t('form.whatsappPlaceholder')}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest">{t('form.description')}</label>
            <textarea 
              required
              rows={4}
              className="w-full recessed rounded-xl px-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all border border-slate-200/50 resize-none"
              placeholder={t('form.descriptionPlaceholder')}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            <div className="space-y-3">
              <label className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <LinkIcon size={14} className="text-slate-400" /> {t('form.reference')}
              </label>
              <input 
                className="w-full recessed rounded-xl px-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all border border-slate-200/50"
                placeholder={t('form.referencePlaceholder')}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Upload size={14} className="text-slate-400" /> {t('form.upload')}
              </label>
              <div className="relative group">
                 <input 
                  type="file" 
                  multiple
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div className="w-full recessed border-2 border-dashed border-slate-200 group-hover:border-slate-400 rounded-xl px-4 py-4 text-slate-400 text-sm flex items-center justify-between transition-colors">
                  <span className="truncate pr-4">{t('form.uploadPlaceholder')}</span>
                  <Upload size={18} className="flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-8 border-t border-slate-100">
             <div className="text-[10px] md:text-xs text-slate-400 max-w-[280px] text-center sm:text-left leading-relaxed">
               {t('form.privacy')}
             </div>
             <Button3D type="submit" size="lg" className="w-full sm:w-auto flex items-center gap-3">
               {t('form.submit')} <Send size={18} />
             </Button3D>
          </div>
        </form>
      </Card3D>
    </div>
  );
};
