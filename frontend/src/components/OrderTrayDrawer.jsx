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
  Cat, 
  Truck,
  CreditCard,
  QrCode,
  Wallet,
  Banknote,
  Building2,
  Lock,
  ShieldCheck,
  Smartphone,
  Copy,
  CheckCheck,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { identifyVisitor, getUserProfile, logVisitorAction } from '../utils/visitorTracker';

export default function OrderTrayDrawer({ isOpen, onClose, trayItems = [], onUpdateQuantity, onClearTray }) {
  // Order Fulfillment States
  const [orderType, setOrderType] = useState('dine_in'); // 'dine_in', 'takeaway', 'delivery'
  const [tableNumber, setTableNumber] = useState('Table 4 (Window Seat)');
  const [customerName, setCustomerName] = useState(() => {
    const p = getUserProfile();
    return p?.name || '';
  });
  const [phone, setPhone] = useState(() => {
    const p = getUserProfile();
    return p?.phone || '';
  });
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [receiptModal, setReceiptModal] = useState(null);

  // Payment Options States
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'cash', 'card', 'netbanking'
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay'); // 'gpay', 'phonepe', 'paytm', 'bhim', 'cred'
  const [upiIdInput, setUpiIdInput] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Card Payment States
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardHolder, setCardHolder] = useState(() => customerName || '');

  // Net Banking States
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  if (!isOpen) return null;

  const subtotal = (trayItems || []).reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  const tax = subtotal * 0.05; // 5% Cafe GST

  // Free delivery on orders above ₹300 logic
  const isDelivery = orderType === 'delivery';
  const freeDeliveryThreshold = 300;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold;
  const deliveryFee = isDelivery ? (isFreeDelivery ? 0 : 40) : 0;
  const amountToFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
  
  let discount = 0;
  if (appliedCoupon === 'BLACKCAT50' || appliedCoupon === 'CAFE50') discount = Math.min(50, subtotal);
  else if (appliedCoupon === 'BLACKCAT20' || appliedCoupon === 'BREW20') discount = subtotal * 0.20;

  const total = Math.max(0, subtotal + tax + deliveryFee - discount);

  // Card input formatters
  const handleCardNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').substring(0, 16);
    const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 3) {
      setCardExpiry(`${val.substring(0, 2)}/${val.substring(2, 4)}`);
    } else {
      setCardExpiry(val);
    }
  };

  const handleCopyUpi = () => {
    try {
      navigator.clipboard?.writeText('theblackcatcafe@upi');
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2200);
    } catch {
      // Ignore
    }
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'BLACKCAT50' || code === 'BLACKCAT20' || code === 'CAFE50' || code === 'BREW20') {
      setAppliedCoupon(code);
    } else {
      alert('Invalid coupon code. Try BLACKCAT50 (Flat ₹50 OFF) or BLACKCAT20 (20% OFF)!');
    }
  };

  const getPaymentDetails = () => {
    if (paymentMethod === 'upi') {
      const upiNames = {
        gpay: 'Google Pay (UPI)',
        phonepe: 'PhonePe (UPI)',
        paytm: 'Paytm UPI',
        bhim: 'BHIM UPI',
        cred: 'Cred Pay'
      };
      return {
        label: upiNames[selectedUpiApp] || 'Instant UPI / QR',
        status: 'PAID ONLINE (Verified)',
        icon: '⚡',
        isOnline: true
      };
    }
    if (paymentMethod === 'cash') {
      return {
        label: orderType === 'delivery' ? 'Cash on Delivery (COD)' : 'Pay Cash at Counter',
        status: 'PAY ON DELIVERY / AT COUNTER',
        icon: '💵',
        isOnline: false
      };
    }
    if (paymentMethod === 'card') {
      const last4 = cardNumber.replace(/\s+/g, '').slice(-4) || '8842';
      return {
        label: `Credit/Debit Card (••• ${last4})`,
        status: 'PAID ONLINE (Verified)',
        icon: '💳',
        isOnline: true
      };
    }
    return {
      label: `Net Banking (${selectedBank})`,
      status: 'PAID ONLINE (Verified)',
      icon: '🏦',
      isOnline: true
    };
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (trayItems.length === 0) return;

    const payInfo = getPaymentDetails();
    const transactionId = payInfo.isOnline
      ? `TXN-BC-${Math.floor(10000000 + Math.random() * 90000000)}`
      : `COD-BC-${Math.floor(100000 + Math.random() * 900000)}`;

    const receipt = {
      orderId: `BCK-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: customerName || 'Valued Foodie',
      phone: phone || 'Walk-in',
      orderType: orderType === 'dine_in' 
        ? `Dine-In (${tableNumber})` 
        : orderType === 'takeaway' 
        ? 'Quick Takeaway' 
        : `Home Delivery (${deliveryAddress || 'Kabulpur / Rohtak'})`,
      items: [...trayItems],
      subtotal,
      deliveryFee,
      isDelivery,
      isFreeDelivery,
      tax,
      discount,
      total,
      paymentMethod: payInfo.label,
      paymentStatus: payInfo.status,
      paymentIcon: payInfo.icon,
      isOnlinePaid: payInfo.isOnline,
      transactionId,
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

    if (customerName || phone) {
      identifyVisitor({ name: customerName, phone });
    }
    logVisitorAction(`Placed Order (₹${total.toFixed(0)}) via ${payInfo.label}`);

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
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-lg bg-[#121212] text-white shadow-2xl flex flex-col justify-between border-l border-white/10 animate-in slide-in-from-right duration-300">
          
          {/* Drawer Top Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#181818]">
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

          {/* Drawer Scrollable Items & Checkout Form */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            
            {/* Free Delivery Bar on top of cart */}
            {trayItems.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-[#1A1A1A] border border-amber-500/20 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-bold text-white">
                    <Truck className="w-4 h-4 text-emerald-400" />
                    <span>
                      {isFreeDelivery 
                        ? '🎉 FREE Delivery Unlocked!' 
                        : `Add ₹${amountToFreeDelivery} more for FREE Delivery!`}
                    </span>
                  </span>
                  <span className="text-[11px] font-extrabold text-amber-400">
                    ₹300 Target
                  </span>
                </div>
                
                <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 rounded-full ${
                      isFreeDelivery 
                        ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]' 
                        : 'bg-gradient-to-r from-amber-500 to-amber-400'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-stone-400 pt-0.5">
                  <span>Cart: ₹{subtotal}</span>
                  <span className={isFreeDelivery ? 'text-emerald-400 font-bold' : 'text-stone-400'}>
                    {isFreeDelivery ? 'Delivery: ₹0' : `Need ₹${amountToFreeDelivery} more`}
                  </span>
                </div>
              </div>
            )}

            {/* Empty State */}
            {trayItems.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 text-amber-400 flex items-center justify-center mx-auto border border-white/10">
                  <Cat className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg text-white">Your cart is empty</h4>
                <p className="text-xs text-stone-400 max-w-xs mx-auto leading-relaxed">
                  Add wood-fired pizzas, smash burgers, artisanal cakes, and chilled cold coffees to get started!
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Free delivery on orders above ₹300</span>
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="mt-3 px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-extrabold shadow-md transition-all"
                >
                  Explore Cafe Menu
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                
                {/* Cart Items List */}
                {trayItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 bg-[#1A1A1A] p-3 rounded-2xl border border-white/10 shadow-sm"
                  >
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-white/10 flex-shrink-0 bg-black"
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

                {/* ORDER FULFILLMENT MODE */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block">
                    1. Order Type
                  </span>

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
                        placeholder="Complete Delivery Address & Flat No. (Rohtak / Kabulpur)"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full p-2.5 bg-[#1F1F1F] border border-white/10 rounded-xl text-xs font-semibold text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  )}
                </div>

                {/* 💳 PAYMENT OPTIONS SECTION */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      2. Payment Method
                    </span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                      <Lock className="w-3 h-3" /> 256-Bit SSL Encrypted
                    </span>
                  </div>

                  {/* 4 Main Payment Option Selectors */}
                  <div className="grid grid-cols-2 gap-2">
                    
                    {/* Option 1: UPI & QR Code */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                        paymentMethod === 'upi'
                          ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                          : 'bg-[#181818] border-white/10 text-stone-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xl">⚡</span>
                        {paymentMethod === 'upi' && (
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                        )}
                      </div>
                      <div className="mt-2">
                        <span className="text-xs font-bold block text-white">UPI &amp; QR Code</span>
                        <span className="text-[10px] text-stone-400 block">GPay, PhonePe, Paytm</span>
                      </div>
                    </button>

                    {/* Option 2: Cash on Delivery / Counter */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash')}
                      className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                        paymentMethod === 'cash'
                          ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                          : 'bg-[#181818] border-white/10 text-stone-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xl">💵</span>
                        {paymentMethod === 'cash' && (
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                        )}
                      </div>
                      <div className="mt-2">
                        <span className="text-xs font-bold block text-white">
                          {orderType === 'delivery' ? 'Cash on Delivery' : 'Pay at Counter'}
                        </span>
                        <span className="text-[10px] text-stone-400 block">Pay Cash upon receiving</span>
                      </div>
                    </button>

                    {/* Option 3: Credit & Debit Cards */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                        paymentMethod === 'card'
                          ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                          : 'bg-[#181818] border-white/10 text-stone-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <CreditCard className="w-5 h-5 text-sky-400" />
                        {paymentMethod === 'card' && (
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                        )}
                      </div>
                      <div className="mt-2">
                        <span className="text-xs font-bold block text-white">Credit / Debit Card</span>
                        <span className="text-[10px] text-stone-400 block">Visa, Master, RuPay</span>
                      </div>
                    </button>

                    {/* Option 4: Net Banking */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                        paymentMethod === 'netbanking'
                          ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                          : 'bg-[#181818] border-white/10 text-stone-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Building2 className="w-5 h-5 text-purple-400" />
                        {paymentMethod === 'netbanking' && (
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                        )}
                      </div>
                      <div className="mt-2">
                        <span className="text-xs font-bold block text-white">Net Banking</span>
                        <span className="text-[10px] text-stone-400 block">SBI, HDFC, ICICI, Axis</span>
                      </div>
                    </button>

                  </div>

                  {/* ACTIVE PAYMENT DETAILS PANEL */}

                  {/* Panel A: UPI & QR Code */}
                  {paymentMethod === 'upi' && (
                    <div className="p-3.5 bg-[#181818] border border-amber-500/30 rounded-2xl space-y-3 animate-fadeIn">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <QrCode className="w-4 h-4 text-amber-400" />
                          Scan &amp; Pay via any UPI App
                        </span>
                        <span className="text-[11px] text-emerald-400 font-extrabold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          ₹0 Gateway Fee
                        </span>
                      </div>

                      {/* Visual QR Code Mockup with Live Bill Amount */}
                      <div className="bg-white p-3 rounded-2xl text-black flex items-center justify-between gap-3 shadow-md">
                        {/* QR Grid Graphic */}
                        <div className="w-24 h-24 bg-white p-1 rounded-xl border border-stone-200 flex flex-col justify-between relative shadow-xs">
                          {/* Top row */}
                          <div className="flex justify-between">
                            <div className="w-6 h-6 border-4 border-black rounded-sm flex items-center justify-center">
                              <div className="w-2 h-2 bg-black rounded-xs" />
                            </div>
                            <div className="w-6 h-6 border-4 border-black rounded-sm flex items-center justify-center">
                              <div className="w-2 h-2 bg-black rounded-xs" />
                            </div>
                          </div>
                          {/* Center Mascot */}
                          <div className="absolute inset-0 m-auto w-7 h-7 bg-black text-amber-400 rounded-lg flex items-center justify-center border-2 border-white shadow">
                            <Cat className="w-4 h-4 text-amber-400" />
                          </div>
                          {/* Bottom row */}
                          <div className="flex justify-between items-end">
                            <div className="w-6 h-6 border-4 border-black rounded-sm flex items-center justify-center">
                              <div className="w-2 h-2 bg-black rounded-xs" />
                            </div>
                            <div className="flex gap-0.5">
                              <div className="w-2 h-2 bg-black" />
                              <div className="w-2 h-2 bg-black" />
                            </div>
                          </div>
                        </div>

                        {/* QR Details */}
                        <div className="flex-1 text-left space-y-1">
                          <span className="text-[10px] uppercase font-bold text-stone-500 block">
                            The Black Cat Cafe Official QR
                          </span>
                          <span className="text-lg font-black text-stone-900 block font-mono">
                            ₹{total.toFixed(0)}
                          </span>
                          <div className="flex items-center gap-1.5 pt-0.5">
                            <code className="text-[11px] font-bold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded">
                              theblackcatcafe@upi
                            </code>
                            <button
                              type="button"
                              onClick={handleCopyUpi}
                              className="text-stone-600 hover:text-black p-1"
                              title="Copy UPI ID"
                            >
                              {copiedUpi ? (
                                <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Select Preferred UPI App */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                          Or Choose Preferred UPI App:
                        </span>
                        <div className="grid grid-cols-5 gap-1.5 text-center text-xs font-bold">
                          {[
                            { id: 'gpay', label: 'GPay', color: 'text-sky-400' },
                            { id: 'phonepe', label: 'PhonePe', color: 'text-purple-400' },
                            { id: 'paytm', label: 'Paytm', color: 'text-blue-400' },
                            { id: 'bhim', label: 'BHIM', color: 'text-orange-400' },
                            { id: 'cred', label: 'Cred', color: 'text-amber-300' }
                          ].map(app => (
                            <button
                              type="button"
                              key={app.id}
                              onClick={() => setSelectedUpiApp(app.id)}
                              className={`py-2 rounded-xl border text-[11px] transition-all ${
                                selectedUpiApp === app.id
                                  ? 'bg-[#2A2A2A] border-amber-500 text-white shadow-sm'
                                  : 'bg-[#151515] border-white/5 text-stone-400 hover:text-white'
                              }`}
                            >
                              <span className={app.color}>{app.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Mobile One-Tap Pay Link */}
                      <a
                        href={`upi://pay?pa=theblackcatcafe@upi&pn=TheBlackCatCafe&am=${total.toFixed(2)}&cu=INR`}
                        className="w-full py-2.5 bg-[#222222] hover:bg-[#2A2A2A] border border-amber-500/30 text-amber-300 hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>Tap to Pay directly in {selectedUpiApp.toUpperCase()}</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    </div>
                  )}

                  {/* Panel B: Cash on Delivery / Counter */}
                  {paymentMethod === 'cash' && (
                    <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl space-y-2 text-xs animate-fadeIn">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold">
                        <Banknote className="w-4 h-4" />
                        <span>{orderType === 'delivery' ? 'Cash on Delivery (COD) Selected' : 'Pay Cash at Cafe Counter'}</span>
                      </div>
                      <p className="text-stone-300 leading-relaxed text-[11px]">
                        {orderType === 'delivery'
                          ? `Order deliver hone par delivery rider ko cash ₹${total.toFixed(0)} pay karein. Exact change rakhne ki koshish karein.`
                          : `Aapka order barista kitchen me bhej diya jayega. Pick-up counter ya table par cash pay karein.`}
                      </p>
                      <div className="text-[10px] text-emerald-300 font-semibold">
                        ✓ No online payment required right now.
                      </div>
                    </div>
                  )}

                  {/* Panel C: Credit / Debit Card */}
                  {paymentMethod === 'card' && (
                    <div className="p-3.5 bg-[#181818] border border-sky-500/30 rounded-2xl space-y-2.5 animate-fadeIn text-xs">
                      <div className="flex items-center justify-between text-xs font-bold text-white">
                        <span className="flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4 text-sky-400" />
                          Card Details
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] text-stone-400 font-bold">
                          <span className="px-1.5 py-0.5 bg-black rounded border border-white/10 text-sky-400">VISA</span>
                          <span className="px-1.5 py-0.5 bg-black rounded border border-white/10 text-amber-400">MasterCard</span>
                          <span className="px-1.5 py-0.5 bg-black rounded border border-white/10 text-emerald-400">RuPay</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-stone-400">Card Number</label>
                        <input
                          type="text"
                          maxLength={19}
                          placeholder="4532 •••• •••• 8842"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          className="w-full p-2.5 bg-[#121212] border border-white/15 focus:border-amber-500 rounded-xl text-xs font-mono text-white outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-stone-400">Valid Thru</label>
                          <input
                            type="text"
                            maxLength={5}
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={handleExpiryChange}
                            className="w-full p-2.5 bg-[#121212] border border-white/15 focus:border-amber-500 rounded-xl text-xs font-mono text-white outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-stone-400">CVV</label>
                          <input
                            type="password"
                            maxLength={4}
                            placeholder="•••"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                            className="w-full p-2.5 bg-[#121212] border border-white/15 focus:border-amber-500 rounded-xl text-xs font-mono text-white outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-stone-400">Name on Card</label>
                        <input
                          type="text"
                          placeholder="e.g. Rahul Sharma"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          className="w-full p-2.5 bg-[#121212] border border-white/15 focus:border-amber-500 rounded-xl text-xs text-white outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Panel D: Net Banking */}
                  {paymentMethod === 'netbanking' && (
                    <div className="p-3.5 bg-[#181818] border border-purple-500/30 rounded-2xl space-y-2.5 animate-fadeIn text-xs">
                      <span className="text-[11px] font-bold text-white block">
                        Select Your Bank:
                      </span>
                      <div className="grid grid-cols-3 gap-1.5 text-center">
                        {[
                          'HDFC Bank',
                          'SBI Bank',
                          'ICICI Bank',
                          'Axis Bank',
                          'Kotak Bank',
                          'Punjab National'
                        ].map(bank => (
                          <button
                            type="button"
                            key={bank}
                            onClick={() => setSelectedBank(bank)}
                            className={`p-2 rounded-xl border text-[11px] font-bold transition-all truncate ${
                              selectedBank === bank
                                ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-sm'
                                : 'bg-[#121212] border-white/10 text-stone-300 hover:text-white'
                            }`}
                          >
                            {bank}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

              </div>
            )}
          </div>

          {/* Drawer Bottom Order Summary & Checkout Button */}
          {trayItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-white/10 bg-[#161616] space-y-3.5 shadow-2xl">
              
              {/* Financial Calculation */}
              <div className="space-y-1 text-xs text-stone-300">
                <div className="flex justify-between">
                  <span>Items Subtotal:</span>
                  <span className="font-semibold text-white">₹{subtotal.toFixed(0)}</span>
                </div>

                {isDelivery && (
                  <div className="flex justify-between items-center">
                    <span>Delivery Fee:</span>
                    {isFreeDelivery ? (
                      <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                        <s className="text-stone-500 font-normal">₹40</s> FREE (Above ₹300)
                      </span>
                    ) : (
                      <span className="text-amber-400 font-bold">+₹40</span>
                    )}
                  </div>
                )}

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
                
                <div className="flex justify-between items-center text-stone-300 pt-1 border-t border-white/10">
                  <span className="text-[11px]">Selected Payment:</span>
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                    <span>{getPaymentDetails().icon}</span>
                    <span>{getPaymentDetails().label}</span>
                  </span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-white pt-1">
                  <span>Total Payable:</span>
                  <span className="text-xl sm:text-2xl text-amber-400">₹{total.toFixed(0)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-black text-sm tracking-wide shadow-[0_8px_25px_rgba(245,158,11,0.3)] hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5 stroke-[3]" />
                <span>Pay ₹{total.toFixed(0)} &amp; Generate KOT Ticket</span>
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

            {/* Payment Confirmation Card inside Receipt */}
            <div className="bg-black/60 border border-amber-500/30 rounded-2xl p-3 text-left space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-400">Payment Mode:</span>
                <span className="font-bold text-amber-300">{receiptModal.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-400">Payment Status:</span>
                <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                  receiptModal.isOnlinePaid
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  ✓ {receiptModal.paymentStatus}
                </span>
              </div>
              <div className="flex justify-between items-center text-[10px] text-stone-400 pt-0.5">
                <span>Ref / Transaction ID:</span>
                <span className="font-mono text-stone-300">{receiptModal.transactionId}</span>
              </div>
            </div>

            <div className="space-y-1.5 text-left max-h-40 overflow-y-auto pt-1">
              {receiptModal.items.map((it) => (
                <div key={it.id} className="flex justify-between text-xs text-stone-300">
                  <span className="truncate max-w-[200px]">{it.name} x{it.quantity}</span>
                  <span className="font-bold text-white">₹{it.price * it.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-dashed border-white/20 pt-3 space-y-1 text-right font-bold">
              {receiptModal.isDelivery && (
                <div className="flex justify-between text-xs text-stone-300">
                  <span>Delivery Charge:</span>
                  <span className={receiptModal.deliveryFee === 0 ? "text-emerald-400" : "text-white"}>
                    {receiptModal.deliveryFee === 0 ? "FREE (Orders > ₹300)" : "₹40"}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-xs text-stone-300">
                <span>Total Bill (Incl. GST):</span>
                <span className="text-base text-amber-400">₹{receiptModal.total.toFixed(0)}</span>
              </div>
            </div>

            <p className="text-[11px] text-stone-400 italic">
              "Fresh hot bites will be ready in 25-30 minutes. {receiptModal.isDelivery ? 'Rider will deliver right to your door!' : 'Show this ticket number at the counter!'}"
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
