import React, { useState } from 'react';
import { REVIEWS_DATA, UserReview } from '../data/reviews';
import { PHONES_DATA } from '../data/phones';

export const ReviewsScreen: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<UserReview[]>(REVIEWS_DATA);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPhoneFilter, setSelectedPhoneFilter] = useState('All');

  // Form states
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerCity, setReviewerCity] = useState('Lahore');
  const [phoneModel, setPhoneModel] = useState(PHONES_DATA[0].name);
  const [rating, setRating] = useState(5);
  const [headline, setHeadline] = useState('');
  const [comment, setComment] = useState('');
  const [gamingPerformance, setGamingPerformance] = useState('Smooth PUBG 60FPS');
  const [toastMessage, setToastMessage] = useState('');

  const handleLike = (id: string) => {
    setReviewsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    const newRev: UserReview = {
      id: `rev-${Date.now()}`,
      userName: reviewerName.trim() || 'Pakistani Buyer',
      userCity: reviewerCity,
      phoneModel,
      rating,
      date: 'Just now',
      verifiedBuyer: true,
      dealerBoughtFrom: `${reviewerCity} Local Dealer`,
      headline: headline.trim() || 'Great mobile phone experience',
      comment: comment.trim(),
      batteryLifeRating: 4.8,
      cameraRating: 4.7,
      gamingPerformance,
      likes: 1,
    };

    setReviewsList([newRev, ...reviewsList]);
    setShowAddForm(false);
    setHeadline('');
    setComment('');
    setToastMessage('Review submitted successfully! Thank you.');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const filteredReviews = selectedPhoneFilter === 'All'
    ? reviewsList
    : reviewsList.filter((r) => r.phoneModel.toLowerCase().includes(selectedPhoneFilter.toLowerCase()));

  return (
    <div className="flex flex-col w-full pb-8 px-4 pt-3 space-y-4">
      {/* Toast */}
      {toastMessage && (
        <div className="p-3 bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center justify-between shadow-lg">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage('')} className="text-white/80 hover:text-white">✕</button>
        </div>
      )}

      {/* Screen Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#F59E0B] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              rate_review
            </span>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Verified Buyer &amp; Expert Reviews
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real Pakistani user feedback on battery timing, gaming heating, and camera performance
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-[#004ac6] hover:bg-[#1E40AF] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">
            {showAddForm ? 'close' : 'edit_square'}
          </span>
          {showAddForm ? 'Cancel' : 'Write a Review'}
        </button>
      </div>

      {/* Review Form Drawer / Panel */}
      {showAddForm && (
        <form
          onSubmit={handleAddReview}
          className="bg-white rounded-2xl p-4 sm:p-5 shadow-md border border-blue-200 space-y-3 animate-in fade-in duration-200 text-xs"
        >
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#004ac6] text-[18px]">rate_review</span>
            Share Your Experience
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Your Name</label>
              <input
                type="text"
                required
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="e.g. Asad Mehmood"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 outline-none focus:border-[#004ac6]"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">City in Pakistan</label>
              <select
                value={reviewerCity}
                onChange={(e) => setReviewerCity(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 outline-none focus:border-[#004ac6]"
              >
                <option value="Lahore">Lahore</option>
                <option value="Karachi">Karachi</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Rawalpindi">Rawalpindi</option>
                <option value="Faisalabad">Faisalabad</option>
                <option value="Multan">Multan</option>
                <option value="Peshawar">Peshawar</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Mobile Phone Model</label>
              <select
                value={phoneModel}
                onChange={(e) => setPhoneModel(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 outline-none focus:border-[#004ac6]"
              >
                {PHONES_DATA.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} ({p.priceDisplay})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Rating</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 cursor-pointer text-amber-500"
                  >
                    <span
                      className="material-symbols-outlined text-2xl"
                      style={star <= rating ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      star
                    </span>
                  </button>
                ))}
                <span className="text-slate-600 font-bold ml-1">{rating} Stars</span>
              </div>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Gaming / Heating Performance</label>
              <input
                type="text"
                value={gamingPerformance}
                onChange={(e) => setGamingPerformance(e.target.value)}
                placeholder="e.g. PUBG 60FPS Smooth, Normal Heat"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 outline-none focus:border-[#004ac6]"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Review Headline</label>
            <input
              type="text"
              required
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. Best battery timing under 1 lac PKR!"
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 outline-none focus:border-[#004ac6]"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Full Detailed Review</label>
            <textarea
              rows={3}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How is daily battery life, low-light camera, display brightness under sunlight, and retail warranty service..."
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 outline-none focus:border-[#004ac6]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#004ac6] text-white font-bold rounded-lg cursor-pointer hover:bg-[#1E40AF]"
            >
              Post Verified Review
            </button>
          </div>
        </form>
      )}

      {/* Filter by Model */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Filter Model:</span>
        {['All', 'Vivo', 'Samsung', 'Xiaomi', 'Infinix', 'Honor'].map((m) => (
          <button
            key={m}
            onClick={() => setSelectedPhoneFilter(m)}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              selectedPhoneFilter === m
                ? 'bg-[#004ac6] text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Reviews Feed */}
      <div className="space-y-3">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="p-4 bg-white rounded-2xl shadow-xs border border-slate-200 space-y-2.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold text-slate-900">{rev.userName}</h3>
                  <span className="text-[11px] text-slate-500">{rev.userCity}</span>
                  {rev.verifiedBuyer && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]">verified</span>
                      Verified Buyer
                    </span>
                  )}
                </div>
                <div className="text-xs font-semibold text-[#004ac6] mt-0.5">
                  Device: {rev.phoneModel}
                </div>
              </div>

              <div className="flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[15px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                "{rev.headline}"
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {rev.comment}
              </p>
            </div>

            {/* Spec Scores Tag Strip */}
            <div className="flex flex-wrap gap-2 text-[11px] pt-1">
              <span className="px-2 py-0.5 bg-slate-50 border border-slate-100 rounded text-slate-600 flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-emerald-600">battery_saver</span>
                Battery: {rev.batteryLifeRating}/5
              </span>
              <span className="px-2 py-0.5 bg-slate-50 border border-slate-100 rounded text-slate-600 flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-blue-600">sports_esports</span>
                {rev.gamingPerformance}
              </span>
              <span className="px-2 py-0.5 bg-slate-50 border border-slate-100 rounded text-slate-500">
                Purchased at: {rev.dealerBoughtFrom}
              </span>
            </div>

            {/* Like count & helpfulness */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>{rev.date}</span>
              <button
                onClick={() => handleLike(rev.id)}
                className="flex items-center gap-1 text-slate-600 hover:text-[#004ac6] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">thumb_up</span>
                <span>Helpful ({rev.likes})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
