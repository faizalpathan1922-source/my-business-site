import React, { useState, useMemo, useEffect } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  FileText, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Smartphone,
  Clock,
  RotateCcw,
  Zap,
  Shield,
  Download,
  Receipt
} from 'lucide-react';
import { ToolCard } from '../components/ToolCard';
import { TOOLS_LIST } from '../data/toolsData';
import { FAQS_DATA } from '../data/faqData';
import { ToolItem } from '../types';
import { getRecentlyUsedToolSlugs, clearRecentlyUsedTools } from '../utils/recentTools';
import { AffiliateCard } from '../components/AffiliateCard';

interface HomePageProps {
  onSelectTool: (slug: string) => void;
  onNavigate: (path: string) => void;
}

type FilterCategory = 'all' | 'gst-tax' | 'marketplace' | 'pricing';

interface FilterTabItem {
  id: FilterCategory;
  label: string;
  icon: string;
}

const FILTER_TABS: FilterTabItem[] = [
  { id: 'all', label: 'All Tools', icon: '⚡' },
  { id: 'gst-tax', label: 'GST & Tax', icon: '🏛️' },
  { id: 'marketplace', label: 'Marketplace & D2C', icon: '🛒' },
  { id: 'pricing', label: 'Pricing & Margins', icon: '💰' },
];

const CATEGORY_MAP: Record<Exclude<FilterCategory, 'all'>, string[]> = {
  'gst-tax': ['gst-calculator', 'invoice-generator', 'hsn-finder', 'receipt-generator', 'quotation-generator'],
  'marketplace': ['marketplace-profit-calculator', 'marketplace-comparison', 'profit-calculator', 'shopify-calculator'],
  'pricing': ['selling-price-calculator', 'margin-calculator'],
};

