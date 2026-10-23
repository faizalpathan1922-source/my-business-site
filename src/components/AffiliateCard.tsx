import React from 'react';
import { ExternalLink, CheckCircle2, ArrowRight, ShieldCheck, Zap, Truck, CreditCard, ShoppingBag } from 'lucide-react';
import { AFFILIATE_PARTNERS, AffiliatePartner } from '../data/affiliateData';

interface AffiliateCardProps {
  partnerId: 'razorpay' | 'shiprocket' | 'shopify';
  compact?: boolean;
  contextText?: string;
}

export const AffiliateCard: React.FC<AffiliateCardProps> = ({ partnerId, compact = false, contextText }) => {
  const partner: AffiliatePartner = AFFILIATE_PARTNERS[partnerId];

  const getPartnerIcon = () => {
    switch (partnerId) {
      case 'razorpay':
        return <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'shiprocket':
        return <Truck className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case 'shopify':
        return <ShoppingBag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  if (compact) {
    return (
      <div className={`p-4 rounded-2xl border ${partner.accentBorder} ${partner.accentBg} transition-all duration-200 no-print`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 shadow-xs">
              {getPartnerIcon()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  {partner.name}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  {partner.offerBadge}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                {contextText || partner.headline}
              </p>
            </div>
          </div>

          <a
            href={partner.referralUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 rounded-xl transition-all active:scale-95 shadow-xs shrink-0 cursor-pointer"
          >
            <span>{partner.ctaText}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 sm:p-7 rounded-3xl border ${partner.accentBorder} ${partner.accentBg} relative overflow-hidden transition-all shadow-xs no-print`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-xs">
              {getPartnerIcon()}
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Recommended Partner • {partner.tagline}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                {partner.headline}
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {partner.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {partner.perks.map((perk, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end justify-center gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200/60 dark:border-slate-800">
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            {partner.offerBadge}
          </span>
          <a
            href={partner.referralUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer text-center"
          >
            <span>{partner.ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 self-center md:self-end">
            Official Partner Link • Zero Extra Fee
          </span>
        </div>
      </div>
    </div>
  );
};
