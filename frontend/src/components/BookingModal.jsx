import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Navigation, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';

const TIME_SLOTS = [
  { id: 'slot-1', label: '09:00 AM - 11:00 AM', period: 'Morning' },
  { id: 'slot-2', label: '11:00 AM - 01:00 PM', period: 'Morning' },
  { id: 'slot-3', label: '01:30 PM - 03:30 PM', period: 'Afternoon' },
  { id: 'slot-4', label: '03:30 PM - 05:00 PM', period: 'Afternoon' },
  { id: 'slot-5', label: '05:00 PM - 07:00 PM', period: 'Evening' },
];

export default function BookingModal({
  isOpen,
  onClose,
  cart,
  couponCode,
  onBookingSuccess,
  onOpenTrackerWithBooking
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Form State
  const todayStr = new Date().toISOString().split('T')[0];
  const [scheduledDate, setScheduledDate] = useState(todayStr);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[2].label);

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [city, setCity] = useState('New Delhi');
  const [pincode, setPincode] = useState('110049');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  // Subtotal & Financial calculation (Services + Shopping Products)
  const subtotal = cart.reduce((sum, item) => {
    const price = item.type === 'product'
      ? parseFloat(item.product.effective_price)
      : parseFloat(item.service.effective_price);
    return sum + (price * item.quantity);
  }, 0);
  const visitFee = subtotal >= 499 || subtotal === 0 ? 0 : 49;
  const tax = subtotal > 0 ? (subtotal * 0.18) : 0;
  let discount = 0;
  if (couponCode === 'GLOW100') discount = Math.min(100, subtotal);
  else if (couponCode === 'GLOW20') discount = subtotal * 0.20;
  else if (couponCode === 'FIRSTBEAUTY') discount = Math.min(150, subtotal);
  const totalCost = Math.max(0, subtotal + visitFee + tax - discount);

  const handleSubmitBooking = async () => {
    setErrorMessage('');
    if (!customerName || !customerPhone || !customerAddress || !pincode) {
      setErrorMessage('Please fill in your name, mobile number, home address, and pincode.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_email: customerEmail,
        customer_address: customerAddress,
        city: city,
        pincode: pincode,
        notes: notes,
        scheduled_date: scheduledDate,
        time_slot: timeSlot,
        coupon_code: couponCode,
        items: cart.filter(item => item.type !== 'product' && item.service).map(item => ({
          service_id: item.service.id,
          quantity: item.quantity
        }))
      };

      const result = await api.createBooking(payload);
      setConfirmedBooking(result);
      setCurrentStep(4);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback gracefully
      }

      onBookingSuccess(result);
    } catch (err) {
      console.error(err);
      setErrorMessage(
        err.detail || 'Could not schedule booking. Please verify your details and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setConfirmedBooking(null);
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-rose-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-parlour-900 via-parlour-800 to-parlour-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-300" />
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-200">
                Home Consultant Appointment
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold mt-0.5">
              {currentStep === 4 ? 'Booking Confirmed! 🎉' : 'Schedule Your Home Salon Visit'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper indicator (steps 1 to 3) */}
        {currentStep < 4 && (
          <div className="px-6 py-3 bg-rose-50/60 border-b border-rose-100 flex items-center justify-between text-xs font-medium text-gray-500">
            <span className={currentStep === 1 ? 'text-parlour-700 font-bold' : ''}>
              1. Review Bill
            </span>
            <span>→</span>
            <span className={currentStep === 2 ? 'text-parlour-700 font-bold' : ''}>
              2. Date & Time
            </span>
            <span>→</span>
            <span className={currentStep === 3 ? 'text-parlour-700 font-bold' : ''}>
              3. Home Address
            </span>
          </div>
        )}

        {/* Body content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium">
              ⚠️ {errorMessage}
            </div>
          )}

          {/* STEP 1: REVIEW SERVICES & BILL */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 text-sm">
                Selected Beauty Items ({cart.length})
              </h4>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {cart.map((item) => {
                  const isProd = item.type === 'product';
                  const name = isProd ? item.product.name : item.service.name;
                  const price = isProd ? item.product.effective_price : item.service.effective_price;
                  const subtitle = isProd ? `${item.product.brand} • ${item.product.size_or_weight}` : `${item.service.duration_minutes} mins`;
                  const key = isProd ? `prod-${item.product.id}` : `svc-${item.service.id}`;

                  return (
                    <div
                      key={key}
                      className="p-3 bg-gray-50 rounded-xl flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                            isProd ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {isProd ? 'Product' : 'Service'}
                          </span>
                          <h5 className="font-bold text-gray-800 truncate max-w-[200px] sm:max-w-xs">{name}</h5>
                        </div>
                        <span className="text-gray-400 text-[11px]">
                          {subtitle} × {item.quantity}
                        </span>
                      </div>
                      <span className="font-bold text-gray-900">
                        ₹{(price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Cost Summary Box */}
              <div className="p-4 bg-rose-50/80 rounded-2xl border border-rose-100 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Services Subtotal:</span>
                  <span className="font-semibold text-gray-900">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Home Visit & Travel Fee:</span>
                  <span className="font-semibold text-emerald-700">
                    {visitFee === 0 ? 'FREE' : `₹${visitFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes (18% GST):</span>
                  <span className="font-semibold text-gray-900">₹{tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon ({couponCode}):</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-rose-200 flex justify-between items-baseline font-bold">
                  <span className="text-sm text-gray-900">Total Payable at Home:</span>
                  <span className="text-xl text-parlour-700">₹{totalCost.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: DATE & TIME SLOT */}
          {currentStep === 2 && (
            <div className="space-y-5">
              
              {/* Date Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-parlour-600" />
                  Select Date for Home Visit
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-parlour-500"
                />
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-2 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-parlour-600" />
                  Select Preferred Arrival Time Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = timeSlot === slot.label;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setTimeSlot(slot.label)}
                        className={`p-3 rounded-2xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-parlour-800 text-white border-parlour-800 shadow-sm'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-parlour-300'
                        }`}
                      >
                        <div>
                          <span className="block font-bold">{slot.label}</span>
                          <span className={`text-[10px] ${isSelected ? 'text-rose-200' : 'text-gray-400'}`}>
                            {slot.period} Slot
                          </span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-gold-300" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl text-xs text-amber-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>
                  Consultant arrives 10 mins prior to set up sanitized disposable bedding & mirror.
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: CUSTOMER DETAILS & HOME ADDRESS */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Priya Sharma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-parlour-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Mobile Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-parlour-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Email Address (Optional for Invoice)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="e.g. priya@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-parlour-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Home / Flat Address & Landmark *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <textarea
                    rows={2}
                    placeholder="House/Flat No, Apartment/Society Name, Street, Landmark..."
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-parlour-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-parlour-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Pincode *</label>
                  <input
                    type="text"
                    placeholder="e.g. 110049"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-parlour-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Skin / Hair Notes for Home Consultant (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sensitive skin, bride-to-be, prefer gentle pressure..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-parlour-500"
                />
              </div>

            </div>
          )}

          {/* STEP 4: CONFIRMATION & LIVE TRACKING CTA */}
          {currentStep === 4 && confirmedBooking && (
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Appointment Confirmed
                </span>
                <h4 className="font-serif text-2xl font-bold text-gray-900 mt-2">
                  Thank You, {confirmedBooking.customer_name}!
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Booking Reference ID: <strong className="text-parlour-700 text-sm font-mono">{confirmedBooking.booking_ref}</strong>
                </p>
              </div>

              {/* Consultant Card */}
              {confirmedBooking.consultant && (
                <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 max-w-md mx-auto flex items-center gap-4 text-left">
                  <img
                    src={confirmedBooking.consultant.photo_url}
                    alt={confirmedBooking.consultant.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-parlour-600">Assigned Consultant</span>
                    <h5 className="font-bold text-sm text-gray-900">{confirmedBooking.consultant.name}</h5>
                    <p className="text-xs text-gray-500">{confirmedBooking.consultant.role}</p>
                    <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                      ⭐ {confirmedBooking.consultant.rating} • {confirmedBooking.consultant.total_consultations}+ Appointments
                    </p>
                  </div>
                </div>
              )}

              {/* Total Cost Bill summary */}
              <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200 max-w-md mx-auto text-xs flex justify-between items-center">
                <span className="text-gray-600">Total Billed:</span>
                <span className="font-bold text-base text-gray-900">
                  ₹{parseFloat(confirmedBooking.total_cost).toFixed(2)}
                </span>
              </div>

              {/* Live Tracking CTA */}
              <div className="pt-2 max-w-md mx-auto space-y-2">
                <button
                  onClick={() => {
                    handleClose();
                    onOpenTrackerWithBooking(confirmedBooking.booking_ref);
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-parlour-700 to-rose-600 hover:from-parlour-800 hover:to-rose-700 text-white font-bold rounded-2xl shadow-lg shadow-rose-900/20 flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4 animate-pulse" />
                  <span>Track Consultant Live on Map</span>
                </button>
                <button
                  onClick={handleClose}
                  className="w-full py-2.5 text-xs text-gray-500 hover:text-gray-800 font-medium"
                >
                  Back to Home Page
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        {currentStep < 4 && (
          <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            ) : <div></div>}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-2.5 bg-parlour-800 hover:bg-parlour-900 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmitBooking}
                className="px-8 py-3 bg-gradient-to-r from-parlour-700 to-rose-600 hover:from-parlour-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-rose-900/15 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Scheduling Consultant...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-gold-300" />
                    <span>Confirm & Book Appointment</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
