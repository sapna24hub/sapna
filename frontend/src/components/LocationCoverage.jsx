import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Car, 
  Building2 
} from 'lucide-react';
import { api } from '../services/api';

const QUICK_ROHTAK_PINCODES = [
  { pin: '124001', area: 'Model Town & D-Park' },
  { pin: '124002', area: 'HUDA Sector 1, 2, 3 & 4' },
  { pin: '124021', area: 'HUDA Sector 14' },
  { pin: '124003', area: 'Subhash Nagar & Ashoka Plaza' },
  { pin: '124004', area: 'Sheila Bypass & Delhi Road' },
  { pin: '124005', area: 'Medical Mor & PGIMS' },
  { pin: '124006', area: 'Sonipat Road & Sukhpura' },
];

export default function LocationCoverage() {
  const [pincodeInput, setPincodeInput] = useState('');
  const [locationResult, setLocationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckLocation = async (pincodeToCheck) => {
    const pin = (pincodeToCheck || pincodeInput).trim();
    if (!pin) return;

    setLoading(true);
    try {
      const res = await api.checkLocation(pin);
      setLocationResult(res);
      setPincodeInput(pin);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="coverage" className="py-20 bg-[#FCF9F9] border-t border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-parlour-700 text-xs font-semibold uppercase tracking-wider border border-rose-200">
            <MapPin className="w-3.5 h-3.5" />
            <span>Rohtak Neighborhoods & Doorstep Delivery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
            Check Home Consultant Availability in Rohtak
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Enter your Rohtak postal pincode to verify instant consultant dispatch to your doorstep. Free home visit on orders ₹499+.
          </p>
        </div>

        {/* Checker Input Box */}
        <div className="mt-10 max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-md space-y-4">
          
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCheckLocation(pincodeInput);
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter 6-digit Pincode (e.g. 124001, 124021)"
                value={pincodeInput}
                onChange={(e) => setPincodeInput(e.target.value)}
                maxLength={6}
                className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-parlour-500 focus:bg-white transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-parlour-700 hover:bg-parlour-800 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-1.5 flex-shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>{loading ? 'Checking...' : 'Check Rohtak Area'}</span>
            </button>
          </form>

          {/* Quick test buttons */}
          <div className="pt-2">
            <span className="text-[11px] font-bold text-gray-400 block mb-2">Popular Rohtak Sectors:</span>
            <div className="flex flex-wrap gap-2">
              {QUICK_ROHTAK_PINCODES.map((item) => (
                <button
                  key={item.pin}
                  onClick={() => handleCheckLocation(item.pin)}
                  className="px-2.5 py-1 bg-rose-50/70 hover:bg-rose-100 border border-rose-200/80 rounded-xl text-[11px] font-medium text-parlour-800 transition-colors"
                >
                  📍 {item.pin} ({item.area})
                </button>
              ))}
            </div>
          </div>

          {/* Result Card */}
          {locationResult && (
            <div className={`mt-4 p-4 rounded-2xl border text-xs space-y-2 animate-in fade-in ${
              locationResult.is_serviceable 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${locationResult.is_serviceable ? 'text-emerald-600' : 'text-amber-600'}`} />
                <h4 className="font-bold text-sm">
                  {locationResult.message}
                </h4>
              </div>
              {locationResult.is_serviceable && (
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-200/60 text-emerald-800">
                  <div>
                    <span className="text-gray-500 block text-[10px]">Estimated Arrival Window:</span>
                    <span className="font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      {locationResult.estimated_arrival_minutes || 25} Minutes
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Home Visit Fee:</span>
                    <span className="font-bold text-emerald-700">
                      FREE on orders ₹499+
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Major Serviceable Rohtak Hubs */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-parlour-700 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-bold text-gray-900">Model Town & D-Park</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Main Model Town Market, D-Park, Civil Lines, Court Road, Mansarover Colony.
            </p>
            <span className="text-[11px] text-emerald-600 font-bold block pt-1">
              ✓ 6 Beauticians Active Now (15-20 min ETA)
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-gold-600 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-bold text-gray-900">HUDA Sectors 1 to 14</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Sector 1, Sector 2, Sector 3, Sector 4, Sector 14 HUDA, Urban Estate & HUDA Gymkhana.
            </p>
            <span className="text-[11px] text-emerald-600 font-bold block pt-1">
              ✓ 5 Beauticians Active Now (20-25 min ETA)
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-bold text-gray-900">Subhash Nagar & Ashoka</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Subhash Nagar, Ashoka Plaza, Delhi Road, Prem Nagar, DLF Colony.
            </p>
            <span className="text-[11px] text-emerald-600 font-bold block pt-1">
              ✓ 4 Beauticians Active Now (25 min ETA)
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-bold text-gray-900">Sheila Bypass & PGIMS</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Sheila Bypass, Medical Mor, PGIMS Campus, Sonipat Road, Sukhpura Chowk.
            </p>
            <span className="text-[11px] text-emerald-600 font-bold block pt-1">
              ✓ 3 Beauticians Active Now (25-30 min ETA)
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}