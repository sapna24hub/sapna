import React, { useState, useEffect } from 'react';
import { Star, Quote, Heart, Sparkles, Check, MessageSquare, X, Cat, Plus } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TestimonialSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Review submission form state
  const [formData, setFormData] = useState({
    author_name: '',
    author_role: 'Foodie Regular',
    rating: 5,
    comment: '',
    favorite_item: 'Paneer Makhani Cheese Burst Pizza',
  });

  const defaultReviews = [
    {
      id: 1,
      author_name: "Priya Sharma",
      author_role: "Cafe Enthusiast & Food Blogger",
      rating: 5,
      comment: "The Black Cat Cafe has the best aesthetic vibe in town! Their Paneer Makhani Cheese Burst Pizza is literally bursting with flavor, and the Signature Cold Brew is liquid gold.",
      favorite_item: "Paneer Makhani Pizza & Cold Brew",
      avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      date: "Yesterday"
    },
    {
      id: 2,
      author_name: "Rohan Mehta",
      author_role: "Software Engineer & Night Owl",
      rating: 5,
      comment: "Found my go-to work & chill spot. 300 Mbps WiFi, sleek moody dark aesthetic, and that Black Cat Charcoal Smash Burger with Peri-Peri Crinkle Fries is insane!",
      favorite_item: "Charcoal Smash Burger & Peri-Peri Fries",
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      date: "3 days ago"
    },
    {
      id: 3,
      author_name: "Tanya Kapoor",
      author_role: "Creative Director",
      rating: 5,
      comment: "The Hazelnut Iced Frappe and Bombay Masala Club Toastie are my weekend comfort ritual. Friendly staff, cozy music, and the aesthetic cat branding is super adorable.",
      favorite_item: "Hazelnut Iced Frappe & Club Toastie",
      avatar_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
      date: "1 week ago"
    },
    {
      id: 4,
      author_name: "Arjun Verma",
      author_role: "Coffee Aficionado",
      rating: 5,
      comment: "As someone particular about coffee extraction, their Italian Velvet Cappuccino and single origin espresso are brewed to absolute perfection with velvety micro-foam.",
      favorite_item: "Italian Velvet Cappuccino",
      avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      date: "2 weeks ago"
    },
    {
      id: 5,
      author_name: "Ananya & Kabir",
      author_role: "College Friends",
      rating: 5,
      comment: "Their combo deals are an absolute steal. ₹499 for a giant cheese burst pizza, cheesy crinkle fries, and two thick frappes is unmatched anywhere in the city!",
      favorite_item: "Midnight Hangout Feast Combo",
      avatar_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
      date: "3 weeks ago"
    },
    {
      id: 6,
      author_name: "Sameer Khan",
      author_role: "Gourmet Snack Lover",
      rating: 5,
      comment: "Loaded Cheesy Truffle Fries + Belgian Dark Chocolate Thickshake after college is pure bliss. Everything comes out blazing hot and fresh in under 30 minutes.",
      favorite_item: "Loaded Truffle Fries & Thickshake",
      avatar_url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
      date: "1 month ago"
    }
  ];

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('blackcat_user_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...parsed, ...defaultReviews];
      }
    } catch {
      // fallback
    }
    return defaultReviews;
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!formData.author_name.trim() || !formData.comment.trim()) return;

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    const newReview = {
      id: Date.now(),
      author_name: formData.author_name.trim(),
      author_role: formData.author_role.trim() || 'Verified Foodie',
      rating: formData.rating,
      comment: formData.comment.trim(),
      favorite_item: formData.favorite_item.trim(),
      date: "Just now",
      avatar_url: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(formData.author_name)}`
    };

    setReviews([newReview, ...reviews]);
    try {
      const saved = localStorage.getItem('blackcat_user_reviews');
      const existing = saved ? JSON.parse(saved) : [];
      localStorage.setItem('blackcat_user_reviews', JSON.stringify([newReview, ...existing]));
    } catch (err) {
      console.warn(err);
    }

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setModalOpen(false);
      setFormData({
        author_name: '',
        author_role: 'Foodie Regular',
        rating: 5,
        comment: '',
        favorite_item: 'Paneer Makhani Cheese Burst Pizza',
      });
    }, 1200);
  };

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-[#0A0A0A] border-t border-white/10 text-white relative overflow-hidden">
      
      {/* Background warm ambient glows */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181818] border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>5-Star Rated Experience • 2,500+ Happy Foodies</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Customer <span className="text-amber-500">Reviews</span> 🐾
            </h2>

            <p className="text-stone-400 text-sm sm:text-base font-normal leading-relaxed">
              Real reviews from pizza lovers, burger enthusiasts, and cold coffee addicts who make The Black Cat Cafe their second home.
            </p>
          </div>

          <div>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Leave a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#141414] rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-amber-500/40 shadow-xl hover:shadow-[0_12px_36px_rgba(245,158,11,0.1)] transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-7 h-7 text-white/10 group-hover:text-amber-500/30 transition-colors" />
                </div>

                {/* Review Text */}
                <p className="text-stone-300 text-sm leading-relaxed font-sans font-normal">
                  "{rev.comment}"
                </p>

                {/* Favorite Item Tag */}
                {rev.favorite_item && (
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#1F1F1F] text-amber-300 text-xs font-semibold border border-white/5">
                      <Cat className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-stone-400">Loved:</span>
                      <strong className="text-white truncate max-w-[170px]">{rev.favorite_item}</strong>
                    </span>
                  </div>
                )}

              </div>

              {/* Author & Date Footer */}
              <div className="flex items-center justify-between pt-5 mt-5 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
                    alt={rev.author_name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-amber-500/40 bg-black"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                      {rev.author_name}
                    </h4>
                    <p className="text-[11px] text-stone-400">
                      {rev.author_role || 'Verified Patron'}
                    </p>
                  </div>
                </div>

                {rev.date && (
                  <span className="text-[11px] text-stone-400 font-medium">
                    {rev.date}
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Leave a Review Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#141414] max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative text-white space-y-5">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-black text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Cat className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Leave a Review</h3>
                  <p className="text-xs text-stone-400">Tell us what you loved at The Black Cat Cafe!</p>
                </div>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="p-2 text-stone-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Success Feedback */}
            {submittedSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 animate-bounce">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-lg text-white">Thank You for Your Review! 🐾</h4>
                <p className="text-xs text-stone-300">Your feedback is live on our wall. See you soon at the cafe!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4 text-xs font-sans">
                
                {/* 5-Star Interactive Selector */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-stone-300 uppercase tracking-wider block">
                    Your Rating:
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, rating: star })}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 hover:scale-125 transition-transform"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= (hoverRating || formData.rating)
                              ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                              : 'text-stone-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 font-bold text-sm text-amber-400">
                      {hoverRating || formData.rating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* Name & Role Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-stone-300 uppercase tracking-wider">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sneh Sharma"
                      value={formData.author_name}
                      onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                      className="w-full bg-[#1C1C1E] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-stone-500 focus:border-amber-500/50 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-stone-300 uppercase tracking-wider">Your Title / Tag</label>
                    <input
                      type="text"
                      placeholder="e.g. Pizza Enthusiast / Regular"
                      value={formData.author_role}
                      onChange={(e) => setFormData({ ...formData, author_role: e.target.value })}
                      className="w-full bg-[#1C1C1E] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-stone-500 focus:border-amber-500/50 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Favorite Item */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-300 uppercase tracking-wider">Favorite Dish / Coffee *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Paneer Makhani Pizza, Cold Brew, Truffle Fries"
                    value={formData.favorite_item}
                    onChange={(e) => setFormData({ ...formData, favorite_item: e.target.value })}
                    className="w-full bg-[#1C1C1E] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-stone-500 focus:border-amber-500/50 focus:outline-none transition-all"
                  />
                </div>

                {/* Review Message */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-300 uppercase tracking-wider">Your Review *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell other foodies what made your experience purr-fect..."
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full bg-[#1C1C1E] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-stone-500 focus:border-amber-500/50 focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:scale-[1.01] active:scale-95 transition-all"
                >
                  Post Review Live 🐾
                </button>

              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
