import React from 'react';

export type NavTab = 'home' | 'brands' | 'price-filter' | 'reviews' | 'saved-favorites';

interface BottomNavProps {
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
  savedCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  savedCount,
}) => {
  const tabs = [
    {
      id: 'home' as NavTab,
      label: 'Home',
      icon: 'home',
    },
    {
      id: 'brands' as NavTab,
      label: 'Brands',
      icon: 'category',
    },
    {
      id: 'price-filter' as NavTab,
      label: 'Price Filter',
      icon: 'payments',
    },
    {
      id: 'reviews' as NavTab,
      label: 'Reviews',
      icon: 'rate_review',
    },
    {
      id: 'saved-favorites' as NavTab,
      label: 'Saved',
      icon: 'favorite',
      badge: savedCount,
    },
  ];

  return (
    <nav
      className="fixed bottom-0 w-full z-50 pb-safe bg-[#ffffff]/95 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-4px_12px_rgba(15,23,42,0.06)]"
      data-active-classes="text-[#004ac6] font-semibold"
    >
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              data-path={tab.id}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 transition-all relative cursor-pointer ${
                isActive
                  ? 'text-[#004ac6] font-semibold scale-105'
                  : 'text-[#64748B] hover:text-[#004ac6]'
              }`}
            >
              <div className="relative">
                <span
                  className={`material-symbols-outlined text-[22px] transition-transform ${
                    isActive ? 'scale-110' : ''
                  }`}
                  style={isActive && tab.id === 'saved-favorites' ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {tab.icon}
                </span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2.5 bg-[#059669] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] leading-tight mt-0.5 tracking-tight">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#004ac6] mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
