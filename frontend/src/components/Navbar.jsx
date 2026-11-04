import React, { useState, useEffect } from 'react';
import { 
  Cat,
  Coffee, 
  Pizza, 
  Clock, 
  ShoppingBag, 
  Menu, 
  X, 
  Sparkles, 
  MapPin, 
  Phone,
  ShieldCheck
} from 'lucide-react';
import { GoogleGIcon } from './GoogleLoginModal';
import { getSavedGoogleUser } from '../utils/googleAuth';

export default function Navbar({ trayItems = [], onOpenTray, onOpenAdmin, onOpenOffer, onOpenGoogleLogin }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);
  const [googleUser, setGoogleUser] = useState(() => getSavedGoogleUser());

  useEffect(() => {
    const handleStorageChange = () => {
      setGoogleUser(getSavedGoogleUser());
    };
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 2000);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Check if cafe is currently open (9:00 AM - 11:00 PM)
  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      setIsOpenNow(hour >= 9 && hour < 23);
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

  const totalTrayCount = (trayItems || []).reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalTrayAmount = (trayItems || []).reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-[#1A1A1A] text-[#E8D7C3] text-xs py-2 px-4 border-b border-[#333333] transition-all">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-amber-300">
              <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-amber-500'}`} />
              <strong className="font-semibold">{isOpenNow ? '🐾 Black Cat Cafe Open' : 'Opens at 9:00 AM'}</strong>
            </span>
            <span className="hidden md:inline text-stone-600">•</span>
            <span className="inline-flex items-center gap-1 text-emerald-400 font-extrabold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/25">
              🛵 FREE Delivery on orders above ₹300!
            </span>
            <span className="hidden lg:inline text-stone-600">•</span>
            <button
              onClick={onOpenOffer}
              className="hidden lg:inline-flex items-center gap-1 text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-bold transition-all"
            >
              <span>🎁 Claim ₹50 OFF Coupon</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-stone-300 text-[11px] font-medium">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-amber-300 hover:text-white bg-black/40 hover:bg-black/60 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all shadow-sm"
              title="View Live Visitor Analytics & Logs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Live Visitors</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </button>
            <span className="text-stone-600">|</span>
            <a href="tel:+919876543210" className="flex items-center gap-1 hover:text-white transition-colors">
              <Phone className="w-3 h-3 text-amber-400" />
              <span>+91 98765 43210</span>
            </a>
            <span className="text-stone-600 hidden sm:inline">|</span>
            <span className="hidden sm:flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>Kabulpur / Ritauli, Rohtak</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-stone-200 py-3'
          : 'bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#E8DCB8] py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#181818] text-amber-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform border border-amber-500/30">
              <Cat className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-black tracking-tight text-[#181818]">
                  Black Cat <span className="text-amber-700">Cafe</span>
                </span>
                <span className="bg-[#181818] text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-amber-600/30">
                  🐾 Aesthetic
                </span>
              </div>
              <p className="text-[11px] text-[#7B5A34] tracking-wide font-medium">
                Pizzas • Burgers • Cakes • Cold Brews
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 font-bold text-xs xl:text-sm text-[#332214]">
            <button
              onClick={() => scrollTo('menu')}
              className="hover:text-amber-700 transition-colors flex items-center gap-1"
            >
              <Pizza className="w-4 h-4 text-amber-600" />
              <span>Full Menu</span>
            </button>
            <button
              onClick={() => scrollTo('spotlight')}
              className="hover:text-amber-700 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Cat Special Combos</span>
            </button>
            <button
              onClick={() => scrollTo('testimonials')}
              className="hover:text-amber-700 transition-colors"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="hover:text-amber-700 transition-colors"
            >
              Location &amp; Hours
            </button>
            <button
              onClick={onOpenAdmin}
              className="hover:text-amber-700 transition-colors flex items-center gap-1.5 text-stone-700 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-600/20 px-2.5 py-1 rounded-xl text-xs font-bold"
              title="Cafe Owner Visitor Intelligence Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Live Visitors</span>
            </button>

            {/* Google Console Login Button */}
            <button
              onClick={onOpenGoogleLogin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-900 text-xs font-bold transition-all shadow-xs"
              title="Sign in with Google"
            >
              <GoogleGIcon className="w-3.5 h-3.5" />
              <span>{googleUser ? googleUser.name.split(' ')[0] : 'Google Login'}</span>
            </button>
          </nav>

          {/* Right Action: Mobile Quick Actions & Order Tray */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Mobile Google Login Button */}
            <button
              onClick={onOpenGoogleLogin}
              className="lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-900 text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
              title="Sign in with Google"
            >
              <GoogleGIcon className="w-3.5 h-3.5" />
              <span className="text-[11px]">{googleUser ? googleUser.name.split(' ')[0] : 'Google'}</span>
            </button>

            {/* Quick Mobile Admin Button (PIN: 1234) */}
            <button
              onClick={onOpenAdmin}
              className="lg:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-amber-600/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
              title="Admin Dashboard (PIN: 1234)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-[11px]">1234</span>
            </button>

            <button
              onClick={onOpenTray}
              className="relative flex items-center gap-2 sm:gap-2.5 bg-[#181818] hover:bg-stone-900 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-2xl shadow-md transition-all font-semibold text-xs sm:text-sm group border border-amber-500/20 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-amber-300 leading-tight">Order Tray</span>
                <span className="font-bold text-xs text-[#FFF5EA]">₹{totalTrayAmount.toFixed(0)}</span>
              </div>
              {totalTrayCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-stone-950 text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce">
                  {totalTrayCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#4A260F] hover:text-[#8C5628]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#E8DCB8] px-4 pt-3 pb-6 space-y-3 shadow-xl">
            <button
              onClick={() => scrollTo('menu')}
              className="block w-full text-left py-2 font-bold text-[#4A260F] border-b border-stone-100 flex items-center gap-2"
            >
              <Pizza className="w-4 h-4 text-amber-600" />
              <span>Full Menu (Pizzas, Burgers, Frappes)</span>
            </button>
            <button
              onClick={() => scrollTo('spotlight')}
              className="block w-full text-left py-2 font-bold text-[#4A260F] border-b border-stone-100 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Cat Special Combos</span>
            </button>
            <button
              onClick={() => scrollTo('testimonials')}
              className="block w-full text-left py-2 font-medium text-stone-700 border-b border-stone-100"
            >
              Guest Reviews
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="block w-full text-left py-2 font-medium text-stone-700 border-b border-stone-100"
            >
              Hours &amp; Location
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
              className="block w-full text-left py-2 font-bold text-amber-900 border-b border-stone-100 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Live Visitor Insights (Admin)</span>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-700 font-bold border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenGoogleLogin(); }}
              className="block w-full text-left py-2 font-bold text-stone-800 border-b border-stone-100 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <GoogleGIcon className="w-4 h-4" />
                <span>{googleUser ? `Signed in as ${googleUser.name}` : 'Sign in with Google'}</span>
              </div>
              <span className="text-[10px] bg-blue-500/10 text-blue-700 font-bold border border-blue-500/30 px-2 py-0.5 rounded-full">
                {googleUser ? 'Connected' : 'OAuth'}
              </span>
            </button>
            <div className="pt-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenTray(); }}
                className="w-full text-center py-3 bg-[#181818] text-amber-300 rounded-2xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-amber-300" />
                <span>Open Order Tray ({totalTrayCount} items) • ₹{totalTrayAmount.toFixed(0)}</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
