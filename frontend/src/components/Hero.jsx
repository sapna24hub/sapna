import React from 'react';
import { 
  Cat,
  Coffee, 
  Pizza, 
  Clock, 
  Star, 
  ChevronRight, 
  Sparkles, 
  Flame, 
  Utensils 
} from 'lucide-react';

export default function Hero({ onExploreCombos, onExploreMenu }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:py-20 lg:py-24 bg-gradient-to-b from-[#F5EDE1] via-[#FAF6EE] to-[#FCF8F2]">
      {/* Background ambient warm glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#D7BA89]/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#BA8241]/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181818] border border-amber-600/30 text-amber-300 text-xs sm:text-sm font-bold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
              <Cat className="w-4 h-4 text-amber-400" />
              <span>The Black Cat Cafe • Dine-in, Takeaway &amp; Delivery 🐾</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#181818] leading-[1.15] tracking-tight">
              Hot Cheesy Pizzas,{' '}
              <span className="relative inline-block text-amber-800 italic font-serif">
                Juicy Burgers
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#D7BA89] opacity-70"
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
              &amp; Chilled Cold Coffee.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#5A3D20] leading-relaxed max-w-2xl font-normal">
              Step into <strong>The Black Cat Cafe</strong>! Dig into <strong>wood-fired hand-tossed pizzas</strong>,
              crispy smash burgers, grilled club sandwiches, and ice-cold frappes made fresh to order in a cozy aesthetic ambiance.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <button
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#181818] text-white font-bold hover:bg-stone-900 shadow-lg hover:-translate-y-0.5 transition-all duration-200 group text-sm sm:text-base border border-amber-500/20"
              >
                <Pizza className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
                <span>Explore Full Menu &amp; Order</span>
                <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCombos}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white text-[#181818] font-bold border-2 border-[#CBB595] hover:bg-[#F2E8DC] transition-all duration-200 shadow-sm text-sm sm:text-base group"
              >
                <Sparkles className="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Cat Special Combos</span>
              </button>
            </div>

            {/* Cafe Highlights Bar */}
            <div className="pt-6 border-t border-[#E3D4C0] w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[#181818]">100%</span>
                <span className="text-[11px] text-[#7B5A34] uppercase tracking-wider font-bold">Fresh Daily Dough</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[#181818]">₹99+</span>
                <span className="text-[11px] text-[#7B5A34] uppercase tracking-wider font-bold">Budget Friendly</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[#181818]">15 Mins</span>
                <span className="text-[11px] text-[#7B5A34] uppercase tracking-wider font-bold">Fast Kitchen Prep</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[#181818] flex items-center gap-1">
                  4.9 <Star className="w-4 h-4 fill-amber-500 text-amber-500 inline" />
                </span>
                <span className="text-[11px] text-[#7B5A34] uppercase tracking-wider font-bold">2,500+ Cat Cafe Fans</span>
              </div>
            </div>

          </div>

          {/* Right Column: Food Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="relative rounded-3xl p-3 bg-gradient-to-br from-[#1A1A1A] via-[#332214] to-[#BA8241] shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[1/1] bg-stone-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80"
                    alt="Cheesy Hand Tossed Pizza and Cold Coffee at Black Cat Cafe"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Top floating pill */}
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-md flex items-center gap-2 border border-amber-500/30">
                    <Cat className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-amber-200">The Black Cat Kitchen</span>
                  </div>

                  {/* Bottom badge overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs uppercase tracking-wider text-amber-300 font-bold">Chef's Bestseller Special</span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold">Paneer Makhani Cheese Burst Pizza</h3>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20 text-xs">
                      <span className="text-amber-200 font-semibold">100% Pure Mozzarella</span>
                      <span className="text-amber-300 font-bold text-lg">₹279</span>
                    </div>
                  </div>
                </div>

                {/* Floating Bottom Card: Cold Coffee callout */}
                <div className="mt-3 bg-black/90 backdrop-blur-md p-3.5 rounded-2xl shadow-md border border-amber-600/30 flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=150&q=80"
                      alt="Cold Coffee"
                      className="w-12 h-12 rounded-xl object-cover border border-amber-400/50"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">Classic Creamy Frappe</h4>
                      <p className="text-[11px] text-amber-300/80">Cold, Frothy &amp; Chocolate-dusted</p>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold text-amber-400">₹129</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
