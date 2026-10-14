import React, { useState } from 'react';
import { PhoneSpec } from '../data/phones';

interface PhoneDetailModalProps {
  phone: PhoneSpec | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (phone: PhoneSpec) => void;
  isComparing: boolean;
  onToggleCompare: (phone: PhoneSpec) => void;
  onOpenStoreLocator: () => void;
  onReportDiscrepancy: (phoneName: string) => void;
}

export const PhoneDetailModal: React.FC<PhoneDetailModalProps> = ({
  phone,
  onClose,
  isSaved,
  onToggleSave,
  isComparing,
  onToggleCompare,
  onOpenStoreLocator,
  onReportDiscrepancy,
}) => {
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [activeSpecTab, setActiveSpecTab] = useState<'overview' | 'detailed' | 'pricing'>('overview');

  if (!phone) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div
        className="bg-white w-full sm:max-w-xl md:max-w-2xl rounded-t-2xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 relative animate-in slide-in-from-bottom duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-[#004ac6] border border-blue-100">
              {phone.brand}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 truncate">
              {phone.name}
            </h2>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onToggleSave(phone)}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isSaved ? 'text-rose-600 bg-rose-50' : 'text-slate-500 hover:bg-slate-100'
              }`}
              title={isSaved ? 'Remove from Saved' : 'Save to Favorites'}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={isSaved ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                favorite
              </span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Main Visual Stage & Verified Price Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-slate-50/70 p-4 rounded-xl border border-slate-100">
            <div className="w-40 sm:w-48 aspect-[4/5] bg-white rounded-xl p-3 shadow-xs border border-slate-100 flex items-center justify-center shrink-0">
              <img
                src={phone.image}
                alt={phone.name}
                className="w-full h-full object-contain drop-shadow-md"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex flex-col flex-1 w-full space-y-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">verified</span>
                  {phone.ptaStatus}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                  {phone.network} Supported
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-500 block">Official Retail Rate (Pakistan)</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-[#059669]">
                    {phone.priceDisplay}
                  </span>
                  <span className="text-xs text-slate-400">PKR</span>
                </div>
              </div>

              {/* Rating and Antutu */}
              <div className="flex items-center gap-4 text-xs text-slate-600 pt-1">
                <span className="flex items-center gap-1 text-amber-600 font-semibold">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  {phone.rating} ({phone.reviewsCount} reviews)
                </span>
                <span className="text-slate-300">|</span>
                <span className="font-mono text-slate-700 font-medium">
                  Antutu: ~{(phone.antutuScore / 1000).toFixed(0)}k
                </span>
              </div>

              {/* Available Colors */}
              {phone.colors && phone.colors.length > 0 && (
                <div className="pt-1">
                  <span className="text-xs text-slate-500 block mb-1">Available Colors:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {phone.colors.map((color, index) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(index)}
                        className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                          selectedColor === index
                            ? 'bg-[#004ac6] text-white shadow-xs'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tab Selector: Overview / Detailed Specs / Local Market Pricing */}
          <div className="flex items-center border-b border-slate-200 gap-4 text-sm font-semibold">
            <button
              onClick={() => setActiveSpecTab('overview')}
              className={`pb-2.5 px-1 border-b-2 transition-colors cursor-pointer ${
                activeSpecTab === 'overview'
                  ? 'border-[#004ac6] text-[#004ac6]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Key Specifications
            </button>
            <button
              onClick={() => setActiveSpecTab('detailed')}
              className={`pb-2.5 px-1 border-b-2 transition-colors cursor-pointer ${
                activeSpecTab === 'detailed'
                  ? 'border-[#004ac6] text-[#004ac6]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Full Hardware Sheet
            </button>
            <button
              onClick={() => setActiveSpecTab('pricing')}
              className={`pb-2.5 px-1 border-b-2 transition-colors cursor-pointer ${
                activeSpecTab === 'pricing'
                  ? 'border-[#004ac6] text-[#004ac6]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Market Deals &amp; Dealers
            </button>
          </div>

          {/* TAB 1: Key Specifications Grid */}
          {activeSpecTab === 'overview' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col">
                <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-blue-600">memory</span>
                  Processor
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-900 mt-1">
                  {phone.processor}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col">
                <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-amber-600">photo_camera</span>
                  Camera
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-900 mt-1">
                  {phone.camera}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col">
                <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-emerald-600">battery_charging_full</span>
                  Battery
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-900 mt-1">
                  {phone.battery}
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">{phone.fastCharging}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col">
                <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-purple-600">smartphone</span>
                  Display
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-900 mt-1">
                  {phone.display}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col">
                <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-indigo-600">save</span>
                  RAM &amp; Storage
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-900 mt-1">
                  {phone.ram}
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">{phone.storage}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col">
                <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-rose-600">speed</span>
                  Antutu V10
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                  {phone.antutuScore.toLocaleString()} pts
                </span>
                <span className="text-[11px] text-emerald-600 font-medium mt-0.5">Tested in Pakistan</span>
              </div>
            </div>
          )}

          {/* TAB 2: Detailed Specs Table */}
          {activeSpecTab === 'detailed' && (
            <div className="divide-y divide-slate-100 text-xs sm:text-sm">
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500 font-medium">Model Code</span>
                <span className="text-slate-900 font-semibold">{phone.id.toUpperCase()}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500 font-medium">Display Specification</span>
                <span className="text-slate-900 font-semibold text-right max-w-xs">{phone.display}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500 font-medium">Main Camera Sensor</span>
                <span className="text-slate-900 font-semibold text-right max-w-xs">{phone.camera}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500 font-medium">Processor Chipset</span>
                <span className="text-slate-900 font-semibold">{phone.processor}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500 font-medium">Charging Standard</span>
                <span className="text-slate-900 font-semibold">{phone.fastCharging}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500 font-medium">PTA Approval Status</span>
                <span className="text-emerald-700 font-semibold">{phone.ptaStatus} (Dual SIM Tax Paid)</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500 font-medium">Official Brand Warranty</span>
                <span className="text-slate-900 font-semibold">1 Year Official Countrywide Card</span>
              </div>
            </div>
          )}

          {/* TAB 3: Local Market Pricing & Dealers */}
          {activeSpecTab === 'pricing' && (
            <div className="space-y-3">
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-3">
                <span className="material-symbols-outlined text-[22px] text-emerald-600 shrink-0">price_check</span>
                <div>
                  <h4 className="text-xs font-bold text-emerald-950">
                    Real-time Pakistani Wholesale Verification
                  </h4>
                  <p className="text-[11px] text-emerald-800 mt-0.5">
                    Updated continuously through certified distributors at Hafeez Centre (Lahore) and Saddar (Karachi).
                  </p>
                </div>
              </div>

              <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                <div className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-900 block">Hafeez Centre, Lahore</span>
                    <span className="text-[11px] text-slate-500">Walk-in wholesale rate</span>
                  </div>
                  <span className="font-bold text-[#059669]">Rs. {phone.price.toLocaleString()}</span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-900 block">Saddar Star City, Karachi</span>
                    <span className="text-[11px] text-slate-500">Retail verified price</span>
                  </div>
                  <span className="font-bold text-[#059669]">Rs. {phone.price.toLocaleString()}</span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-900 block">Blue Area, Islamabad</span>
                    <span className="text-[11px] text-slate-500">Official brand store rate</span>
                  </div>
                  <span className="font-bold text-[#059669]">Rs. {(phone.price + 1000).toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenStoreLocator();
                  }}
                  className="flex-1 py-2 px-3 bg-[#004ac6] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#1E40AF] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">near_me</span>
                  Find Local Store
                </button>
                <button
                  onClick={() => {
                    onReportDiscrepancy(phone.name);
                  }}
                  className="py-2 px-3 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">report</span>
                  Report Price
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Sticky CTA */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center gap-2">
          <button
            onClick={() => onToggleCompare(phone)}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              isComparing
                ? 'bg-[#dae2fd] text-[#004ac6]'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
            {isComparing ? 'In Comparison Tray' : 'Compare Specs'}
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenStoreLocator();
            }}
            className="flex-1 py-2.5 px-3 bg-[#004ac6] hover:bg-[#1E40AF] text-white rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">store</span>
            Find Nearby Dealers
          </button>
        </div>
      </div>
    </div>
  );
};
