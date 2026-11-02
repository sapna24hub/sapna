import React from 'react';
import { Coffee, BookOpen, Clock, Award, Star, Compass, ChevronRight, Bookmark } from 'lucide-react';

export default function Hero({ onOpenReservation, onExploreMenu }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:py-20 lg:py-24">
      {/* Subtle background ambient glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#D7BA89]/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#BA8241]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Catchy Warm Literary Copy */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE0D0] border border-[#D5BE9B] text-[#5B3314] text-xs sm:text-sm font-medium shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#BA8241] animate-ping" />
              <Bookmark className="w-3.5 h-3.5 text-[#BA8748]" />
              <span>An Unhurried Literary Cafe &amp; Micro-Roastery</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#2B1607] leading-[1.15] tracking-tight">
              Where Stories Unfold &amp;{' '}
              <span className="relative inline-block text-[#8C5628] italic font-serif">
                Steaming Cups
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#D7BA89] opacity-60"
                  viewBox="0 0 200 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 5.5C40 2 120 1 199 5.5"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              Warm the Soul.
            </h1>

            {/* Subtitle / Paragraph */}
            <p className="text-lg sm:text-xl text-[#5A3D20] leading-relaxed max-w-2xl font-light">
              Step inside our warm, wood-scented sanctuary in Historic Old Town. Browse over{' '}
              <strong className="font-semibold text-[#3D2512]">2,800 curated paperbacks</strong>,
              savor single-origin artisan pour-overs, and find your favorite corner armchair by the fireplace.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <button
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-[#5B3314] text-[#FAF5EB] font-semibold hover:bg-[#3D2512] shadow-warm hover:shadow-warm-lg hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <Coffee className="w-5 h-5 text-[#D7BA89] group-hover:rotate-12 transition-transform" />
                <span>Explore Artisan Menu</span>
                <ChevronRight className="w-4 h-4 text-[#D7BA89] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenReservation}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#EAE0D0] text-[#3D2512] font-semibold border-2 border-[#CBB595] hover:bg-[#DFD1BD] hover:border-[#BA8748] transition-all duration-200 shadow-sm"
              >
                <BookOpen className="w-5 h-5 text-[#8C5628]" />
                <span>Reserve a Reading Table</span>
              </button>
            </div>

            {/* Cafe Highlights Bar */}
            <div className="pt-6 border-t border-[#E3D4C0] w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[#3D2512]">2,800+</span>
                <span className="text-xs text-[#7B5A34] uppercase tracking-wider font-medium">Curated Books</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[#3D2512]">100%</span>
                <span className="text-xs text-[#7B5A34] uppercase tracking-wider font-medium">Single Origin</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[#3D2512]">5:00 AM</span>
                <span className="text-xs text-[#7B5A34] uppercase tracking-wider font-medium">Fresh Bakes Daily</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[#3D2512]">4.9 ★</span>
                <span className="text-xs text-[#7B5A34] uppercase tracking-wider font-medium">Patron Rating</span>
              </div>
            </div>

          </div>

          {/* Right Column: Prominent Hero Image (Coffee Cup next to Open Book) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Wooden Frame & Soft Shadow Effect */}
              <div className="relative rounded-3xl p-3 bg-gradient-to-br from-[#E6D7BD] via-[#D5BE9B] to-[#9E7A50] shadow-warm-lg">
                
                {/* Hero Image Container */}
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] sm:aspect-[4/5] bg-[#3D2512]">
                  <img
                    src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1000&q=85"
                    alt="Steaming cup of artisanal latte next to an open book on a warm wooden cafe table"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                  />
                  
                  {/* Subtle warm gradient overlay to enhance cozy contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B1607]/80 via-transparent to-[#2B1607]/20 pointer-events-none" />

                  {/* Overlaid Literary Badge at bottom */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#FAF5EB]/95 backdrop-blur-md border border-[#D5BE9B] shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#8C5628] flex items-center justify-center text-white shrink-0">
                          <Coffee className="w-5 h-5 text-[#FAF5EB]" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-[#BA8241]">
                            Today's Featured Pairing
                          </p>
                          <h4 className="font-serif text-sm font-bold text-[#2B1607]">
                            Vanilla Cortado &amp; The Shadow of the Wind
                          </h4>
                        </div>
                      </div>
                      <span className="font-serif text-sm font-bold text-[#5B3314] bg-[#EFE3D0] px-2.5 py-1 rounded-md">
                        $4.75
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Floating Testimonial Pill (Top Right) */}
              <div className="absolute -top-5 -right-4 sm:-right-6 bg-[#FAF5EB] p-3 sm:p-3.5 rounded-2xl shadow-warm border border-[#D5BE9B] max-w-[210px] hidden sm:block animate-bounce [animation-duration:5s]">
                <div className="flex items-center gap-1.5 text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-[#5A3D20] italic font-serif">
                  "The coziest corner to read and write in all of Old Town."
                </p>
                <span className="text-[10px] font-semibold text-[#8C5628] block mt-1">
                  — Eleanor V., Author
                </span>
              </div>

              {/* Floating Live Roasting Badge (Bottom Left) */}
              <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-[#2B1607] text-[#FAF5EB] px-4 py-2.5 rounded-xl shadow-warm border border-[#5B3314] flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <div className="text-left">
                  <p className="text-[11px] font-medium text-[#D7BA89]">Fresh Batch Roasted</p>
                  <p className="text-xs font-bold">Ethiopian Yirgacheffe</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
