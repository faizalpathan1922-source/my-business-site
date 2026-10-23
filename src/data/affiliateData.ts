export interface AffiliatePartner {
  id: 'razorpay' | 'shiprocket' | 'shopify';
  name: string;
  tagline: string;
  headline: string;
  description: string;
  offerBadge: string;
  ctaText: string;
  referralUrl: string; // Configure your tracking/affiliate link here
  logoColor: string;
  accentBg: string;
  accentBorder: string;
  perks: string[];
}

export const AFFILIATE_PARTNERS: Record<'razorpay' | 'shiprocket' | 'shopify', AffiliatePartner> = {
  razorpay: {
    id: 'razorpay',
    name: 'Razorpay',
    tagline: 'India’s #1 Payments Solution for Businesses',
    headline: 'Collect UPI, Credit Cards & Netbanking at the Lowest Rates',
    description: 'Accept instant customer payments with Razorpay Payment Gateway. Enjoy 100+ payment modes, automated invoicing, instant merchant settlements, and zero maintenance fees.',
    offerBadge: 'Zero Setup Fee • Instant Onboarding',
    ctaText: 'Sign Up with Razorpay Free',
    referralUrl: 'https://razorpay.com/?utm_source=profitcalci&utm_medium=affiliate&utm_campaign=partner_network',
    logoColor: '#0c2340',
    accentBg: 'bg-blue-50/70 dark:bg-blue-950/30',
    accentBorder: 'border-blue-200 dark:border-blue-800/60',
    perks: [
      'Accept UPI, Google Pay, PhonePe, Cards & EMI',
      'Input Tax Credit (ITC) on 18% GST fee invoices',
      'Native integration with Shopify, WooCommerce & Custom Sites',
    ],
  },
  shiprocket: {
    id: 'shiprocket',
    name: 'Shiprocket',
    tagline: 'India’s Leading E-commerce Shipping & Logistics',
    headline: 'Cut Shipping Costs & Minimize COD Returns (RTO)',
    description: 'Ship across 24,000+ Indian pincodes starting at just ₹20/500g. Connect Delhivery, Blue Dart, Shadowfax, and Xpressbees on a single dashboard with automated RTO protection.',
    offerBadge: 'Get Free ₹100 Shipping Credits',
    ctaText: 'Ship with Shiprocket',
    referralUrl: 'https://www.shiprocket.in/?utm_source=profitcalci&utm_medium=affiliate&utm_campaign=seller_network',
    logoColor: '#7c3aed',
    accentBg: 'bg-purple-50/70 dark:bg-purple-950/30',
    accentBorder: 'border-purple-200 dark:border-purple-800/60',
    perks: [
      'Courier rates from ₹20/500g across India',
      'Early COD remittances (T+2 / Next Day Payouts)',
      'Automated WhatsApp buyer address verification to prevent RTO',
    ],
  },
  shopify: {
    id: 'shopify',
    name: 'Shopify India',
    tagline: 'Build Your Independent Online Store',
    headline: 'Start Your D2C Brand or Dropshipping Store for ₹20/Month',
    description: 'Launch your branded e-commerce store with zero marketplace commissions. Sell directly to your customers with built-in marketing tools, inventory management, and high-converting checkout.',
    offerBadge: 'Special: ₹20/month for first 3 months',
    ctaText: 'Start Shopify Free Trial',
    referralUrl: 'https://www.shopify.in/?ref=profitcalci&utm_source=profitcalci&utm_medium=affiliate',
    logoColor: '#008060',
    accentBg: 'bg-emerald-50/70 dark:bg-emerald-950/30',
    accentBorder: 'border-emerald-200 dark:border-emerald-800/60',
    perks: [
      'Zero marketplace commissions — keep 100% of profits',
      'Seamless Razorpay, Cashfree & Shiprocket one-click apps',
      'World’s highest-converting checkout with Shop Pay',
    ],
  },
};
