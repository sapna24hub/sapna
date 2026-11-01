import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  ShoppingBag, 
  Users, 
  Sparkles, 
  Clock, 
  MapPin, 
  Phone, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  Navigation, 
  Play, 
  Star, 
  Search, 
  RefreshCw, 
  ExternalLink, 
  ArrowLeft, 
  Sliders, 
  ShieldCheck, 
  Package, 
  Eye, 
  ChevronRight, 
  Filter 
} from 'lucide-react';
import { api } from '../services/api';

export default function Dashboard({ onBackToWebsite, onOpenTrackerWithBooking }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'bookings' | 'consultants' | 'services' | 'products' | 'reviews'
  
  // Data State
  const [bookings, setBookings] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [updatingRef, setUpdatingRef] = useState(null);
  const [bookingFilter, setBookingFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookingDetail, setSelectedBookingDetail] = useState(null);

  const fetchAllDashboardData = async () => {
    setLoading(true);
    try {
      const [bData, cData, sData, pData, rData, stData] = await Promise.all([
        api.getAllBookings(),
        api.getConsultants(),
        api.getServices('all'),
        api.getProducts('all'),
        api.getReviews(),
        api.getStats()
      ]);
      setBookings(bData);
      setConsultants(cData);
      setServices(sData);
      setProducts(pData);
      setReviews(rData);
      setStats(stData);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDashboardData();
  }, []);

  // Dispatch Actions
  const handleSimulateStep = async (bookingRef) => {
    setUpdatingRef(bookingRef);
    try {
      const res = await api.simulateBookingStep(bookingRef);
      setBookings(prev => prev.map(b => b.booking_ref === bookingRef ? res.booking : b));
      if (selectedBookingDetail && selectedBookingDetail.booking_ref === bookingRef) {
        setSelectedBookingDetail(res.booking);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingRef(null);
    }
  };

  const handleUpdateStatus = async (bookingRef, newStatus) => {
    setUpdatingRef(bookingRef);
    try {
      const updated = await api.updateBookingStatus(bookingRef, { status: newStatus });
      setBookings(prev => prev.map(b => b.booking_ref === bookingRef ? updated : b));
      if (selectedBookingDetail && selectedBookingDetail.booking_ref === bookingRef) {
        setSelectedBookingDetail(updated);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingRef(null);
    }
  };

  // Metrics
  const totalRevenue = bookings.reduce((sum, b) => sum + parseFloat(b.total_cost || 0), 0);
  const activeBookings = bookings.filter(b => b.status !== 'COMPLETED' && b.status !== 'CANCELLED');
  const completedBookings = bookings.filter(b => b.status === 'COMPLETED');

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    if (bookingFilter === 'active') return b.status !== 'COMPLETED' && b.status !== 'CANCELLED';
    if (bookingFilter === 'completed') return b.status === 'COMPLETED';
    if (bookingFilter === 'transit') return b.status === 'ON_THE_WAY';
    return true;
  }).filter((b) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return b.booking_ref.toLowerCase().includes(q) ||
      b.customer_name.toLowerCase().includes(q) ||
      b.customer_phone.toLowerCase().includes(q) ||
      b.customer_address.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-800 flex flex-col font-sans">
      
      {/* Top Navigation Bar */}
      <header className="bg-parlour-950 text-white sticky top-0 z-30 border-b border-parlour-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToWebsite}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Store Website</span>
            </button>

            <div className="h-6 w-px bg-white/20 hidden sm:block"></div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-gold-400 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-parlour-950 rounded-[10px] flex items-center justify-center">
                  <LayoutDashboard className="w-4 h-4 text-gold-300" />
                </div>
              </div>
              <div>
                <h1 className="font-serif text-lg font-bold text-white leading-tight">
                  GlowAura Management Suite
                </h1>
                <p className="text-[10px] text-rose-300">Live Business Operations & GPS Dispatcher</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="hidden md:flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full font-semibold border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Live Synced: 29 Services • 8 Products
            </span>

            <button
              onClick={fetchAllDashboardData}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
              title="Refresh Dashboard"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <a
              href="http://127.0.0.1:8000/admin/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow-sm transition-colors"
            >
              <span>Django Admin</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-gray-200">
          {[
            { id: 'overview', label: 'Overview & KPIs', icon: TrendingUp },
            { id: 'bookings', label: `Live Bookings & Dispatch (${bookings.length})`, icon: Calendar },
            { id: 'consultants', label: `Home Consultants (${consultants.length})`, icon: Users },
            { id: 'services', label: `Services & Pricing (${services.length})`, icon: Sparkles },
            { id: 'products', label: `Beauty Store Products (${products.length})`, icon: Package },
            { id: 'reviews', label: `Reviews & Ratings (${reviews.length})`, icon: Star },
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                  isCurrent
                    ? 'bg-parlour-800 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isCurrent ? 'text-gold-300' : 'text-gray-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & KPIS */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in">
            
            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Total Bookings Revenue
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-serif">
                    ₹{totalRevenue.toFixed(0)}
                  </h3>
                  <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
                    +18% from last month
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  ₹
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Active Appointments
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-serif">
                    {activeBookings.length} In Progress
                  </h3>
                  <span className="text-[11px] text-amber-700 font-semibold mt-1 block">
                    Live GPS tracking active
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Catalog Scale
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-parlour-700 font-serif">
                    {services.length} Svc • {products.length} Prod
                  </h3>
                  <span className="text-[11px] text-parlour-600 font-semibold mt-1 block">
                    6 Categories available
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-parlour-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Customer Satisfaction
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-serif flex items-center gap-1.5">
                    <span>4.95</span>
                    <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                  </h3>
                  <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
                    Based on 2,400+ reviews
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Quick Actions & Recent Bookings Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Recent Orders */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-gray-900">Recent Customer Bookings</h3>
                    <p className="text-xs text-gray-400">Latest home appointment requests</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-xs font-bold text-parlour-700 hover:underline flex items-center gap-1"
                  >
                    <span>View All ({bookings.length})</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {bookings.slice(0, 4).map((b) => (
                    <div
                      key={b.id}
                      className="p-4 bg-gray-50 rounded-2xl border border-gray-200 hover:border-parlour-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs bg-rose-100 text-parlour-800 px-2 py-0.5 rounded-lg">
                            {b.booking_ref}
                          </span>
                          <span className="text-xs font-bold text-gray-900">{b.customer_name}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            b.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                            b.status === 'ON_THE_WAY' ? 'bg-amber-100 text-amber-800 animate-pulse' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {b.status_display}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-3">
                          <span>📅 {b.scheduled_date} ({b.time_slot})</span>
                          <span>📍 {b.customer_address}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-3 justify-between sm:justify-end">
                        <span className="text-sm font-extrabold text-gray-900">
                          ₹{parseFloat(b.total_cost).toFixed(0)}
                        </span>
                        <button
                          onClick={() => {
                            onBackToWebsite();
                            onOpenTrackerWithBooking(b.booking_ref);
                          }}
                          className="px-3 py-1.5 bg-parlour-800 hover:bg-parlour-900 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Track GPS</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Home Consultants Quick Status */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-gray-900">Certified Staff</h3>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    4 Active
                  </span>
                </div>

                <div className="space-y-3">
                  {consultants.map((c) => (
                    <div key={c.id} className="p-3 bg-gray-50 rounded-2xl flex items-center gap-3">
                      <img
                        src={c.photo_url}
                        alt={c.name}
                        className="w-11 h-11 rounded-xl object-cover border border-rose-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-xs text-gray-900 truncate">{c.name}</h5>
                        <p className="text-[10px] text-gray-400 truncate">{c.role}</p>
                        <p className="text-[10px] text-emerald-700 font-semibold">
                          ⭐ {c.rating} • {c.total_consultations}+ consultations
                        </p>
                      </div>
                      <a
                        href={`tel:${c.phone}`}
                        className="p-2 bg-white rounded-xl text-emerald-600 hover:bg-emerald-50 border border-gray-200 shadow-2xs"
                        title="Call consultant"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: LIVE BOOKINGS & DISPATCH MANAGER */}
        {activeTab === 'bookings' && (
          <div className="space-y-6 animate-in fade-in">
            
            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-3xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                <button
                  onClick={() => setBookingFilter('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    bookingFilter === 'all' ? 'bg-parlour-800 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  All ({bookings.length})
                </button>
                <button
                  onClick={() => setBookingFilter('active')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    bookingFilter === 'active' ? 'bg-parlour-800 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Active In-Progress ({activeBookings.length})
                </button>
                <button
                  onClick={() => setBookingFilter('transit')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    bookingFilter === 'transit' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  On the Way (Live GPS)
                </button>
                <button
                  onClick={() => setBookingFilter('completed')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    bookingFilter === 'completed' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Completed ({completedBookings.length})
                </button>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by ID, Name, Phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-parlour-500"
                />
              </div>
            </div>

            {/* Bookings Table / Cards */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-bold text-[10px] tracking-wider">
                    <tr>
                      <th className="p-4">Reference</th>
                      <th className="p-4">Customer & Phone</th>
                      <th className="p-4">Schedule Date & Slot</th>
                      <th className="p-4">Address & Area</th>
                      <th className="p-4">Consultant</th>
                      <th className="p-4">Total Billed</th>
                      <th className="p-4">Live Status</th>
                      <th className="p-4 text-right">Dispatch Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-rose-50/40 transition-colors">
                        <td className="p-4">
                          <span className="font-mono font-bold text-parlour-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 block text-center">
                            {b.booking_ref}
                          </span>
                        </td>

                        <td className="p-4">
                          <div className="font-bold text-gray-900">{b.customer_name}</div>
                          <div className="text-gray-500 flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span>{b.customer_phone}</span>
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="font-semibold text-gray-800">{b.scheduled_date}</div>
                          <div className="text-gray-400 text-[11px]">{b.time_slot}</div>
                        </td>

                        <td className="p-4 max-w-xs">
                          <div className="truncate text-gray-700" title={b.customer_address}>
                            {b.customer_address}
                          </div>
                          <div className="text-gray-400 text-[10px]">{b.city} ({b.pincode})</div>
                        </td>

                        <td className="p-4">
                          {b.consultant ? (
                            <div className="flex items-center gap-2">
                              <img
                                src={b.consultant.photo_url}
                                alt={b.consultant.name}
                                className="w-7 h-7 rounded-full object-cover border border-rose-200"
                              />
                              <span className="font-bold text-gray-800">{b.consultant.name}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400 italic">Unassigned</span>
                          )}
                        </td>

                        <td className="p-4 font-bold text-gray-900 text-sm">
                          ₹{parseFloat(b.total_cost).toFixed(0)}
                        </td>

                        <td className="p-4">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            b.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                            b.status === 'ON_THE_WAY' ? 'bg-amber-100 text-amber-800 animate-pulse' :
                            b.status === 'ARRIVED' ? 'bg-purple-100 text-purple-800' :
                            b.status === 'IN_PROGRESS' ? 'bg-indigo-100 text-indigo-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {b.status_display}
                          </span>
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleSimulateStep(b.booking_ref)}
                              disabled={updatingRef === b.booking_ref}
                              className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold rounded-lg border border-amber-200 flex items-center gap-1 shadow-2xs"
                              title="Advance GPS Coordinate Step"
                            >
                              <Play className="w-3 h-3 fill-amber-700" />
                              <span>Advance GPS</span>
                            </button>

                            <button
                              onClick={() => {
                                onBackToWebsite();
                                onOpenTrackerWithBooking(b.booking_ref);
                              }}
                              className="p-1.5 bg-gray-100 hover:bg-parlour-50 text-gray-700 hover:text-parlour-700 rounded-lg border border-gray-200 shadow-2xs"
                              title="View Satellite Map"
                            >
                              <Navigation className="w-4 h-4" />
                            </button>

                            {b.status !== 'COMPLETED' && (
                              <button
                                onClick={() => handleUpdateStatus(b.booking_ref, 'COMPLETED')}
                                disabled={updatingRef === b.booking_ref}
                                className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-lg border border-emerald-200"
                              >
                                Done
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredBookings.length === 0 && (
                <div className="text-center py-16 space-y-2">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto" />
                  <p className="text-sm font-bold text-gray-600">No bookings match this filter</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 3: HOME CONSULTANTS */}
        {activeTab === 'consultants' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-gray-900">Certified Female Home Consultants</h3>
                <p className="text-xs text-gray-500">CIDESCO & dermat-approved beauticians equipped with sterile vanity kits</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {consultants.map((c) => (
                <div key={c.id} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="relative w-20 h-20 mx-auto">
                      <img
                        src={c.photo_url}
                        alt={c.name}
                        className="w-full h-full rounded-2xl object-cover border-2 border-rose-200 shadow-sm"
                      />
                      <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                    </div>

                    <div className="text-center">
                      <h4 className="font-bold text-base text-gray-900">{c.name}</h4>
                      <p className="text-xs text-parlour-600 font-medium">{c.role}</p>
                      <p className="text-xs text-amber-600 font-bold mt-1">
                        ★ {c.rating} ({c.total_consultations}+ sessions)
                      </p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-2xl text-[11px] text-gray-600 space-y-1">
                      <div><strong>Vehicle:</strong> {c.vehicle_info}</div>
                      <div><strong>Experience:</strong> {c.experience_years} Years Certified</div>
                      <div><strong>Contact:</strong> {c.phone}</div>
                    </div>

                    <p className="text-xs text-gray-500 italic line-clamp-3">
                      "{c.bio}"
                    </p>
                  </div>

                  <a
                    href={`tel:${c.phone}`}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Consultant</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SERVICES & PRICING */}
        {activeTab === 'services' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-gray-900">Active Service Catalog ({services.length})</h3>
                <p className="text-xs text-gray-500">Live prices showing on customer portal</p>
              </div>
              <a
                href="http://127.0.0.1:8000/admin/api/service/add/"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-parlour-800 text-white rounded-xl text-xs font-bold hover:bg-parlour-900 flex items-center gap-1.5 shadow-sm"
              >
                <span>+ Add New Service in Django Admin</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-4">Service Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Duration</th>
                    <th className="p-4">Market MRP</th>
                    <th className="p-4">Special Price</th>
                    <th className="p-4">Popular</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {services.map((s) => (
                    <tr key={s.id} className="hover:bg-rose-50/30">
                      <td className="p-4 font-bold text-gray-900 flex items-center gap-3">
                        <img src={s.image_url} alt={s.name} className="w-10 h-10 rounded-xl object-cover" />
                        <span>{s.name}</span>
                      </td>
                      <td className="p-4 text-parlour-700 font-semibold">{s.category_name}</td>
                      <td className="p-4 text-gray-500">{s.duration_minutes} mins</td>
                      <td className="p-4 text-gray-400 line-through">₹{s.price}</td>
                      <td className="p-4 font-extrabold text-gray-900 text-sm">₹{s.effective_price}</td>
                      <td className="p-4">
                        {s.is_popular ? (
                          <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-[10px] font-bold">
                            ★ Bestseller
                          </span>
                        ) : (
                          <span className="text-gray-400 text-[10px]">Standard</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: BEAUTY STORE PRODUCTS */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-gray-900">Beauty Products In Stock ({products.length})</h3>
                <p className="text-xs text-gray-500">Products sold online and brought by home consultant</p>
              </div>
              <a
                href="http://127.0.0.1:8000/admin/api/product/add/"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-parlour-800 text-white rounded-xl text-xs font-bold hover:bg-parlour-900 flex items-center gap-1.5 shadow-sm"
              >
                <span>+ Add Product in Django Admin</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <div key={p.id} className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs space-y-3">
                  <div className="h-40 bg-rose-50/40 rounded-2xl flex items-center justify-center p-3">
                    <img src={p.image_url} alt={p.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-parlour-600">{p.brand}</span>
                    <h4 className="font-bold text-sm text-gray-900 truncate">{p.name}</h4>
                    <span className="text-xs text-gray-400">{p.size_or_weight}</span>
                  </div>
                  <div className="flex items-baseline justify-between pt-2 border-t border-gray-100">
                    <div>
                      <span className="text-base font-extrabold text-gray-900">₹{p.effective_price}</span>
                      <s className="text-xs text-gray-400 ml-1.5">₹{p.price}</s>
                    </div>
                    <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                      In Stock
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: CUSTOMER REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-gray-900">Customer Testimonials & Ratings ({reviews.length})</h3>
                <p className="text-xs text-gray-500">Live verified customer feedback</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((r) => (
                <div key={r.id} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      ✓ Verified
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 italic">"{r.comment}"</p>
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-900">{r.customer_name}</span>
                    <span className="text-[10px] text-parlour-600 font-semibold">{r.service_name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
