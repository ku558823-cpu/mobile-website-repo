import React from 'react';
import { PhoneSpec } from '../data/phones';

interface CompareModalProps {
  compareList: PhoneSpec[];
  onRemoveFromCompare: (phoneId: string) => void;
  onClearCompare: () => void;
  onClose: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  compareList,
  onRemoveFromCompare,
  onClearCompare,
  onClose,
}) => {
  if (compareList.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div
        className="bg-white w-full max-w-4xl rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6] text-[22px]">compare_arrows</span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Side-by-Side Mobile Comparison ({compareList.length}/3)
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClearCompare}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 px-2.5 py-1 rounded-md hover:bg-rose-50 transition-colors cursor-pointer"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Comparison Content */}
        <div className="overflow-x-auto p-4 sm:p-6">
          <div className="min-w-[600px]">
            {/* Top Device Header Cards */}
            <div className="grid grid-cols-4 gap-3 pb-4 border-b border-slate-200">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-end pb-2">
                Smartphone
              </div>
              {compareList.map((item) => (
                <div key={item.id} className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50 border border-slate-100 relative">
                  <button
                    onClick={() => onRemoveFromCompare(item.id)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-slate-200 text-slate-600 hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center text-xs transition-colors cursor-pointer"
                    title="Remove"
                  >
                    ×
                  </button>
                  <div className="w-20 h-24 flex items-center justify-center p-1 bg-white rounded-lg mb-2 shadow-xs">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate w-full">
                    {item.name}
                  </h4>
                  <span className="text-xs font-bold text-[#059669] mt-0.5">
                    {item.priceDisplay}
                  </span>
                </div>
              ))}
            </div>

            {/* Spec Rows */}
            <div className="divide-y divide-slate-100 text-xs sm:text-sm">
              {/* Row: Price */}
              <div className="grid grid-cols-4 gap-3 py-3 items-center">
                <span className="font-semibold text-slate-500">Retail Price</span>
                {compareList.map((item) => (
                  <span key={item.id} className="font-bold text-[#059669]">
                    {item.priceDisplay} PKR
                  </span>
                ))}
              </div>

              {/* Row: Display */}
              <div className="grid grid-cols-4 gap-3 py-3 items-center">
                <span className="font-semibold text-slate-500">Display</span>
                {compareList.map((item) => (
                  <span key={item.id} className="text-slate-800">
                    {item.display}
                  </span>
                ))}
              </div>

              {/* Row: Processor */}
              <div className="grid grid-cols-4 gap-3 py-3 items-center">
                <span className="font-semibold text-slate-500">Processor</span>
                {compareList.map((item) => (
                  <span key={item.id} className="text-slate-800 font-medium">
                    {item.processor}
                  </span>
                ))}
              </div>

              {/* Row: Antutu Score */}
              <div className="grid grid-cols-4 gap-3 py-3 items-center">
                <span className="font-semibold text-slate-500">Antutu Benchmark</span>
                {compareList.map((item) => (
                  <span key={item.id} className="font-mono text-slate-900 font-bold">
                    {item.antutuScore.toLocaleString()} pts
                  </span>
                ))}
              </div>

              {/* Row: Camera */}
              <div className="grid grid-cols-4 gap-3 py-3 items-center">
                <span className="font-semibold text-slate-500">Rear Camera</span>
                {compareList.map((item) => (
                  <span key={item.id} className="text-slate-800">
                    {item.camera}
                  </span>
                ))}
              </div>

              {/* Row: Battery & Charging */}
              <div className="grid grid-cols-4 gap-3 py-3 items-center">
                <span className="font-semibold text-slate-500">Battery &amp; Speed</span>
                {compareList.map((item) => (
                  <div key={item.id} className="flex flex-col">
                    <span className="text-slate-900 font-medium">{item.battery}</span>
                    <span className="text-[11px] text-slate-500">{item.fastCharging}</span>
                  </div>
                ))}
              </div>

              {/* Row: RAM & ROM */}
              <div className="grid grid-cols-4 gap-3 py-3 items-center">
                <span className="font-semibold text-slate-500">Memory &amp; Storage</span>
                {compareList.map((item) => (
                  <span key={item.id} className="text-slate-800">
                    {item.ram} / {item.storage}
                  </span>
                ))}
              </div>

              {/* Row: PTA & Network */}
              <div className="grid grid-cols-4 gap-3 py-3 items-center">
                <span className="font-semibold text-slate-500">Network / PTA</span>
                {compareList.map((item) => (
                  <span key={item.id} className="text-emerald-700 font-medium">
                    {item.network} • {item.ptaStatus}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Rates verified from official Pakistani brand distributors.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#004ac6] text-white rounded-lg font-semibold hover:bg-[#1E40AF] cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
