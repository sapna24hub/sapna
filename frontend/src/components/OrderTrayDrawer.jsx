import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingBag, 
  Coffee, 
  Check, 
  ArrowRight,
  Pizza,
  Receipt,
  Sparkles,
  Tag,
  Cat
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderTrayDrawer({ isOpen, onClose, trayItems = [], onUpdateQuantity, onClearTray }) {
  const [orderType, setOrderType] = useState('dine_in'); // dine_in, takeaway, delivery
  const [tableNumber, setTableNumber] = useState('Table 4 (Window Seat)');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [receiptModal, setReceiptModal] = useState(null);

  if (!isOpen) return null;

  const subtotal = (trayItems || []).reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  const tax = subtotal * 0.05; // 5% Cafe GST
  
  let discount = 0;
  if (appliedCoupon === 'BLACKCAT50' || appliedCoupon === 'CAFE50') discount = Math.min(50, subtotal);
  else if (appliedCoupon === 'BLACKCAT20' || appliedCoupon === 'BREW20') discount = subtotal * 0.20;

  const total = Math.max(0, subtotal + tax - discount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'BLACKCAT50' || code === 'BLACKCAT20' || code === 'CAFE50' || code === 'BREW20') {
      setAppliedCoupon(code);
    } else {
      alert('Invalid coupon code. Try BLACKCAT50 (Flat ₹50 OFF) or BLACKCAT20 (20% OFF)!');
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (trayItems.length === 0) return;

    const receipt = {
      orderId: `BCK-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: customerName || 'Valued Foodie',
      phone: phone || 'Walk-in',
      orderType: orderType === 'dine_in' 
        ? `Dine-In (${tableNumber})` 
        : orderType === 'takeaway' 
        ? 'Quick Takeaway' 
        : `Home Delivery (${deliveryAddress || 'Address on file'})`,
      items: [...trayItems],
      subtotal,
      tax,
      discount,
      total,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    try {
      confetti({
        particleCount: 100,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setReceiptModal(receipt);
  };

  const handleFinishOrder = () => {
    setReceiptModal(null);
    onClearTray();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121212] text-white shadow-2xl flex flex-col justify-between border-l border-white/10 animate-in slide-in-from-right duration-300">
          
          {/* Drawer Top Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#181818]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-black border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-md">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg text-white flex items-center gap-1.5">
                  Your Order Cart 🐾
                </h3>
                <span className="text-xs text-amber-400 font-semibold">
                  {(trayItems || []).reduce((s, i) => s + (i.quantity || 1), 0)} items selected
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Scrollable Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {trayItems.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 text-amber-400 flex items-center justify-center mx-auto border border-white/10">
                  <Cat className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg text-white">Your cart is empty</h4>
                <p className="text-xs text-stone-400 max-w-xs mx-auto leading-relaxed">
                  Add wood-fired pizzas, smash burgers, golden French fries, and chilled cold coffee to get started!
                </p>
                <button
                  onClick={onClose}
                  className="mt-3 px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-extrabold shadow-md transition-all"
                >
                  Explore Cafe Menu
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {trayItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 bg-[#1A1A1A] p-3 rounded-2xl border border-white/10 shadow-sm"
                  >
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-white/10 flex-shrink-0 bg-black"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-white truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-amber-400 font-extrabold mt-0.5">
                        ₹{item.price} each
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-white/10 rounded-xl bg-[#242424] overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                          className="px-2.5 py-1 text-stone-300 hover:bg-white/10 transition-colors font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold text-white">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                          className="px-2.5 py-1 text-stone-300 hover:bg-white/10 transition-colors font-bold text-xs"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onUpdateQuantity(item.id, 0)}
                        className="text-stone-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Coupon Code Box */}
                <form onSubmit={handleApplyCoupon} className="pt-2 flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. BLACKCAT50)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-[#1C1C1E] border border-white/10 rounded-xl text-xs font-semibold uppercase text-white placeholder-stone-500 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-amber-500 text-black rounded-xl text-xs font-extrabold hover:bg-amber-400 active:scale-95 transition-all"
                  >
                    Apply
                  </button>
                </form>

                {appliedCoupon && (
                  <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-400 font-semibold flex justify-between items-center">
                    <span>🎉 Coupon {appliedCoupon} applied (-₹{discount.toFixed(0)})</span>
                    <button
                      onClick={() => { setAppliedCoupon(''); setCouponCode(''); }}
                      className="text-emerald-300 underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Drawer Bottom Order Summary & Checkout Form */}
          {trayItems.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-[#161616] space-y-4">
              
              {/* Order Mode Tabs */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#1F1F1F] rounded-2xl border border-white/10">
                {[
                  { id: 'dine_in', label: '🍽️ Dine-In' },
                  { id: 'takeaway', label: '🥡 Takeaway' },
                  { id: 'delivery', label: '🛵 Delivery' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setOrderType(type.id)}
                    className={`py-2 text-xs font-bold rounded-xl transition-all ${
                      orderType === type.id
                        ? 'bg-amber-500 text-black shadow-md'
                        : 'text-stone-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              {/* Order Mode Specific Inputs */}
              {orderType === 'dine_in' && (
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-300">Select Table:</label>
                  <select
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full p-2.5 bg-[#1F1F1F] border border-white/10 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Table 1 (Indoor AC Lounge)">Table 1 (Indoor AC Lounge)</option>
                    <option value="Table 2 (Window Seat)">Table 2 (Window Seat)</option>
                    <option value="Table 3 (Outdoor Garden Patio)">Table 3 (Outdoor Garden Patio)</option>
                    <option value="Table 4 (Cozy Reading Nook)">Table 4 (Cozy Reading Nook)</option>
                    <option value="Table 5 (Couple Booth)">Table 5 (Couple Booth)</option>
                  </select>
                </div>
              )}

              {orderType === 'takeaway' && (
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="p-2.5 bg-[#1F1F1F] border border-white/10 rounded-xl text-xs font-semibold text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="p-2.5 bg-[#1F1F1F] border border-white/10 rounded-xl text-xs font-semibold text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              {orderType === 'delivery' && (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="p-2.5 bg-[#1F1F1F] border border-white/10 rounded-xl text-xs font-semibold text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="p-2.5 bg-[#1F1F1F] border border-white/10 rounded-xl text-xs font-semibold text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Complete Delivery Address & Flat No."
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full p-2.5 bg-[#1F1F1F] border border-white/10 rounded-xl text-xs font-semibold text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              {/* Financial Calculation */}
              <div className="space-y-1.5 text-xs text-stone-300 pt-2 border-t border-white/10">
                <div className="flex justify-between">
                  <span>Items Subtotal:</span>
                  <span className="font-semibold text-white">₹{subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Cafe GST (5%):</span>
                  <span>+₹{tax.toFixed(0)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Coupon Savings:</span>
                    <span>-₹{discount.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/10">
                  <span>Total Payable:</span>
                  <span className="text-xl text-amber-400">₹{total.toFixed(0)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-black text-sm tracking-wide shadow-[0_8px_25px_rgba(245,158,11,0.3)] hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5 stroke-[3]" />
                <span>Place Order &amp; Generate KOT Ticket</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

            </div>
          )}

        </div>
      </div>

      {/* Stamped Barista Kitchen Order Ticket (KOT) Receipt Modal */}
      {receiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#181818] max-w-sm w-full p-6 rounded-3xl border border-amber-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.9)] space-y-4 text-center relative font-mono text-xs text-white">
            
            <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm">
              <Check className="w-5 h-5 bg-emerald-500/20 p-0.5 rounded-full border border-emerald-500/30" />
              <span>Order Sent to Barista Kitchen!</span>
            </div>

            <div className="border-b-2 border-dashed border-white/20 pb-3">
              <h3 className="font-serif text-lg font-bold text-amber-400">The Black Cat Cafe 🐾</h3>
              <p className="text-[11px] text-stone-400">KOT ID: {receiptModal.orderId} • {receiptModal.time}</p>
              <p className="text-xs font-bold text-white mt-1">{receiptModal.orderType}</p>
            </div>

            <div className="space-y-1.5 text-left max-h-48 overflow-y-auto">
              {receiptModal.items.map((it) => (
                <div key={it.id} className="flex justify-between text-xs text-stone-300">
                  <span className="truncate max-w-[200px]">{it.name} x{it.quantity}</span>
                  <span className="font-bold text-white">₹{it.price * it.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-dashed border-white/20 pt-3 space-y-1 text-right font-bold">
              <div className="flex justify-between text-xs text-stone-300">
                <span>Total Bill (Incl. GST):</span>
                <span className="text-base text-amber-400">₹{receiptModal.total.toFixed(0)}</span>
              </div>
            </div>

            <p className="text-[11px] text-stone-400 italic">
              "Fresh hot bites will be ready in 12-15 minutes. Show this ticket number at the counter!"
            </p>

            <button
              onClick={handleFinishOrder}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-2xl text-xs transition-all active:scale-95 shadow-md"
            >
              Done &amp; Start Fresh
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
