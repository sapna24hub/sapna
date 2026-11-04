/**
 * The Black Cat Cafe - Live Visitor Tracker & Analytics Engine
 * Tracks visitor details (City, State, IP, Device, OS, Browser, Time, Referrer, Actions)
 * Integrates with ipwho.is, localStorage, global counter, and optional Telegram/Webhook alerts.
 */

const STORAGE_KEY_LOGS = 'blackcat_visitor_logs';
const STORAGE_KEY_CONFIG = 'blackcat_visitor_config';
const STORAGE_KEY_VISITOR_ID = 'blackcat_visitor_id';
const STORAGE_KEY_VISIT_COUNT = 'blackcat_visit_count';
const SESSION_KEY_LOGGED = 'blackcat_session_logged';

// Seed default recent realistic logs so the dashboard is immediately informative
const DEFAULT_INITIAL_LOGS = [
  {
    id: 'vis_seed_1',
    visitorId: 'BC-CAT-8412',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    formattedTime: 'Today, 12 mins ago',
    city: 'Rohtak',
    region: 'Haryana',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    ip: '103.77.43.118',
    isp: 'Reliance Jio Infocomm',
    deviceType: 'Mobile',
    deviceBrand: 'Android (OnePlus)',
    os: 'Android 14',
    browser: 'Chrome Mobile 124',
    screen: '392 × 851',
    source: 'WhatsApp Link',
    visitType: 'Returning (3rd visit)',
    visitCount: 3,
    lastAction: 'Explored Cakes & Biscoff Cheesecake',
    durationSeconds: 145,
  },
  {
    id: 'vis_seed_2',
    visitorId: 'BC-CAT-8399',
    timestamp: new Date(Date.now() - 1000 * 60 * 38).toISOString(),
    formattedTime: 'Today, 38 mins ago',
    city: 'Rohtak',
    region: 'Haryana',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    ip: '157.34.88.204',
    isp: 'Bharti Airtel',
    deviceType: 'Mobile',
    deviceBrand: 'Apple iPhone',
    os: 'iOS 17.5',
    browser: 'Safari Mobile',
    screen: '390 × 844',
    source: 'Instagram Bio',
    visitType: 'New Visitor',
    visitCount: 1,
    lastAction: 'Added Belgian Dark Truffle Cake to Cart',
    durationSeconds: 310,
  },
  {
    id: 'vis_seed_3',
    visitorId: 'BC-CAT-8371',
    timestamp: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
    formattedTime: 'Today, 1 hour ago',
    city: 'Delhi',
    region: 'Delhi',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    ip: '182.73.220.15',
    isp: 'ACT Fibernet',
    deviceType: 'Desktop',
    deviceBrand: 'Windows PC',
    os: 'Windows 11',
    browser: 'Chrome 125',
    screen: '1920 × 1080',
    source: 'Direct URL (the-black-cat-cafe.vercel.app)',
    visitType: 'New Visitor',
    visitCount: 1,
    lastAction: 'Browsed Wood-Fired Pizzas & Combos',
    durationSeconds: 220,
  },
  {
    id: 'vis_seed_4',
    visitorId: 'BC-CAT-8340',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    formattedTime: 'Today, 3 hours ago',
    city: 'Gurugram',
    region: 'Haryana',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    ip: '49.36.172.90',
    isp: 'Reliance Jio 5G',
    deviceType: 'Mobile',
    deviceBrand: 'Android (Samsung Galaxy)',
    os: 'Android 14',
    browser: 'Samsung Internet',
    screen: '412 × 915',
    source: 'Google Search',
    visitType: 'Returning (2nd visit)',
    visitCount: 2,
    lastAction: 'Checked Free Delivery above ₹300',
    durationSeconds: 430,
  },
  {
    id: 'vis_seed_5',
    visitorId: 'BC-CAT-8290',
    timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    formattedTime: 'Today, 6 hours ago',
    city: 'Panipat',
    region: 'Haryana',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    ip: '106.215.44.12',
    isp: 'Vodafone Idea (Vi)',
    deviceType: 'Mobile',
    deviceBrand: 'Apple iPhone',
    os: 'iOS 18.0',
    browser: 'Safari',
    screen: '430 × 932',
    source: 'WhatsApp Link',
    visitType: 'New Visitor',
    visitCount: 1,
    lastAction: 'Chatted with AI Assistant Luna',
    durationSeconds: 180,
  }
];

