import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Calendar, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Navigation, 
  HeartHandshake,
  Crown,
  HelpCircle
} from 'lucide-react';

export default function Hero({ 
  onExploreServices, 
  onOpenTracker, 
  onOpenQuiz, 
  onOpenBridalBuilder 
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/70 via-white to-[#FCF9F9] pt-8 pb-16 border-b border-rose-100/60">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-rose-300 filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-gold-200 filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Rohtak Local Hub Badge */}
        <div className="flex justify-center lg:justify-start mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-parlour-950 text-gold-300 text-[11px] sm:text-xs font-semibold tracking-wide border border-gold-400/30 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-gold-400 animate-bounce" />
            <span>Serving All Rohtak: Model Town • D-Park • Sectors 1-14 • Subhash Nagar</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline and Call-to-actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/90 text-parlour-700 text-xs font-semibold tracking-wide border border-rose-200 shadow-sm">
              <Sparkles className="w-4 h-4 text-parlour-600" />
              <span>Rohtak's Premier At-Home Beauty Parlour & Salon</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-[1.15]">
              Luxury Parlour & <span className="bg-gradient-to-r from-parlour-700 via-rose-600 to-gold-500 bg-clip-text text-transparent">Home Consultant</span> At Your Doorstep
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Experience the pampering of top Rohtak salons right in your living room. Certified female beauty consultants bring sterile single-use kits, skin therapy, hair spa, and bridal glam with live GPS tracking.
            </p>

            {/* Trust check bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 pb-1 text-sm text-gray-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Working 9:00 AM – 7:00 PM (Daily)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Live GPS Tracking to your Home</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Super Budget: Cleanups ₹299 | Facials ₹499</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>100% Sealed Monodose Kits</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-4 justify-center lg:justify-start">
              
              <button
                onClick={onExploreServices}
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-parlour-700 via-parlour-600 to-rose-600 hover:from-parlour-800 hover:to-rose-700 text-white font-semibold rounded-2xl shadow-lg shadow-rose-900/15 hover:shadow-xl transition-all flex items-center justify-center gap-2 group text-sm"
              >
                <span>Book Home Service</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Skin AI Quiz CTA */}
              <button
                onClick={onOpenQuiz}
                className="w-full sm:w-auto px-6 py-3.5 bg-rose-50 hover:bg-rose-100 text-parlour-900 font-bold rounded-2xl border border-rose-300 shadow-sm transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Sparkles className="w-4 h-4 text-parlour-600" />
                <span>2-Min Skin AI Quiz</span>
              </button>

              {/* Bridal Studio CTA */}
              <button
                onClick={onOpenBridalBuilder}
                className="w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-2xl border border-gray-200 shadow-sm transition-all flex items-center justify-center gap-1.5 text-sm"
              >
                <Crown className="w-4 h-4 text-gold-600" />
                <span>Bridal Studio</span>
              </button>

            </div>

            {/* Micro rating preview */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-xs text-gray-500">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-gray-800">4.95 / 5.0</span>
              <span>•</span>
              <span>2,400+ satisfied clients across Rohtak</span>
            </div>

          </div>

          {/* Right Column: Visual Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card with Image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl bg-white border border-rose-100 relative group">
                <div className="h-80 sm:h-96 w-full relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80" 
                    alt="Home Beauty Consultation in Rohtak"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent"></div>
                  
                  {/* Floating Top Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-md border border-white/40 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-xs font-bold text-gray-800">Rohtak Consultants On Duty</span>
                  </div>

                  {/* Card Bottom Details */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs uppercase tracking-wider text-gold-300 font-semibold">Rohtak Favourite At-Home Ritual</span>
                    <h3 className="font-serif text-xl font-bold">24K Gold Glow & Skin Barrier Repair</h3>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20 text-xs">
                      <span className="flex items-center gap-1 text-rose-200">
                        <Clock className="w-3.5 h-3.5" /> 60 mins at your home
                      </span>
                      <span className="text-gold-300 font-bold text-base">₹599 <s className="text-gray-400 text-xs font-normal">₹999</s></span>
                    </div>
                  </div>
                </div>

                {/* Floating Live Tracking Card */}
                <div className="p-4 bg-gradient-to-r from-rose-50 to-amber-50 border-t border-rose-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-400 shadow-sm">
                      <img 
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" 
                        alt="Consultant Pooja" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Pooja Sharma • Senior Consultant</h4>
                      <p className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Dispatched to Model Town (12 mins)
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={onOpenTracker}
                    className="text-xs font-bold text-parlour-700 hover:text-parlour-900 underline"
                  >
                    Track Live
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Feature Highlights Banner */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-rose-50 text-parlour-700 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">100% Hygienic</h4>
              <p className="text-xs text-gray-500">Sterile kits unsealed in front of you</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-gold-600 flex items-center justify-center flex-shrink-0">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Top Rohtak Experts</h4>
              <p className="text-xs text-gray-500">Certified female beauticians</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Navigation className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Live GPS Tracking</h4>
              <p className="text-xs text-gray-500">Real-time route & accurate ETA</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Bridal Studio</h4>
              <p className="text-xs text-gray-500">Custom packages & lehenga trials</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}