import React from 'react';
import { Coffee, Pizza, Heart, ArrowUp, Sparkles, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#231307] text-[#E8D7C3] pt-16 pb-12 border-t border-[#3D2512]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Literary / Foodie Quote Banner */}
        <div className="text-center max-w-2xl mx-auto pb-12 border-b border-[#3D2512] space-y-2">
          <p className="font-serif text-lg sm:text-xl italic text-[#D7BA89] leading-relaxed">
            "Good food is all the sweeter when shared with great friends."
          </p>
          <span className="text-xs uppercase tracking-widest text-[#8C5628] font-bold">
            — Freshly Baked Pizzas • Gourmet Burgers • Chilled Frappes
          </span>
        </div>

        {/* 4 Columns Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#5B3314] text-amber-300 flex items-center justify-center">
                <Coffee className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-bold text-white">
                Brew &amp; Bites Cafe
              </span>
            </div>
            <p className="text-xs text-[#A68864] leading-relaxed">
              Your favorite neighborhood hangout for stone-baked pizzas, smash burgers, grilled toasties, and ice-cold frappes made with pure passion.
            </p>
            <div className="text-xs text-[#D7BA89] flex items-center gap-1.5">
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
              <li><a href="#menu" className="hover:text-[#D7BA89] transition-colors">🍕 Wood-Fired Pizzas</a></li>
              <li><a href="#menu" className="hover:text-[#D7BA89] transition-colors">🍔 Gourmet Smash Burgers</a></li>
              <li><a href="#menu" className="hover:text-[#D7BA89] transition-colors">🧋 Chilled Cold Coffee &amp; Frappes</a></li>
              <li><a href="#menu" className="hover:text-[#D7BA89] transition-colors">🥪 Grilled Club Sandwiches</a></li>
              <li><a href="#menu" className="hover:text-[#D7BA89] transition-colors">🍟 Loaded Peri-Peri Fries</a></li>
            </ul>
          </div>

          {/* Table Bookings */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Dine-In &amp; Events
            </h4>
            <ul className="space-y-2 text-xs text-[#A68864]">
              <li><a href="#reservation" className="hover:text-[#D7BA89] transition-colors">Table Reservations</a></li>
              <li><a href="#reservation" className="hover:text-[#D7BA89] transition-colors">Birthday &amp; Party Bookings</a></li>
              <li><a href="#spotlight" className="hover:text-[#D7BA89] transition-colors">Value Combo Deals</a></li>
              <li><a href="#testimonials" className="hover:text-[#D7BA89] transition-colors">Customer Reviews</a></li>
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
                <span className="text-[#D7BA89] font-semibold">9:00 AM – 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday – Sunday:</span>
                <span className="text-[#D7BA89] font-semibold">9:00 AM – 11:30 PM</span>
              </div>
              <div className="pt-2 text-[11px] text-emerald-400 font-semibold">
                ✓ Dine-In, Takeaway &amp; Swiggy/Zomato Available
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 border-t border-[#3D2512] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7B5A34]">
          <p>© {new Date().getFullYear()} Brew &amp; Bites Cafe. All rights reserved.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#D7BA89] transition-colors text-xs font-semibold"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