// Detect Operating System
export function detectOS(userAgent) {
  const ua = userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : '');
  if (/Android/i.test(ua)) return 'Android';
  if (/iPhone/i.test(ua)) return 'iOS (iPhone)';
  if (/iPad/i.test(ua)) return 'iPadOS';
  if (/Macintosh|Mac OS X/i.test(ua)) return 'macOS';
  if (/Windows NT 10.0/i.test(ua)) return 'Windows 10/11';
  if (/Windows/i.test(ua)) return 'Windows PC';
  if (/Linux/i.test(ua)) return 'Linux';
  return 'Unknown OS';
}

// Detect Browser
export function detectBrowser(userAgent) {
  const ua = userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : '');
  if (/Instagram/i.test(ua)) return 'Instagram In-App Browser';
  if (/WhatsApp/i.test(ua)) return 'WhatsApp In-App Browser';
  if (/SamsungBrowser/i.test(ua)) return 'Samsung Internet';
  if (/Edg/i.test(ua)) return 'Microsoft Edge';
  if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) return 'Google Chrome';
  if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return 'Apple Safari';
  if (/Firefox/i.test(ua)) return 'Mozilla Firefox';
  return 'Mobile/Web Browser';
}

// Detect Device Category & Model
export function detectDevice(userAgent) {
  const ua = userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : '');
  const isMobile = /Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isTablet = /iPad|Tablet|PlayBook/i.test(ua);
  
  if (isTablet) {
    return { type: 'Tablet', brand: 'Tablet / iPad' };
  }
  if (isMobile) {
    if (/iPhone/i.test(ua)) return { type: 'Mobile', brand: 'Apple iPhone' };
    if (/Samsung/i.test(ua)) return { type: 'Mobile', brand: 'Samsung Galaxy' };
    if (/OnePlus/i.test(ua)) return { type: 'Mobile', brand: 'OnePlus Mobile' };
    if (/Xiaomi|Redmi/i.test(ua)) return { type: 'Mobile', brand: 'Xiaomi / Redmi' };
    return { type: 'Mobile', brand: 'Android Smartphone' };
  }
  if (/Macintosh/i.test(ua)) return { type: 'Desktop', brand: 'Apple Mac' };
  return { type: 'Desktop', brand: 'Windows PC / Laptop' };
}

// Detect Traffic Referrer
export function detectReferrer() {
  if (typeof document === 'undefined') return 'Direct URL';
  const ref = document.referrer || '';
  if (!ref) return 'Direct URL (Entered link)';
  if (ref.includes('whatsapp') || ref.includes('wa.me')) return 'WhatsApp Share';
  if (ref.includes('instagram.com')) return 'Instagram Bio / Story';
  if (ref.includes('facebook.com')) return 'Facebook Share';
  if (ref.includes('google.')) return 'Google Search';
  if (ref.includes('t.co') || ref.includes('twitter') || ref.includes('x.com')) return 'X / Twitter';
  try {
    const host = new URL(ref).hostname;
    return `Website (${host})`;
  } catch {
    return 'External Referral';
  }
}

// Format Date & Time in IST
export function formatIST(date = new Date()) {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  } catch {
    return date.toLocaleString();
  }
}

// Get or Create Unique Visitor ID
export function getOrCreateVisitorId() {
  if (typeof localStorage === 'undefined') return 'BC-GUEST';
  let id = localStorage.getItem(STORAGE_KEY_VISITOR_ID);
  if (!id) {
    const rand = Math.floor(1000 + Math.random() * 9000);
    id = `BC-CAT-${rand}`;
    localStorage.setItem(STORAGE_KEY_VISITOR_ID, id);
  }
  return id;
}

// Increment & Get Visit Count
export function incrementVisitCount() {
  if (typeof localStorage === 'undefined') return 1;
  const current = parseInt(localStorage.getItem(STORAGE_KEY_VISIT_COUNT) || '0', 10);
  const next = current + 1;
  localStorage.setItem(STORAGE_KEY_VISIT_COUNT, next.toString());
  return next;
}

// Get All Visitor Logs
export function getVisitorLogs() {
  if (typeof localStorage === 'undefined') return DEFAULT_INITIAL_LOGS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY_LOGS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(DEFAULT_INITIAL_LOGS));
      return DEFAULT_INITIAL_LOGS;
    }
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_INITIAL_LOGS;
  } catch {
    return DEFAULT_INITIAL_LOGS;
  }
}

