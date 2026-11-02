import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VibeFeatures from './components/VibeFeatures';
import MenuSection from './components/MenuSection';
import BookSpotlight from './components/BookSpotlight';
import TestimonialSection from './components/TestimonialSection';
import ContactAndLocation from './components/ContactAndLocation';
import OrderTrayDrawer from './components/OrderTrayDrawer';
import Footer from './components/Footer';

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

  useEffect(() => {
    try {
      localStorage.setItem('bnb_tray_items', JSON.stringify(trayItems));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }, [trayItems]);

  const handleAddToCart = (product) => {
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
    <div className="min-h-screen flex flex-col bg-[#FAF5EB] text-[#331D10]">
      {/* Top Navbar */}
      <Navbar
        trayItems={trayItems}
        onOpenTray={() => setTrayOpen(true)}
      />

      <main className="flex-1">
        {/* Prominent Hero Section */}
        <Hero
          onExploreMenu={() => scrollToSection('menu')}
          onExploreCombos={() => scrollToSection('spotlight')}
        />

        {/* 4 Cozy Philosophy & Vibe Cards */}
        <VibeFeatures />

        {/* Interactive Clean Food Menu with Realistic Pricing */}
        <MenuSection
          onAddToCart={handleAddToCart}
          trayItems={trayItems}
        />

        {/* Feature Spotlight: Bestseller Cafe Combos */}
        <BookSpotlight
          onAddToCart={handleAddToCart}
        />

        {/* Guest Reviews & Testimonials */}
        <TestimonialSection />

        {/* Location, Hours, Contact Message & FAQ */}
        <ContactAndLocation />
      </main>

      {/* Slide-over Tray / Order Cart Drawer */}
      <OrderTrayDrawer
        isOpen={trayOpen}
        onClose={() => setTrayOpen(false)}
        trayItems={trayItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearTray={handleClearTray}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
