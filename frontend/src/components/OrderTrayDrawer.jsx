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
  Tag
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderTrayDrawer({ isOpen, onClose, trayItems = [], onUpdateQuantity, onClearTray }) {
  const [orderType, setOrderType] = useState('dine_in'); // dine_in, takeaway, delivery
  const [tableNumber, setTableNumber] = useState('Table 4 (Window Seat)');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [receiptModal, setReceiptModal] = useState(null);

  if (!isOpen) return null;

  const subtotal = (trayItems || []).reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  const tax = subtotal * 0.05; // 5% Cafe GST
  
  let discount = 0;
  if (appliedCoupon === 'CAFE50' || appliedCoupon === 'BLACKCAT50') discount = Math.min(50, subtotal);
  else if (appliedCoupon === 'BREW20' || appliedCoupon === 'BLACKCAT20') discount = subtotal * 0.20;

  const total = Math.max(0, subtotal + tax - discount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'CAFE50' || code === 'BREW20' || code === 'BLACKCAT50' || code === 'BLACKCAT20') {
      setAppliedCoupon(code);
    } else {
      alert('Invalid coupon code. Try BLACKCAT50 (Flat ₹50 OFF) or BLACKCAT20 (20% OFF)!');
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (trayItems.length === 0) return;

    const receipt = {
      orderId: `KOT-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: customerName || 'Valued Guest',
      phone: phone || 'Walk-in',
      orderType: orderType === 'dine_in' ? `Dine-In (${tableNumber})` : orderType === 'takeaway' ? 'Quick Takeaway' : 'Home Delivery',
      items: [...trayItems],
      subtotal,
      tax,
      discount,
      total,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });

    setReceiptModal(receipt);
  };

  const handleFinishOrder = () => {
    setReceiptModal(null);
    onClearTray();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF5EB] shadow-2xl flex flex-col justify-between border-l border-[#D5BE9B] animate-in slide-in-from-right duration-300">
          
          {/* Drawer Top Header */}
          <div className="p-5 border-b border-[#E3D4C0] flex items-center justify-between bg-[#F4ECDC]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#8C5628] flex items-center justify-center text-white shadow-xs">
                <ShoppingBag className="w-5 h-5 text-[#FAF5EB]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#2B1607]">Your Cafe Order Tray</h3>
                <span className="text-xs text-[#8C5628] font-semibold">
                  {(trayItems || []).reduce((s, i) => s + (i.quantity || 1), 0)} items selected
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-500 hover:text-stone-800 hover:bg-[#EFE3D0] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Scrollable Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {trayItems.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <Pizza className="w-12 h-12 text-[#9E7A50] mx-auto opacity-70" />
                <h4 className="font-serif text-lg font-bold text-[#3D2512]">Your order tray is empty</h4>
                <p className="text-xs text-[#7B5A34] max-w-xs mx-auto">
                  Add hot cheesy pizzas, crispy burgers, chilled cold coffee or loaded fries to begin your order!
                </p>
                <button
                  onClick={onClose}
                  className="mt-3 px-6 py-2.5 rounded-full bg-[#5B3314] text-white text-xs font-bold"
                >
                  Browse Cafe Menu
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {trayItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 bg-[#FFFDF9] p-3 rounded-2xl border border-[#E3D4C0] shadow-xs"
                  >
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-[#D5BE9B] flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-[#2B1607] truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#8C5628] font-bold mt-0.5">
                        ₹{item.price} each
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-[#D5BE9B] rounded-xl bg-[#FAF5EB] overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                          className="px-2.5 py-1 text-stone-700 hover:bg-[#EAE0D0] transition-colors font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold text-[#2B1607]">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                          className="px-2.5 py-1 text-stone-700 hover:bg-[#EAE0D0] transition-colors font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onUpdateQuantity(item.id, 0)}
                        className="text-stone-400 hover:text-rose-600 p-1"
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
                      placeholder="Coupon Code (e.g. CAFE50, BREW20)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#D5BE9B] rounded-xl text-xs font-semibold uppercase placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#8C5628]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#8C5628] text-white rounded-xl text-xs font-bold hover:bg-[#5B3314]"
                  >
                    Apply
                  </button>
                </form>

                {appliedCoupon && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex justify-between items-center">
                    <span>🎉 Coupon {appliedCoupon} applied!</span>
                    <button
                      onClick={() => { setAppliedCoupon(''); setCouponCode(''); }}
                      className="text-emerald-700 underline text-[10px]"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Drawer Bottom Order Summary */}
          {trayItems.length > 0 && (
            <div className="p-5 border-t border-[#E3D4C0] bg-[#F4ECDC] space-y-4">
              
              {/* Service Type Selection */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'dine_in', label: 'Dine-In' },
                  { id: 'takeaway', label: 'Takeaway' },
                  { id: 'delivery', label: 'Delivery' }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setOrderType(type.id)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      orderType === type.id
                        ? 'bg-[#5B3314] text-white border-[#3D2512] shadow-xs'
                        : 'bg-white text-stone-700 border-[#D5BE9B] hover:bg-[#EAE0D0]'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              {/* Table or Contact Inputs */}
              {orderType === 'dine_in' ? (
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#5B3314]">Select Your Table:</label>
                  <select
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full p-2 bg-white border border-[#D5BE9B] rounded-xl text-xs font-semibold text-[#2B1607]"
                  >
                    <option value="Table 1 (Indoor AC Lounge)">Table 1 (Indoor AC Lounge)</option>
                    <option value="Table 2 (Window Seat)">Table 2 (Window Seat)</option>
                    <option value="Table 3 (Outdoor Garden Patio)">Table 3 (Outdoor Garden Patio)</option>
                    <option value="Table 4 (Cozy Reading Nook)">Table 4 (Cozy Reading Nook)</option>
                    <option value="Table 5 (Couple Booth)">Table 5 (Couple Booth)</option>
                  </select>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="p-2 bg-white border border-[#D5BE9B] rounded-xl text-xs font-semibold"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="p-2 bg-white border border-[#D5BE9B] rounded-xl text-xs font-semibold"
                  />
                </div>
              )}

              {/* Financial Breakdown */}
              <div className="space-y-1.5 text-xs text-[#5B3314] pt-1 border-t border-[#E3D4C0]">
                <div className="flex justify-between">
                  <span>Items Subtotal:</span>
                  <span className="font-bold text-[#2B1607]">₹{subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cafe GST (5%):</span>
                  <span className="font-bold text-[#2B1607]">₹{tax.toFixed(0)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount:</span>
                    <span>-₹{discount.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-[#2B1607] pt-2 border-t border-[#D5BE9B]">
                  <span>Total Amount:</span>
                  <span className="font-serif text-lg font-extrabold text-[#8C5628]">
                    ₹{total.toFixed(0)}
                  </span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 bg-[#5B3314] hover:bg-[#3D2512] text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <span>Place Order &amp; Generate Barista Ticket</span>
                <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>
          )}

        </div>
      </div>

      {/* Stamped Barista Receipt Modal */}
      {receiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FFFDF9] max-w-sm w-full p-6 rounded-3xl border-2 border-[#8C5628] shadow-2xl space-y-4 text-center relative font-mono text-xs text-[#2B1607]">
            
            <div className="flex items-center justify-center gap-2 text-emerald-700 font-bold text-sm">
              <Check className="w-5 h-5 bg-emerald-100 p-0.5 rounded-full" />
              <span>Order Received in Kitchen!</span>
            </div>

            <div className="border-b-2 border-dashed border-[#D5BE9B] pb-3">
              <h3 className="font-serif text-lg font-bold">The Black Cat Cafe 🐾</h3>
              <p className="text-[11px] text-stone-500">KOT ID: {receiptModal.orderId} • {receiptModal.time}</p>
              <p className="text-xs font-bold text-[#8C5628] mt-1">{receiptModal.orderType}</p>
            </div>

            <div className="space-y-1.5 text-left max-h-48 overflow-y-auto">
              {receiptModal.items.map((it) => (
                <div key={it.id} className="flex justify-between text-xs">
                  <span className="truncate max-w-[200px]">{it.name} x{it.quantity}</span>
                  <span className="font-bold">₹{it.price * it.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-dashed border-[#D5BE9B] pt-3 space-y-1 text-right font-bold">
              <div className="flex justify-between text-xs">
                <span>Total Bill (Incl. GST):</span>
                <span className="text-base text-[#8C5628]">₹{receiptModal.total.toFixed(0)}</span>
              </div>
            </div>

            <button
              onClick={handleFinishOrder}
              className="w-full py-3 bg-[#5B3314] text-white rounded-xl text-xs font-bold hover:bg-[#3D2512] transition-colors"
            >
              Done / Back to Cafe
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
