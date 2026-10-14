export interface UserReview {
  id: string;
  userName: string;
  userCity: string;
  phoneModel: string;
  rating: number;
  date: string;
  verifiedBuyer: boolean;
  dealerBoughtFrom: string;
  headline: string;
  comment: string;
  batteryLifeRating: number;
  cameraRating: number;
  gamingPerformance: string; // e.g. "PUBG 60FPS Smooth", "No Heating"
  likes: number;
}

export const REVIEWS_DATA: UserReview[] = [
  {
    id: 'rev-1',
    userName: 'Muhammad Hamza',
    userCity: 'Lahore (Gulberg)',
    phoneModel: 'Vivo V30e',
    rating: 5,
    date: 'March 2026',
    verifiedBuyer: true,
    dealerBoughtFrom: 'Hafeez Centre Lahore',
    headline: 'Best battery backup and portrait camera under 100k',
    comment: 'Bought this from Hafeez Centre last week. The 5500mAh battery easily lasts 1.5 days on 5G. Portrait photos with the Aura light in low light dinner settings look flagship grade. 44W charger included in the box is a big plus.',
    batteryLifeRating: 4.9,
    cameraRating: 4.8,
    gamingPerformance: 'Smooth PUBG 60 FPS without warm throttling',
    likes: 34
  },
  {
    id: 'rev-2',
    userName: 'Dr. Zeeshan Tariq',
    userCity: 'Karachi (Clifton)',
    phoneModel: 'Galaxy S27',
    rating: 5,
    date: 'February 2026',
    verifiedBuyer: true,
    dealerBoughtFrom: 'Star City Mall Saddar',
    headline: 'Titanium frame feels feather-light, display is unmatched under sunlight',
    comment: 'Upgraded from S23. The anti-reflective screen coating makes using the phone in bright Karachi sunlight completely glare-free. PTA tax was paid out of the box with official warranty card.',
    batteryLifeRating: 4.6,
    cameraRating: 5.0,
    gamingPerformance: 'Ultra 90 FPS max settings effortlessly',
    likes: 47
  },
  {
    id: 'rev-3',
    userName: 'Usman Ali Qureshi',
    userCity: 'Rawalpindi (Saddar)',
    phoneModel: 'Xiaomi 18 Pro Max',
    rating: 5,
    date: 'March 2026',
    verifiedBuyer: true,
    dealerBoughtFrom: 'Singapore Plaza Rawalpindi',
    headline: '100W HyperCharge recharges in 19 minutes, zoom camera is wild',
    comment: 'Takes clear moon and distant cricket stadium shots with the periscope telephoto. The 100W charger fills the phone before I finish morning tea. Officially PTA approved device.',
    batteryLifeRating: 4.8,
    cameraRating: 5.0,
    gamingPerformance: 'Full 120 FPS high resolution gaming stable',
    likes: 29
  },
  {
    id: 'rev-4',
    userName: 'Bilal Ahmed',
    userCity: 'Faisalabad',
    phoneModel: 'Vivo Y17s',
    rating: 4,
    date: 'January 2026',
    verifiedBuyer: true,
    dealerBoughtFrom: 'Katchery Bazaar Faisalabad',
    headline: 'Value champion for daily WhatsApp, calls, and banking apps',
    comment: 'Purchased for my father for daily office use. Solid build, clear speaker volume during calls, and 50MP camera takes great day shots for Rs. 32,500. Very happy with the purchase.',
    batteryLifeRating: 4.7,
    cameraRating: 4.2,
    gamingPerformance: 'Good for casual games and Subway Surfers',
    likes: 18
  },
  {
    id: 'rev-5',
    userName: 'Farhan Naveed',
    userCity: 'Islamabad (G-11)',
    phoneModel: 'Infinix Note 60 Edge 5G',
    rating: 5,
    date: 'March 2026',
    verifiedBuyer: true,
    dealerBoughtFrom: 'Blue Area Islamabad',
    headline: '6500mAh battery is an absolute beast for load-shedding and travel',
    comment: 'The curved AMOLED screen at this price point looks futuristic. Screen refresh rate is super fluid and dual stereo speakers are loud. Best 5G phone under 1 lac PKR.',
    batteryLifeRating: 5.0,
    cameraRating: 4.6,
    gamingPerformance: 'Dimensity 7300 handles Call of Duty and PUBG easily',
    likes: 41
  },
  {
    id: 'rev-6',
    userName: 'Khurram Shehzad',
    userCity: 'Multan',
    phoneModel: 'Honor X7c',
    rating: 5,
    date: 'February 2026',
    verifiedBuyer: true,
    dealerBoughtFrom: 'ChenOne Mall Multan',
    headline: 'Survived 2 accidental drops on marble floor without a scratch',
    comment: 'The 5-star drop resistance certification is real. Dropped it twice while riding bike and nothing cracked. Battery lasts 2 days straight.',
    batteryLifeRating: 5.0,
    cameraRating: 4.4,
    gamingPerformance: 'Smooth everyday multitasking and 60FPS gaming',
    likes: 22
  }
];
