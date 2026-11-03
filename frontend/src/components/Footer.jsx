import React from 'react';
import { Cat, Coffee, Pizza, Heart, ArrowUp, Sparkles, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121212] text-[#E8D7C3] pt-16 pb-12 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Quote Banner */}
        <div className="text-center max-w-2xl mx-auto pb-12 border-b border-[#262626] space-y-2">
          <p className="font-serif text-lg sm:text-xl italic text-amber-300 leading-relaxed">
            "Warm coffee, crispy artisan pizzas, and the cozy aesthetic comfort of The Black Cat."
          </p>
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
            — The Black Cat Cafe • Handcrafted with Passion 🐾
          </span>
        </div>

        {/* 4 Columns Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-black text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Cat className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-bold text-white">
                The Black Cat Cafe 🐾
              </span>
            </div>
            <p className="text-xs text-[#A68864] leading-relaxed">
              Your favorite aesthetic hangout for stone-baked pizzas, smash burgers, grilled toasties, and ice-cold frappes made with pure passion.
            </p>
            <div className="text-xs text-amber-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>422 Paperbark Lane, Model Town</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Cafe Menu
            </h4>
            <ul className="space-y-2 text-xs text-[#A68864]">
              <li><a href="#menu" className="hover:text-amber-300 transition-colors">🍕 Wood-Fired Pizzas</a></li>
              <li><a href="#menu" className="hover:text-amber-300 transition-colors">🍔 Gourmet Smash Burgers</a></li>
              <li><a href="#menu" className="hover:text-amber-300 transition-colors">🧋 Chilled Cold Coffee &amp; Frappes</a></li>
              <li><a href="#menu" className="hover:text-amber-300 transition-colors">🥪 Grilled Club Sandwiches</a></li>
              <li><a href="#menu" className="hover:text-amber-300 transition-colors">🍟 Loaded Peri-Peri Fries</a></li>
            </ul>
          </div>

          {/* Highlights & Specials */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Specials &amp; Offers
            </h4>
            <ul className="space-y-2 text-xs text-[#A68864]">
              <li><a href="#spotlight" className="hover:text-amber-300 transition-colors">🔥 Black Cat Combos</a></li>
              <li><a href="#menu" className="hover:text-amber-300 transition-colors">⚡ Fast Kitchen Orders</a></li>
              <li><a href="#testimonials" className="hover:text-amber-300 transition-colors">⭐ Customer Reviews</a></li>
              <li><a href="#contact" className="hover:text-amber-300 transition-colors">📍 Location &amp; Directions</a></li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Opening Hours
            </h4>
            <div className="space-y-1.5 text-xs text-[#A68864]">
              <div className="flex justify-between">
                <span>Monday – Friday:</span>
                <span className="text-amber-300 font-semibold">9:00 AM – 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday – Sunday:</span>
                <span className="text-amber-300 font-semibold">9:00 AM – 11:30 PM</span>
              </div>
              <div className="pt-2 text-[11px] text-emerald-400 font-semibold">
                ✓ Dine-In, Takeaway &amp; Online Orders Available
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} The Black Cat Cafe. All rights reserved.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors text-xs font-semibold"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
