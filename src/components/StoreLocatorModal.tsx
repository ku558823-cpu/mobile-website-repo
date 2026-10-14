import React, { useState } from 'react';
import { VERIFIED_DEALERS, MarketDealer } from '../data/dealers';

interface StoreLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreLocatorModal: React.FC<StoreLocatorModalProps> = ({ isOpen, onClose }) => {
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  if (!isOpen) return null;

  const cities = ['All', 'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Peshawar'];

  const filteredDealers = selectedCity === 'All'
    ? VERIFIED_DEALERS
    : VERIFIED_DEALERS.filter((d) => d.city.toLowerCase() === selectedCity.toLowerCase());

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard?.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div
        className="bg-white w-full max-w-2xl rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6] text-[24px]">storefront</span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Verified Mobile Stores &amp; Markets (Pakistan)
              </h2>
              <p className="text-xs text-slate-500">
                Official distributors &amp; wholesale retailers with warranty
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* City Filter Pills */}
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCity === city
                  ? 'bg-[#004ac6] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* List of Dealers */}
        <div className="overflow-y-auto p-4 space-y-3">
          {filteredDealers.map((dealer: MarketDealer) => (
            <div
              key={dealer.id}
              className="p-4 rounded-xl border border-slate-200 hover:border-blue-200 hover:shadow-xs transition-all bg-white flex flex-col sm:flex-row justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-[#004ac6]">
                    {dealer.city}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">
                    {dealer.name}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 flex items-start gap-1 pt-0.5">
                  <span className="material-symbols-outlined text-[15px] text-slate-400 shrink-0 mt-0.5">
                    location_on
                  </span>
                  <span>{dealer.address}</span>
                </p>
                <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-2 pt-1">
                  <span className="flex items-center gap-0.5 text-emerald-700 font-medium">
                    <span className="material-symbols-outlined text-[13px]">schedule</span>
                    {dealer.timing}
                  </span>
                  <span>•</span>
                  <span>Brands: {dealer.brandsAvailable.join(', ')}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0">
                <a
                  href={`tel:${dealer.phone.replace(/\s+/g, '')}`}
                  className="px-3 py-1.5 bg-[#004ac6] text-white rounded-lg text-xs font-semibold flex items-center gap-1 hover:bg-[#1E40AF] transition-colors"
                >
                  <span className="material-symbols-outlined text-[15px]">call</span>
                  Call Store
                </a>
                <button
                  onClick={() => handleCopyPhone(dealer.phone)}
                  className="px-2.5 py-1 text-slate-600 hover:text-slate-900 text-[11px] rounded flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[13px]">content_copy</span>
                  {copiedPhone === dealer.phone ? 'Copied!' : dealer.phone}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-emerald-600">verified</span>
            All dealers verified for official Pakistani PTA stock
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
