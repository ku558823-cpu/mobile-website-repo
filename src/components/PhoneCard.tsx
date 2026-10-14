import React, { useState } from 'react';
import { PhoneSpec } from '../data/phones';

interface PhoneCardProps {
  phone: PhoneSpec;
  onViewSpecs: (phone: PhoneSpec) => void;
  isSaved?: boolean;
  onToggleSave?: (phone: PhoneSpec) => void;
  isComparing?: boolean;
  onToggleCompare?: (phone: PhoneSpec) => void;
}

export const PhoneCard: React.FC<PhoneCardProps> = ({
  phone,
  onViewSpecs,
  isSaved = false,
  onToggleSave,
  isComparing = false,
  onToggleCompare,
}) => {
  const [imgError, setImgError] = useState(false);

  // Compute stars array for visual display
  const fullStars = Math.floor(phone.rating);
  const hasHalfStar = phone.rating % 1 >= 0.3 && phone.rating % 1 <= 0.7;

  return (
    <article className="bg-[#FFFFFF] border border-slate-200/70 rounded-xl p-2.5 flex flex-col justify-between shadow-[0_1px_3px_rgba(15,23,42,0.04)] hover:shadow-md transition-all duration-200 relative group">
      {/* Top action shortcuts (Bookmark & Compare) */}
      <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1">
        {onToggleCompare && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(phone);
            }}
            aria-label="Add to comparison"
            title="Compare specs"
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              isComparing
                ? 'bg-[#004ac6] text-white shadow-xs'
                : 'bg-white/80 backdrop-blur-xs text-slate-500 hover:text-[#004ac6] hover:bg-white shadow-xs'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">compare_arrows</span>
          </button>
        )}
        {onToggleSave && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(phone);
            }}
            aria-label="Save to favorites"
            title="Save to favorites"
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              isSaved
                ? 'bg-rose-50 text-rose-600 shadow-xs'
                : 'bg-white/80 backdrop-blur-xs text-slate-500 hover:text-rose-600 hover:bg-white shadow-xs'
            }`}
          >
            <span
              className="material-symbols-outlined text-[15px]"
              style={isSaved ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              favorite
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-col">
        {/* Product Image Stage */}
        <div
          onClick={() => onViewSpecs(phone)}
          className="relative w-full aspect-[4/5] bg-[#f2f4f6] rounded-lg overflow-hidden flex items-center justify-center p-2 mb-2 cursor-pointer group-hover:scale-[1.01] transition-transform"
        >
          {!imgError ? (
            <img
              src={phone.image}
              alt={phone.altText || phone.name}
              className="w-full h-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-1 bg-gradient-to-b from-slate-100 to-slate-200">
              <span className="material-symbols-outlined text-4xl text-slate-400">smartphone</span>
              <span className="text-[11px] font-semibold text-slate-500">{phone.brand}</span>
            </div>
          )}

          {/* Badge top-left */}
          {phone.badge && (
            <span className="absolute top-1.5 left-1.5 bg-[#FFFFFF]/90 backdrop-blur-xs text-[#004ac6] font-bold text-[11px] px-2 py-0.5 rounded-full shadow-xs tracking-tight border border-slate-100">
              {phone.badge}
            </span>
          )}
        </div>

        {/* Rating Stars */}
        <div className="flex items-center gap-0.5 text-[#F59E0B] mb-1">
          {Array.from({ length: 5 }).map((_, i) => {
            if (i < fullStars) {
              return (
                <span
                  key={i}
                  className="material-symbols-outlined text-[13px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              );
            } else if (i === fullStars && hasHalfStar) {
              return (
                <span key={i} className="material-symbols-outlined text-[13px]">
                  star_half
                </span>
              );
            } else {
              return (
                <span key={i} className="material-symbols-outlined text-[13px]">
                  star
                </span>
              );
            }
          })}
          <span className="text-[#64748B] text-[11px] font-medium ml-1">
            {phone.rating.toFixed(1)}
          </span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onViewSpecs(phone)}
          className="text-[14px] leading-snug text-[#0F172A] font-bold truncate cursor-pointer hover:text-[#004ac6] transition-colors"
          title={phone.name}
        >
          {phone.name}
        </h3>

        {/* Quick Specs */}
        <p className="text-[12px] text-[#64748B] line-clamp-1 mb-2 leading-tight">
          {phone.specsSummary}
        </p>
      </div>

      {/* Pricing & CTA */}
      <div className="flex flex-col gap-1.5 pt-1.5 border-t border-slate-100/80">
        <div className="flex items-baseline justify-between">
          <span className="text-[#059669] text-[15px] font-extrabold tracking-tight">
            {phone.priceDisplay}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">PTA OK</span>
        </div>

        <button
          onClick={() => onViewSpecs(phone)}
          className="w-full py-1.5 px-2 bg-[#004ac6] hover:bg-[#1E40AF] text-white rounded-lg text-[12px] font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all shadow-xs cursor-pointer"
        >
          <span>View Specs</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        </button>
      </div>
    </article>
  );
};
