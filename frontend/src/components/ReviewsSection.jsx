import React, { useState } from 'react';
import { 
  Star, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles, 
  ThumbsUp, 
  Plus, 
  ShieldCheck, 
  X 
} from 'lucide-react';
import { api } from '../services/api';

export default function ReviewsSection({ reviews, onReviewAdded }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form state
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formService, setFormService] = useState('24K Gold Luxury Radiance Facial');
  const [formComment, setFormComment] = useState('');

  const filteredReviews = reviews.filter((r) => {
    if (selectedFilter === '5') return r.rating === 5;
    if (selectedFilter === '4') return r.rating === 4;
    return true;
  });

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) {
      setErrorMsg('Please enter your name and comments.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const newRev = await api.createReview({
        customer_name: formName,
        rating: formRating,
        service_name: formService,
        comment: formComment,
        avatar_url: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 100)}?auto=format&fit=crop&w=200&q=80`
      });

      onReviewAdded(newRev);
      setShowWriteModal(false);
      setFormName('');
      setFormComment('');
      setFormRating(5);
    } catch (err) {
      console.error(err);
      setErrorMsg('Could not submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-parlour-700 text-xs font-semibold uppercase tracking-wider border border-rose-200">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Customer Reviews & Ratings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
            Loved by 15,000+ Women Across Cities
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Read real feedback from verified customers who transformed their home into a luxury beauty sanctuary.
          </p>
        </div>

        {/* Rating Metrics Banner */}
        <div className="mt-12 bg-gradient-to-br from-rose-50 via-white to-amber-50/40 rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-4 text-center md:text-left space-y-2">
            <div className="flex items-baseline justify-center md:justify-start gap-3">
              <span className="text-5xl font-extrabold text-gray-900 font-serif">4.95</span>
              <span className="text-sm font-semibold text-gray-400">/ 5.0</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-gray-500">Based on 2,400+ verified at-home beauty consultations</p>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-white rounded-2xl border border-rose-100">
              <span className="text-gray-400 block font-medium">Hygiene & Safety</span>
              <span className="text-base font-bold text-gray-950">99.8% Perfect</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-rose-100">
              <span className="text-gray-400 block font-medium">Expertise & Skill</span>
              <span className="text-base font-bold text-gray-950">99.4% Rated</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-rose-100">
              <span className="text-gray-400 block font-medium">On-Time Arrival</span>
              <span className="text-base font-bold text-gray-950">98.9% Punctual</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-rose-100">
              <span className="text-gray-400 block font-medium">Politeness & Care</span>
              <span className="text-base font-bold text-gray-950">100% Recommended</span>
            </div>
          </div>

          <div className="md:col-span-3 text-center md:text-right">
            <button
              onClick={() => setShowWriteModal(true)}
              className="px-6 py-3.5 bg-parlour-700 hover:bg-parlour-800 text-white rounded-2xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mx-auto md:ml-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>

        </div>

        {/* Filter Pills */}
        <div className="mt-8 flex items-center gap-2 justify-center">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedFilter === 'all'
                ? 'bg-parlour-800 text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setSelectedFilter('5')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
              selectedFilter === '5'
                ? 'bg-parlour-800 text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>5 Stars</span> ★
          </button>
          <button
            onClick={() => setSelectedFilter('4')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
              selectedFilter === '4'
                ? 'bg-parlour-800 text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>4 Stars</span> ★
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                
                {/* Stars and verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {rev.is_verified && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> Verified Client
                    </span>
                  )}
                </div>

                {/* Comment quote */}
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed italic">
                  "{rev.comment}"
                </p>

                {/* Service Tag */}
                <div className="pt-1">
                  <span className="inline-block bg-rose-50 text-parlour-700 text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                    Service: {rev.service_name}
                  </span>
                </div>
              </div>

              {/* Author info */}
              <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-rose-200 overflow-hidden flex-shrink-0">
                  {rev.avatar_url ? (
                    <img src={rev.avatar_url} alt={rev.customer_name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-parlour-800 text-xs">
                      {rev.customer_name[0]}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{rev.customer_name}</h4>
                  <span className="text-[10px] text-gray-400">At-Home Consultation</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      {showWriteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-rose-100 animate-in fade-in">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-serif text-lg font-bold text-gray-900">Share Your Experience</h3>
                <p className="text-xs text-gray-500">Rate your at-home consultant and beauty session</p>
              </div>
              <button
                onClick={() => setShowWriteModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl">{errorMsg}</p>
            )}

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Shalini Mehta"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-parlour-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= formRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-gray-700 ml-2">{formRating} Stars</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Service Taken</label>
                <select
                  value={formService}
                  onChange={(e) => setFormService(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-parlour-500"
                >
                  <option value="24K Gold Luxury Radiance Facial">24K Gold Luxury Radiance Facial</option>
                  <option value="Moroccan Argan Oil Intensive Hair Spa">Moroccan Argan Oil Intensive Hair Spa</option>
                  <option value="HD Glam Party Makeover with Hairdo & Draping">HD Glam Party Makeover</option>
                  <option value="RICA White Chocolate Full Body Wax">RICA White Chocolate Wax</option>
                  <option value="Rose Petal & Himalayan Salt Spa Mani-Pedi">Rose Petal Spa Mani-Pedi</option>
                  <option value="Lavender & Walnut Full Body Polishing Spa">Full Body Polishing Spa</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Review</label>
                <textarea
                  rows={3}
                  placeholder="Describe your beautician's hygiene, friendliness, results..."
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-parlour-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-parlour-700 hover:bg-parlour-800 text-white font-bold rounded-xl text-xs shadow-md disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Post Verified Review'}
              </button>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
