import React, { useState } from 'react';
import { 
  Crown, 
  Sparkles, 
  Check, 
  Calendar, 
  Heart, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  Flame 
} from 'lucide-react';

const PRE_BRIDAL_OPTIONS = [
  { id: 'b-1', name: 'Airbrush HD Bridal Makeup + 3D Lashes', price: 2999, originalPrice: 4999, time: '120m', cat: 'Wedding Day' },
  { id: 'b-2', name: 'Haldi & Mehendi Floral Dewy Glam', price: 1499, originalPrice: 2499, time: '75m', cat: 'Pre-Wedding' },
  { id: 'b-3', name: 'Traditional Sojat Organic Bridal Mehendi', price: 1199, originalPrice: 1999, time: '120m', cat: 'Mehendi Night' },
  { id: 'b-4', name: '24K Gold Luxury Radiance Facial', price: 599, originalPrice: 999, time: '60m', cat: 'Skin Prep' },
  { id: 'b-5', name: 'O3+ Seaweed Whitening & De-Tan Facial', price: 749, originalPrice: 1299, time: '65m', cat: 'Skin Prep' },
  { id: 'b-6', name: 'Brazilian Keratin Hair Smoothening & Gloss', price: 1499, originalPrice: 2499, time: '90m', cat: 'Hair Styling' },
  { id: 'b-7', name: 'RICA White Chocolate Full Body Wax', price: 699, originalPrice: 1199, time: '60m', cat: 'Grooming' },
  { id: 'b-8', name: 'Crystal Detox Foot Spa Pedicure & Manicure', price: 798, originalPrice: 1398, time: '90m', cat: 'Nail Spa' },
];

