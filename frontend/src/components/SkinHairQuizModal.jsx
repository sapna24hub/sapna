import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  HelpCircle, 
  ShoppingBag, 
  Crown,
  Heart,
  RotateCcw
} from 'lucide-react';

const QUIZ_QUESTIONS = [
  {
    id: 'concern',
    title: 'What is your primary beauty or grooming goal today?',
    subtitle: 'Select what you want our consultant to focus on during your visit.',
    options: [
      { id: 'bridal', label: 'Bridal & Pre-Wedding Radiance', desc: 'Flawless HD glow, de-tan, and smooth skin for my big day', icon: '👑' },
      { id: 'tan', label: 'Deep Tan Removal & Pigmentation', desc: 'Sun tan clearing, uneven tone, instant glass skin glow', icon: '✨' },
      { id: 'hair', label: 'Frizzy, Dry or Damaged Hair', desc: 'Deep nourishment, keratin shine & frizz control', icon: '💇‍♀️' },
      { id: 'acne', label: 'Oily Skin, Blackheads & Acne Pores', desc: 'Deep pore extraction, tea tree calming & oil balancing', icon: '🌿' },
      { id: 'grooming', label: 'Complete Full Body Pampering & Waxing', desc: 'RICA chocolate wax, threading, herbal manicure & pedicure', icon: '💅' }
    ]
  },
  {
    id: 'skin_type',
    title: 'How would you describe your skin / scalp type?',
    subtitle: 'This ensures we use 100% skin-compatible salon formulations.',
    options: [
      { id: 'dry', label: 'Dry & Sensitive (Flaky or tight)', desc: 'Needs rich hydration, gentle non-irritating botanicals', icon: '💧' },
      { id: 'oily', label: 'Oily & Blemish Prone', desc: 'Requires matte finishing, salicylic/tea tree detox', icon: '🍃' },
      { id: 'combination', label: 'Combination (Oily T-Zone, dry cheeks)', desc: 'Needs balanced pore treatment and targeted moisture', icon: '⚖️' },
      { id: 'normal', label: 'Normal & Dull / Tired looking', desc: 'Needs instant vitamin C brightening and revival massage', icon: '🌟' }
    ]
  },
  {
    id: 'event_timeline',
    title: 'When is your upcoming occasion or event in Rohtak?',
    subtitle: 'Helps us recommend treatments with the best skin recovery timeline.',
    options: [
      { id: 'urgent', label: 'Today or Tomorrow (Urgent Ready)', desc: 'Instant zero-downtime glow and quick grooming', icon: '⚡' },
      { id: 'weekend', label: 'This Weekend (in 2 to 4 days)', desc: 'Deep facial, hair spa therapy, and waxing', icon: '📅' },
      { id: 'wedding_month', label: 'Within Next 1–3 Months (Wedding Season)', desc: 'Bridal packages, keratin smoothening, multi-session preps', icon: '💍' },
      { id: 'maintenance', label: 'Regular Monthly Self-Care Routine', desc: 'Cleanups, hair spa, and relaxing home salon pampering', icon: '🧖‍♀️' }
    ]
  }
];

