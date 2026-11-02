import { API_BASE } from '../apiConfig';
import React, { useState, useEffect } from 'react';
import { Star, Quote, Heart, BookOpen, Plus, Sparkles, Check, MessageSquare, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TestimonialSection() {
  const [reviews, setReviews] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Review submission form state
  const [formData, setFormData] = useState({
    author_name: '',
    author_role: '',
    rating: 5,
    comment: '',
    favorite_item: '',
    book_recommendation: '',
  });

  const defaultReviews = [
    {
      id: 1,
      author_name: "Eleanor Vance",
      author_role: "Historical Fiction Novelist",
      rating: 5,
      comment: "Books & Brews is pure magic. I drafted three entire chapters of my latest novel sitting in their window nook sipping the Smoked Honey Latte. The gentle jazz, the scent of vintage paperbacks, and the friendly baristas make it an irreplaceable second home.",
      favorite_item: "Sherlock's Smoked Honey Latte",
      book_recommendation: "'The Shadow of the Wind' by Carlos Ruiz Zafón",
      avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 2,
      author_name: "Marcus Vance-Lin",
      author_role: "Architecture Student & Sketcher",
      rating: 5,
      comment: "The architectural warmth of this place is extraordinary. Between the exposed brick, floor-to-ceiling bookshelves, and the smell of roasting beans, there's no better spot to study or sketch. And that Almond Croissant is legitimately world class.",
      favorite_item: "Proust's Golden Almond Croissant",
      book_recommendation: "'Invisible Cities' by Italo Calvino",
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 3,
      author_name: "Sofia Rodriguez",
      author_role: "Old Town Book Club Moderator",
      rating: 5,
      comment: "Our book club has gathered at the wooden community table every alternate Thursday for two years now. The staff always reserves our spot and has our Chemex pots ready. It feels like an extension of our own living room.",
      favorite_item: "Jane Austen's Earl Grey Cream",
      book_recommendation: "'A Gentleman in Moscow' by Amor Towles",
      avatar_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 4,
      author_name: "Dr. Julian Croft",
      author_role: "Philosophy Professor",
      rating: 5,
      comment: "In a world moving too quickly, Books & Brews is a deliberate refuge for slow contemplation. The 'Blind Date with a Book' bundle introduced me to a Japanese mystery novel I never would have picked up otherwise.",
      favorite_item: "Blind Date with a Book & Brew",
      book_recommendation: "'Before the Coffee Gets Cold' by Toshikazu Kawaguchi",
      avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 5,
      author_name: "Maya & Dev Patel",
      author_role: "Weekend Regulars",
      rating: 5,
      comment: "Sunday morning ritual: arrive at 8:30 AM, grab two velvet tomato bisques with avocado tartine, browse the new arrivals bookshelf, and enjoy uninterrupted quiet reading. The peaceful energy here resets our entire week.",
      favorite_item: "The Hobbit's Avocado Tartine",
      book_recommendation: "'The Midnight Library' by Matt Haig",
      avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    }
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${API_BASE}/reviews/?featured=true`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setReviews(data);
            return;
          }
        }
        setReviews(defaultReviews);
      } catch (e) {
        setReviews(defaultReviews);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const avatarList = [
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80"
      ];
      const randomAvatar = avatarList[Math.floor(Math.random() * avatarList.length)];

      const payload = {
        ...formData,
        avatar_url: randomAvatar
      };

      const res = await fetch(`${API_BASE}/reviews/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const newReview = await res.json();
        setReviews([newReview.data || payload, ...reviews]);
      } else {
        setReviews([payload, ...reviews]);
      }

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });

      setSubmittedSuccess(true);
      setTimeout(() => {
        setSubmittedSuccess(false);
        setModalOpen(false);
        setFormData({
          author_name: '',
          author_role: '',
          rating: 5,
          comment: '',
          favorite_item: '',
          book_recommendation: '',
        });
      }, 1500);

    } catch (err) {
      console.warn('Error saving review to API:', err);
      setReviews([{ ...formData, avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" }, ...reviews]);
      setSubmittedSuccess(true);
      setTimeout(() => {
        setSubmittedSuccess(false);
        setModalOpen(false);
      }, 1500);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-[#F5EEDB]/60 border-t border-[#E3D4C0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAE0D0] text-[#7B5A34] text-xs font-semibold uppercase tracking-wider">
              <Quote className="w-3.5 h-3.5" />
              <span>Patron Stories &amp; Memories</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B1607]">
              Loved by Writers, Readers &amp; Wanderers
            </h2>
            <p className="text-[#5A3D20] text-sm sm:text-base font-light">
              See what our regulars cherish most about our reading nooks, artisan pour-overs, and welcoming community.
            </p>
          </div>

          <div>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#5B3314] text-[#FAF5EB] text-sm font-semibold hover:bg-[#3D2512] shadow-sm hover:shadow-warm transition-all"
            >
              <Plus className="w-4 h-4 text-[#D7BA89]" />
              <span>Leave a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={rev.id || idx}
              className="bg-[#FFFDF9] rounded-2xl p-6 sm:p-7 border border-[#E3D4C0] hover:border-[#BA8748] shadow-sm hover:shadow-warm transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Top: Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-7 h-7 text-[#D5BE9B] opacity-60" />
                </div>

                {/* Review Text */}
                <p className="text-[#3D2512] text-sm leading-relaxed italic font-serif">
                  "{rev.comment}"
                </p>

                {/* Favorite Item & Book Rec badges */}
                <div className="space-y-1.5 pt-1">
                  {rev.favorite_item && (
                    <div className="text-xs text-[#7B5A34] flex items-center gap-1.5">
                      <span className="font-semibold text-[#8C5628]">Favorite Brew:</span>
                      <span className="truncate">{rev.favorite_item}</span>
                    </div>
                  )}

                  {rev.book_recommendation && (
                    <div className="text-xs text-[#7B5A34] flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#BA8748] shrink-0" />
                      <span className="font-semibold text-[#8C5628]">Recommended Book:</span>
                      <span className="truncate font-serif italic">{rev.book_recommendation}</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-5 mt-4 border-t border-[#F2E8D7]">
                <img
                  src={rev.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
                  alt={rev.author_name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#D7BA89]"
                />
                <div className="truncate">
                  <h4 className="font-serif font-bold text-sm text-[#2B1607] truncate">
                    {rev.author_name}
                  </h4>
                  <p className="text-xs text-[#8C5628] truncate">
                    {rev.author_role || 'Patron'}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Review Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF5EB] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#D5BE9B] shadow-2xl relative">
            
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-500 hover:text-stone-800 hover:bg-[#EFE3D0]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#BA8241]">Community Guestbook</span>
              <h3 className="font-serif text-2xl font-bold text-[#2B1607]">Share Your Books &amp; Brews Experience</h3>
              <p className="text-xs text-[#5A3D20]">Tell other readers about your favorite drink and book pairing.</p>
            </div>

            {submittedSuccess ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#2B1607]">Thank You, Kind Reader!</h4>
                <p className="text-xs text-[#5A3D20]">Your review has been saved to our guestbook archive.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3D2512] mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.author_name}
                    onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#D5BE9B] text-[#3D2512] focus:outline-none focus:ring-2 focus:ring-[#8C5628]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#3D2512] mb-1">Who are you? (Role)</label>
                    <input
                      type="text"
                      value={formData.author_role}
                      onChange={(e) => setFormData({ ...formData, author_role: e.target.value })}
                      placeholder="e.g. Mystery Writer / Student"
                      className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#D5BE9B] text-[#3D2512] focus:outline-none focus:ring-2 focus:ring-[#8C5628]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3D2512] mb-1">Star Rating</label>
                    <select
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#D5BE9B] text-[#3D2512] focus:outline-none focus:ring-2 focus:ring-[#8C5628]"
                    >
                      <option value={5}>★★★★★ (5 Stars - Extraordinary)</option>
                      <option value={4}>★★★★☆ (4 Stars - Wonderful)</option>
                      <option value={3}>★★★☆☆ (3 Stars - Good)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D2512] mb-1">Your Story &amp; Review *</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    placeholder="Describe the atmosphere, coffee flavor, and how it felt reading here..."
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#D5BE9B] text-[#3D2512] focus:outline-none focus:ring-2 focus:ring-[#8C5628]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#3D2512] mb-1">Favorite Drink or Treat</label>
                    <input
                      type="text"
                      value={formData.favorite_item}
                      onChange={(e) => setFormData({ ...formData, favorite_item: e.target.value })}
                      placeholder="e.g. Smoked Honey Latte"
                      className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#D5BE9B] text-[#3D2512] focus:outline-none focus:ring-2 focus:ring-[#8C5628]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3D2512] mb-1">Recommended Book</label>
                    <input
                      type="text"
                      value={formData.book_recommendation}
                      onChange={(e) => setFormData({ ...formData, book_recommendation: e.target.value })}
                      placeholder="e.g. The Shadow of the Wind"
                      className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#D5BE9B] text-[#3D2512] focus:outline-none focus:ring-2 focus:ring-[#8C5628]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-full bg-[#5B3314] text-[#FAF5EB] font-semibold hover:bg-[#3D2512] transition-colors shadow-warm text-sm"
                  >
                    {submitting ? 'Submitting to Guestbook...' : 'Post Your Review'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
