import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VibeFeatures from './components/VibeFeatures';
import MenuSection from './components/MenuSection';
import BookSpotlight from './components/BookSpotlight';
import TestimonialSection from './components/TestimonialSection';
import ContactAndLocation from './components/ContactAndLocation';
import OrderTrayDrawer from './components/OrderTrayDrawer';
import AIAssistantChatbot from './components/AIAssistantChatbot';
import Footer from './components/Footer';
import VisitorAnalyticsModal from './components/VisitorAnalyticsModal';
import WelcomeOfferModal from './components/WelcomeOfferModal';
import GoogleLoginModal, { GoogleGIcon } from './components/GoogleLoginModal';
import { trackCurrentVisitor, logVisitorAction } from './utils/visitorTracker';

export default function App() {
  const [trayItems, setTrayItems] = useState(() => {
    try {
      const saved = localStorage.getItem('bnb_tray_items');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [trayOpen, setTrayOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [welcomeOfferOpen, setWelcomeOfferOpen] = useState(false);
  const [googleModalOpen, setGoogleModalOpen] = useState(false);

  // Direct URL Hash Support (#admin, #google)
  useEffect(() => {
    const handleHash = () => {
      const hash = (window.location.hash || '').toLowerCase();
      if (hash === '#admin' || hash === '#visitor' || hash === '#visitors' || hash === '#pin') {
        setAdminModalOpen(true);
      } else if (hash === '#google' || hash === '#login' || hash === '#console') {
        setGoogleModalOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Initialize live visitor tracking on page mount & offer trigger
  useEffect(() => {
    trackCurrentVisitor();

    // Auto-prompt VIP Welcome Offer after 3.5 seconds if not dismissed this session
    const dismissed = sessionStorage.getItem('blackcat_offer_dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => {
        setWelcomeOfferOpen(true);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('bnb_tray_items', JSON.stringify(trayItems));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }, [trayItems]);

  const handleAddToCart = (product) => {
    logVisitorAction(`Added ${product.name} to Cart`);
    setTrayItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setTrayItems((prev) => prev.filter((item) => item.id !== productId));
    } else {
      setTrayItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleClearTray = () => {
    setTrayItems([]);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#EDEDED] font-sans selection:bg-amber-500 selection:text-black">
      {/* Official Vercel Web Analytics */}
      <Analytics />

      {/* Top Navbar */}
      <Navbar
        trayItems={trayItems}
        onOpenTray={() => setTrayOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenOffer={() => setWelcomeOfferOpen(true)}
        onOpenGoogleLogin={() => setGoogleModalOpen(true)}
      />

      <main className="flex-1">
        {/* Prominent Hero Section */}
        <Hero
          onExploreMenu={() => scrollToSection('menu')}
          onExploreCombos={() => scrollToSection('spotlight')}
        />

        {/* 4 Sleek Philosophy & Vibe Cards */}
        <VibeFeatures />

        {/* Interactive Food Menu with 6 Required Categories & Prices */}
        <MenuSection
          onAddToCart={handleAddToCart}
          trayItems={trayItems}
        />

        {/* Midnight Feast Bestseller Combos */}
        <BookSpotlight
          onAddToCart={handleAddToCart}
        />

        {/* 5-Star Customer Reviews & Interactive Leave a Review Form */}
        <TestimonialSection />

        {/* Location, Hours, Contact Message & FAQ */}
        <ContactAndLocation />
      </main>

      {/* Floating AI Assistant Chatbot (Luna) */}
      <AIAssistantChatbot
        onAddToCart={handleAddToCart}
        onOpenTray={() => setTrayOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenGoogleLogin={() => setGoogleModalOpen(true)}
      />

      {/* Permanent Floating Admin (PIN: 1234) & Google Console Bar */}
      <div className="fixed bottom-6 left-4 sm:left-6 z-40 flex items-center gap-2">
        {/* Live Visitor Tracking Pill (PIN: 1234) */}
        <button
          onClick={() => setAdminModalOpen(true)}
          className="flex items-center gap-2 bg-[#141414]/95 hover:bg-[#1E1E1E] text-white border border-amber-500/40 hover:border-amber-400 px-3.5 py-2.5 rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all group active:scale-95 text-xs font-bold cursor-pointer"
          title="Open Visitor Intelligence & Admin Dashboard (PIN: 1234)"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-amber-300 group-hover:text-amber-200">👥 Live Visitors</span>
          <span className="bg-amber-500/20 text-amber-300 text-[10px] px-1.5 py-0.5 rounded-md font-mono border border-amber-500/30 font-bold">
            PIN: 1234
          </span>
        </button>

        {/* Google Console Quick Action Button */}
        <button
          onClick={() => setGoogleModalOpen(true)}
          className="flex items-center gap-1.5 bg-white hover:bg-stone-100 text-stone-950 px-3 py-2.5 rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.7)] transition-all active:scale-95 text-xs font-bold border border-white/20 cursor-pointer"
          title="Sign in with Google or View Google Console"
        >
          <GoogleGIcon className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Google</span>
        </button>
      </div>

      {/* Slide-over Tray / Order Cart Drawer */}
      <OrderTrayDrawer
        isOpen={trayOpen}
        onClose={() => setTrayOpen(false)}
        trayItems={trayItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearTray={handleClearTray}
        onOpenGoogleLogin={() => setGoogleModalOpen(true)}
      />

      {/* Visitor Intelligence & Admin Modal */}
      <VisitorAnalyticsModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />

      {/* First-Time VIP Welcome Offer Modal */}
      <WelcomeOfferModal
        isOpen={welcomeOfferOpen}
        onClose={() => {
          setWelcomeOfferOpen(false);
          sessionStorage.setItem('blackcat_offer_dismissed', 'true');
        }}
        onOpenGoogleLogin={() => setGoogleModalOpen(true)}
      />

      {/* Google Console OAuth Login Modal */}
      <GoogleLoginModal
        isOpen={googleModalOpen}
        onClose={() => setGoogleModalOpen(false)}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Modern Dark Footer */}
      <Footer onOpenAdmin={() => setAdminModalOpen(true)} />
    </div>
  );
}
