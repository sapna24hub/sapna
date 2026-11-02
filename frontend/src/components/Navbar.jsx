import React, { useState, useEffect } from 'react';
import { BookOpen, Coffee, Clock, ShoppingBag, Menu, X, Sparkles, MapPin, Phone } from 'lucide-react';

export default function Navbar({ trayItems, onOpenTray, onOpenReservation }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  // Check if cafe is currently open based on local time
  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      const day = now.getDay(); // 0 is Sunday, 6 is Saturday
      const isWeekend = day === 0 || day === 6;
      const openHour = isWeekend ? 8 : 7;
      const closeHour = isWeekend ? 22 : 21;
      setIsOpenNow(hour >= openHour && hour < closeHour);
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalTrayCount = trayItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-[#2E180B] text-[#E8D7C3] text-xs py-2 px-4 border-b border-[#4A2E1B] transition-all">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#D7BA89]">
              <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-amber-500'}`} />
              <strong className="font-medium">{isOpenNow ? 'We Are Open Today!' : 'Opens Tomorrow at 7:00 AM'}</strong>
            </span>
            <span className="hidden md:inline text-stone-500">•</span>
            <span className="hidden md:inline text-stone-300">Mon–Fri: 7 AM – 9 PM | Sat–Sun: 8 AM – 10 PM</span>
          </div>

          <div className="flex items-center gap-4 text-stone-300">
            <a href="tel:5553827397" className="flex items-center gap-1 hover:text-[#D7BA89] transition-colors">
              <Phone className="w-3 h-3 text-[#BA8748]" />
              <span>(555) 382-7397</span>
            </a>
            <span className="text-stone-600">|</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#BA8748]" />
              <span className="hidden sm:inline">422 Paperbark Lane, Old Town</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF5EB]/95 backdrop-blur-md shadow-warm py-3 border-b border-[#E3D4C0]'
            : 'bg-[#FAF5EB] py-4 border-b border-[#EFE3D0]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#5A3D20] via-[#3D2512] to-[#2B1607] flex items-center justify-center text-[#FAF5EB] shadow-md group-hover:scale-105 transition-transform duration-300">
                <Coffee className="w-5 h-5 text-[#D7BA89]" />
                <BookOpen className="w-3.5 h-3.5 text-[#EFE3D0] absolute -bottom-1 -right-1 bg-[#8C5628] rounded-md p-0.5 shadow-sm" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-2xl font-bold tracking-tight text-[#331D10] group-hover:text-[#8C5628] transition-colors">
                    Books &amp; Brews
                  </span>
                </div>
                <span className="text-[11px] font-medium uppercase tracking-widest text-[#8C5628]">
                  Literary Cafe &amp; Roastery
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-[#4A2E1B]">
              <a href="#about" className="hover:text-[#BA8748] transition-colors relative py-1">
                Our Story
              </a>
              <a href="#menu" className="hover:text-[#BA8748] transition-colors relative py-1">
                Artisan Menu
              </a>
              <a href="#pairing" className="hover:text-[#BA8748] transition-colors relative py-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#BA8748]" />
                <span>Pairing of the Month</span>
              </a>
              <a href="#testimonials" className="hover:text-[#BA8748] transition-colors relative py-1">
                Patron Reviews
              </a>
              <a href="#reservation" className="hover:text-[#BA8748] transition-colors relative py-1">
                Reserve a Table
              </a>
              <a href="#visit" className="hover:text-[#BA8748] transition-colors relative py-1">
                Visit Us
              </a>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Table Reservation Button */}
              <button
                onClick={onOpenReservation}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-[#5B3314] text-[#FAF5EB] hover:bg-[#3D2512] shadow-sm hover:shadow-warm transition-all duration-200"
              >
                <BookOpen className="w-4 h-4 text-[#D7BA89]" />
                <span>Book a Table</span>
              </button>

              {/* Order Tray Button */}
              <button
                onClick={onOpenTray}
                aria-label="View Order Tray"
                className="relative inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-[#EAE0D0] text-[#3D2512] hover:bg-[#DFD3C0] border border-[#D5BE9B] transition-all duration-200"
              >
                <ShoppingBag className="w-4 h-4 text-[#8C5628]" />
                <span className="hidden sm:inline">Tray</span>
                {totalTrayCount > 0 && (
                  <span className="w-5 h-5 flex items-center justify-center text-xs font-bold text-white bg-[#8C5628] rounded-full animate-bounce">
                    {totalTrayCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 lg:hidden text-[#4A2E1B] hover:text-[#BA8748] focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E3D4C0] bg-[#FAF5EB] px-4 pt-4 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col gap-3 font-medium text-[#4A2E1B]">
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-[#EFE3D0] transition-colors"
              >
                Our Story
              </a>
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-[#EFE3D0] transition-colors"
              >
                Artisan Menu
              </a>
              <a
                href="#pairing"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-[#EFE3D0] transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#BA8748]" />
                <span>Pairing of the Month</span>
              </a>
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-[#EFE3D0] transition-colors"
              >
                Patron Reviews
              </a>
              <a
                href="#reservation"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-[#EFE3D0] transition-colors"
              >
                Reserve a Table
              </a>
              <a
                href="#visit"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-[#EFE3D0] transition-colors"
              >
                Hours &amp; Location
              </a>

              <div className="pt-2 border-t border-[#E3D4C0]">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenReservation();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#5B3314] text-[#FAF5EB] font-semibold shadow-sm"
                >
                  <BookOpen className="w-4 h-4 text-[#D7BA89]" />
                  <span>Reserve a Table</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
