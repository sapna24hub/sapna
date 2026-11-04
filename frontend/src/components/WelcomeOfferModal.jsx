import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Tag, 
  Gift, 
  Phone, 
  User, 
  Mail, 
  CheckCircle2, 
  Cat, 
  ArrowRight,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { identifyVisitor, getUserProfile } from '../utils/visitorTracker';

export default function WelcomeOfferModal({ isOpen, onClose, onClaimSuccess }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const existing = getUserProfile();
    if (existing) {
      if (existing.name) setName(existing.name);
      if (existing.phone) setPhone(existing.phone);
      if (existing.email) setEmail(existing.email);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || trimmedName.length < 2) {
      setError('Please enter your full name (Apna naam likhein)');
      return;
    }
    if (!trimmedPhone || trimmedPhone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit mobile / WhatsApp number');
      return;
    }

    setError('');
    identifyVisitor({
      name: trimmedName,
      phone: trimmedPhone,
      email: email.trim()
    });

    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore
    }

    if (onClaimSuccess) {
      onClaimSuccess({ name: trimmedName, phone: trimmedPhone, code: 'BLACKCAT50' });
    }

    setTimeout(() => {
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-[#141414] border border-[#2E2E2E] rounded-3xl w-full max-w-md shadow-2xl overflow-hidden text-[#E8D7C3] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background */}
        <div className="absolute -top-20 -left-20 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[#202020] hover:bg-[#2A2A2A] text-stone-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-white">
                Welcome, {name}! 🐾
              </h3>
              <p className="text-xs text-stone-300">
                Aapka VIP Foodie Pass activate ho gaya hai.
              </p>
            </div>

            <div className="bg-[#1C1C1C] border border-amber-500/30 rounded-2xl p-4 text-center space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                Your Exclusive First-Order Coupon
              </span>
              <div className="text-2xl font-black text-amber-400 font-mono tracking-wider">
                BLACKCAT50
              </div>
              <p className="text-[11px] text-emerald-400 font-medium">
                ✓ Flat ₹50 OFF + Free Cheesy Garlic Bread!
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore Menu &amp; Order Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Form Screen */
          <div className="p-6 sm:p-7 space-y-5">
            
            {/* Header Badge */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-black text-amber-400 flex items-center justify-center border border-amber-500/30 shadow-inner">
                <Cat className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/25 px-2 py-0.5 rounded-full">
                  <Gift className="w-3 h-3" /> VIP Foodie Welcome Offer
                </span>
                <h3 className="font-serif text-xl font-black text-white tracking-tight mt-0.5">
                  The Black Cat Cafe 🐾
                </h3>
              </div>
            </div>

            {/* Offer Callout */}
            <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border border-amber-500/30 rounded-2xl p-3.5 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  Flat ₹50 OFF + Free Garlic Bread
                </span>
                <span className="font-mono bg-black/40 px-2 py-0.5 rounded text-[11px] text-amber-300 border border-amber-500/20">
                  BLACKCAT50
                </span>
              </div>
              <p className="text-[11px] text-stone-300 leading-relaxed">
                Apna Naam aur Phone number enter karein taaki hum aapke liye discount reserve kar sakein.
              </p>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              <div className="space-y-1 text-left">
                <label className="text-[11px] font-bold text-stone-300 block">
                  Aapka Naam (Full Name) <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aman Sharma / Priya Verma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-amber-500 text-white pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none transition-all placeholder:text-stone-600"
                  />
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[11px] font-bold text-stone-300 block">
                  Mobile / WhatsApp Number <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    maxLength={14}
                    placeholder="e.g. 98960 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-amber-500 text-white pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none transition-all placeholder:text-stone-600 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[11px] font-semibold text-stone-400 block">
                  Email Address <span className="text-stone-500 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="e.g. yourname@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-amber-500 text-white pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none transition-all placeholder:text-stone-600"
                  />
                </div>
              </div>

              {error && (
                <p className="text-rose-400 text-xs font-medium text-center">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold py-3 rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>🎁 Claim ₹50 OFF &amp; Garlic Bread</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full text-center text-[11px] text-stone-500 hover:text-stone-300 transition-colors pt-1"
              >
                Skip for now &amp; browse menu first →
              </button>

            </form>

          </div>
        )}

      </div>
    </div>
  );
}
