import React, { useEffect, useState, useRef } from 'react';
import { 
  Navigation, 
  MapPin, 
  PhoneCall, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Search, 
  RefreshCw, 
  AlertCircle, 
  Sparkles, 
  UserCheck, 
  Car, 
  Play 
} from 'lucide-react';
import L from 'leaflet';
import { api } from '../services/api';

const STATUS_STEPS = [
  { index: 0, key: 'CONFIRMED', label: 'Booking Confirmed', desc: 'Kit prepared & sanitized' },
  { index: 1, key: 'ASSIGNED', label: 'Consultant Assigned', desc: 'Expert geared up' },
  { index: 2, key: 'ON_THE_WAY', label: 'On The Way', desc: 'Live GPS transit' },
  { index: 3, key: 'ARRIVED', label: 'Arrived at Home', desc: 'At your doorstep' },
  { index: 4, key: 'IN_PROGRESS', label: 'Service in Progress', desc: 'Treatment underway' },
  { index: 5, key: 'COMPLETED', label: 'Completed', desc: 'Service finished' },
];

export default function LiveTracker({ initialBookingRef = 'GLOW-DEMO1', onClose }) {
  const [bookingRefInput, setBookingRefInput] = useState(initialBookingRef);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);

  // Map references
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const consultantMarkerRef = useRef(null);
  const customerMarkerRef = useRef(null);
  const polylineRef = useRef(null);

  // Fetch Booking Data
  const loadBooking = async (ref) => {
    if (!ref) return;
    setLoading(true);
    setError('');
    try {
      const data = await api.getBookingDetail(ref);
      setBooking(data);
    } catch (err) {
      console.error(err);
      setError(`No booking found with ID "${ref}". Try using "GLOW-DEMO1" for the demo.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooking(initialBookingRef);
  }, [initialBookingRef]);

  // Simulate Next Step
  const handleSimulateStep = async () => {
    if (!booking) return;
    setIsSimulating(true);
    try {
      const result = await api.simulateBookingStep(booking.booking_ref);
      setBooking(result.booking);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSimulating(false);
    }
  };

  // Initialize and Update Leaflet Map
  useEffect(() => {
    if (!booking || !mapContainerRef.current) return;

    const custLat = booking.customer_lat || 28.6139;
    const custLng = booking.customer_lng || 77.2090;
    const consLat = booking.consultant_lat || (custLat + 0.015);
    const consLng = booking.consultant_lng || (custLng + 0.012);

    // Initialize Map if not yet created
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [(custLat + consLat) / 2, (custLng + consLng) / 2],
        zoom: 14,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Custom Customer Marker (House icon)
    const customerHtml = `
      <div style="background:#400c19;color:white;width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.3);border:3px solid white;">
        🏠
      </div>
    `;
    const customerIcon = L.divIcon({
      html: customerHtml,
      className: 'custom-customer-pin',
      iconSize: [38, 38],
      iconAnchor: [19, 19],
    });

    if (customerMarkerRef.current) {
      customerMarkerRef.current.setLatLng([custLat, custLng]);
    } else {
      customerMarkerRef.current = L.marker([custLat, custLng], { icon: customerIcon })
        .addTo(map)
        .bindPopup(`<b>Your Home</b><br/>${booking.customer_address}`);
    }

    // Custom Consultant Moving Marker (Rose Gold Scooter/Bag)
    const consultantPhoto = booking.consultant?.photo_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100';
    const consultantHtml = `
      <div style="position:relative;width:44px;height:44px;">
        <div style="width:44px;height:44px;border-radius:50%;overflow:hidden;border:3px solid #d95372;box-shadow:0 0 15px rgba(217,83,114,0.6);background:white;">
          <img src="${consultantPhoto}" style="width:100%;height:100%;object-fit:cover;" />
        </div>
        <div style="position:absolute;bottom:-4px;right:-4px;background:#cf9b22;color:black;border-radius:50%;width:18px;height:18px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:bold;border:2px solid white;">
          🛵
        </div>
      </div>
    `;
    const consultantIcon = L.divIcon({
      html: consultantHtml,
      className: 'custom-consultant-pin',
      iconSize: [44, 44],
      iconAnchor: [22, 22],
    });

    if (consultantMarkerRef.current) {
      consultantMarkerRef.current.setLatLng([consLat, consLng]);
    } else {
      consultantMarkerRef.current = L.marker([consLat, consLng], { icon: consultantIcon })
        .addTo(map)
        .bindPopup(`<b>${booking.consultant?.name || 'Beautician'}</b><br/>Status: ${booking.status_display}`);
    }

    // Route Polyline
    const latlngs = [
      [consLat, consLng],
      [custLat, custLng],
    ];

    if (polylineRef.current) {
      polylineRef.current.setLatLngs(latlngs);
    } else {
      polylineRef.current = L.polyline(latlngs, {
        color: '#d95372',
        weight: 4,
        dashArray: '8, 8',
        opacity: 0.8,
      }).addTo(map);
    }

    // Fit bounds smoothly
    const bounds = L.latLngBounds([[consLat, consLng], [custLat, custLng]]);
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });

  }, [booking]);

  // Clean up Leaflet on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section id="tracker" className="py-16 bg-[#FCF9F9] border-t border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tracker Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-parlour-700 text-xs font-semibold uppercase tracking-wider">
            <Navigation className="w-3.5 h-3.5 text-parlour-600 animate-pulse" />
            <span>Live GPS At-Home Tracking</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-gray-900">
            Track Your Home Beauty Consultant
          </h2>
          <p className="text-gray-600 text-sm">
            Watch your certified beautician travel to your doorstep in real time. Know their exact arrival minute and status.
          </p>

          {/* Search by Booking Ref Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loadBooking(bookingRefInput.trim().toUpperCase());
            }}
            className="flex gap-2 max-w-md mx-auto pt-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Booking ID (e.g. GLOW-DEMO1)"
                value={bookingRefInput}
                onChange={(e) => setBookingRefInput(e.target.value)}
                className="w-full uppercase font-mono pl-10 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-parlour-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-parlour-800 hover:bg-parlour-900 text-white rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
            >
              {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Track'}
            </button>
          </form>

          {error && (
            <p className="text-xs text-rose-600 font-medium pt-1">{error}</p>
          )}
        </div>

        {booking && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Interactive Map & Simulation Controller */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-6 border border-rose-100 shadow-md space-y-4">
              
              <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-800">
                    Live Satellite GPS Transit
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-rose-50 text-parlour-700 px-3 py-1 rounded-full font-mono font-bold">
                    Ref: {booking.booking_ref}
                  </span>
                  <button
                    onClick={() => loadBooking(booking.booking_ref)}
                    className="p-1.5 text-gray-400 hover:text-parlour-700 rounded-lg hover:bg-rose-50"
                    title="Refresh status"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Map Container */}
              <div className="h-80 sm:h-96 w-full rounded-2xl overflow-hidden shadow-inner border border-gray-200 relative">
                <div ref={mapContainerRef} className="w-full h-full z-10" />
                
                {/* Overlay ETA Badge */}
                <div className="absolute top-3 left-3 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-rose-100 flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-parlour-600 animate-pulse" />
                  <div>
                    <span className="text-[10px] text-gray-500 block leading-tight font-medium">Estimated Arrival</span>
                    <span className="text-xs font-bold text-gray-900">
                      {booking.eta_minutes > 0 ? `${booking.eta_minutes} Minutes Away` : 'Arrived at Destination'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Simulation Controls */}
              <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-rose-50 p-4 rounded-2xl border border-rose-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-left space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                    <Sparkles className="w-4 h-4 text-gold-500" />
                    <span>Live Simulation Control</span>
                  </div>
                  <p className="text-[11px] text-gray-600">
                    Click to test GPS advancement and consultant journey updates!
                  </p>
                </div>

                <button
                  onClick={handleSimulateStep}
                  disabled={isSimulating}
                  className="w-full sm:w-auto px-5 py-2.5 bg-parlour-800 hover:bg-parlour-900 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 flex-shrink-0"
                >
                  <Play className="w-3.5 h-3.5 fill-gold-300 text-gold-300" />
                  <span>{isSimulating ? 'Updating GPS...' : 'Simulate Next Step →'}</span>
                </button>
              </div>

            </div>

            {/* Right Column: Timeline & Consultant Details */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Status Message Card */}
              <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-md space-y-4">
                <div>
                  <span className="text-[11px] uppercase font-bold text-parlour-600 tracking-wider">
                    Current Journey Status
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-1">
                    {booking.status_display}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1.5 bg-rose-50/70 p-3 rounded-xl border border-rose-100/60 leading-relaxed">
                    "{booking.last_status_message}"
                  </p>
                </div>

                {/* Progress Step Timeline */}
                <div className="space-y-4 pt-2">
                  {STATUS_STEPS.map((step) => {
                    const isDone = booking.step_index >= step.index;
                    const isCurrent = booking.step_index === step.index;

                    return (
                      <div key={step.key} className="flex items-start gap-3.5 relative">
                        {/* Vertical line connecting nodes */}
                        {step.index < STATUS_STEPS.length - 1 && (
                          <div
                            className={`absolute left-3.5 top-7 bottom-0 w-0.5 -mb-4 ${
                              booking.step_index > step.index ? 'bg-emerald-500' : 'bg-gray-200'
                            }`}
                          />
                        )}

                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10 text-xs font-bold transition-all ${
                            isDone
                              ? 'bg-emerald-500 text-white shadow-sm'
                              : isCurrent
                              ? 'bg-parlour-600 text-white ring-4 ring-rose-100'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          {isDone ? '✓' : step.index + 1}
                        </div>

                        <div className="flex-1 pb-1">
                          <h5 className={`text-xs font-bold ${isCurrent ? 'text-parlour-700' : 'text-gray-900'}`}>
                            {step.label}
                          </h5>
                          <p className="text-[11px] text-gray-400">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Consultant Profile Card */}
              {booking.consultant && (
                <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-md space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={booking.consultant.photo_url}
                      alt={booking.consultant.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-rose-200 shadow-sm flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-900 text-base">{booking.consultant.name}</h4>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> Verified
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{booking.consultant.role}</p>
                      <p className="text-xs text-amber-600 font-bold mt-1">
                        ★ {booking.consultant.rating} ({booking.consultant.total_consultations}+ sessions)
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-2xl text-xs space-y-1.5 text-gray-600">
                    <div className="flex justify-between">
                      <span>Vehicle / Transport:</span>
                      <span className="font-semibold text-gray-800">{booking.consultant.vehicle_info}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Scheduled Slot:</span>
                      <span className="font-semibold text-gray-800">{booking.time_slot}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Destination Address:</span>
                      <span className="font-semibold text-gray-800 truncate max-w-[200px]" title={booking.customer_address}>
                        {booking.customer_address}
                      </span>
                    </div>
                  </div>

                  {/* Call Consultant Button */}
                  <a
                    href={`tel:${booking.consultant.phone}`}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Call Consultant ({booking.consultant.phone})</span>
                  </a>

                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
