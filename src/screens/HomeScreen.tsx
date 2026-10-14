import React, { useState, useMemo } from 'react';
import { PHONES_DATA, PhoneSpec } from '../data/phones';
import { BRANDS_DATA } from '../data/brands';
import { PhoneCard } from '../components/PhoneCard';

interface HomeScreenProps {
  onViewSpecs: (phone: PhoneSpec) => void;
  savedPhoneIds: string[];
  onToggleSave: (phone: PhoneSpec) => void;
  compareList: PhoneSpec[];
  onToggleCompare: (phone: PhoneSpec) => void;
  onOpenStoreLocator: () => void;
  onOpenReportDiscrepancy: (phoneName?: string) => void;
  onSelectBrand: (brandName: string) => void;
  onNavigateBrands: () => void;
  searchRef?: React.RefObject<HTMLInputElement | null>;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onViewSpecs,
  savedPhoneIds,
  onToggleSave,
  compareList,
  onToggleCompare,
  onOpenStoreLocator,
  onOpenReportDiscrepancy,
  onSelectBrand,
  onNavigateBrands,
  searchRef,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedBudgetFilter, setSelectedBudgetFilter] = useState<'all' | 'under35k' | 'under40k'>('all');

  const filterPills = [
    'All',
    'Under 30k',
    'Under 40k',
    'Under 60k',
    'Above 90k',
    '50MP Camera',
    '8GB RAM',
    'Antutu 500k+',
  ];

  // Curated list for the latest phone grid (IDs matching the HTML mockup top grid)
  const defaultLatestIds = [
    'vivo-v30e',
    'xiaomi-18-pro-max',
    'samsung-galaxy-s27',
    'honor-t10',
    'honor-x7c',
    'vivo-y73',
  ];

  // Curated list for Section 2 (Mobiles Under 40k)
  const budgetUnder40kIds = [
    'vivo-y17s',
    'xiaomi-redmi-a5',
    'realme-narzo-30',
    'poco-c85',
  ];

  // Curated list for Section 3 (Mid-Range & Flagship Picks)
  const flagshipTrioIds = [
    'oppo-a60',
    'infinix-note-60-edge-5g',
    'motorola-moto-g77',
  ];

  // Filter phones dynamically
  const filteredPhones = useMemo(() => {
    return PHONES_DATA.filter((phone) => {
      // Search matching
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = phone.name.toLowerCase().includes(query);
        const matchesBrand = phone.brand.toLowerCase().includes(query);
        const matchesSpecs = phone.specsSummary.toLowerCase().includes(query) ||
          phone.processor.toLowerCase().includes(query) ||
          phone.camera.toLowerCase().includes(query) ||
          phone.ram.toLowerCase().includes(query);
        const matchesPrice = phone.price.toString().includes(query);
        if (!matchesName && !matchesBrand && !matchesSpecs && !matchesPrice) {
          return false;
        }
      }

      // Filter pills
      if (activeFilter === 'Under 30k') return phone.price <= 30000;
      if (activeFilter === 'Under 40k') return phone.price <= 40000;
      if (activeFilter === 'Under 60k') return phone.price <= 60000;
      if (activeFilter === 'Above 90k') return phone.price >= 90000;
      if (activeFilter === '50MP Camera') return phone.camera.includes('50MP') || phone.camera.includes('64MP') || phone.camera.includes('108MP') || phone.camera.includes('200MP');
      if (activeFilter === '8GB RAM') return phone.ram.includes('8GB') || phone.ram.includes('12GB') || phone.ram.includes('16GB');
      if (activeFilter === 'Antutu 500k+') return phone.antutuScore >= 500000;

      return true;
    });
  }, [searchQuery, activeFilter]);

  // Section 2: Mobiles Under 40k
  const budgetUnder40kPhones = useMemo(() => {
    return PHONES_DATA.filter((p) => {
      if (selectedBudgetFilter === 'under35k') return p.price <= 35000;
      return budgetUnder40kIds.includes(p.id) || p.price <= 40000;
    }).slice(0, 4);
  }, [selectedBudgetFilter]);

  // Section 3: Bento Picks
  const bentoPhones = useMemo(() => {
    return PHONES_DATA.filter((p) => flagshipTrioIds.includes(p.id));
  }, []);

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Search & Quick Filters Header Block */}
      <section className="px-4 pt-4 pb-5 bg-white shadow-xs flex flex-col gap-3 border-b border-slate-100">
        {/* Meta tag badge & heading intro */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#dae2fd] text-[#131b2e] text-[11px] font-bold">
              <span className="material-symbols-outlined text-[13px] text-[#004ac6]">verified</span>
              Pakistan Mobile Prices 2026
            </span>
            <span className="text-[#64748B] text-[11px] font-semibold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[14px] text-[#F59E0B]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              4.5 (45+ Reviews)
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight font-sans">
            Find Updated Prices Of Every Brand Mobile
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] line-clamp-2">
            Compare accurate market retail rates across Pakistan. Filter by RAM, camera specs, and everyday budgets.
          </p>
        </div>

        {/* Interactive Search Bar */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            ref={searchRef as React.LegacyRef<HTMLInputElement>}
            id="mobileSearchInput"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mobile by name, RAM, camera, or budget..."
            className="w-full pl-10 pr-10 py-3 bg-[#f2f4f6] text-[#191c1e] placeholder:text-[#64748B] rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#004ac6]/30 focus:shadow-md transition-all border border-transparent focus:border-[#004ac6]"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">clear</span>
            </button>
          ) : (
            <button
              onClick={() => {
                // Focus and show filter hint
                if (searchRef && searchRef.current) {
                  searchRef.current.focus();
                }
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#004ac6] hover:text-[#1E40AF] cursor-pointer"
              title="Filter"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </button>
          )}
        </div>

        {/* Quick Filter Pills (Horizontal Scroll) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 pt-0.5">
          {filterPills.map((pill) => {
            const isSelected = activeFilter === pill;
            return (
              <button
                key={pill}
                onClick={() => {
                  setActiveFilter(pill);
                  setCurrentPage(1);
                }}
                className={`filter-pill whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 active:scale-95 cursor-pointer ${
                  isSelected
                    ? 'bg-[#004ac6] text-white shadow-xs'
                    : 'bg-[#eceef0] text-[#434655] hover:bg-[#e6e8ea]'
                }`}
              >
                {pill === 'All' && <span className="material-symbols-outlined text-[14px]">bolt</span>}
                {pill}
              </button>
            );
          })}
        </div>
      </section>

      {/* Popular Brands (Horizontal Carousel) */}
      <section className="mt-4 px-4 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#004ac6]"></span>
            <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">Popular Brands</h2>
          </div>
          <button
            onClick={onNavigateBrands}
            className="text-xs font-semibold text-[#004ac6] hover:underline flex items-center cursor-pointer"
          >
            View All <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
          {BRANDS_DATA.slice(0, 8).map((brand) => (
            <button
              key={brand.slug}
              onClick={() => onSelectBrand(brand.name)}
              className="flex flex-col items-center justify-center min-w-[78px] p-2.5 rounded-xl bg-white shadow-xs hover:shadow-md transition-all text-center group border border-slate-100 cursor-pointer active:scale-95 shrink-0"
            >
              <div className="w-12 h-12 rounded-full bg-[#f2f4f6] flex items-center justify-center group-hover:scale-105 transition-transform mb-1.5">
                <span className={`material-symbols-outlined text-[24px] ${brand.colorClass}`}>
                  {brand.iconName}
                </span>
              </div>
              <span className="text-xs text-[#0F172A] font-bold">{brand.name}</span>
              <span className="text-[11px] text-[#64748B]">{brand.modelsCount} models</span>
            </button>
          ))}
        </div>
      </section>

      {/* Section 1: Latest Mobile Phones Grid */}
      <section className="mt-5 px-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="p-1 rounded bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">new_releases</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">
              {searchQuery ? `Search Results (${filteredPhones.length})` : 'Latest Mobile Phones'}
            </h2>
          </div>
          <span className="text-[11px] font-medium text-[#64748B]">
            Page {currentPage} of 79
          </span>
        </div>

        {/* 2-Column Product Feed */}
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
            <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">search_off</span>
            <p className="text-sm font-bold text-slate-800">No mobile phones found</p>
            <p className="text-xs text-slate-500 mt-0.5">Try searching for Samsung, Vivo, 50MP, or Under 40k</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('All');
              }}
              className="mt-3 px-4 py-1.5 bg-[#004ac6] text-white rounded-lg text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Mini Pagination Pills */}
        <div className="flex items-center justify-center gap-1.5 pt-2 pb-1">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold flex items-center justify-center shadow-xs transition-colors cursor-pointer ${
                currentPage === page
                  ? 'bg-[#004ac6] text-white'
                  : 'bg-white text-[#0F172A] hover:bg-[#eceef0] border border-slate-200'
              }`}
            >
              {page}
            </button>
          ))}
          <span className="text-[#64748B] text-xs px-1">...</span>
          <button
            onClick={() => setCurrentPage(79)}
            className="w-8 h-8 rounded-lg bg-white text-[#0F172A] text-xs font-semibold flex items-center justify-center shadow-xs hover:bg-[#eceef0] border border-slate-200 cursor-pointer"
          >
            79
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 79))}
            className="h-8 px-2.5 rounded-lg bg-white text-[#0F172A] text-xs font-semibold flex items-center justify-center shadow-xs hover:bg-[#eceef0] border border-slate-200 gap-0.5 cursor-pointer"
          >
            Next <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Section 2: Mobiles Under 40k (Curated Budget Segment) */}
      <section className="mt-5 px-4 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#059669]"></span>
              <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">Mobiles Under 40k</h2>
            </div>
            <p className="text-xs text-[#64748B]">Most popular budget champions in Pakistan</p>
          </div>
          <button
            onClick={() => {
              setSelectedBudgetFilter((prev) => (prev === 'under35k' ? 'all' : 'under35k'));
            }}
            className="px-2.5 py-1 rounded-full bg-[#dae2fd] text-[#131b2e] text-xs font-semibold flex items-center gap-0.5 cursor-pointer hover:bg-blue-100 transition-colors"
          >
            <span>{selectedBudgetFilter === 'under35k' ? 'Under 35k Active' : 'Filter'}</span>
            <span className="material-symbols-outlined text-[14px]">expand_more</span>
          </button>
        </div>

        {/* Horizontal Compact Budget Cards */}
        <div className="flex flex-col gap-2">
          {budgetUnder40kPhones.map((phone) => (
            <div
              key={phone.id}
              onClick={() => onViewSpecs(phone)}
              className="p-3 bg-white rounded-xl shadow-xs border border-slate-100 flex items-center justify-between gap-3 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-14 h-16 rounded-lg bg-[#f2f4f6] flex items-center justify-center p-1.5 shrink-0">
                  <img
                    src={phone.image}
                    alt={phone.name}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-semibold bg-[#eceef0] px-1.5 py-0.5 rounded text-[#64748B]">
                      {phone.brand}
                    </span>
                    <span className="text-[11px] text-[#059669] font-bold">
                      {phone.badge || 'Budget'}
                    </span>
                  </div>
                  <h3 className="text-sm text-[#0F172A] font-bold truncate mt-0.5">
                    {phone.name}
                  </h3>
                  <span className="text-xs text-[#64748B]">{phone.specsSummary}</span>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0">
                <span className="text-sm sm:text-base font-extrabold text-[#059669]">
                  {phone.priceDisplay}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewSpecs(phone);
                  }}
                  className="mt-1 px-2.5 py-1 bg-[#eceef0] hover:bg-[#004ac6] hover:text-white transition-colors text-[#0F172A] rounded-md text-xs font-semibold flex items-center gap-0.5 cursor-pointer"
                >
                  Specs
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Mid-Range & Flagship Spotlight (Mobiles Under 60k & Above 90k) */}
      <section className="mt-5 px-4 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#004ac6]"></span>
            <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">
              Mid-Range &amp; Flagship Picks
            </h2>
          </div>
          <span className="text-[11px] font-medium text-[#64748B]">Daily Updated</span>
        </div>

        {/* Bento-like Trio Cards */}
        <div className="grid grid-cols-1 gap-2.5">
          {bentoPhones.map((phone) => (
            <div
              key={phone.id}
              onClick={() => onViewSpecs(phone)}
              className="bg-white rounded-xl p-3.5 shadow-xs border border-slate-100 flex items-center justify-between gap-3 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-16 h-20 rounded-lg bg-[#f2f4f6] flex items-center justify-center p-1.5 shrink-0">
                  <img
                    src={phone.image}
                    alt={phone.name}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0">
                  <span className="px-2 py-0.5 rounded-full bg-[#dae2fd] text-[#131b2e] text-[11px] font-semibold inline-block">
                    {phone.badge || 'Featured'}
                  </span>
                  <h3 className="text-sm font-bold text-[#0F172A] mt-1 truncate">
                    {phone.name}
                  </h3>
                  <p className="text-xs text-[#64748B] line-clamp-1">{phone.specsSummary}</p>
                  <span className="text-[#059669] font-extrabold text-sm block mt-0.5">
                    {phone.priceDisplay} PKR
                  </span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewSpecs(phone);
                }}
                className="w-9 h-9 rounded-full bg-[#f2f4f6] hover:bg-[#004ac6] hover:text-white flex items-center justify-center text-[#0F172A] transition-colors shrink-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Verified Price Market Disclaimer & Store Locator Card */}
      <section className="mt-5 mb-4 px-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200/80 flex flex-col gap-3 relative overflow-hidden">
          {/* Decorative background accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#004ac6] via-[#059669] to-[#1E40AF]"></div>

          <div className="flex items-start gap-3 pt-1">
            <div className="w-10 h-10 rounded-xl bg-[#85f8c4] text-[#002114] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">verified_user</span>
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">
                Official Dealers &amp; Market Verification
              </h3>
              <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                Prices are refreshed daily based on official Pakistani brand distributors (Samsung, Xiaomi, Oppo, Vivo, Tecno) and Hafeez Centre, Hall Road, &amp; Saddar Karachi wholesale dealers.
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <button
              onClick={onOpenStoreLocator}
              className="w-full py-2.5 px-4 bg-[#004ac6] text-white rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 shadow-xs hover:bg-[#1E40AF] active:scale-98 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">near_me</span>
              Find Store Near You
            </button>
            <button
              onClick={() => onOpenReportDiscrepancy()}
              className="w-full py-2.5 px-4 bg-[#eceef0] text-[#0F172A] rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-[#e6e8ea] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">report</span>
              Report Price Discrepancy
            </button>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[#64748B] text-[11px] font-medium">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#059669]">sync</span>
              Updated 2 hours ago
            </span>
            <span className="font-mono text-slate-700">PKR / Tax Included</span>
          </div>
        </div>
      </section>
    </div>
  );
};