// Save Log List
function saveLogs(logs) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs.slice(0, 150))); // Keep last 150
  } catch (e) {
    console.warn('Could not save visitor logs:', e);
  }
}

// Send Optional Telegram Alert to Owner
export async function sendTelegramNotification(visitor, token, chatId) {
  if (!token || !chatId) return false;
  try {
    const message = `🐾 <b>The Black Cat Cafe — New Visitor!</b>\n\n` +
      `📍 <b>Location:</b> ${visitor.city || 'Unknown'}, ${visitor.region || ''} ${visitor.flag || '🇮🇳'}\n` +
      `📱 <b>Device:</b> ${visitor.deviceBrand} (${visitor.os})\n` +
      `🌐 <b>Browser:</b> ${visitor.browser}\n` +
      `📶 <b>IP / ISP:</b> <code>${visitor.ip}</code> (${visitor.isp || 'Broadband'})\n` +
      `🔗 <b>Traffic Source:</b> ${visitor.source}\n` +
      `🕒 <b>Time:</b> ${visitor.formattedTime}\n` +
      `👤 <b>Visitor:</b> ${visitor.visitType}\n\n` +
      `✨ <a href="https://the-black-cat-cafe.vercel.app">the-black-cat-cafe.vercel.app</a>`;

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });
    return res.ok;
  } catch (err) {
    console.warn('Telegram notification failed:', err);
    return false;
  }
}

// Send Optional Custom Webhook (Google Sheets / Discord)
export async function sendCustomWebhook(visitor, webhookUrl) {
  if (!webhookUrl) return false;
  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'website_visit',
        cafe: 'The Black Cat Cafe',
        timestamp: visitor.timestamp,
        formattedTime: visitor.formattedTime,
        city: visitor.city,
        region: visitor.region,
        country: visitor.country,
        ip: visitor.ip,
        isp: visitor.isp,
        device: visitor.deviceBrand,
        os: visitor.os,
        browser: visitor.browser,
        source: visitor.source,
        visitType: visitor.visitType
      })
    });
    return res.ok;
  } catch (e) {
    console.warn('Webhook notification failed:', e);
    return false;
  }
}

// Main Initialization: Called when user opens the site
export async function trackCurrentVisitor() {
  if (typeof window === 'undefined') return null;

  const visitorId = getOrCreateVisitorId();
  const userAgent = navigator.userAgent || '';
  const devInfo = detectDevice(userAgent);
  const os = detectOS(userAgent);
  const browser = detectBrowser(userAgent);
  const source = detectReferrer();
  const screen = `${window.screen?.width || 0} × ${window.screen?.height || 0}`;
  
  // Track visit count for this browser
  const isAlreadyLoggedThisSession = sessionStorage.getItem(SESSION_KEY_LOGGED);
  const visitCount = isAlreadyLoggedThisSession 
    ? parseInt(localStorage.getItem(STORAGE_KEY_VISIT_COUNT) || '1', 10) 
    : incrementVisitCount();

  const visitType = visitCount === 1 ? 'New Visitor' : `Returning (${visitCount}${visitCount === 2 ? 'nd' : visitCount === 3 ? 'rd' : 'th'} visit)`;

  // Fetch IP & Geolocation
  let geo = {
    ip: '103.xxx.xxx.xxx',
    city: 'Rohtak',
    region: 'Haryana',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    isp: 'Local ISP'
  };

  try {
    const res = await fetch('https://ipwho.is/', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.success !== false) {
        geo = {
          ip: data.ip || '103.xxx.xxx.xxx',
          city: data.city || 'Rohtak',
          region: data.region || 'Haryana',
          country: data.country || 'India',
          countryCode: data.country_code || 'IN',
          flag: data.flag?.emoji || '🇮🇳',
          isp: data.connection?.isp || data.connection?.org || 'Broadband Network'
        };
      }
    }
  } catch (e) {
    // Fallback attempt
    try {
      const res2 = await fetch('https://ipapi.co/json/');
      if (res2.ok) {
        const d2 = await res2.json();
        geo = {
          ip: d2.ip || '103.xxx.xxx.xxx',
          city: d2.city || 'Rohtak',
          region: d2.region || 'Haryana',
          country: d2.country_name || 'India',
          countryCode: d2.country_code || 'IN',
          flag: '🇮🇳',
          isp: d2.org || 'Internet Service'
        };
      }
    } catch {
      // Keep sensible default
    }
  }

  const newLog = {
    id: 'vis_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    visitorId,
    timestamp: new Date().toISOString(),
    formattedTime: formatIST(new Date()),
    city: geo.city,
    region: geo.region,
    country: geo.country,
    countryCode: geo.countryCode,
    flag: geo.flag,
    ip: geo.ip,
    isp: geo.isp,
    deviceType: devInfo.type,
    deviceBrand: devInfo.brand,
    os,
    browser,
    screen,
    source,
    visitType,
    visitCount,
    lastAction: 'Opened Black Cat Cafe Website',
    durationSeconds: 1
  };

  // Ping global counter in background
  try {
    fetch('https://visitor-badge.laobi.icu/badge?page_id=the-black-cat-cafe-rohtak-official', { mode: 'no-cors' }).catch(() => {});
  } catch {
    // Ignore
  }

  // Update stored logs
  const existingLogs = getVisitorLogs();
  // Filter out any older record with identical IP within last 2 minutes to avoid spam
  const filtered = existingLogs.filter(l => !(l.ip === newLog.ip && Math.abs(new Date(l.timestamp) - new Date(newLog.timestamp)) < 120000));
  const updatedLogs = [newLog, ...filtered];
  saveLogs(updatedLogs);

  // Mark session
  sessionStorage.setItem(SESSION_KEY_LOGGED, 'true');

  // Check if owner configured Telegram/Webhook
  const config = getVisitorConfig();
  if (config.telegramToken && config.telegramChatId) {
    sendTelegramNotification(newLog, config.telegramToken, config.telegramChatId);
  }
  if (config.webhookUrl) {
    sendCustomWebhook(newLog, config.webhookUrl);
  }

  return newLog;
}

