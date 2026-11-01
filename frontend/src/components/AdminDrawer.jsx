import React, { useState, useEffect } from 'react';
import { 
  X, 
  Settings, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  CheckCircle2, 
  Navigation, 
  DollarSign, 
  ExternalLink, 
  RefreshCw, 
  Calendar, 
  Play 
} from 'lucide-react';
import { api } from '../services/api';

export default function AdminDrawer({ isOpen, onClose, onSelectBookingForTracking }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingRef, setUpdatingRef] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await api.getAllBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchBookings();
    }
  }, [isOpen]);

  const handleSimulateStep = async (bookingRef) => {
    setUpdatingRef(bookingRef);
    try {
      await api.simulateBookingStep(bookingRef);
      await fetchBookings();
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingRef(null);
    }
  };

  const handleDirectStatusChange = async (bookingRef, newStatus) => {
    setUpdatingRef(bookingRef);
    try {
      await api.updateBookingStatus(bookingRef, { status: newStatus });
      await fetchBookings();
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingRef(null);
    }
  };

  if (!isOpen) return null;

  // Calculate quick metrics
  const totalRevenue = bookings.reduce((sum, b) => sum + parseFloat(b.total_cost || 0), 0);
  const activeCount = bookings.filter(b => b.status !== 'COMPLETED' && b.status !== 'CANCELLED').length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Admin Header */}
          <div className="p-6 bg-gray-900 text-white flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center text-rose-400 border border-gray-700">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-lg font-bold">Parlour & Consultant Admin</h3>
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Live Sync
                  </span>
                </div>
                <p className="text-xs text-gray-400">Manage bookings, live tracking and appointments</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchBookings}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
                title="Refresh Bookings"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="p-6 bg-gray-50 border-b border-gray-200 grid grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-gray-200">
              <span className="text-gray-500 block text-[10px]">Total Bookings</span>
              <span className="text-lg font-extrabold text-gray-900">{bookings.length}</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-gray-200">
              <span className="text-gray-500 block text-[10px]">Active In Progress</span>
              <span className="text-lg font-extrabold text-amber-600">{activeCount}</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-gray-200">
              <span className="text-gray-500 block text-[10px]">Total Revenue</span>
              <span className="text-lg font-extrabold text-emerald-600">₹{totalRevenue.toFixed(0)}</span>
            </div>
          </div>

          {/* Bookings List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-sm text-gray-900">Recent Customer Bookings</h4>
              <span className="text-xs text-gray-400">Showing latest appointments</span>
            </div>

            {loading && bookings.length === 0 ? (
              <div className="text-center py-12 text-gray-500 text-xs">Loading appointments...</div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-12 text-gray-500 text-xs">No bookings recorded yet.</div>
            ) : (
              bookings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 bg-white rounded-2xl border border-gray-200 hover:border-parlour-300 shadow-xs space-y-3 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-parlour-700 bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200">
                          {b.booking_ref}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          b.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                          b.status === 'ON_THE_WAY' ? 'bg-amber-100 text-amber-800 animate-pulse' :
                          b.status === 'IN_PROGRESS' ? 'bg-purple-100 text-purple-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {b.status_display}
                        </span>
                      </div>
                      <h5 className="font-bold text-sm text-gray-900 mt-1">{b.customer_name}</h5>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {b.customer_phone}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-gray-400 block font-medium">Billed Cost</span>
                      <span className="text-base font-bold text-gray-900">₹{parseFloat(b.total_cost).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Date, Time & Address */}
                  <div className="text-[11px] text-gray-600 bg-gray-50 p-2.5 rounded-xl space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>{b.scheduled_date} • {b.time_slot}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{b.customer_address}, {b.city} ({b.pincode})</span>
                    </div>
                    {b.consultant && (
                      <div className="flex items-center gap-2 text-parlour-700 font-semibold">
                        <User className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>Consultant: {b.consultant.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions for this booking */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-gray-100 text-xs">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectBookingForTracking(b.booking_ref);
                      }}
                      className="text-parlour-700 font-bold hover:underline flex items-center gap-1"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Open on Live GPS Map</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSimulateStep(b.booking_ref)}
                        disabled={updatingRef === b.booking_ref}
                        className="px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold rounded-lg border border-amber-200 flex items-center gap-1"
                      >
                        <Play className="w-3 h-3 fill-amber-700" />
                        <span>Advance GPS Step</span>
                      </button>

                      {b.status !== 'COMPLETED' && (
                        <button
                          onClick={() => handleDirectStatusChange(b.booking_ref, 'COMPLETED')}
                          disabled={updatingRef === b.booking_ref}
                          className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-lg border border-emerald-200"
                        >
                          Mark Completed
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer: Django Admin Portal Link */}
          <div className="p-4 bg-gray-100 border-t border-gray-200 flex items-center justify-between text-xs">
            <span className="text-gray-500">
              Django Admin: <strong className="text-gray-800">admin / admin123</strong>
            </span>
            <a
              href="http://127.0.0.1:8000/admin/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-parlour-700 font-bold hover:underline"
            >
              <span>Open Full Django Admin</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
