import React, { useState } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  MapPin, 
  PhoneCall, 
  Clock, 
  Menu, 
  X, 
  ShieldCheck, 
  Navigation2, 
  Settings,
  LayoutDashboard,
  Crown,
  HelpCircle
} from 'lucide-react';

export default function Navbar({ 
  cartCount, 
  cartTotal, 
  onOpenCart, 
  onOpenTracker, 
  onOpenAdmin,
  onOpenDashboard,
  onOpenQuiz
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-parlour-900 via-parlour-800 to-parlour-900 text-rose-100 text-xs py-2 px-4 shadow-sm border-b border-parlour-700/40">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-medium bg-rose-500/20 px-2 py-0.5 rounded-full text-gold-200">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-300" /> Rohtak's #1 At-Home Salon
            </span>
            <span className="hidden sm:inline text-rose-200/80">
              • Model Town, D-Park & All HUDA Sectors
            </span>
          </div>
          <div className="flex items-center gap-4 text-rose-200 text-xs">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gold-300" /> 9:00 AM - 7:00 PM (All 7 Days)
            </span>
            <a 
              href="https://wa.me/919876543210?text=Hello%20GlowAura!%20I%20want%20to%20consult%20for%20home%20beauty%20services%20in%20Rohtak" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 text-emerald-300 font-semibold hover:underline"
            >
              <PhoneCall className="w-3.5 h-3.5" /> WhatsApp Support
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-parlour-700 via-rose-500 to-gold-400 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-parlour-900 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-gold-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-gray-900">
                  Glow<span className="text-parlour-600">Aura</span>
                </span>
                <span className="bg-rose-100 text-parlour-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Rohtak
                </span>
              </div>
              <p className="text-[11px] text-gray-500 tracking-wide">
                Luxury Salon & Beauty Consultant
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 font-medium text-xs xl:text-sm text-gray-700">
            <button 
              onClick={() => scrollTo('services')} 
              className="hover:text-parlour-600 transition-colors"
            >
              Services & Pricing
            </button>
            <button 
              onClick={() => scrollTo('bridal-builder')} 
              className="hover:text-parlour-600 transition-colors flex items-center gap-1 font-semibold text-rose-700"
            >
              <Crown className="w-3.5 h-3.5 text-gold-600" /> Bridal Studio
            </button>
            <button 
              onClick={() => scrollTo('shop')} 
              className="hover:text-parlour-600 transition-colors flex items-center gap-1"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Shop Products
            </button>
            <button 
              onClick={() => scrollTo('transformations')} 
              className="hover:text-parlour-600 transition-colors"
            >
              Real Results
            </button>
            <button 
              onClick={onOpenTracker} 
              className="flex items-center gap-1 text-parlour-600 hover:text-parlour-800 font-semibold transition-colors bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200"
            >
              <Navigation2 className="w-3.5 h-3.5 text-parlour-600 animate-pulse" />
              Live Tracking
            </button>
            <button 
              onClick={() => scrollTo('coverage')} 
              className="hover:text-parlour-600 transition-colors flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5 text-gray-400" /> Rohtak Hubs
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Skin AI Quiz Button */}
            <button
              onClick={onOpenQuiz}
              className="hidden sm:flex items-center gap-1 px-2.5 py-2 bg-rose-50 hover:bg-rose-100 text-parlour-800 rounded-xl text-xs font-bold transition-all border border-rose-200"
              title="Take 2-Minute Skin Diagnosis Quiz"
            >
              <Sparkles className="w-3.5 h-3.5 text-parlour-600" />
              <span>Skin Quiz</span>
            </button>

            {/* Dashboard Button */}
            <button
              onClick={onOpenDashboard}
              className="flex items-center gap-1.5 px-3 py-2 bg-parlour-900 hover:bg-parlour-950 text-gold-300 rounded-xl text-xs font-bold transition-all border border-parlour-800 shadow-xs"
              title="Open Full Business Dashboard"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-gold-300" />
              <span className="hidden xl:inline">Dashboard</span>
            </button>

            {/* Admin quick toggle button */}
            <button
              onClick={onOpenAdmin}
              title="Open Admin & Consultant Manager"
              className="p-2 text-gray-500 hover:text-parlour-700 hover:bg-rose-50 rounded-xl transition-all border border-gray-200"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Cart & Total Cost button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-gradient-to-r from-parlour-700 to-parlour-600 hover:from-parlour-800 hover:to-parlour-700 text-white px-3.5 py-2 rounded-2xl shadow-sm hover:shadow-md transition-all font-medium text-xs sm:text-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-rose-200 leading-tight">Total Cost</span>
                <span className="font-bold text-xs">₹{cartTotal.toFixed(0)}</span>
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold-400 text-parlour-950 text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-parlour-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-rose-100 px-4 pt-3 pb-6 space-y-3 shadow-xl">
            <button 
              onClick={() => scrollTo('services')} 
              className="block w-full text-left py-2 font-medium text-gray-800 border-b border-gray-100"
            >
              Services & Pricing Catalog
            </button>
            <button 
              onClick={() => scrollTo('bridal-builder')} 
              className="block w-full text-left py-2 font-bold text-parlour-700 border-b border-gray-100 flex items-center gap-1.5"
            >
              <Crown className="w-4 h-4 text-gold-600" /> Bridal Studio & Package Builder
            </button>
            <button 
              onClick={() => scrollTo('shop')} 
              className="block w-full text-left py-2 font-bold text-gray-800 border-b border-gray-100"
            >
              🛍️ Shop Beauty Products
            </button>
            <button 
              onClick={() => scrollTo('transformations')} 
              className="block w-full text-left py-2 font-medium text-gray-800 border-b border-gray-100"
            >
              ✨ Real Before/After Results
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenTracker(); }} 
              className="flex items-center gap-2 w-full text-left py-2 font-semibold text-parlour-600 border-b border-gray-100"
            >
              <Navigation2 className="w-4 h-4" /> Live Tracking
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenQuiz(); }} 
              className="flex items-center gap-2 w-full text-left py-2 font-semibold text-rose-700 border-b border-gray-100"
            >
              <Sparkles className="w-4 h-4" /> 2-Min Skin AI Diagnostic
            </button>
            <button 
              onClick={() => scrollTo('coverage')} 
              className="block w-full text-left py-2 font-medium text-gray-800 border-b border-gray-100"
            >
              📍 Rohtak Neighborhoods
            </button>
            <div className="pt-2 space-y-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenDashboard(); }}
                className="w-full text-center py-2.5 bg-parlour-900 text-gold-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4 text-gold-300" />
                <span>Open Business Dashboard</span>
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
                className="w-full text-center py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-medium"
              >
                Quick Dispatch Drawer
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}