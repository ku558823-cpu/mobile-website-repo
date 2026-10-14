import React, { useState } from 'react';
import { BRANDS_DATA, BrandInfo } from '../data/brands';
import { PHONES_DATA, PhoneSpec } from '../data/phones';
import { PhoneCard } from '../components/PhoneCard';

interface BrandsScreenProps {
  initialBrand?: string;
  onViewSpecs: (phone: PhoneSpec) => void;
  savedPhoneIds: string[];
  onToggleSave: (phone: PhoneSpec) => void;
  compareList: PhoneSpec[];
  onToggleCompare: (phone: PhoneSpec) => void;
}

export const BrandsScreen: React.FC<BrandsScreenProps> = ({
  initialBrand = 'Samsung',
  onViewSpecs,
  savedPhoneIds,
  onToggleSave,
  compareList,
  onToggleCompare,
}) => {
  const [selectedBrandName, setSelectedBrandName] = useState<string>(initialBrand);
  const [brandSearch, setBrandSearch] = useState<string>('');

  const currentBrandInfo = BRANDS_DATA.find(
    (b) => b.name.toLowerCase() === selectedBrandName.toLowerCase()
  ) || BRANDS_DATA[0];

  const brandPhones = PHONES_DATA.filter((phone) => {
    const matchesBrand = phone.brand.toLowerCase() === currentBrandInfo.name.toLowerCase();
    if (!matchesBrand) return false;
    if (brandSearch.trim()) {
      return phone.name.toLowerCase().includes(brandSearch.toLowerCase()) ||
        phone.specsSummary.toLowerCase().includes(brandSearch.toLowerCase());
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-8 px-4 pt-3 space-y-4">
      {/* Brand Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6] text-2xl">category</span>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Mobile Brands Directory (Pakistan)
            </h1>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
            Official Warranty
          </span>
        </div>

        {/* Brand Selector Badges */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {BRANDS_DATA.map((brand: BrandInfo) => {
            const isSelected = brand.name.toLowerCase() === currentBrandInfo.name.toLowerCase();
            return (
              <button
                key={brand.slug}
                onClick={() => setSelectedBrandName(brand.name)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#004ac6] text-white shadow-xs scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{brand.iconName}</span>
                <span>{brand.name}</span>
                <span className="text-[10px] opacity-80">({brand.modelsCount})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Brand Spotlight Card */}
      <div className="bg-gradient-to-br from-blue-50/70 to-slate-50 rounded-2xl p-4 sm:p-5 border border-blue-100 flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className={`material-symbols-outlined text-3xl ${currentBrandInfo.colorClass}`}>
              {currentBrandInfo.iconName}
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {currentBrandInfo.name} Mobiles in Pakistan
              </h2>
              <span className="text-xs text-slate-500">
                Market Share: <strong className="text-slate-800">{currentBrandInfo.marketShare}</strong> • Models tracked: {currentBrandInfo.modelsCount}
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-2 max-w-xl leading-relaxed">
            {currentBrandInfo.description}
          </p>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-emerald-600">verified</span>
            <span>Authorized Service Partner: <strong>{currentBrandInfo.warrantyPartner}</strong></span>
          </div>
        </div>

        {/* Brand In-Model Search */}
        <div className="w-full sm:w-64 flex flex-col justify-end">
          <label className="text-[11px] font-semibold text-slate-500 mb-1">
            Search in {currentBrandInfo.name}
          </label>
          <div className="relative">
            <input
              type="text"
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              placeholder={`Filter ${currentBrandInfo.name} models...`}
              className="w-full pl-8 pr-3 py-2 bg-white rounded-lg border border-slate-200 text-xs text-slate-900 outline-none focus:border-[#004ac6]"
            />
            <span className="material-symbols-outlined text-[16px] text-slate-400 absolute left-2.5 top-2.5">
              search
            </span>
          </div>
        </div>
      </div>

      {/* Brand Phone Catalog Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900">
            {currentBrandInfo.name} Catalog ({brandPhones.length} available models)
          </h3>
          <span className="text-[11px] text-slate-500">Dual-SIM PTA Approved</span>
        </div>

        {brandPhones.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {brandPhones.map((phone) => (
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
            <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">devices</span>
            <p className="text-sm font-bold text-slate-800">More {currentBrandInfo.name} models arriving soon</p>
            <p className="text-xs text-slate-500 mt-1">Check out other popular brands like Vivo, Xiaomi, or Samsung.</p>
          </div>
        )}
      </div>
    </div>
  );
};
