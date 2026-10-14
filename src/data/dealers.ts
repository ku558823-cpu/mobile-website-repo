export interface MarketDealer {
  id: string;
  name: string;
  market: string;
  city: string;
  address: string;
  phone: string;
  verifiedOfficial: boolean;
  brandsAvailable: string[];
  timing: string;
  rating: number;
}

export const VERIFIED_DEALERS: MarketDealer[] = [
  {
    id: 'lhr-hafeez-centre',
    name: 'Hafeez Centre Central Mobile Hub',
    market: 'Hafeez Centre (Gulberg III)',
    city: 'Lahore',
    address: 'Shop # 14-22, Ground & Basement Floor, Hafeez Centre, Main Boulevard, Gulberg III, Lahore',
    phone: '+92 42 35711200',
    verifiedOfficial: true,
    brandsAvailable: ['Samsung', 'Apple', 'Xiaomi', 'Vivo', 'Oppo', 'Realme', 'Honor'],
    timing: '11:00 AM - 10:30 PM (Mon-Sat)',
    rating: 4.8
  },
  {
    id: 'lhr-hall-road',
    name: 'Hall Road Wholesale Electronics Syndicate',
    market: 'Hall Road Wholesale Market',
    city: 'Lahore',
    address: 'Plaza 4, Hall Road near Mall Road, Anarkali Commercial Zone, Lahore',
    phone: '+92 42 37234911',
    verifiedOfficial: true,
    brandsAvailable: ['Tecno', 'Infinix', 'Xiaomi', 'Realme', 'Samsung'],
    timing: '10:30 AM - 9:00 PM (Mon-Sat)',
    rating: 4.6
  },
  {
    id: 'khi-saddar',
    name: 'Karachi Saddar Star City Mobile Exchange',
    market: 'Saddar Mobile Market',
    city: 'Karachi',
    address: 'Shops 105-112, 1st Floor, Star City Mall, Aga Khan III Road, Saddar, Karachi',
    phone: '+92 21 35689400',
    verifiedOfficial: true,
    brandsAvailable: ['Samsung', 'Apple', 'Xiaomi', 'Vivo', 'Oppo', 'Tecno', 'Motorola'],
    timing: '11:30 AM - 11:00 PM (Mon-Sat)',
    rating: 4.9
  },
  {
    id: 'khi-luckyone',
    name: 'LuckyOne Official Telecom Pavilion',
    market: 'LuckyOne Mall',
    city: 'Karachi',
    address: 'Level 2, Technology Corridor, LuckyOne Mall, Rashid Minhas Rd, Karachi',
    phone: '+92 21 36367800',
    verifiedOfficial: true,
    brandsAvailable: ['Samsung', 'Apple', 'Xiaomi', 'Vivo', 'Realme'],
    timing: '11:00 AM - 11:00 PM (Daily)',
    rating: 4.7
  },
  {
    id: 'isb-blue-area',
    name: 'Islamabad Blue Area Official Mobile Plaza',
    market: 'Blue Area Commercial Hub',
    city: 'Islamabad',
    address: 'Block E, Jinnah Avenue, Blue Area (Opposite Saudi Pak Tower), Islamabad',
    phone: '+92 51 2801450',
    verifiedOfficial: true,
    brandsAvailable: ['Samsung', 'Apple', 'Honor', 'Xiaomi', 'Vivo', 'Oppo'],
    timing: '10:00 AM - 10:00 PM (Mon-Sat)',
    rating: 4.8
  },
  {
    id: 'rwp-singapore-plaza',
    name: 'Singapore Plaza Telecom Market',
    market: 'Singapore Plaza (Saddar)',
    city: 'Rawalpindi',
    address: 'Bank Road, Saddar Commercial Area, Rawalpindi Cantonment',
    phone: '+92 51 5567300',
    verifiedOfficial: true,
    brandsAvailable: ['Samsung', 'Xiaomi', 'Infinix', 'Tecno', 'Vivo', 'Realme'],
    timing: '11:00 AM - 10:00 PM (Mon-Sat)',
    rating: 4.6
  },
  {
    id: 'fsd-katchery',
    name: 'Katchery Bazaar Mobile Mega Centre',
    market: 'Katchery Bazaar',
    city: 'Faisalabad',
    address: 'Circular Road Corner, Katchery Bazaar, Faisalabad',
    phone: '+92 41 2618900',
    verifiedOfficial: true,
    brandsAvailable: ['Vivo', 'Oppo', 'Tecno', 'Infinix', 'Samsung', 'Xiaomi'],
    timing: '10:30 AM - 9:30 PM (Mon-Sat)',
    rating: 4.5
  },
  {
    id: 'pew-deans',
    name: 'Deans Trade Center Mobile Galleria',
    market: 'Deans Trade Center (Cantonment)',
    city: 'Peshawar',
    address: 'Saddar Road, Peshawar Cantonment, Khyber Pakhtunkhwa',
    phone: '+92 91 5276200',
    verifiedOfficial: true,
    brandsAvailable: ['Samsung', 'Xiaomi', 'Vivo', 'Apple', 'Tecno'],
    timing: '10:30 AM - 9:00 PM (Mon-Sat)',
    rating: 4.7
  }
];
