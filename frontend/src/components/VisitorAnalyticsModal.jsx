import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, 
  X, 
  Users, 
  Eye, 
  MapPin, 
  Smartphone, 
  Laptop, 
  Globe, 
  Clock, 
  Download, 
  RefreshCw, 
  Search, 
  Bell, 
  Key, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Trash2, 
  Send,
  Radio,
  Cat,
  Share2,
  SlidersHorizontal,
  User,
  Phone
} from 'lucide-react';
import { 
  getVisitorLogs, 
  getVisitorConfig, 
  saveVisitorConfig, 
  clearVisitorLogs, 
  exportVisitorLogsToCSV, 
  sendTelegramNotification, 
  sendCustomWebhook,
  formatIST
} from '../utils/visitorTracker';
import { 
  getGoogleClientId, 
  saveGoogleClientId, 
  getGoogleSearchConsoleTag, 
  saveGoogleSearchConsoleTag 
} from '../utils/googleAuth';

export default function VisitorAnalyticsModal({ isOpen, onClose }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('blackcat_admin_authed') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [rememberAdmin, setRememberAdmin] = useState(true);

  // Dashboard State
  const [logs, setLogs] = useState([]);
  const [config, setConfig] = useState({ pin: '1234', telegramToken: '', telegramChatId: '', webhookUrl: '' });
  const [activeTab, setActiveTab] = useState('logs'); // 'logs', 'alerts', 'google', 'settings'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'today', 'rohtak', 'mobile', 'whatsapp'
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [testAlertStatus, setTestAlertStatus] = useState(null); // 'sending', 'success', 'error'
  const [newPinInput, setNewPinInput] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);

  // Google Console State
  const [googleClientIdInput, setGoogleClientIdInput] = useState(() => getGoogleClientId());
  const [googleSearchTagInput, setGoogleSearchTagInput] = useState(() => getGoogleSearchConsoleTag());
  const [googleSaveSuccess, setGoogleSaveSuccess] = useState(false);

  // Load data on open
  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = () => {
    setIsRefreshing(true);
    const loadedLogs = getVisitorLogs();
    const loadedConfig = getVisitorConfig();
    setLogs(loadedLogs);
    setConfig(loadedConfig);
    setTimeout(() => setIsRefreshing(false), 300);
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    const currentConfig = getVisitorConfig();
    const correctPin = currentConfig.pin || '1234';

    if (pinInput.trim() === correctPin) {
      setIsAuthenticated(true);
      setPinError('');
      if (rememberAdmin) {
        localStorage.setItem('blackcat_admin_authed', 'true');
      }
      loadData();
    } else {
      setPinError('Invalid PIN! Default owner PIN is 1234.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('blackcat_admin_authed');
    setPinInput('');
  };

  // Metrics Calculations
  const stats = useMemo(() => {
    const totalVisits = logs.length;
    const uniqueIps = new Set(logs.map(l => l.ip)).size;
    const identifiedCount = logs.filter(l => l.customerName || l.customerPhone).length;
    
    // Today's visits
    const today = new Date().toDateString();
    const todayVisits = logs.filter(l => {
      try {
        return new Date(l.timestamp).toDateString() === today;
      } catch {
        return false;
      }
    }).length;

    // Mobile vs Desktop
    const mobileCount = logs.filter(l => l.deviceType === 'Mobile' || l.deviceType === 'Tablet').length;
    const mobilePercent = totalVisits > 0 ? Math.round((mobileCount / totalVisits) * 100) : 75;

    // Top city
    const cityCounts = {};
    logs.forEach(l => {
      const city = l.city || 'Rohtak';
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    });
    let topCity = 'Rohtak, HR';
    let maxCityCount = 0;
    Object.entries(cityCounts).forEach(([c, cnt]) => {
      if (cnt > maxCityCount) {
        maxCityCount = cnt;
        topCity = c;
      }
    });

    return { totalVisits, uniqueIps, todayVisits, mobilePercent, topCity, identifiedCount };
  }, [logs]);

  // Filtered Logs
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesSearch = 
        !searchQuery ||
        (log.customerName && log.customerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (log.customerPhone && log.customerPhone.includes(searchQuery)) ||
        (log.customerEmail && log.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (log.city && log.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (log.region && log.region.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (log.ip && log.ip.includes(searchQuery)) ||
        (log.deviceBrand && log.deviceBrand.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (log.source && log.source.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (log.visitorId && log.visitorId.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      if (filterType === 'all') return true;
      if (filterType === 'identified') {
        return Boolean(log.customerName || log.customerPhone);
      }
      if (filterType === 'today') {
        return new Date(log.timestamp).toDateString() === new Date().toDateString();
      }
      if (filterType === 'rohtak') {
        return (log.city && log.city.toLowerCase().includes('rohtak')) || (log.region && log.region.toLowerCase().includes('haryana'));
      }
      if (filterType === 'mobile') {
        return log.deviceType === 'Mobile';
      }
      if (filterType === 'whatsapp') {
        return log.source && log.source.toLowerCase().includes('whatsapp');
      }
      return true;
    });
  }, [logs, searchQuery, filterType]);

  // Handle Save Webhook Settings
  const handleSaveAlertSettings = (e) => {
    e.preventDefault();
    saveVisitorConfig(config);
    alert('Alert settings saved successfully!');
  };

  // Test Alert Trigger
  const handleTestAlert = async () => {
    setTestAlertStatus('sending');
    const testVisitor = {
      visitorId: 'BC-TEST-0001',
      formattedTime: formatIST(new Date()),
      city: 'Rohtak (Live Test)',
      region: 'Haryana',
      flag: '🇮🇳',
      deviceBrand: 'Admin Device Test',
      os: 'Android/iOS',
      browser: 'Test Browser',
      ip: '103.77.43.255',
      isp: 'Test Network',
      source: 'Admin Modal Test',
      visitType: 'Test Ping'
    };

    let sent = false;
    if (config.telegramToken && config.telegramChatId) {
      sent = await sendTelegramNotification(testVisitor, config.telegramToken, config.telegramChatId);
    }
    if (config.webhookUrl) {
      await sendCustomWebhook(testVisitor, config.webhookUrl);
      sent = true;
    }

    if (sent) {
      setTestAlertStatus('success');
    } else {
      setTestAlertStatus('error');
    }
    setTimeout(() => setTestAlertStatus(null), 5000);
  };

  // Handle PIN Change
  const handleChangePin = (e) => {
    e.preventDefault();
    if (newPinInput.trim().length >= 4) {
      saveVisitorConfig({ pin: newPinInput.trim() });
      setConfig(prev => ({ ...prev, pin: newPinInput.trim() }));
      setNewPinInput('');
      setPinChangeSuccess(true);
      setTimeout(() => setPinChangeSuccess(false), 4000);
    } else {
      alert('Please enter at least a 4-digit PIN');
    }
  };

  // Handle Save Google Console Credentials
  const handleSaveGoogleSettings = (e) => {
    e.preventDefault();
    saveGoogleClientId(googleClientIdInput);
    saveGoogleSearchConsoleTag(googleSearchTagInput);
    setGoogleSaveSuccess(true);
    setTimeout(() => setGoogleSaveSuccess(false), 3500);
  };

  // Handle Clear Logs
  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear local visitor logs? This action cannot be undone.')) {
      clearVisitorLogs();
      setLogs([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[#121212] border border-[#2E2E2E] rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-[#E8D7C3]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-[#262626] flex items-center justify-between bg-[#161616]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white flex items-center gap-1.5">
                  Visitor Intelligence &amp; Live Logs
                </h3>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Tracking
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Pta karein kin kin logo ne aapki cafe website open ki hai (Location, City, Device, Time)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="hidden sm:inline-flex text-xs text-stone-400 hover:text-white px-2.5 py-1.5 rounded-lg border border-stone-800 hover:border-stone-700 transition-colors"
                title="Lock Dashboard"
              >
                Lock
              </button>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#202020] hover:bg-[#2A2A2A] text-stone-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PIN Authentication Screen if not authed */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-lg">
              <Key className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-serif font-bold text-white">Owner / Admin Access</h4>
              <p className="text-xs text-stone-400">
                Aapke visitors ki private details dekhne ke liye 4-digit PIN enter karein.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="w-full space-y-4">
              <div className="space-y-1 text-left">
                <input
                  type="password"
                  maxLength={10}
                  autoFocus
                  placeholder="Enter PIN (Default: 1234)"
                  value={pinInput}
                  onChange={(e) => { setPinInput(e.target.value); setPinError(''); }}
                  className="w-full text-center tracking-widest text-xl font-bold bg-[#1A1A1A] border border-[#333333] focus:border-amber-500 text-white py-3.5 px-4 rounded-2xl outline-none transition-all placeholder:text-stone-600 placeholder:text-sm placeholder:tracking-normal"
                />
                {pinError ? (
                  <p className="text-rose-400 text-xs flex items-center gap-1 justify-center pt-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {pinError}
                  </p>
                ) : (
                  <p className="text-stone-500 text-[11px] text-center pt-1">
                    Default PIN: <strong className="text-amber-400">1234</strong> (Can be changed in settings)
                  </p>
                )}
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-stone-400">
                <input
                  type="checkbox"
                  id="remember_admin"
                  checked={rememberAdmin}
                  onChange={(e) => setRememberAdmin(e.target.checked)}
                  className="rounded border-stone-700 bg-stone-900 text-amber-500 focus:ring-0"
                />
                <label htmlFor="remember_admin" className="cursor-pointer select-none">
                  Remember me on this phone / browser
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold py-3.5 rounded-2xl shadow-lg transition-all text-sm flex items-center justify-center gap-2"
              >
                <span>Unlock Visitor Dashboard</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* Main Authenticated View */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Top KPI Metrics Bar */}
            <div className="p-4 sm:p-6 bg-[#161616] border-b border-[#262626] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              
              <div className="bg-[#1C1C1C] border border-[#2E2E2E] rounded-2xl p-3.5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">
                    Total Visits
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-white">
                    {stats.totalVisits}
                  </span>
                </div>
              </div>

              <div className="bg-[#1C1C1C] border border-[#2E2E2E] rounded-2xl p-3.5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">
                    Unique Visitors
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-white">
                    {stats.uniqueIps}
                  </span>
                </div>
              </div>

              {/* Identified Customers Card */}
              <div className="bg-amber-500/10 border border-amber-500/40 rounded-2xl p-3.5 flex items-center gap-3 shadow-inner">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-black flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block">
                    Names &amp; Phones
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-amber-300">
                    {stats.identifiedCount}
                  </span>
                </div>
              </div>

              <div className="bg-[#1C1C1C] border border-[#2E2E2E] rounded-2xl p-3.5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">
                    Today's Visits
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-400">
                    +{stats.todayVisits}
                  </span>
                </div>
              </div>

              <div className="bg-[#1C1C1C] border border-[#2E2E2E] rounded-2xl p-3.5 flex items-center gap-3 col-span-2 sm:col-span-1">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">
                    Mobile Share
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-white">
                    {stats.mobilePercent}%
                  </span>
                </div>
              </div>

            </div>

            {/* Navigation Tabs */}
            <div className="px-4 sm:px-6 pt-3 border-b border-[#262626] flex items-center justify-between gap-4 overflow-x-auto bg-[#141414]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('logs')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                    activeTab === 'logs'
                      ? 'bg-amber-500 text-black border-amber-400 shadow-md'
                      : 'bg-[#1C1C1C] text-stone-400 border-transparent hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Live Visitor Stream ({filteredLogs.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('alerts')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                    activeTab === 'alerts'
                      ? 'bg-amber-500 text-black border-amber-400 shadow-md'
                      : 'bg-[#1C1C1C] text-stone-400 border-transparent hover:text-white'
                  }`}
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Mobile Alerts (Telegram / Webhook)</span>
                  {config.telegramToken && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('google')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                    activeTab === 'google'
                      ? 'bg-amber-500 text-black border-amber-400 shadow-md'
                      : 'bg-[#1C1C1C] text-stone-400 border-transparent hover:text-white'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-sky-400" />
                  <span>Google Console</span>
                  {googleClientIdInput && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                    activeTab === 'settings'
                      ? 'bg-amber-500 text-black border-amber-400 shadow-md'
                      : 'bg-[#1C1C1C] text-stone-400 border-transparent hover:text-white'
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>PIN &amp; Export</span>
                </button>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2 pb-2">
                <button
                  onClick={() => exportVisitorLogsToCSV(filteredLogs)}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#202020] hover:bg-[#2A2A2A] text-amber-300 hover:text-amber-200 border border-amber-500/20 rounded-xl text-xs font-semibold transition-all"
                  title="Download CSV Excel report"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CSV Report</span>
                </button>

                <button
                  onClick={loadData}
                  disabled={isRefreshing}
                  className="p-2 rounded-xl bg-[#202020] hover:bg-[#2A2A2A] text-stone-300 hover:text-white transition-all disabled:opacity-50"
                  title="Refresh logs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* TAB CONTENT */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              
              {/* TAB 1: VISITOR LOGS STREAM */}
              {activeTab === 'logs' && (
                <div className="space-y-4">
                  
                  {/* Search & Filter Bar */}
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search by Rohtak, IP, Android, iPhone, WhatsApp..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-amber-500 text-white pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none placeholder:text-stone-600 transition-all"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 text-xs"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    {/* Filter Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                      {[
                        { id: 'all', label: 'All Visitors' },
                        { id: 'identified', label: `👤 With Name & Phone (${stats.identifiedCount})` },
                        { id: 'today', label: '📅 Today' },
                        { id: 'rohtak', label: '📍 Rohtak / Haryana' },
                        { id: 'mobile', label: '📱 Mobile' },
                        { id: 'whatsapp', label: '💬 WhatsApp' }
                      ].map(pill => (
                        <button
                          key={pill.id}
                          onClick={() => setFilterType(pill.id)}
                          className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all ${
                            filterType === pill.id
                              ? 'bg-amber-500 text-stone-950 font-bold border border-amber-400 shadow-md'
                              : 'bg-[#181818] text-stone-400 border border-[#2A2A2A] hover:text-white'
                          }`}
                        >
                          {pill.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Visitor Records Stream */}
                  {filteredLogs.length === 0 ? (
                    <div className="text-center py-16 bg-[#161616] rounded-2xl border border-dashed border-[#2E2E2E] space-y-2">
                      <p className="text-sm font-semibold text-stone-400">No visitors match your current filter.</p>
                      <button
                        onClick={() => { setSearchQuery(''); setFilterType('all'); }}
                        className="text-xs text-amber-400 underline"
                      >
                        Reset filters
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredLogs.map((item, idx) => (
                        <div
                          key={item.id || idx}
                          className="bg-[#181818] hover:bg-[#1D1D1D] border border-[#292929] hover:border-amber-500/30 rounded-2xl p-4 transition-all space-y-3"
                        >
                          {/* Identified Customer Banner */}
                          {item.customerName || item.customerPhone ? (
                            <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border border-amber-500/35 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-black text-sm shrink-0 shadow-md">
                                  {item.customerName ? item.customerName[0].toUpperCase() : 'C'}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-white text-sm">
                                      {item.customerName || 'Identified Customer'}
                                    </span>
                                    <span className="text-[10px] bg-emerald-500/15 text-emerald-300 font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/30">
                                      ✓ Name Captured
                                    </span>
                                  </div>
                                  <div className="text-xs text-stone-300 flex flex-wrap items-center gap-3 pt-0.5">
                                    {item.customerPhone && (
                                      <span className="font-mono text-amber-300 font-semibold flex items-center gap-1">
                                        <Phone className="w-3 h-3 text-amber-400" />
                                        {item.customerPhone}
                                      </span>
                                    )}
                                    {item.customerEmail && (
                                      <span className="text-stone-400 text-[11px] hidden md:inline">
                                        ✉️ {item.customerEmail}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {item.customerPhone && (
                                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 pt-1 sm:pt-0">
                                  <a
                                    href={`https://wa.me/${item.customerPhone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(item.customerName || 'Foodie')},%20greetings%20from%20The%20Black%20Cat%20Cafe!%20Saw%20you%20checked%20out%20our%20menu.%20How%20can%20we%20treat%20you%20today?`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                                    title="Send WhatsApp message"
                                  >
                                    <span>💬 WhatsApp</span>
                                  </a>
                                  <a
                                    href={`tel:${item.customerPhone.replace(/\s+/g, '')}`}
                                    className="px-3 py-1.5 rounded-xl bg-[#282828] hover:bg-[#333333] text-stone-200 hover:text-white font-semibold text-xs flex items-center gap-1.5 transition-colors border border-stone-700"
                                    title="Call Customer"
                                  >
                                    <span>📞 Call</span>
                                  </a>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="bg-[#141414] border border-[#222222] rounded-xl px-3 py-1.5 flex items-center justify-between text-[11px] text-stone-500">
                              <span className="flex items-center gap-1.5">
                                <span>👤 Guest Visitor</span>
                                <span className="text-stone-600">(Has not submitted VIP Welcome form yet)</span>
                              </span>
                              <span className="text-[10px] text-amber-400/80 font-medium">
                                IP &amp; Location Logged
                              </span>
                            </div>
                          )}

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#252525] pb-2.5">
                            
                            {/* Location & Flag */}
                            <div className="flex items-center gap-2">
                              <span className="text-xl" title={item.country || 'India'}>
                                {item.flag || '🇮🇳'}
                              </span>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-white text-sm">
                                    {item.city || 'Rohtak'}, {item.region || 'Haryana'}
                                  </span>
                                  <span className="text-[10px] text-stone-400 font-mono">
                                    ({item.country || 'India'})
                                  </span>
                                </div>
                                <div className="text-[11px] text-stone-500 flex items-center gap-2">
                                  <span>IP: <code className="text-stone-400">{item.ip}</code></span>
                                  <span>•</span>
                                  <span>ISP: <span className="text-stone-400">{item.isp || 'Broadband'}</span></span>
                                </div>
                              </div>
                            </div>

                            {/* Timestamp & Visitor Status */}
                            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center text-xs">
                              <span className="text-amber-300 font-medium">
                                {item.formattedTime || formatIST(new Date(item.timestamp))}
                              </span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold inline-block mt-0.5 ${
                                item.visitType && item.visitType.includes('Returning')
                                  ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                                  : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                              }`}>
                                {item.visitType || 'Visitor'}
                              </span>
                            </div>

                          </div>

                          {/* Technical & Source Meta */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-stone-300">
                            
                            <div className="bg-[#141414] px-3 py-2 rounded-xl border border-[#222222]">
                              <span className="text-[10px] uppercase text-stone-500 font-semibold block">Device</span>
                              <div className="flex items-center gap-1.5 font-medium text-white truncate pt-0.5">
                                {item.deviceType === 'Desktop' ? (
                                  <Laptop className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                                ) : (
                                  <Smartphone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                )}
                                <span className="truncate">{item.deviceBrand || 'Smartphone'}</span>
                              </div>
                            </div>

                            <div className="bg-[#141414] px-3 py-2 rounded-xl border border-[#222222]">
                              <span className="text-[10px] uppercase text-stone-500 font-semibold block">OS &amp; Browser</span>
                              <div className="font-medium text-white truncate pt-0.5" title={`${item.os} • ${item.browser}`}>
                                {item.os} • {item.browser}
                              </div>
                            </div>

                            <div className="bg-[#141414] px-3 py-2 rounded-xl border border-[#222222]">
                              <span className="text-[10px] uppercase text-stone-500 font-semibold block">Traffic Source</span>
                              <div className="flex items-center gap-1 font-medium text-emerald-400 truncate pt-0.5">
                                <Share2 className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate">{item.source || 'Direct Visit'}</span>
                              </div>
                            </div>

                            <div className="bg-[#141414] px-3 py-2 rounded-xl border border-[#222222]">
                              <span className="text-[10px] uppercase text-stone-500 font-semibold block">Visitor ID &amp; Screen</span>
                              <div className="font-mono text-stone-400 truncate pt-0.5 text-[11px]">
                                {item.visitorId || 'BC-CAT'} • {item.screen || 'Mobile'}
                              </div>
                            </div>

                          </div>

                          {/* Last Action */}
                          {item.lastAction && (
                            <div className="text-[11px] bg-amber-500/5 border border-amber-500/10 px-3 py-1.5 rounded-xl flex items-center justify-between text-amber-300">
                              <span>Action: <strong>{item.lastAction}</strong></span>
                              <span className="text-[10px] text-stone-500">Recorded Live</span>
                            </div>
                          )}

                        </div>
                      ))}
                    </div>
                  )}

                  {/* CSV Download Banner on Mobile */}
                  <div className="sm:hidden pt-2">
                    <button
                      onClick={() => exportVisitorLogsToCSV(filteredLogs)}
                      className="w-full py-3 bg-[#202020] text-amber-300 border border-amber-500/20 rounded-2xl text-xs font-bold flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download All Logs as CSV (Excel)</span>
                    </button>
                  </div>

                </div>
              )}

              {/* TAB 2: MOBILE ALERTS (TELEGRAM / WEBHOOK) */}
              {activeTab === 'alerts' && (
                <div className="space-y-6 max-w-2xl mx-auto py-2">
                  <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 rounded-2xl p-4 sm:p-5 space-y-2">
                    <h4 className="font-serif text-base font-bold text-white flex items-center gap-2">
                      <Bell className="w-4 h-4 text-amber-400" />
                      Instant Phone Notification Setup (Telegram)
                    </h4>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      Jab bhi koi aapki website open karega, aapke phone par turant Telegram message aa jayega jisme visitor ka <strong>Sheher (City), IP, Device (Android / iPhone), aur Source (WhatsApp / Direct)</strong> likha hoga!
                    </p>
                  </div>

                  {/* Steps Guide */}
                  <div className="bg-[#181818] border border-[#2E2E2E] rounded-2xl p-5 space-y-3">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Telegram Bot Kaise Banayein (Only 1 Minute Setup):
                    </h5>
                    <ol className="text-xs text-stone-300 space-y-2 list-decimal list-inside leading-relaxed">
                      <li>Apne phone me <strong>Telegram</strong> app open karein aur search karein: <code className="bg-black text-amber-300 px-1.5 py-0.5 rounded">@BotFather</code></li>
                      <li>BotFather ko message bhejein: <code className="bg-black text-amber-300 px-1.5 py-0.5 rounded">/newbot</code> aur apna koi bhi bot name choose karein.</li>
                      <li>BotFather aapko ek <strong>API Token</strong> dega (e.g. <code>723456789:ABCdefGhI...</code>). Use neeche paste karein.</li>
                      <li>Apne naye bot ko Telegram me <strong>Start</strong> karein aur apna <strong>Chat ID</strong> (search <code className="bg-black text-amber-300 px-1.5 py-0.5 rounded">@userinfobot</code>) enter karein.</li>
                    </ol>
                  </div>

                  {/* Alert Config Form */}
                  <form onSubmit={handleSaveAlertSettings} className="bg-[#181818] border border-[#2E2E2E] rounded-2xl p-5 space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-white block">
                        Telegram Bot Token
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 7123456789:AAHkL-XXXXXXXXXXXXXXX"
                        value={config.telegramToken || ''}
                        onChange={(e) => setConfig({ ...config, telegramToken: e.target.value })}
                        className="w-full bg-[#121212] border border-[#333333] focus:border-amber-500 text-white px-3.5 py-2.5 rounded-xl text-xs outline-none font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-white block">
                        Telegram Chat ID (Your personal or group ID)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 123456789"
                        value={config.telegramChatId || ''}
                        onChange={(e) => setConfig({ ...config, telegramChatId: e.target.value })}
                        className="w-full bg-[#121212] border border-[#333333] focus:border-amber-500 text-white px-3.5 py-2.5 rounded-xl text-xs outline-none font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-white block">
                        Optional: Custom Webhook URL (Google Sheets / Discord)
                      </label>
                      <input
                        type="url"
                        placeholder="https://script.google.com/macros/s/... or Discord webhook"
                        value={config.webhookUrl || ''}
                        onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
                        className="w-full bg-[#121212] border border-[#333333] focus:border-amber-500 text-white px-3.5 py-2.5 rounded-xl text-xs outline-none font-mono"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="submit"
                        className="flex-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Save Alert Settings</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleTestAlert}
                        disabled={testAlertStatus === 'sending'}
                        className="px-4 py-2.5 bg-[#252525] hover:bg-[#303030] text-amber-300 rounded-xl text-xs font-bold border border-amber-500/20 transition-colors flex items-center justify-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{testAlertStatus === 'sending' ? 'Sending...' : 'Send Test Alert to Phone'}</span>
                      </button>
                    </div>

                    {testAlertStatus === 'success' && (
                      <p className="text-emerald-400 text-xs flex items-center gap-1.5 pt-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Test notification sent successfully! Check your Telegram.
                      </p>
                    )}
                    {testAlertStatus === 'error' && (
                      <p className="text-rose-400 text-xs flex items-center gap-1.5 pt-1">
                        <AlertCircle className="w-4 h-4" />
                        Failed to send test. Please verify your Bot Token &amp; Chat ID.
                      </p>
                    )}
                  </form>
                </div>
              )}

              {/* TAB 3: GOOGLE CONSOLE INTEGRATION */}
              {activeTab === 'google' && (
                <div className="space-y-6 max-w-2xl mx-auto py-2">
                  
                  {/* Google Cloud Console OAuth 2.0 Sign-In */}
                  <form onSubmit={handleSaveGoogleSettings} className="bg-[#181818] border border-[#2E2E2E] rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-bold">
                          G
                        </div>
                        <div>
                          <h4 className="font-serif text-sm font-bold text-white">
                            Google Cloud Console (Sign in with Google OAuth)
                          </h4>
                          <span className="text-[11px] text-stone-400">
                            Enable customers to 1-click Sign in with their Google/Gmail account
                          </span>
                        </div>
                      </div>

                      <a
                        href="https://console.cloud.google.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                      >
                        <span>Console</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Step-by-Step Instructions */}
                    <div className="bg-[#141414] border border-[#252525] rounded-xl p-3.5 space-y-2 text-xs text-stone-300 leading-relaxed">
                      <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                        Google Cloud Console Me Setup Kaise Karein (Easy 5 Steps):
                      </span>
                      <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-stone-300">
                        <li><a href="https://console.cloud.google.com/" target="_blank" rel="noreferrer" className="text-sky-400 underline">console.cloud.google.com</a> par jakar apna <strong>New Project</strong> banayein (*The Black Cat Cafe*).</li>
                        <li>Left menu me <strong>APIs &amp; Services &gt; OAuth consent screen</strong> open karke User Type <em>External</em> select karein aur Cafe App Name dalein.</li>
                        <li><strong>Credentials &gt; Create Credentials &gt; OAuth client ID</strong> par click karein aur Application Type: <strong>Web application</strong> chunein.</li>
                        <li><strong>Authorized JavaScript origins</strong> me ye exact URL dalein:
                          <code className="block bg-black text-amber-300 p-1.5 rounded-lg mt-1 font-mono text-[11px]">
                            https://the-black-cat-cafe.vercel.app
                          </code>
                        </li>
                        <li>Google aapko ek <strong>Client ID</strong> dega (e.g. <code>123456789-xxx.apps.googleusercontent.com</code>). Use neeche paste karke Save karein.</li>
                      </ol>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-white block">
                        Google OAuth Client ID
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 1029384756-abcdefghijk.apps.googleusercontent.com"
                        value={googleClientIdInput}
                        onChange={(e) => setGoogleClientIdInput(e.target.value)}
                        className="w-full bg-[#121212] border border-[#333333] focus:border-amber-500 text-white px-3.5 py-2.5 rounded-xl text-xs outline-none font-mono"
                      />
                      <p className="text-[10px] text-stone-500">
                        {googleClientIdInput ? '✓ Custom Google Client ID configured' : 'Note: Website already has a built-in instant Google login flow active even without a custom ID.'}
                      </p>
                    </div>

                    {/* Google Search Console SEO Section */}
                    <div className="pt-3 border-t border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-white block">
                          Google Search Console (Site Verification Code / Meta Tag)
                        </label>
                        <a
                          href="https://search.google.com/search-console"
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-sky-400 underline flex items-center gap-0.5"
                        >
                          <span>search.google.com</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. google-site-verification=abc123xyz or verification string"
                        value={googleSearchTagInput}
                        onChange={(e) => setGoogleSearchTagInput(e.target.value)}
                        className="w-full bg-[#121212] border border-[#333333] focus:border-amber-500 text-white px-3.5 py-2.5 rounded-xl text-xs outline-none font-mono"
                      />
                      <p className="text-[10px] text-stone-400">
                        Aapki site Google Search par index aur verify karne ke liye Search Console ka verification code yahan save karein.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Save Google Console Settings</span>
                    </button>

                    {googleSaveSuccess && (
                      <p className="text-emerald-400 text-xs font-semibold text-center flex items-center justify-center gap-1 pt-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Google Console credentials saved successfully!
                      </p>
                    )}
                  </form>

                </div>
              )}

              {/* TAB 4: SETTINGS & EXPORT */}
              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-2xl mx-auto py-2">
                  
                  {/* Change Admin PIN */}
                  <form onSubmit={handleChangePin} className="bg-[#181818] border border-[#2E2E2E] rounded-2xl p-5 space-y-4">
                    <div className="flex items-center gap-2 text-white font-serif font-bold text-sm">
                      <Key className="w-4 h-4 text-amber-400" />
                      <span>Change Owner / Admin PIN</span>
                    </div>
                    <p className="text-xs text-stone-400">
                      Aap is dashboard ko secure rakhne ke liye naya 4-digit PIN set kar sakte hain. Current PIN: <strong className="text-amber-400">{config.pin || '1234'}</strong>
                    </p>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        maxLength={10}
                        placeholder="Enter New PIN"
                        value={newPinInput}
                        onChange={(e) => setNewPinInput(e.target.value)}
                        className="w-48 bg-[#121212] border border-[#333333] focus:border-amber-500 text-white px-3.5 py-2 rounded-xl text-xs outline-none font-bold"
                      />
                      <button
                        type="submit"
                        className="bg-[#262626] hover:bg-[#333333] text-amber-300 border border-amber-500/30 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                      >
                        Update PIN
                      </button>
                    </div>
                    {pinChangeSuccess && (
                      <p className="text-emerald-400 text-xs flex items-center gap-1 pt-1 font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        PIN changed successfully!
                      </p>
                    )}
                  </form>

                  {/* Vercel Official Web Analytics Guide */}
                  <div className="bg-[#181818] border border-[#2E2E2E] rounded-2xl p-5 space-y-3">
                    <div className="flex items-center gap-2 text-white font-serif font-bold text-sm">
                      <Globe className="w-4 h-4 text-sky-400" />
                      <span>Official Vercel Web Analytics Active</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      Humne aapki website par official <code className="text-amber-400">@vercel/analytics</code> be integrate kar diya hai. Aap apne Vercel account (<a href="https://vercel.com/dashboard" target="_blank" rel="noreferrer" className="text-sky-400 underline inline-flex items-center gap-0.5">vercel.com <ExternalLink className="w-3 h-3" /></a>) ke Analytics tab me jaakar live international graphs, real-time pageviews aur device metrics bhi dekh sakte hain.
                    </p>
                  </div>

                  {/* Clear Local Data */}
                  <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h5 className="text-xs font-bold text-rose-300">Clear Local Visitor Logs</h5>
                      <p className="text-[11px] text-stone-400">Local browser me save kiye hue visitor records ko wipe karein.</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleClear}
                      className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear All Logs</span>
                    </button>
                  </div>

                </div>
              )}

            </div>

            {/* Bottom Footer Bar */}
            <div className="p-4 border-t border-[#262626] bg-[#141414] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
              <div className="flex items-center gap-2">
                <Cat className="w-4 h-4 text-amber-500" />
                <span>The Black Cat Cafe • Visitor Tracking Engine v1.0</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-stone-400">Auto-Refreshes on Every Visit</span>
                <span>•</span>
                <button
                  onClick={onClose}
                  className="text-amber-400 hover:text-amber-300 font-semibold"
                >
                  Close Window
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
