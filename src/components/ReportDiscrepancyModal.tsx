import React, { useState, useEffect } from 'react';

interface ReportDiscrepancyModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledPhoneName?: string;
}

export const ReportDiscrepancyModal: React.FC<ReportDiscrepancyModalProps> = ({
  isOpen,
  onClose,
  prefilledPhoneName = '',
}) => {
  const [phoneName, setPhoneName] = useState(prefilledPhoneName);
  const [market, setMarket] = useState('Hafeez Centre, Lahore');
  const [observedPrice, setObservedPrice] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prefilledPhoneName) {
      setPhoneName(prefilledPhoneName);
    }
  }, [prefilledPhoneName]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-600 text-[22px]">report_problem</span>
            <h3 className="text-base font-bold text-slate-900">Report Price Discrepancy</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-14 h-14 bg-emerald-100 text-[#059669] rounded-full flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>
            <h4 className="text-base font-bold text-slate-900">Thank You! Report Received</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Our market verification team in {market} will verify this rate and update the portal within 2 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Mobile Phone Model
              </label>
              <input
                type="text"
                required
                value={phoneName}
                onChange={(e) => setPhoneName(e.target.value)}
                placeholder="e.g. Vivo V30e, Galaxy S27"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 outline-none focus:border-[#004ac6] focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Market Location
              </label>
              <select
                value={market}
                onChange={(e) => setMarket(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 outline-none focus:border-[#004ac6] focus:bg-white"
              >
                <option value="Hafeez Centre, Lahore">Hafeez Centre, Lahore</option>
                <option value="Hall Road, Lahore">Hall Road, Lahore</option>
                <option value="Saddar Star City, Karachi">Saddar Star City, Karachi</option>
                <option value="Blue Area, Islamabad">Blue Area, Islamabad</option>
                <option value="Singapore Plaza, Rawalpindi">Singapore Plaza, Rawalpindi</option>
                <option value="Katchery Bazaar, Faisalabad">Katchery Bazaar, Faisalabad</option>
                <option value="Deans Trade Center, Peshawar">Deans Trade Center, Peshawar</option>
                <option value="Online / Direct Brand Portal">Online / Direct Brand Portal</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Observed Market Price (PKR)
              </label>
              <input
                type="text"
                required
                value={observedPrice}
                onChange={(e) => setObservedPrice(e.target.value)}
                placeholder="e.g. Rs. 92,000"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 outline-none focus:border-[#004ac6] focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Shop Name / Additional Details (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Shop number, official warranty card included, or color variant..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 outline-none focus:border-[#004ac6] focus:bg-white"
              />
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 px-3 border border-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 px-3 bg-[#004ac6] hover:bg-[#1E40AF] text-white rounded-lg font-semibold cursor-pointer shadow-xs"
              >
                Submit Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
