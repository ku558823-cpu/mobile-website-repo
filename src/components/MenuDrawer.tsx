import React from 'react';
import { NavTab } from './BottomNav';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: NavTab) => void;
  onOpenStoreLocator: () => void;
  onSelectPriceFilter?: (filter: string) => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onOpenStoreLocator,
  onSelectPriceFilter,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="relative bg-white w-72 sm:w-80 h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 bg-gradient-to-br from-[#004ac6] to-[#1E40AF] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl">smartphone</span>
            <div>
              <h3 className="font-bold text-base leading-tight">MobilesPrice.org.pk</h3>
              <span className="text-[11px] text-blue-200">Pakistan Mobile Database 2026</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Drawer Links */}
        <div className="overflow-y-auto p-4 flex-1 space-y-4 text-xs sm:text-sm">
          {/* Main Navigation */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Explore Portal
            </span>
            <div className="space-y-1">
              <button
                onClick={() => {
                  onNavigateTab('home');
                  onClose();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-100 font-semibold text-left transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-[#004ac6]">home</span>
                Latest Mobiles 2026
              </button>

              <button
                onClick={() => {
                  onNavigateTab('brands');
                  onClose();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-100 font-semibold text-left transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-slate-600">category</span>
                Browse by Brands
              </button>

              <button
                onClick={() => {
                  onNavigateTab('price-filter');
                  onClose();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-100 font-semibold text-left transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-emerald-600">payments</span>
                Price Range &amp; Spec Filter
              </button>

              <button
                onClick={() => {
                  onNavigateTab('reviews');
                  onClose();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-100 font-semibold text-left transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-amber-500">rate_review</span>
                User &amp; Expert Reviews
              </button>

              <button
                onClick={() => {
                  onNavigateTab('saved-favorites');
                  onClose();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-100 font-semibold text-left transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-rose-500">favorite</span>
                Saved Wishlist &amp; Compare
              </button>
            </div>
          </div>

          {/* Quick Budget Filters */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Popular Budgets (PKR)
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {['Under 30k', 'Under 40k', 'Under 60k', 'Above 90k'].map((budget) => (
                <button
                  key={budget}
                  onClick={() => {
                    if (onSelectPriceFilter) onSelectPriceFilter(budget);
                    onNavigateTab('home');
                    onClose();
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-[#004ac6] border border-slate-100 text-slate-700 text-xs font-semibold text-center transition-all cursor-pointer"
                >
                  {budget}
                </button>
              ))}
            </div>
          </div>

          {/* Verified Markets */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Physical Market Locator
            </span>
            <button
              onClick={() => {
                onClose();
                onOpenStoreLocator();
              }}
              className="w-full p-2.5 bg-blue-50 border border-blue-100 rounded-xl text-left flex items-start gap-2.5 hover:bg-blue-100/60 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px] text-[#004ac6] shrink-0 mt-0.5">
                near_me
              </span>
              <div>
                <span className="font-bold text-[#004ac6] block text-xs">
                  Wholesale Hubs Locator
                </span>
                <span className="text-[11px] text-slate-600 block leading-tight mt-0.5">
                  Hafeez Centre, Saddar Karachi, Hall Road, Blue Area Isb
                </span>
              </div>
            </button>
          </div>

          {/* PTA Info Card */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-950">
            <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-800">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              PTA Tax Compliance 2026
            </div>
            <p className="text-[11px] text-emerald-700 mt-1 leading-relaxed">
              All prices listed on MobilesPrice are inclusive of dual-SIM official Federal PTA import duties &amp; sales tax.
            </p>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
          <span>v2026.4 Live Feed</span>
          <span>PKR Currency</span>
        </div>
      </div>
    </div>
  );
};
