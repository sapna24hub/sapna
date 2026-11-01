import React, { useState } from 'react';
import { 
  Instagram, 
  Youtube, 
  Facebook, 
  PhoneCall, 
  Sparkles, 
  Heart, 
  MessageCircle, 
  Send, 
  Check, 
  Share2 
} from 'lucide-react';

const INSTAGRAM_POSTS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
    title: 'Bridal HD Glam at Home for Sneha 💍',
    likes: '1.4k',
    comments: '84',
    tag: '#BridalGlow'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
    title: '24K Gold Facial Transformation ✨',
    likes: '940',
    comments: '52',
    tag: '#SkinRadiance'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80',
    title: 'Silky Moroccan Hair Spa Ritual 💆‍♀️',
    likes: '2.1k',
    comments: '118',
    tag: '#HairCareAtHome'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80',
    title: 'Rose Petal Spa Mani-Pedi Session 🌹',
    likes: '820',
    comments: '39',
    tag: '#NailArt'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    title: 'Festive Sangeet Look Consultation ✨',
    likes: '1.8k',
    comments: '96',
    tag: '#FestiveGlam'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    title: 'Lavender Body Polish & Relaxation 💜',
    likes: '1.1k',
    comments: '44',
    tag: '#SelfCareSunday'
  }
];

export default function SocialHub() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section id="social" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-parlour-700 text-xs font-semibold uppercase tracking-wider border border-rose-200">
            <Instagram className="w-3.5 h-3.5" />
            <span>Social Media & Makeover Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
            Follow Our Beauty Journey @GlowAuraSalon
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            See real at-home transformations, makeup tutorials, skincare secrets, and client stories updated daily on our Instagram & YouTube.
          </p>

          {/* Social Links Bar */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-xl shadow-sm hover:opacity-95 transition-opacity"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram (45k followers)</span>
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-rose-700 transition-colors"
            >
              <Youtube className="w-4 h-4" />
              <span>YouTube Tutorials</span>
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-blue-700 transition-colors"
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook Community</span>
            </a>
          </div>
        </div>

        {/* Instagram Visual Gallery Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative rounded-2xl overflow-hidden aspect-square shadow-sm hover:shadow-lg transition-all"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Overlay with Likes and Comments */}
              <div className="absolute inset-0 bg-gradient-to-t from-parlour-950/85 via-parlour-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-white">
                <span className="text-[10px] font-bold text-gold-300">{post.tag}</span>
                <p className="text-[11px] font-bold line-clamp-2 leading-tight">{post.title}</p>
                <div className="flex items-center gap-3 mt-1.5 text-[10px] font-semibold text-rose-200">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-rose-400 text-rose-400" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" /> {post.comments}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Direct WhatsApp Consultation Banner */}
        <div className="mt-14 bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Instant Beauty Expert Advice
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold">
              Unsure which facial or hair package is right for you?
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-xl">
              Chat directly with our Senior Aesthetician on WhatsApp. Send a photo or describe your skin concerns for a customized beauty recommendation.
            </p>
          </div>

          <a
            href="https://wa.me/919876543210?text=Hi%20GlowAura!%20I%20need%20expert%20skin%20and%20hair%20consultation%20for%20home%20service."
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 bg-white hover:bg-emerald-50 text-emerald-800 font-extrabold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 flex-shrink-0"
          >
            <PhoneCall className="w-5 h-5 text-emerald-600" />
            <span>Chat on WhatsApp Now</span>
          </a>
        </div>

        {/* VIP Skincare Advice Newsletter Subscription */}
        <div className="mt-12 bg-rose-50/60 rounded-3xl p-6 sm:p-8 border border-rose-100 text-center max-w-2xl mx-auto space-y-4">
          <Sparkles className="w-6 h-6 text-parlour-600 mx-auto" />
          <h4 className="font-serif text-xl font-bold text-gray-900">
            Join 20,000+ Beauty Club Members
          </h4>
          <p className="text-xs text-gray-600">
            Get exclusive weekly skin wellness routines, secret festival discount codes, and bridal countdown checklists.
          </p>

          {subscribed ? (
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
              <Check className="w-4 h-4" /> Welcome to the GlowAura VIP Beauty Circle! Check your inbox.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-parlour-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-parlour-800 text-white rounded-xl text-xs font-bold hover:bg-parlour-900 shadow-sm"
              >
                Join Free
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
