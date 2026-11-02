import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Coffee, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderTrayDrawer({ isOpen, onClose, trayItems, onUpdateQuantity, onClearTray }) {
  const [orderType, setOrderType] = useState('dine_in'); // dine_in or pickup
  const [tableNumber, setTableNumber] = useState('Table 4 (Window Nook)');
  const [customerName, setCustomerName] = useState('');
  const [receiptModal, setReceiptModal] = useState(null);

  if (!isOpen) return null;

  const subtotal = trayItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.0825; // 8.25% tax
  const total = subtotal + tax;

  const handleCheckout = (e) => {
    e.preventDefault();
    if (trayItems.length === 0) return;

    const receipt = {
      orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: customerName || 'Valued Reader',
      orderType: orderType === 'dine_in' ? `Dine-In (${tableNumber})` : 'Counter Pickup (To-Go)',
      items: [...trayItems],
      subtotal,
      tax,
      total,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.5 }
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
              <div className="w-9 h-9 rounded-xl bg-[#8C5628] flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5 text-[#FAF5EB]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#2B1607]">Your Cafe Tray</h3>
                <span className="text-xs text-[#8C5628] font-medium">
                  {trayItems.reduce((s, i) => s + i.quantity, 0)} {trayItems.length === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-500 hover:text-stone-800 hover:bg-[#EFE3D0]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Scrollable Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {trayItems.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <Coffee className="w-12 h-12 text-[#9E7A50] mx-auto opacity-70" />
                <h4 className="font-serif text-lg font-bold text-[#3D2512]">Your tray is empty</h4>
                <p className="text-xs text-[#7B5A34] max-w-xs mx-auto">
                  Browse our Artisan Menu and select a pour-over or fresh almond croissant to begin your literary order.
                </p>
                <button
                  onClick={onClose}
                  className="mt-3 px-5 py-2.5 rounded-full bg-[#5B3314] text-white text-xs font-semibold"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {trayItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 bg-[#FFFDF9] p-3 rounded-2xl border border-[#E3D4C0] shadow-sm"
                  >
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-[#D5BE9B]"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-[#2B1607] truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#8C5628] font-semibold mt-0.5">
                        ${Number(item.price).toFixed(2)} each
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-[#D5BE9B] rounded-lg bg-[#FAF5EB] overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-[#E2D4BF] text-stone-700"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#2B1607]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-[#E2D4BF] text-stone-700"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onUpdateQuantity(item.id, 0)}
                        className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Bottom Controls & Checkout */}
          {trayItems.length > 0 && (
            <div className="p-5 border-t border-[#E3D4C0] bg-[#FFFDF9] space-y-4">
              
              {/* Order Service Selection */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A3D20]">
                  Order Method
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setOrderType('dine_in')}
                    className={`py-2 px-3 rounded-xl font-semibold border text-center transition-all ${
                      orderType === 'dine_in'
                        ? 'bg-[#5B3314] text-white border-[#5B3314]'
                        : 'bg-[#FAF5EB] text-[#5A3D20] border-[#D5BE9B]'
                    }`}
                  >
                    📖 Table Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`py-2 px-3 rounded-xl font-semibold border text-center transition-all ${
                      orderType === 'pickup'
                        ? 'bg-[#5B3314] text-white border-[#5B3314]'
                        : 'bg-[#FAF5EB] text-[#5A3D20] border-[#D5BE9B]'
                    }`}
                  >
                    ☕ Counter Pickup
                  </button>
                </div>
              </div>

              {orderType === 'dine_in' && (
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-[#7B5A34]">Your Table or Nook:</label>
                  <select
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full text-xs px-3 py-1.5 rounded-lg bg-[#FAF5EB] border border-[#D5BE9B] text-[#3D2512]"
                  >
                    <option value="Table 1 (Window Nook)">Table 1 (Window Nook)</option>
                    <option value="Table 4 (Fireplace Hearth)">Table 4 (Fireplace Hearth)</option>
                    <option value="Table 7 (Grand Library Wall)">Table 7 (Grand Library Wall)</option>
                    <option value="Table 12 (Patio Garden)">Table 12 (Patio Garden)</option>
                    <option value="Communal Table (Seat 3)">Communal Table (Seat 3)</option>
                  </select>
                </div>
              )}

              {/* Cost Summary */}
              <div className="space-y-1.5 text-xs text-[#5A3D20] pt-2 border-t border-[#F2E8D7]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-[#2B1607]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8.25%):</span>
                  <span className="font-semibold text-[#2B1607]">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#2B1607] pt-1 border-t border-[#F2E8D7]">
                  <span>Total Amount:</span>
                  <span className="font-serif text-base text-[#8C5628]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit Order Action */}
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-full bg-[#5B3314] text-[#FAF5EB] font-serif font-bold text-sm hover:bg-[#3D2512] shadow-warm flex items-center justify-center gap-2 transition-all"
              >
                <span>Send Order to Barista</span>
                <ArrowRight className="w-4 h-4 text-[#D7BA89]" />
              </button>

            </div>
          )}

        </div>
      </div>

      {/* Stamped Receipt Confirmation Modal */}
      {receiptModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF5EB] rounded-3xl max-w-sm w-full p-6 border-2 border-dashed border-[#BA8748] shadow-2xl space-y-4 text-center">
            
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#BA8748]">
                Order Sent to Barista Station
              </span>
              <h4 className="font-serif text-xl font-bold text-[#2B1607]">
                Books &amp; Brews Ticket
              </h4>
              <p className="text-xs text-[#7B5A34]">
                Ticket #{receiptModal.orderId} • Placed at {receiptModal.time}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#E3D4C0] text-left text-xs space-y-2">
              <div className="flex justify-between font-semibold text-[#3D2512] border-b pb-1">
                <span>{receiptModal.orderType}</span>
                <span>${receiptModal.total.toFixed(2)}</span>
              </div>
              <div className="space-y-1 text-stone-600">
                {receiptModal.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{it.quantity}x {it.name}</span>
                    <span>${(it.price * it.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-[#5A3D20] italic font-serif">
              "Your barista is preparing your drinks. Relax, turn the page, and we will bring everything to you shortly."
            </p>

            <button
              onClick={handleFinishOrder}
              className="w-full py-2.5 rounded-full bg-[#5B3314] text-white text-xs font-semibold hover:bg-[#3D2512]"
            >
              Done &amp; Enjoy Reading
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
