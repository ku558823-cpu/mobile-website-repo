import React from 'react';
import { PHONES_DATA, PhoneSpec } from '../data/phones';
import { PhoneCard } from '../components/PhoneCard';

interface SavedScreenProps {
  savedPhoneIds: string[];
  onToggleSave: (phone: PhoneSpec) => void;
  onViewSpecs: (phone: PhoneSpec) => void;
  compareList: PhoneSpec[];
  onToggleCompare: (phone: PhoneSpec) => void;
  onOpenCompareModal: () => void;
  onNavigateHome: () => void;
}

export const SavedScreen: React.FC<SavedScreenProps> = ({
  savedPhoneIds,
  onToggleSave,
  onViewSpecs,
  compareList,
  onToggleCompare,
  onOpenCompareModal,
  onNavigateHome,
}) => {
  const savedPhones = PHONES_DATA.filter((p) => savedPhoneIds.includes(p.id));

  return (
    <div className="flex flex-col w-full pb-8 px-4 pt-3 space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-rose-500 text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              favorite
            </span>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Saved Mobiles &amp; Wishlist ({savedPhones.length})
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track daily market price dips across Hafeez Centre and Karachi wholesale markets
          </p>
        </div>

        {compareList.length >= 2 && (
          <button
            onClick={onOpenCompareModal}
            className="px-4 py-2 bg-[#004ac6] hover:bg-[#1E40AF] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
            Compare Now ({compareList.length})
          </button>
        )}
      </div>

      {/* Comparison Drawer Notification if devices selected */}
      {compareList.length > 0 && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6] text-[20px]">compare</span>
            <span className="font-semibold text-slate-800">
              {compareList.length} device{compareList.length > 1 ? 's' : ''} in Comparison tray: {compareList.map((c) => c.name).join(' vs ')}
            </span>
          </div>
          <button
            onClick={onOpenCompareModal}
            className="px-3 py-1 bg-[#004ac6] text-white font-bold rounded-lg text-xs hover:bg-[#1E40AF] cursor-pointer"
          >
            Launch Comparison
          </button>
        </div>
      )}

      {/* Saved Phones Grid */}
      {savedPhones.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {savedPhones.map((phone) => (
            <PhoneCard
              key={phone.id}
              phone={phone}
              onViewSpecs={onViewSpecs}
              isSaved={true}
              onToggleSave={onToggleSave}
              isComparing={compareList.some((p) => p.id === phone.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      ) : (
        <div className="p-10 text-center bg-white rounded-2xl border border-slate-200 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-3xl">favorite_border</span>
          </div>
          <h2 className="text-base font-bold text-slate-900">Your Saved List is Empty</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">
            Tap the heart icon on any smartphone to bookmark it here, compare specs with rival models, and monitor Pakistani retail price changes.
          </p>
          <button
            onClick={onNavigateHome}
            className="mt-4 px-5 py-2.5 bg-[#004ac6] hover:bg-[#1E40AF] text-white font-bold rounded-xl text-xs cursor-pointer shadow-xs transition-colors"
          >
            Browse Latest Mobiles
          </button>
        </div>
      )}

      {/* Suggested Mobiles to Add */}
      {savedPhones.length === 0 && (
        <div className="pt-2">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Suggested Popular Devices in Pakistan
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PHONES_DATA.slice(0, 4).map((phone) => (
              <PhoneCard
                key={phone.id}
                phone={phone}
                onViewSpecs={onViewSpecs}
                isSaved={false}
                onToggleSave={onToggleSave}
                isComparing={compareList.some((p) => p.id === phone.id)}
                onToggleCompare={onToggleCompare}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