export const HomePage: React.FC<HomePageProps> = ({ onSelectTool, onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [recentSlugs, setRecentSlugs] = useState<string[]>(() => getRecentlyUsedToolSlugs());

  // Listen for local updates or tab sync
  useEffect(() => {
    const handleUpdate = () => {
      setRecentSlugs(getRecentlyUsedToolSlugs());
    };
    window.addEventListener('profitcalci_recent_tools_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('profitcalci_recent_tools_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const recentTools = useMemo(() => {
    return recentSlugs
      .map((slug) => TOOLS_LIST.find((t) => t.slug === slug))
      .filter((tool): tool is ToolItem => Boolean(tool))
      .slice(0, 3);
  }, [recentSlugs]);

  const handleClearRecent = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearRecentlyUsedTools();
    setRecentSlugs([]);
  };

  const filteredTools = useMemo(() => {
    if (activeCategory === 'all') {
      return TOOLS_LIST;
    }
    const targetSlugs = CATEGORY_MAP[activeCategory] || [];
    return TOOLS_LIST.filter((tool) => targetSlugs.includes(tool.slug));
  }, [activeCategory]);

  const getCategoryCount = (catId: FilterCategory) => {
    if (catId === 'all') return TOOLS_LIST.length;
    return (CATEGORY_MAP[catId] || []).length;
  };

  return (
    <div className="space-y-14 sm:space-y-20">
      {/* Hero Section */}
      <section className="relative pt-4 sm:pt-10 pb-4 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 mb-6 shadow-xs animate-in fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>100% Free Business Tools • Built for Bharat Sellers</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
          Simplify Everyday Business for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-500 dark:from-emerald-400 dark:via-emerald-300 dark:to-teal-300">
            Indian Sellers
          </span>
        </h1>

        <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Fast, accurate calculators and utilities for GST invoices, marketplace payouts, RTO returns, and retail billing.
        </p>

        {/* Quick Launch Buttons - Highlighting GST Invoice Generator as Flagship Tool */}
        <div className="mt-7 flex flex-wrap justify-center gap-2.5 sm:gap-3">
          <button
            onClick={() => onSelectTool('invoice-generator')}
            className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all duration-150 ease-out active:scale-95 shadow-lg shadow-emerald-700/25 flex items-center gap-2.5 cursor-pointer ring-2 ring-emerald-400/50"
          >
            <FileText className="w-4 h-4 text-emerald-200" />
            <span>Generate GST Invoice Free</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-white/20 text-white uppercase tracking-wide">
              Flagship
            </span>
          </button>
          <button
            onClick={() => onSelectTool('gst-calculator')}
            className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 transition-all duration-150 ease-out active:scale-95 shadow-xs hover:shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Calculator className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>GST Calculator</span>
          </button>
          <button
            onClick={() => onSelectTool('profit-calculator')}
            className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 transition-all duration-150 ease-out active:scale-95 shadow-xs hover:shadow-md flex items-center gap-2 cursor-pointer"
          >
            <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Marketplace Profit</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap justify-center gap-4 sm:gap-8 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Zero Sign-up Required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>No Private Data Stored</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Indian Currency (₹) & GST Ready</span>
          </div>
        </div>
      </section>

      {/* Recently Used Tools Section (Persisted in localStorage, shows last 3 used tools) */}
      {recentTools.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="bg-gradient-to-r from-emerald-50/70 via-teal-50/40 to-slate-50/80 dark:from-emerald-950/20 dark:via-slate-900/40 dark:to-slate-900/40 border border-emerald-100 dark:border-emerald-900/40 rounded-3xl p-5 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Recently Used
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      {recentTools.length} {recentTools.length === 1 ? 'tool' : 'tools'}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">
                    Jump right back into the calculators and tools you recently opened.
                  </p>
                </div>
              </div>

              <button
                onClick={handleClearRecent}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-xs font-semibold flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-150 active:scale-95 cursor-pointer"
                title="Clear recent history"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {recentTools.map((tool) => (
                <ToolCard key={`recent-${tool.id}`} tool={tool} onSelect={onSelectTool} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Tools Catalog with Horizontal Category Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Merchant Toolbox</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Calculators & Business Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Tap any category below to filter tools for tax, marketplaces, pricing, or marketing copy.
            </p>
          </div>

          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 hidden sm:inline">
            Showing {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
          </span>
        </div>

        {/* Mobile-First Scrollable Horizontal Category Filter Tabs */}
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
            {FILTER_TABS.map((tab) => {
              const isSelected = activeCategory === tab.id;
              const count = getCategoryCount(tab.id);

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 flex items-center gap-2 select-none active:scale-95 ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/20 ring-2 ring-emerald-600/30'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-700 dark:hover:text-emerald-400'
                  }`}
                >
                  <span className="text-sm">{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isSelected
                        ? 'bg-emerald-700/60 text-emerald-100'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filtered Tool Cards Grid with Smooth Transitions */}
        <div key={activeCategory} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 animate-card-enter">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} onSelect={onSelectTool} />
          ))}
        </div>
      </section>

      {/* Flagship Feature Showcase: Professional GST Tax Invoice Generator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 border border-emerald-500/30 p-7 sm:p-10 text-white shadow-xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Featured Business Tool • 100% Free Forever</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                Create GST-Compliant Tax Invoices in Under 60 Seconds
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Generate clean, professional A4 tax invoices with auto-calculated CGST, SGST, IGST splits, HSN lookup, dynamic UPI QR code for instant scan-and-pay, and one-click PDF print.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-emerald-200 font-semibold bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>State Tax Splits (CGST/SGST/IGST)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-200 font-semibold bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dynamic UPI Payment QR</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-200 font-semibold bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>One-Click A4 PDF & Print</span>
                </div>
              </div>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => onSelectTool('invoice-generator')}
                  className="px-6 py-3.5 rounded-xl text-sm font-black text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-emerald-700" />
                  <span>Open GST Invoice Generator</span>
                  <ArrowRight className="w-4 h-4 text-slate-900" />
                </button>
                <button
                  onClick={() => onSelectTool('gst-calculator')}
                  className="px-5 py-3.5 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer"
                >
                  GST Tax Calculator
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 hidden lg:block">
              <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl space-y-3 font-mono text-xs text-slate-200">
                <div className="flex justify-between items-center border-b border-white/15 pb-2 text-emerald-300 font-sans font-bold">
                  <span>TAX INVOICE PREVIEW</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/30">ORIGINAL FOR RECIPIENT</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>INVOICE NO: PC/2026/0421</span>
                  <span>DATE: {new Date().toLocaleDateString('en-IN')}</span>
                </div>
                <div className="py-2 border-y border-white/10 space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span>1. Premium Wireless Earbuds (HSN 8518)</span>
                    <span className="font-bold">₹1,999.00</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[10px]">
                    <span>Qty: 1 | Rate: ₹1,694.07 | 18% IGST</span>
                    <span>₹304.93</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm font-bold pt-1 text-white">
                  <span>TOTAL INVOICE VALUE</span>
                  <span className="text-emerald-300">₹1,999.00</span>
                </div>
                <div className="pt-2 text-[10px] text-slate-400 font-sans flex items-center justify-between">
                  <span>Authorized Signature • UPI QR Included</span>
                  <span className="text-emerald-400 font-bold">Instant A4 PDF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Growth Partners Section: Razorpay, Shiprocket & Shopify */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            Verified Seller Ecosystem
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            Grow Your Business with India’s Top E-commerce Partners
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
            Exclusive seller benefits, discounted courier rates, payment gateway onboarding, and D2C store setup.
          </p>
        </div>

        <div className="space-y-4">
          <AffiliateCard partnerId="razorpay" />
          <AffiliateCard partnerId="shiprocket" />
          <AffiliateCard partnerId="shopify" />
        </div>
      </section>

      {/* Value Proposition Grid: Built for Bharat */}
      <section className="bg-slate-900 text-white rounded-3xl p-7 sm:p-12 lg:p-16 max-w-7xl mx-auto mx-4 sm:mx-6 lg:mx-8 shadow-xl">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
            Why Indian Sellers Choose ProfitCalci
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Designed specifically for the realities of Indian commerce.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="space-y-2.5 p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
              ₹
            </div>
            <h3 className="font-bold text-base sm:text-lg text-slate-100">True RTO Return Loss Buffer</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standard profit calculators ignore Indian Cash-on-Delivery (COD) return rates. ProfitCalci factors in courier return losses so your real margins never surprise you.
            </p>
          </div>

          <div className="space-y-2.5 p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
              🏛️
            </div>
            <h3 className="font-bold text-base sm:text-lg text-slate-100">Intra-State vs Inter-State GST</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Accurate 50/50 split for CGST + SGST vs 100% IGST across all 36 Indian states and union territories, with 2-digit state codes.
            </p>
          </div>

          <div className="space-y-2.5 p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
              📲
            </div>
            <h3 className="font-bold text-base sm:text-lg text-slate-100">WhatsApp Commerce Ready</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generate Hinglish promotional ad copies formatted with WhatsApp bolding, emojis, and instant wa.me click-to-chat order links.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Teaser */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            Common Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3.5">
          {FAQS_DATA.slice(0, 4).map((faq) => (
            <div
              key={faq.id}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => onNavigate('/faq')}
            className="text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 cursor-pointer inline-flex items-center gap-1"
          >
            <span>Read All Questions & Answers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
