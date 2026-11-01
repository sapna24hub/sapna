import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicePricingCatalog from './components/ServicePricingCatalog';
import BridalPackageBuilder from './components/BridalPackageBuilder';
import BeautyShop from './components/BeautyShop';
import BeforeAfterGallery from './components/BeforeAfterGallery';
import CartDrawer from './components/CartDrawer';
import BookingModal from './components/BookingModal';
import SkinHairQuizModal from './components/SkinHairQuizModal';
import LiveTracker from './components/LiveTracker';
import ReviewsSection from './components/ReviewsSection';
import LocationCoverage from './components/LocationCoverage';
import SocialHub from './components/SocialHub';
import AdminDrawer from './components/AdminDrawer';
import Dashboard from './components/Dashboard';
import GlowStyleAI from './components/GlowStyleAI';
import Footer from './components/Footer';
import { api } from './services/api';
import { PhoneCall, Sparkles } from 'lucide-react';

export default function App() {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart & Pricing State
  const [cart, setCart] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');

  // Modals & Drawers & View
  const [currentView, setCurrentView] = useState('store'); // 'store' | 'dashboard'
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isAdminDrawerOpen, setIsAdminDrawerOpen] = useState(false);
  const [activeTrackingRef, setActiveTrackingRef] = useState('GLOW-DEMO1');

  // Toast Notification
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  // Initial Data Fetch
  useEffect(() => {
    async function loadInitialData() {
      try {
        const [cats, prods, revs, st] = await Promise.all([
          api.getCategories(),
          api.getProducts(),
          api.getReviews(),
          api.getStats()
        ]);
        setCategories(cats);
        setProducts(prods);
        setReviews(revs);
        setStats(st);
      } catch (err) {
        console.error('Failed to load initial parlour data', err);
      }
    }
    loadInitialData();
  }, []);

  // Fetch Services when category or search changes
  useEffect(() => {
    async function fetchServices() {
      try {
        const svcs = await api.getServices(selectedCategory, searchQuery);
        setServices(svcs);
      } catch (err) {
        console.error('Failed to fetch services', err);
      }
    }
    fetchServices();
  }, [selectedCategory, searchQuery]);

  // Cart Operations (Supports both Services and Products)
  const handleAddToCart = (itemData, type = 'service') => {
    setCart((prev) => {
      const isProduct = type === 'product';
      const existing = prev.find((item) => 
        isProduct 
          ? (item.type === 'product' && item.product.id === itemData.id)
          : (item.type !== 'product' && item.service.id === itemData.id)
      );

      if (existing) {
        return prev.map((item) => {
          const match = isProduct 
            ? (item.type === 'product' && item.product.id === itemData.id)
            : (item.type !== 'product' && item.service.id === itemData.id);
          return match ? { ...item, quantity: item.quantity + 1 } : item;
        });
      } else {
        return isProduct 
          ? [...prev, { product: itemData, quantity: 1, type: 'product' }]
          : [...prev, { service: itemData, quantity: 1, type: 'service' }];
      }
    });
    showToast(`Added "${itemData.name}" to your bag! ✨`);
  };

  const handleUpdateQty = (itemId, newQty, type = 'service') => {
    if (newQty <= 0) {
      handleRemoveItem(itemId, type);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        const match = type === 'product' 
          ? (item.type === 'product' && item.product.id === itemId)
          : (item.type !== 'product' && item.service.id === itemId);
        return match ? { ...item, quantity: newQty } : item;
      })
    );
  };

  const handleRemoveItem = (itemId, type = 'service') => {
    setCart((prev) =>
      prev.filter((item) => {
        const match = type === 'product' 
          ? (item.type === 'product' && item.product.id === itemId)
          : (item.type !== 'product' && item.service.id === itemId);
        return !match;
      })
    );
    showToast('Item removed from cart.');
  };

  // Calculate cart counts and total (Services + Products combined)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => {
    const price = item.type === 'product' 
      ? parseFloat(item.product.effective_price) 
      : parseFloat(item.service.effective_price);
    return sum + (price * item.quantity);
  }, 0);
  const visitFee = subtotal >= 499 || subtotal === 0 ? 0 : 49;
  const tax = subtotal > 0 ? (subtotal * 0.18) : 0;
  let discount = 0;
  if (appliedCoupon === 'GLOW100') discount = Math.min(100, subtotal);
  else if (appliedCoupon === 'GLOW20') discount = subtotal * 0.20;
  else if (appliedCoupon === 'FIRSTBEAUTY') discount = Math.min(150, subtotal);
  const cartTotal = Math.max(0, subtotal + visitFee + tax - discount);

  const handleBookingSuccess = (newBooking) => {
    setActiveTrackingRef(newBooking.booking_ref);
    setCart([]); // Clear cart after successful booking
    showToast(`Appointment confirmed! Booking Ref: ${newBooking.booking_ref}`);
  };

  const handleOpenTrackerWithBooking = (ref) => {
    setActiveTrackingRef(ref);
    const trackerEl = document.getElementById('tracker');
    if (trackerEl) {
      trackerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReviewAdded = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
    showToast('Thank you! Your verified review has been posted.');
  };

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-rose-200 selection:text-rose-900">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-parlour-950 text-white px-5 py-3 rounded-2xl shadow-2xl border border-rose-300/40 text-xs sm:text-sm font-semibold flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-5">
          <Sparkles className="w-4 h-4 text-gold-300 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* If Dashboard view is selected */}
      {currentView === 'dashboard' ? (
        <Dashboard
          onBackToWebsite={() => setCurrentView('store')}
          onOpenTrackerWithBooking={(ref) => {
            setCurrentView('store');
            setTimeout(() => handleOpenTrackerWithBooking(ref), 100);
          }}
        />
      ) : (
        <>
          {/* Floating WhatsApp Action Button */}
          <a
            href="https://wa.me/919876543210?text=Hi%20GlowAura!%20I%20would%20like%20to%20consult%20for%20home%20beauty%20services%20in%20Rohtak."
            target="_blank"
            rel="noreferrer"
            title="Chat with Senior Beauty Consultant"
            className="fixed bottom-6 left-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-2 border-2 border-white group"
          >
            <PhoneCall className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline text-xs font-bold pr-1">Rohtak WhatsApp Consult</span>
          </a>

          {/* Navigation Bar */}
          <Navbar
            cartCount={cartCount}
            cartTotal={cartTotal}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenTracker={() => {
              const trackerEl = document.getElementById('tracker');
              if (trackerEl) trackerEl.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenAdmin={() => setIsAdminDrawerOpen(true)}
            onOpenDashboard={() => setCurrentView('dashboard')}
            onOpenQuiz={() => setIsQuizOpen(true)}
          />

          {/* Main Content Sections */}
          <main className="flex-1">
            
            {/* Hero Section */}
            <Hero
              onExploreServices={() => {
                const el = document.getElementById('services');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenTracker={() => {
                const trackerEl = document.getElementById('tracker');
                if (trackerEl) trackerEl.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenQuiz={() => setIsQuizOpen(true)}
              onOpenBridalBuilder={() => {
                const el = document.getElementById('bridal-builder');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Services & Pricing Catalog with Total Cost calculation */}
            <ServicePricingCatalog
              categories={categories}
              services={services}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              cart={cart}
              onAddToCart={handleAddToCart}
              onOpenCart={() => setIsCartOpen(true)}
            />

            {/* Rohtak Bridal Studio & Custom Pre-Bridal Package Builder */}
            <BridalPackageBuilder
              onAddToCart={handleAddToCart}
              onOpenCart={() => setIsCartOpen(true)}
              onOpenBookingModal={() => setIsBookingModalOpen(true)}
            />

            {/* Beauty & Salon Shopping Products Store */}
            <BeautyShop
              products={products}
              cart={cart}
              onAddToCart={handleAddToCart}
              onOpenCart={() => setIsCartOpen(true)}
            />

            {/* Real Client Before & After Transformations */}
            <BeforeAfterGallery
              onAddToCart={handleAddToCart}
              onOpenBookingModal={() => setIsBookingModalOpen(true)}
            />

            {/* Live GPS Consultant Tracker */}
            <LiveTracker
              initialBookingRef={activeTrackingRef}
            />

            {/* Customer Reviews & Ratings */}
            <ReviewsSection
              reviews={reviews}
              onReviewAdded={handleReviewAdded}
            />

            {/* Location Coverage & Rohtak Pincode Checker */}
            <LocationCoverage />

            {/* Social Media & Gallery Hub */}
            <SocialHub />

          </main>

          {/* Footer & How It Works */}
          <Footer
            onExploreServices={() => {
              const el = document.getElementById('services');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenTracker={() => {
              const trackerEl = document.getElementById('tracker');
              if (trackerEl) trackerEl.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onOpenBookingModal={() => setIsBookingModalOpen(true)}
        couponCode={couponCode}
        setCouponCode={setCouponCode}
        appliedCoupon={appliedCoupon}
        setAppliedCoupon={setAppliedCoupon}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        cart={cart}
        couponCode={appliedCoupon}
        onBookingSuccess={handleBookingSuccess}
        onOpenTrackerWithBooking={handleOpenTrackerWithBooking}
      />

      {/* 2-Minute Skin & Hair AI Diagnostic Quiz Modal */}
      <SkinHairQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAddToCart={handleAddToCart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBookingModal={() => setIsBookingModalOpen(true)}
      />

      {/* Admin / Consultant Management Drawer */}
      <AdminDrawer
        isOpen={isAdminDrawerOpen}
        onClose={() => setIsAdminDrawerOpen(false)}
        onSelectBookingForTracking={(ref) => {
          handleOpenTrackerWithBooking(ref);
        }}
      />

      {/* AI Virtual Assistant: Glow & Style AI */}
      {currentView === 'store' && (
        <GlowStyleAI
          onOpenBookingModal={() => setIsBookingModalOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenTracker={() => {
            const trackerEl = document.getElementById('tracker');
            if (trackerEl) trackerEl.scrollIntoView({ behavior: 'smooth' });
          }}
          onExploreServices={() => {
            const el = document.getElementById('services');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

    </div>
  );
}