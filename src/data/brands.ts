export interface BrandInfo {
  name: string;
  slug: string;
  modelsCount: number;
  iconName: string;
  colorClass: string;
  marketShare: string;
  description: string;
  warrantyPartner: string;
}

export const BRANDS_DATA: BrandInfo[] = [
  {
    name: 'Samsung',
    slug: 'samsung',
    modelsCount: 142,
    iconName: 'smartphone',
    colorClass: 'text-primary',
    marketShare: '26.4%',
    description: 'Leader in Galaxy S-series flagships and reliable A-series budget devices assembled locally in Karachi.',
    warrantyPartner: 'Airlink Communications / M&P'
  },
  {
    name: 'Apple',
    slug: 'apple',
    modelsCount: 38,
    iconName: 'phone_iphone',
    colorClass: 'text-slate-900',
    marketShare: '12.1%',
    description: 'Premium iPhones with official Mercantile warranty and PTA approved direct carrier packages.',
    warrantyPartner: 'Mercantile / Future Tech Pakistan'
  },
  {
    name: 'Xiaomi',
    slug: 'xiaomi',
    modelsCount: 95,
    iconName: 'devices',
    colorClass: 'text-orange-500',
    marketShare: '18.7%',
    description: 'Mi, Redmi, and Poco devices known for aggressive price-to-performance specs and 120W HyperCharge.',
    warrantyPartner: 'Airlink / SmartLink Technologies'
  },
  {
    name: 'Realme',
    slug: 'realme',
    modelsCount: 64,
    iconName: 'bolt',
    colorClass: 'text-amber-500',
    marketShare: '11.5%',
    description: 'Youth-centric performance phones with Dart charging, trendy designs, and long-lasting batteries.',
    warrantyPartner: 'Realme Pakistan Official Care'
  },
  {
    name: 'Vivo',
    slug: 'vivo',
    modelsCount: 81,
    iconName: 'photo_camera',
    colorClass: 'text-blue-600',
    marketShare: '14.2%',
    description: 'Renowned for Aura Light portrait cameras, slim chassis aesthetics, and smooth Funtouch OS.',
    warrantyPartner: 'Vivo Official Care Pakistan'
  },
  {
    name: 'Oppo',
    slug: 'oppo',
    modelsCount: 73,
    iconName: 'camera',
    colorClass: 'text-emerald-600',
    marketShare: '9.8%',
    description: 'Military-grade drop resistance, SuperVOOC fast charging, and industry-leading selfie cameras.',
    warrantyPartner: 'Oppo Pakistan Authorized Centers'
  },
  {
    name: 'Tecno',
    slug: 'tecno',
    modelsCount: 52,
    iconName: 'flash_on',
    colorClass: 'text-blue-500',
    marketShare: '8.1%',
    description: 'Champion of entry-level and sub-40k budget mobile segments with high megapixel camera sensors.',
    warrantyPartner: 'Carlcare Service Pakistan'
  },
  {
    name: 'Infinix',
    slug: 'infinix',
    modelsCount: 59,
    iconName: 'battery_charging_full',
    colorClass: 'text-emerald-500',
    marketShare: '9.4%',
    description: 'Massive batteries (up to 6500mAh), curved AMOLED displays, and fast charging for gaming enthusiasts.',
    warrantyPartner: 'Carlcare Service Pakistan'
  },
  {
    name: 'Honor',
    slug: 'honor',
    modelsCount: 49,
    iconName: 'star',
    colorClass: 'text-cyan-600',
    marketShare: '4.2%',
    description: 'Ultra-durable anti-drop screens, Eye Comfort displays, and sleek European aesthetic designs.',
    warrantyPartner: 'Inovi Telecom / Official Honor PK'
  },
  {
    name: 'Motorola',
    slug: 'motorola',
    modelsCount: 41,
    iconName: 'memory',
    colorClass: 'text-indigo-600',
    marketShare: '2.8%',
    description: 'Clean stock Android experience, Pantone-curated vegan leather backs, and TurboPower charging.',
    warrantyPartner: 'TechDirect Authorized Dealers'
  },
  {
    name: 'Poco',
    slug: 'poco',
    modelsCount: 34,
    iconName: 'speed',
    colorClass: 'text-yellow-600',
    marketShare: '3.6%',
    description: 'Heavyweight budget gaming champions with extreme Antutu benchmark scores per Rupee spent.',
    warrantyPartner: 'SmartLink Technologies'
  }
];
