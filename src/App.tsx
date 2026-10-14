/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { PHONES_DATA, PhoneSpec } from './data/phones';
import { Header } from './components/Header';
import { BottomNav, NavTab } from './components/BottomNav';
import { HomeScreen } from './screens/HomeScreen';
import { BrandsScreen } from './screens/BrandsScreen';
import { PriceFilterScreen } from './screens/PriceFilterScreen';
import { ReviewsScreen } from './screens/ReviewsScreen';
import { SavedScreen } from './screens/SavedScreen';
import { PhoneDetailModal } from './components/PhoneDetailModal';
import { CompareModal } from './components/CompareModal';
import { StoreLocatorModal } from './components/StoreLocatorModal';
import { ReportDiscrepancyModal } from './components/ReportDiscrepancyModal';
import { MenuDrawer } from './components/MenuDrawer';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [savedPhoneIds, setSavedPhoneIds] = useState<string[]>(['vivo-v30e', 'samsung-galaxy-s27']);
  const [compareList, setCompareList] = useState<PhoneSpec[]>([]);
  const [selectedPhoneForDetails, setSelectedPhoneForDetails] = useState<PhoneSpec | null>(null);
  
  // Modals
  const [storeLocatorOpen, setStoreLocatorOpen] = useState(false);
  const [reportDiscrepancyOpen, setReportDiscrepancyOpen] = useState(false);
  const [reportDiscrepancyPhone, setReportDiscrepancyPhone] = useState('');
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [selectedBrandName, setSelectedBrandName] = useState('Samsung');

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Toggle bookmark / saved
  const handleToggleSave = (phone: PhoneSpec) => {
    setSavedPhoneIds((prev) =>
      prev.includes(phone.id) ? prev.filter((id) => id !== phone.id) : [...prev, phone.id]
    );
  };

  // Toggle comparison
  const handleToggleCompare = (phone: PhoneSpec) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === phone.id);
      if (exists) {
        return prev.filter((p) => p.id !== phone.id);
      }
      if (prev.length >= 3) {
        // limit to 3 phones in compare tray
        return [...prev.slice(1), phone];
      }
      return [...prev, phone];
    });
  };

  const handleRemoveFromCompare = (phoneId: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== phoneId));
  };

  const handleClearCompare = () => {
    setCompareList([]);
    setCompareModalOpen(false);
  };

  const handleFocusSearch = () => {
    if (activeTab !== 'home') {
      setActiveTab('home');
      setTimeout(() => {
        searchInputRef.current?.focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      searchInputRef.current?.focus();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectBrand = (brandName: string) => {
    setSelectedBrandName(brandName);
    setActiveTab('brands');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenReportDiscrepancy = (phoneName?: string) => {
    setReportDiscrepancyPhone(phoneName || '');
    setReportDiscrepancyOpen(true);
  };

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen flex flex-col font-sans antialiased selection:bg-[#004ac6] selection:text-white">
      {/* Fixed Header */}
      <Header
        onOpenMenu={() => setMenuDrawerOpen(true)}
        onFocusSearch={handleFocusSearch}
        savedCount={savedPhoneIds.length}
        onOpenSaved={() => handleTabChange('saved-favorites')}
      />

      {/* Floating Compare Tray Indicator if devices are selected */}
      {compareList.length > 0 && !compareModalOpen && (
        <div className="fixed bottom-20 right-4 z-40 animate-in bounce-in duration-300">
          <button
            onClick={() => setCompareModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-[#004ac6] hover:bg-[#1E40AF] text-white rounded-full shadow-lg shadow-blue-900/20 active:scale-95 transition-all text-xs font-bold cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
            <span>Compare ({compareList.length})</span>
          </button>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 w-full max-w-7xl mx-auto pt-16 pb-20">
        {activeTab === 'home' && (
          <HomeScreen
            onViewSpecs={(phone) => setSelectedPhoneForDetails(phone)}
            savedPhoneIds={savedPhoneIds}
            onToggleSave={handleToggleSave}
            compareList={compareList}
            onToggleCompare={handleToggleCompare}
            onOpenStoreLocator={() => setStoreLocatorOpen(true)}
            onOpenReportDiscrepancy={handleOpenReportDiscrepancy}
            onSelectBrand={handleSelectBrand}
            onNavigateBrands={() => handleTabChange('brands')}
            searchRef={searchInputRef}
          />
        )}

        {activeTab === 'brands' && (
          <BrandsScreen
            initialBrand={selectedBrandName}
            onViewSpecs={(phone) => setSelectedPhoneForDetails(phone)}
            savedPhoneIds={savedPhoneIds}
            onToggleSave={handleToggleSave}
            compareList={compareList}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {activeTab === 'price-filter' && (
          <PriceFilterScreen
            onViewSpecs={(phone) => setSelectedPhoneForDetails(phone)}
            savedPhoneIds={savedPhoneIds}
            onToggleSave={handleToggleSave}
            compareList={compareList}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {activeTab === 'reviews' && <ReviewsScreen />}

        {activeTab === 'saved-favorites' && (
          <SavedScreen
            savedPhoneIds={savedPhoneIds}
            onToggleSave={handleToggleSave}
            onViewSpecs={(phone) => setSelectedPhoneForDetails(phone)}
            compareList={compareList}
            onToggleCompare={handleToggleCompare}
            onOpenCompareModal={() => setCompareModalOpen(true)}
            onNavigateHome={() => handleTabChange('home')}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={handleTabChange}
        savedCount={savedPhoneIds.length}
      />

      {/* Slide-out Menu Drawer */}
      <MenuDrawer
        isOpen={menuDrawerOpen}
        onClose={() => setMenuDrawerOpen(false)}
        onNavigateTab={handleTabChange}
        onOpenStoreLocator={() => setStoreLocatorOpen(true)}
        onSelectPriceFilter={(filter) => {
          handleTabChange('price-filter');
        }}
      />

      {/* Detailed Phone Specs Modal */}
      <PhoneDetailModal
        phone={selectedPhoneForDetails}
        onClose={() => setSelectedPhoneForDetails(null)}
        isSaved={selectedPhoneForDetails ? savedPhoneIds.includes(selectedPhoneForDetails.id) : false}
        onToggleSave={handleToggleSave}
        isComparing={selectedPhoneForDetails ? compareList.some((p) => p.id === selectedPhoneForDetails.id) : false}
        onToggleCompare={handleToggleCompare}
        onOpenStoreLocator={() => setStoreLocatorOpen(true)}
        onReportDiscrepancy={(name) => handleOpenReportDiscrepancy(name)}
      />

      {/* Compare Modal */}
      {compareModalOpen && (
        <CompareModal
          compareList={compareList}
          onRemoveFromCompare={handleRemoveFromCompare}
          onClearCompare={handleClearCompare}
          onClose={() => setCompareModalOpen(false)}
        />
      )}

      {/* Store Locator Modal */}
      <StoreLocatorModal
        isOpen={storeLocatorOpen}
        onClose={() => setStoreLocatorOpen(false)}
      />

      {/* Report Price Discrepancy Modal */}
      <ReportDiscrepancyModal
        isOpen={reportDiscrepancyOpen}
        onClose={() => setReportDiscrepancyOpen(false)}
        prefilledPhoneName={reportDiscrepancyPhone}
      />
    </div>
  );
}