export default function SkinHairQuizModal({ 
  isOpen, 
  onClose, 
  onAddToCart, 
  onOpenCart, 
  onOpenBookingModal 
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    concern: '',
    skin_type: '',
    event_timeline: ''
  });
  const [showResult, setShowResult] = useState(false);

  if (!isOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (optId) => {
    const updated = { ...answers, [currentQ.id]: optId };
    setAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setAnswers({ concern: '', skin_type: '', event_timeline: '' });
    setCurrentStep(0);
    setShowResult(false);
  };

  // Generate Personalized Recommendations based on answers
  const getRecommendation = () => {
    if (answers.concern === 'bridal') {
      return {
        title: 'Rohtak Royal Bridal Glow & Prep Ritual',
        tagline: 'Tailored for Rohtak brides preparing for engagement, sangeet, or wedding day.',
        services: [
          { id: 'rec-1', name: 'O3+ Bridal Whitening & De-Tan Facial', price: 749, orig: 1299, dur: '65 mins' },
          { id: 'rec-2', name: 'Brazilian Keratin Hair Smoothening & Gloss', price: 1499, orig: 2499, dur: '90 mins' },
          { id: 'rec-3', name: 'RICA White Chocolate Full Body Wax', price: 699, orig: 1199, dur: '60 mins' }
        ],
        product: { id: 1, name: 'O3+ Bridal Glow Sheet Mask & Serum Kit', price: 349, orig: 499 },
        totalPrice: 2947,
        totalOrig: 5496,
        savings: 2549,
        whyNotes: [
          'O3+ de-tanning lifts pigmentation from sun exposure in Rohtak heat without peeling.',
          'Keratin smoothens hair cuticle to withstand heavy bridal jewelry & humidity.',
          'RICA wax is colophony-free and prevents post-wax redness on bridal skin.'
        ]
      };
    } else if (answers.concern === 'hair') {
      return {
        title: 'Intensive Salon Frizz-Control & Hair Revival Therapy',
        tagline: 'Deep cuticle sealing and hair shaft hydration directly at your home.',
        services: [
          { id: 'rec-4', name: 'L’Oréal Professional Moroccan Argan Hair Spa', price: 549, orig: 899, dur: '60 mins' },
          { id: 'rec-5', name: 'Keratin Deep Conditioning Mask Treatment', price: 399, orig: 699, dur: '45 mins' }
        ],
        product: { id: 4, name: 'L’Oréal Mythic Argan Hair Serum (100ml)', price: 499, orig: 650 },
        totalPrice: 1447,
        totalOrig: 2248,
        savings: 801,
        whyNotes: [
          'Moroccan argan oil nourishes brittle roots and split ends.',
          'Includes 15-minute scalp acupressure massage for blood circulation.',
          'Locks in high-shine gloss for up to 4 weeks.'
        ]
      };
    } else if (answers.concern === 'acne') {
      return {
        title: 'Anti-Acne Purifying & Pore Clearing Protocol',
        tagline: 'Non-comedogenic treatment to calm active inflammation and unclog sebum.',
        services: [
          { id: 'rec-6', name: 'Sara Anti-Acne Tea Tree Clarifying Facial', price: 499, orig: 799, dur: '50 mins' },
          { id: 'rec-7', name: 'Herbal Fruit Cleanup & Blackhead Extraction', price: 299, orig: 450, dur: '35 mins' }
        ],
        product: { id: 2, name: 'Plum Green Tea Salicylic Clarifying Night Gel', price: 349, orig: 450 },
        totalPrice: 1147,
        totalOrig: 1699,
        savings: 552,
        whyNotes: [
          'Tea tree extract destroys acne-causing bacteria gently.',
          'Sealed ultrasonic blackhead extraction prevents skin scarring.',
          'Salicylic gel prevents future breakouts.'
        ]
      };
    } else {
      // General tan / grooming default
      return {
        title: 'Instant Glass Skin & De-Tan Glow Therapy',
        tagline: 'Maximum glow with zero irritation. Perfect for instant occasion readiness.',
        services: [
          { id: 'rec-8', name: '24K Gold Luxury Radiance Facial', price: 599, orig: 999, dur: '60 mins' },
          { id: 'rec-9', name: 'Lotus Herbal Instaglow Cleanup + Tan Removal', price: 349, orig: 550, dur: '40 mins' }
        ],
        product: { id: 3, name: 'Kama Ayurveda Pure Rosewater Mist', price: 299, orig: 395 },
        totalPrice: 1247,
        totalOrig: 1944,
        savings: 697,
        whyNotes: [
          'Gold dust particles stimulate collagen and restore radiant vitality.',
          'Lotus herbals safely dissolve stubborn sun tanning without bleach.',
          'Pure steam and lymphatic drainage depuff your facial contours.'
        ]
      };
    }
  };

  const rec = getRecommendation();

  const handleAddAllToCart = () => {
    // Add services
    rec.services.forEach(s => {
      onAddToCart({
        id: s.id,
        name: `[AI Quiz Match] ${s.name}`,
        effective_price: s.price,
        duration_minutes: parseInt(s.dur) || 45,
        image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
        category_name: 'AI Personalized'
      }, 'service');
    });

    // Add recommended companion product
    if (rec.product) {
      onAddToCart({
        id: `ai-prod-${rec.product.id}`,
        name: `[AI Routine] ${rec.product.name}`,
        brand: 'Curated Expert Pick',
        effective_price: rec.product.price,
        image_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80'
      }, 'product');
    }

    onClose();
    setTimeout(() => {
      onOpenBookingModal();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-rose-100 overflow-hidden relative my-6">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-parlour-950 via-parlour-900 to-rose-950 text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-rose-200/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-gold-400/20 text-gold-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-gold-400/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-gold-300" />
              AI Skin & Hair Consultant
            </span>
            <span className="text-rose-200/80 text-xs">2-Minute Diagnostic</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            Find Your Custom Rohtak Salon Package
          </h2>
          <p className="text-rose-200/90 text-xs sm:text-sm mt-1">
            Answer 3 quick questions to receive a tailored salon regimen suited to your skin type & upcoming event.
          </p>

          {/* Progress Bar */}
          {!showResult && (
            <div className="mt-4 flex items-center gap-2">
              <div className="flex-1 bg-white/20 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gold-400 h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                ></div>
              </div>
              <span className="text-[11px] font-bold text-gold-300">
                Step {currentStep + 1} of {QUIZ_QUESTIONS.length}
              </span>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto">
          {!showResult ? (
            <div className="space-y-6">
              
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  {currentQ.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {currentQ.subtitle}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt) => {
                  const isSelected = answers[currentQ.id] === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-start gap-3.5 group ${
                        isSelected 
                          ? 'border-parlour-600 bg-rose-50/80 ring-2 ring-parlour-600/30' 
                          : 'border-gray-200 bg-white hover:border-parlour-300 hover:bg-rose-50/30'
                      }`}
                    >
                      <div className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                        {opt.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm text-gray-900">
                          {opt.label}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {opt.desc}
                        </p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isSelected ? 'border-parlour-600 bg-parlour-600 text-white' : 'border-gray-300'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Back navigation */}
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 font-semibold pt-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous Question
                </button>
              )}

            </div>
          ) : (
            /* Result Screen */
            <div className="space-y-6 animate-in fade-in">
              
              {/* Result Banner */}
              <div className="bg-gradient-to-br from-rose-50 via-white to-amber-50 p-5 rounded-3xl border border-rose-200/80 text-left space-y-2">
                <span className="text-[10px] uppercase font-bold text-parlour-700 bg-white px-2.5 py-0.5 rounded-full border border-rose-200 shadow-xs inline-block">
                  AI Prescribed Regimen
                </span>
                <h3 className="text-xl font-serif font-bold text-gray-900">
                  {rec.title}
                </h3>
                <p className="text-xs text-gray-600">
                  {rec.tagline}
                </p>
              </div>

              {/* Recommended Services Cards */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Recommended At-Home Services
                </h4>
                {rec.services.map((s) => (
                  <div key={s.id} className="bg-gray-50/80 p-3.5 rounded-2xl border border-gray-200 flex items-center justify-between gap-3">
                    <div>
                      <h5 className="font-bold text-xs sm:text-sm text-gray-900">{s.name}</h5>
                      <span className="text-[11px] text-gray-500">Duration: {s.dur}</span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="font-bold text-sm text-gray-900">₹{s.price}</span>
                      <s className="text-xs text-gray-400 block">₹{s.orig}</s>
                    </div>
                  </div>
                ))}

                {/* Companion Product */}
                {rec.product && (
                  <div className="bg-rose-50/70 p-3.5 rounded-2xl border border-rose-200 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold text-parlour-700 uppercase bg-white px-2 py-0.5 rounded-md border border-rose-200">
                        Recommended Post-Care Product
                      </span>
                      <h5 className="font-bold text-xs sm:text-sm text-gray-900 mt-1">{rec.product.name}</h5>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="font-bold text-sm text-parlour-700">₹{rec.product.price}</span>
                      <s className="text-xs text-gray-400 block">₹{rec.product.orig}</s>
                    </div>
                  </div>
                )}
              </div>

              {/* Why this matches you */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
                <h4 className="font-bold text-gray-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Why our Senior Consultant recommends this:
                </h4>
                <ul className="space-y-1.5 text-gray-600 pl-5 list-disc">
                  {rec.whyNotes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              </div>

              {/* Total Price & Booking CTA */}
              <div className="bg-parlour-950 text-white p-5 rounded-3xl space-y-4">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-xs text-rose-200">Bundle Package Total:</span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-2xl font-serif font-bold text-gold-300">
                        ₹{rec.totalPrice}
                      </span>
                      <s className="text-xs text-gray-400">₹{rec.totalOrig}</s>
                    </div>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs px-3 py-1 rounded-full font-bold">
                    Save ₹{rec.savings}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    onClick={handleAddAllToCart}
                    className="flex-1 py-3.5 bg-gradient-to-r from-rose-500 to-parlour-600 hover:from-rose-600 hover:to-parlour-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Package & Book Slot (9 AM - 7 PM)</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="px-4 py-3 bg-white/10 hover:bg-white/15 text-rose-200 rounded-2xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Retake
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}