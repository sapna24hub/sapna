import React from 'react';
import { Coffee, BookOpen, Heart, ArrowUp, Shield } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#231307] text-[#E8D7C3] pt-16 pb-12 border-t border-[#3D2512]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Literary Quote Banner */}
        <div className="text-center max-w-2xl mx-auto pb-12 border-b border-[#3D2512] space-y-2">
          <p className="font-serif text-lg sm:text-xl italic text-[#D7BA89] leading-relaxed">
            "A room without books is like a body without a soul."
          </p>
          <span className="text-xs uppercase tracking-widest text-[#8C5628] font-semibold">
            — Marcus Tullius Cicero
          </span>
        </div>

        {/* 4 Columns Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#5B3314] flex items-center justify-center text-white">
                <Coffee className="w-5 h-5 text-[#D7BA89]" />
              </div>
              <span className="font-serif text-xl font-bold text-white">
                Books &amp; Brews
              </span>
            </div>
            <p className="text-xs text-[#A68864] leading-relaxed">
              An independent bookstore and specialty coffee sanctuary established in 2018 in Historic Old Town. Where great stories meet slow, intentional living.
            </p>
            <div className="text-xs text-[#D7BA89]">
              <span>422 Paperbark Lane, Old Town</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#A68864]">
              <li><a href="#about" className="hover:text-[#D7BA89] transition-colors">Our Story &amp; Space</a></li>
              <li><a href="#menu" className="hover:text-[#D7BA89] transition-colors">Artisan Coffee &amp; Bakes</a></li>
              <li><a href="#pairing" className="hover:text-[#D7BA89] transition-colors">Book &amp; Brew Pairing</a></li>
              <li><a href="#testimonials" className="hover:text-[#D7BA89] transition-colors">Patron Reviews</a></li>
              <li><a href="#reservation" className="hover:text-[#D7BA89] transition-colors">Reserve a Reading Nook</a></li>
            </ul>
          </div>

          {/* Community & Events */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Literary Community
            </h4>
            <ul className="space-y-2 text-xs text-[#A68864]">
              <li><span>Thursday Night Fiction Club</span></li>
              <li><span>Tuesday Silent Reading Hour</span></li>
              <li><span>Local Author Saturday Signings</span></li>
              <li><span>Blind Date with a Book Bundles</span></li>
              <li><span>Community Book Exchange Shelf</span></li>
            </ul>
          </div>

          {/* Hours & Admin */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Hours &amp; Management
            </h4>
            <div className="space-y-1.5 text-xs text-[#A68864]">
              <p><strong className="text-white">Mon–Fri:</strong> 7:00 AM – 9:00 PM</p>
              <p><strong className="text-white">Sat–Sun:</strong> 8:00 AM – 10:00 PM</p>
            </div>
            <div className="pt-2">
              <a
                href="http://127.0.0.1:8000/admin/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#BA8748] hover:text-[#D7BA89] underline underline-offset-4"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Django Staff Admin Portal</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#3D2512] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7B5A34]">
          <p>© {new Date().getFullYear()} Books &amp; Brews Cafe LLC. All rights reserved. Brewed with love &amp; literature.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[#D7BA89] hover:text-white transition-colors py-1 px-3 rounded-lg bg-[#3D2512]"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
