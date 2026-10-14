import React from 'react';

interface HeaderProps {
  onOpenMenu: () => void;
  onFocusSearch: () => void;
  savedCount: number;
  onOpenSaved: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMenu,
  onFocusSearch,
  savedCount,
  onOpenSaved,
}) => {
  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#ffffff]/95 backdrop-blur-xl border-b border-slate-100 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto h-16 px-3 sm:px-6 flex items-center justify-between gap-2">
        {/* Left: Menu & Brand Logo */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenMenu}
            aria-label="Open Navigation Menu"
            className="w-11 h-11 flex items-center justify-center text-[#191c1e] hover:text-[#004ac6] active:scale-95 transition-all rounded-lg hover:bg-slate-50 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
          
          <div className="flex items-center gap-2">
            <img
              alt="MobilesPrice Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XP-cg8Yk4LLmSoDSnz1L9qZjFT5BydKgIoVh0Oz3b9isSSWhkWiRv3xIFUe2O9p3vju7mJdg9A-nh_a_IO1GXHg9Z2mIX1jhv8CVskDhq4Tlj6Y8PqA6YL0aCrdRfKQE3EE7-aW54jc8sgADGR0AeqW5WEvO5ocfriCfFlLDgl1ZV2AIdpIK3DGTIOKGmY0f7gGMYdZ1XqKhMcKui5NLQ1B2qa1NtkkSeDDNU0pry5QeSk9Q5VCvYs-w"
              onError={(e) => {
                // Fallback SVG icon if CDN has temporary hiccup
                const target = e.currentTarget;
                target.style.display = 'none';
              }}
            />
            <span className="font-bold text-lg text-[#004ac6] tracking-tight font-sans">
              MobilesPrice
            </span>
            <span className="hidden md:inline-flex items-center text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
              PK 2026 Live
            </span>
          </div>
        </div>

        {/* Right: Search Action & Profile / Saved Quick Access */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onFocusSearch}
            aria-label="Search Mobiles"
            className="w-11 h-11 flex items-center justify-center text-[#191c1e] hover:text-[#004ac6] active:scale-95 transition-all rounded-lg hover:bg-slate-50 cursor-pointer"
            title="Search mobile phones"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          <button
            onClick={onOpenSaved}
            aria-label="View Saved Phones"
            className="relative w-9 h-9 rounded-full bg-[#004ac6] hover:bg-[#1E40AF] flex items-center justify-center text-white active:scale-95 transition-all cursor-pointer shadow-sm"
            title="Saved Phones & Compare"
          >
            <span className="material-symbols-outlined text-white text-[19px]">person</span>
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
