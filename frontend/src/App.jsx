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
      />

      {/* Slide-over Tray / Order Cart Drawer */}
      <OrderTrayDrawer
        isOpen={trayOpen}
        onClose={() => setTrayOpen(false)}
        trayItems={trayItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearTray={handleClearTray}
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
      />

      {/* Modern Dark Footer */}
      <Footer onOpenAdmin={() => setAdminModalOpen(true)} />
    </div>
  );
}