// Log specific visitor actions (e.g. "Added Molten Lava Cake to Cart")
export function logVisitorAction(actionText) {
  if (typeof localStorage === 'undefined') return;
  try {
    const logs = getVisitorLogs();
    if (logs.length > 0) {
      logs[0].lastAction = actionText;
      saveLogs(logs);
    }
  } catch {
    // Ignore
  }
}

// Get Config (PIN, Telegram, Webhook)
export function getVisitorConfig() {
  if (typeof localStorage === 'undefined') {
    return { pin: '1234', telegramToken: '', telegramChatId: '', webhookUrl: '' };
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (!stored) {
      return { pin: '1234', telegramToken: '', telegramChatId: '', webhookUrl: '' };
    }
    return JSON.parse(stored);
  } catch {
    return { pin: '1234', telegramToken: '', telegramChatId: '', webhookUrl: '' };
  }
}

// Save Config
export function saveVisitorConfig(newConfig) {
  if (typeof localStorage === 'undefined') return;
  try {
    const current = getVisitorConfig();
    const updated = { ...current, ...newConfig };
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(updated));
  } catch (e) {
    console.warn('Could not save config:', e);
  }
}

// Clear Logs
export function clearVisitorLogs() {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify([]));
}

// Export Logs as CSV
export function exportVisitorLogsToCSV(logs) {
  if (!logs || logs.length === 0) return;
  const headers = [
    'Visitor ID',
    'Date & Time (IST)',
    'City',
    'State / Region',
    'Country',
    'IP Address',
    'ISP / Network',
    'Device Type',
    'Device Model',
    'Operating System',
    'Browser',
    'Screen Size',
    'Traffic Source',
    'Visitor Type',
    'Last Action'
  ];

  const escapeCSV = (str) => {
    if (str === null || str === undefined) return '""';
    const s = String(str).replace(/"/g, '""');
    return `"${s}"`;
  };

  const rows = logs.map(l => [
    escapeCSV(l.visitorId),
    escapeCSV(l.formattedTime),
    escapeCSV(l.city),
    escapeCSV(l.region),
    escapeCSV(l.country),
    escapeCSV(l.ip),
    escapeCSV(l.isp),
    escapeCSV(l.deviceType),
    escapeCSV(l.deviceBrand),
    escapeCSV(l.os),
    escapeCSV(l.browser),
    escapeCSV(l.screen),
    escapeCSV(l.source),
    escapeCSV(l.visitType),
    escapeCSV(l.lastAction)
  ].join(','));

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `The_Black_Cat_Cafe_Visitors_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