export default function BridalPackageBuilder({ onAddToCart, onOpenCart, onOpenBookingModal }) {
  const [selectedIds, setSelectedIds] = useState(['b-1', 'b-4', 'b-7']); // Default selection
  const [weddingDate, setWeddingDate] = useState('');
  const [addedToCartSuccess, setAddedToCartSuccess] = useState(false);

  const toggleService = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectedServices = PRE_BRIDAL_OPTIONS.filter(opt => selectedIds.includes(opt.id));
  const subtotal = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const originalSubtotal = selectedServices.reduce((sum, s) => sum + s.originalPrice, 0);

  // Bundle Discount Logic:
  // 3+ items: extra 10% OFF
  // 5+ items: extra 20% OFF + FREE Makeup Trial
  let bundleDiscountPercent = 0;
  if (selectedServices.length >= 5) {
    bundleDiscountPercent = 20;
  } else if (selectedServices.length >= 3) {
    bundleDiscountPercent = 10;
  }

  const bundleDiscountAmount = (subtotal * bundleDiscountPercent) / 100;
  const finalBundlePrice = Math.max(0, subtotal - bundleDiscountAmount);
  const totalSavings = (originalSubtotal - finalBundlePrice);

  const handleBookBundle = () => {
    // Add all bundled services to the main cart
    selectedServices.forEach(item => {
      onAddToCart({
        id: item.id,
        name: `[Bridal Bundle] ${item.name}`,
        effective_price: item.price - ((item.price * bundleDiscountPercent) / 100),
        duration_minutes: parseInt(item.time) || 60,
        image_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
        category_name: 'Bridal Package'
      });
    });

    setAddedToCartSuccess(true);
    setTimeout(() => {
      onOpenBookingModal();
    }, 600);
  };

  return (
    <section id="bridal-builder" className="py-20 bg-gradient-to-b from-rose-50/40 via-white to-amber-50/20 border-t border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-parlour-700 text-xs font-semibold uppercase tracking-wider border border-rose-200">
            <Crown className="w-3.5 h-3.5 text-gold-600" />
            <span>Rohtak Bridal Studio • Custom Package Builder</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
            Build Your Customized Bridal & Pre-Bridal Package
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Just like Rohtak's top salons in Model Town and D-Park, customize your wedding pampering rituals at your home. Get up to <strong>20% Extra Bundle Discount + FREE Lehenga Match Trial</strong>!
          </p>
        </div>

        {/* Builder Container */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Services Selection Grid */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200 text-xs">
              <span className="font-bold text-gray-700">
                Step 1: Select services for your wedding & pre-bridal sessions ({selectedIds.length} chosen)
              </span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">
                {selectedServices.length >= 5 ? '🎉 20% Bundle Discount Unlocked!' :
                 selectedServices.length >= 3 ? '🎉 10% Bundle Discount Unlocked!' :
                 'Add 3+ services for extra discount'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {PRE_BRIDAL_OPTIONS.map((opt) => {
                const isSelected = selectedIds.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleService(opt.id)}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                      isSelected 
                        ? 'bg-rose-50/80 border-parlour-600 shadow-sm ring-1 ring-parlour-600' 
                        : 'bg-white border-gray-200 hover:border-parlour-300'
                    }`}
                  >
                    <div className="space-y-1.5 flex-1">
                      <span className="text-[10px] uppercase font-bold text-parlour-600 bg-white px-2 py-0.5 rounded-md border border-rose-100">
                        {opt.cat} • {opt.time}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-gray-900 leading-snug">
                        {opt.name}
                      </h4>
                      <div className="flex items-baseline gap-2 pt-1">
                        <span className="font-extrabold text-sm text-gray-900">₹{opt.price}</span>
                        <s className="text-xs text-gray-400">₹{opt.originalPrice}</s>
                      </div>
                    </div>

                    <div className={`w-6 h-6 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected ? 'bg-parlour-700 text-white' : 'border border-gray-300 bg-gray-50'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Dynamic Price Summary Card */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-rose-100 shadow-xl space-y-5 sticky top-28">
            
            <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-gold-400 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-parlour-950 rounded-[10px] flex items-center justify-center">
                  <Crown className="w-4 h-4 text-gold-300" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-gray-900">Custom Bridal Estimate</h3>
                <p className="text-[11px] text-gray-400">At-Home Salon in Rohtak</p>
              </div>
            </div>

            {/* Selected items pills preview */}
            <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
              {selectedServices.map(s => (
                <div key={s.id} className="flex justify-between items-center text-xs text-gray-700 bg-gray-50 p-2 rounded-xl">
                  <span className="truncate max-w-[190px]">{s.name}</span>
                  <span className="font-bold">₹{s.price}</span>
                </div>
              ))}
            </div>

            {/* Free Trial Bonus Card if 5+ selected */}
            {selectedServices.length >= 5 ? (
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl text-xs text-amber-900 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-amber-800">
                  <Sparkles className="w-4 h-4 text-gold-600" />
                  FREE At-Home Bridal Makeup Trial Included!
                </span>
                <p className="text-[11px] text-amber-700">
                  Senior artist tests foundation match with your lehenga fabric.
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 p-2.5 rounded-xl text-[11px] text-gray-500 text-center">
                Select <strong>{5 - selectedServices.length} more services</strong> to unlock <strong>FREE Lehenga Match Trial</strong>!
              </div>
            )}

            {/* Financial Breakdown */}
            <div className="space-y-2 text-xs pt-2 border-t border-gray-100">
              <div className="flex justify-between text-gray-500">
                <span>Services MRP Total:</span>
                <s className="font-medium text-gray-400">₹{originalSubtotal.toFixed(0)}</s>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Discounted Base Total:</span>
                <span className="font-bold">₹{subtotal.toFixed(0)}</span>
              </div>

              {bundleDiscountPercent > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Extra Bundle Discount ({bundleDiscountPercent}%):</span>
                  <span>-₹{bundleDiscountAmount.toFixed(0)}</span>
                </div>
              )}

              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Total You Save:</span>
                <span>₹{totalSavings.toFixed(0)} OFF</span>
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
                <span className="text-sm font-bold text-gray-900">Final Package Price:</span>
                <span className="text-2xl font-extrabold text-parlour-700 font-serif">
                  ₹{finalBundlePrice.toFixed(0)}
                </span>
              </div>
            </div>

            {/* Book Now Button */}
            <button
              onClick={handleBookBundle}
              disabled={selectedServices.length === 0}
              className="w-full py-3.5 bg-gradient-to-r from-parlour-800 via-parlour-700 to-rose-600 hover:from-parlour-900 hover:to-rose-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-lg shadow-rose-950/15 transition-all flex items-center justify-center gap-2 group"
            >
              <span>{addedToCartSuccess ? 'Adding to Appointment...' : 'Book Custom Bridal Package'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-[10px] text-center text-gray-400">
              100% sterile disposable kits • Certified senior makeup artist
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
