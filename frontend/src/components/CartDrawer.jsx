import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Sparkles, 
  Tag, 
  ShieldCheck, 
  ArrowRight, 
  Check 
} from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onOpenBookingModal,
  couponCode,
  setCouponCode,
  appliedCoupon,
  setAppliedCoupon
}) {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  // Calculate Subtotal (Services + Shopping Products)
  const subtotal = cart.reduce((sum, item) => {
    const price = item.type === 'product' 
      ? parseFloat(item.product.effective_price) 
      : parseFloat(item.service.effective_price);
    return sum + (price * item.quantity);
  }, 0);

  // Home Visit Fee
  const visitFee = subtotal >= 499 || subtotal === 0 ? 0 : 49;

  // Tax (18% GST)
  const tax = subtotal > 0 ? (subtotal * 0.18) : 0;

  // Coupon Discount
  let discount = 0;
  if (appliedCoupon === 'GLOW100') {
    discount = Math.min(100, subtotal);
  } else if (appliedCoupon === 'GLOW20') {
    discount = subtotal * 0.20;
  } else if (appliedCoupon === 'FIRSTBEAUTY') {
    discount = Math.min(150, subtotal);
  }

  // Grand Total Cost
  const totalCost = Math.max(0, subtotal + visitFee + tax - discount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (['GLOW100', 'GLOW20', 'FIRSTBEAUTY'].includes(code)) {
      setAppliedCoupon(code);
      setCouponCode(code);
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code. Try GLOW100, GLOW20 or FIRSTBEAUTY');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon('');
    setCouponCode('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-parlour-900 to-parlour-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-parlour-700/60 border border-white/20 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-gold-300" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold">Your Parlour Cart</h3>
                <p className="text-xs text-rose-200">
                  {cart.length} {cart.length === 1 ? 'service' : 'services'} selected
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            
            {cart.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <ShoppingBag className="w-16 h-16 text-rose-200 mx-auto" />
                <h4 className="font-serif text-xl font-bold text-gray-800">Your cart is empty</h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Browse our facial, hair care, bridal, or waxing services and add them to schedule your home consultant.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-parlour-700 text-white font-semibold text-xs rounded-xl shadow-md"
                >
                  Explore Services
                </button>
              </div>
            ) : (
              <>
                {/* Free visit progress banner */}
                <div className="bg-rose-50 p-3.5 rounded-2xl border border-rose-100 flex items-center gap-2.5 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  {subtotal >= 499 ? (
                    <span className="text-emerald-800 font-semibold">
                      🎉 You unlocked FREE Home Consultant Visit & Travel!
                    </span>
                  ) : (
                    <span className="text-gray-700">
                      Add <strong className="text-parlour-700">₹{(499 - subtotal).toFixed(0)}</strong> more to get <strong>FREE Home Visit</strong> (Standard ₹49).
                    </span>
                  )}
                </div>

                {/* Items (Services & Products) */}
                <div className="space-y-3">
                  {cart.map((item) => {
                    const isProduct = item.type === 'product';
                    const id = isProduct ? item.product.id : item.service.id;
                    const name = isProduct ? item.product.name : item.service.name;
                    const image = isProduct ? item.product.image_url : item.service.image_url;
                    const price = isProduct ? item.product.effective_price : item.service.effective_price;
                    const subtitle = isProduct 
                      ? `${item.product.brand} • ${item.product.size_or_weight}`
                      : `${item.service.duration_minutes} mins`;
                    const itemKey = isProduct ? `prod-${id}` : `svc-${id}`;

                    return (
                      <div
                        key={itemKey}
                        className="p-3.5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-rose-200 transition-all flex items-center gap-3"
                      >
                        <img
                          src={image}
                          alt={name}
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-gray-50"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                              isProduct ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {isProduct ? 'Product' : 'Service'}
                            </span>
                          </div>
                          <h4 className="font-bold text-xs sm:text-sm text-gray-900 truncate mt-0.5">
                            {name}
                          </h4>
                          <p className="text-[11px] text-gray-400">
                            {subtitle} • ₹{price} each
                          </p>
                          <p className="text-xs font-bold text-parlour-700 mt-1">
                            ₹{(price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-gray-200">
                          <button
                            onClick={() => onUpdateQty(id, item.quantity - 1, item.type)}
                            className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-gray-600 hover:text-parlour-700 shadow-xs"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-gray-800 w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQty(id, item.quantity + 1, item.type)}
                            className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-gray-600 hover:text-parlour-700 shadow-xs"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Delete button */}
                        <button
                          onClick={() => onRemoveItem(id, item.type)}
                          className="text-gray-400 hover:text-rose-600 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Coupon Code section */}
                <div className="pt-2">
                  {appliedCoupon ? (
                    <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-emerald-800">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Coupon <strong>{appliedCoupon}</strong> Applied!</span>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-xs text-rose-600 hover:underline font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-1">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Promo Code (GLOW100, FIRSTBEAUTY)"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          className="flex-1 uppercase px-3 py-2 bg-rose-50/50 border border-rose-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-parlour-600"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-parlour-800 text-white rounded-xl text-xs font-bold hover:bg-parlour-900 transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-[11px] text-rose-600">{couponError}</p>
                      )}
                    </form>
                  )}
                </div>

                {/* Available Quick Coupons */}
                <div className="flex flex-wrap gap-2 text-[11px] pt-1">
                  <button
                    onClick={() => { setAppliedCoupon('GLOW100'); setCouponCode('GLOW100'); }}
                    className="px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 font-medium hover:bg-amber-100"
                  >
                    🏷️ GLOW100 (₹100 OFF)
                  </button>
                  <button
                    onClick={() => { setAppliedCoupon('FIRSTBEAUTY'); setCouponCode('FIRSTBEAUTY'); }}
                    className="px-2.5 py-1 bg-rose-50 border border-rose-200 rounded-lg text-rose-900 font-medium hover:bg-rose-100"
                  >
                    🏷️ FIRSTBEAUTY (₹150 OFF)
                  </button>
                </div>
              </>
            )}

          </div>

          {/* Footer: Detailed Cost Summary and Checkout Button */}
          {cart.length > 0 && (
            <div className="p-6 bg-gray-50 border-t border-gray-200 space-y-4">
              
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Services Subtotal:</span>
                  <span className="font-semibold text-gray-900">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Home Visit & Travel Charge:</span>
                  <span className="font-semibold">
                    {visitFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `₹${visitFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>GST & Service Tax (18%):</span>
                  <span className="font-semibold text-gray-900">₹{tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount:</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                
                {/* Total Cost Highlight */}
                <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline text-gray-900">
                  <span className="text-sm font-bold">Grand Total Cost:</span>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-parlour-700">
                      ₹{totalCost.toFixed(2)}
                    </span>
                    <span className="block text-[10px] text-gray-400">All taxes included</span>
                  </div>
                </div>
              </div>

              {/* Checkout / Schedule Button */}
              <button
                onClick={() => {
                  onClose();
                  onOpenBookingModal();
                }}
                className="w-full py-3.5 bg-gradient-to-r from-parlour-700 via-parlour-600 to-rose-600 hover:from-parlour-800 hover:to-rose-700 text-white rounded-2xl font-bold text-sm shadow-lg shadow-rose-900/20 hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Book Appointment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
