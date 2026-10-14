import React, { useState, useMemo } from 'react';
import { PHONES_DATA, PhoneSpec } from '../data/phones';
import { PhoneCard } from '../components/PhoneCard';

interface PriceFilterScreenProps {
  onViewSpecs: (phone: PhoneSpec) => void;
  savedPhoneIds: string[];
  onToggleSave: (phone: PhoneSpec) => void;
  compareList: PhoneSpec[];
  onToggleCompare: (phone: PhoneSpec) => void;
}

export const PriceFilterScreen: React.FC<PriceFilterScreenProps> = ({
  onViewSpecs,
  savedPhoneIds,
  onToggleSave,
  compareList,
  onToggleCompare,
}) => {
  const [maxPrice, setMaxPrice] = useState<number>(350000);
  const [minPrice, setMinPrice] = useState<number>(20000);
  const [selectedRam, setSelectedRam] = useState<string>('All');
  const [selectedCamera, setSelectedCamera] = useState<string>('All');
  const [only5G, setOnly5G] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'priceAsc' | 'priceDesc' | 'rating' | 'antutu'>('priceAsc');

  const budgetTiers = [
    { label: 'All Budgets', min: 20000, max: 350000 },
    { label: 'Under 35k', min: 20000, max: 35000 },
    { label: '35k - 60k', min: 35000, max: 60000 },
    { label: '60k - 100k', min: 60000, max: 100000 },
    { label: 'Above 100k', min: 100000, max: 350000 },
  ];

  const filteredPhones = useMemo(() => {
    const list = PHONES_DATA.filter((p) => {
      if (p.price < minPrice || p.price > maxPrice) return false;
      if (only5G && p.network !== '5G') return false;
      if (selectedRam === '8GB+' && !p.ram.includes('8GB') && !p.ram.includes('12GB') && !p.ram.includes('16GB')) return false;
      if (selectedRam === '12GB+' && !p.ram.includes('12GB') && !p.ram.includes('16GB')) return false;
      if (selectedCamera === '50MP+' && !p.camera.includes('50MP') && !p.camera.includes('64MP') && !p.camera.includes('108MP') && !p.camera.includes('200MP')) return false;
      if (selectedCamera === '108MP+' && !p.camera.includes('108MP') && !p.camera.includes('200MP')) return false;
      return true;
    });

    list.sort((a, b) => {
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'antutu') return b.antutuScore - a.antutuScore;
      return 0;
    });

    return list;
  }, [minPrice, maxPrice, selectedRam, selectedCamera, only5G, sortBy]);

  return (
    <div className="flex flex-col w-full pb-8 px-4 pt-3 space-y-4">
      {/* Filter Control Box */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6] text-2xl">payments</span>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Price &amp; Hardware Filter
            </h1>
          </div>
          <button
            onClick={() => {
              setMinPrice(20000);
              setMaxPrice(350000);
              setSelectedRam('All');
              setSelectedCamera('All');
              setOnly5G(false);
              setSortBy('priceAsc');
            }}
            className="text-xs text-[#004ac6] hover:underline font-semibold cursor-pointer"
          >
            Reset All
          </button>
        </div>

        {/* Quick Budget Preset Buttons */}
        <div>
          <label className="text-xs font-bold text-slate-600 block mb-1.5">
            Budget Preset
          </label>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {budgetTiers.map((tier) => {
              const isSelected = minPrice === tier.min && maxPrice === tier.max;
              return (
                <button
                  key={tier.label}
                  onClick={() => {
                    setMinPrice(tier.min);
                    setMaxPrice(tier.max);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#004ac6] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tier.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-semibold text-slate-700">
            <span>Min: Rs. {minPrice.toLocaleString()}</span>
            <span className="text-[#059669] font-bold">Max: Rs. {maxPrice.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={25000}
            max={350000}
            step={5000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-[#004ac6] cursor-pointer"
          />
        </div>

        {/* Spec Selectors & 5G Toggle */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
          <div>
            <label className="font-semibold text-slate-600 block mb-1">RAM Capacity</label>
            <select
              value={selectedRam}
              onChange={(e) => setSelectedRam(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-slate-800 focus:border-[#004ac6]"
            >
              <option value="All">All RAMs</option>
              <option value="8GB+">8GB RAM or more</option>
              <option value="12GB+">12GB RAM Flagship</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-600 block mb-1">Camera Sensor</label>
            <select
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-slate-800 focus:border-[#004ac6]"
            >
              <option value="All">All Cameras</option>
              <option value="50MP+">50MP+ OIS Sensor</option>
              <option value="108MP+">108MP / 200MP Ultra</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-600 block mb-1">Sort Results</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-slate-800 focus:border-[#004ac6]"
            >
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="rating">Top Rated (Stars)</option>
              <option value="antutu">Benchmark Performance</option>
            </select>
          </div>

          <div className="flex flex-col justify-end">
            <button
              onClick={() => setOnly5G(!only5G)}
              className={`p-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                only5G
                  ? 'bg-blue-50 border-blue-200 text-[#004ac6]'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {only5G ? 'check_box' : 'check_box_outline_blank'}
              </span>
              5G Ready Only
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-900">
            Matching Mobiles ({filteredPhones.length} found)
          </h2>
          <span className="text-xs text-slate-500">
            Budget range: Rs. {minPrice.toLocaleString()} - {maxPrice.toLocaleString()}
          </span>
        </div>

        {filteredPhones.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredPhones.map((phone) => (
              <PhoneCard
                key={phone.id}
                phone={phone}
                onViewSpecs={onViewSpecs}
                isSaved={savedPhoneIds.includes(phone.id)}
                onToggleSave={onToggleSave}
                isComparing={compareList.some((p) => p.id === phone.id)}
                onToggleCompare={onToggleCompare}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200 flex flex-col items-center">
            <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">filter_alt_off</span>
            <p className="text-sm font-bold text-slate-800">No smartphones match these specific criteria</p>
            <p className="text-xs text-slate-500 mt-1">Try expanding your price range or clearing the 5G requirement.</p>
          </div>
        )}
      </div>
    </div>
  );
};
