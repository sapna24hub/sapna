import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  X, 
  Send, 
  Calendar, 
  Clock, 
  MapPin, 
  Navigation, 
  ShoppingBag, 
  Heart, 
  Bot, 
  User, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

const QUICK_SUGGESTIONS = [
  "Hello Gorgeous! ✨",
  "Which facial gives instant glow?",
  "Recommend a Hair Spa for frizzy hair",
  "What are your at-home salon timings?",
  "I want to book an appointment 📅",
  "Show me Party & Bridal Makeover packages"
];

export default function GlowStyleAI({
  onOpenBookingModal,
  onOpenCart,
  onOpenTracker,
  onExploreServices
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello Gorgeous! ✨ Welcome to GlowAura Luxury Home Salon. I am **Glow & Style AI**, your personal beauty & aesthetic consultant. How can I pamper you today? 🌸💅",
      time: 'Just now',
      action: null
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Intelligent Beauty Consultant AI Brain
  const generateAIResponse = (userQuery) => {
    const q = userQuery.toLowerCase().trim();

    // 1. Greetings
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('gorgeous') || q.includes('namaste')) {
      return {
        text: "Hello Gorgeous! ✨ It is an absolute delight to assist you today. Looking for radiant skin, silky frizz-free hair, or a glam festive makeover in the comfort of your home? 💖 Tell me what pampering you're craving! 💇‍♀️💅",
        action: null
      };
    }

    // 2. Booking Appointments
    if (q.includes('book') || q.includes('appointment') || q.includes('schedule') || q.includes('slot') || q.includes('timing')) {
      if (q.includes('time') || q.includes('hour') || q.includes('timing') || q.includes('open') || q.includes('kab')) {
        return {
          text: "Our certified female beauty consultants visit your home daily between **9:00 AM and 7:00 PM**! ⏰ You can select from 5 convenient time slots (Morning, Afternoon, or Evening). Would you like to schedule your session now? 🌸",
          action: { type: 'booking', label: '📅 Schedule Home Appointment' }
        };
      }
      return {
        text: "I would be thrilled to book your home salon appointment! ✨ Please let me know your preferred service and whether you prefer a **Morning (9 AM - 1 PM)**, **Afternoon (1:30 PM - 5 PM)**, or **Evening (5 PM - 7 PM)** visit. You can also click below to pick your date & address right away! 💖",
        action: { type: 'booking', label: '📅 Open Appointment Booking Form' }
      };
    }

    // 3. Facials, Clean-ups & Bleach / Skin Concerns
    if (q.includes('facial') || q.includes('clean') || q.includes('skin') || q.includes('glow') || q.includes('tan') || q.includes('bleach') || q.includes('acne') || q.includes('face')) {
      if (q.includes('tan') || q.includes('d-tan') || q.includes('sunburn')) {
        return {
          text: "For instant sun-tan removal, I highly recommend our **Sara Herbal Oxy D-Tan & Face Bleach Pack** (Just ₹299) or our clinical **O3+ Seaweed Whitening Facial** (₹749)! ✨ They draw out pigmentation and restore your natural clarity. 🌸",
          action: { type: 'services', label: '💆‍♀️ View Facials & Clean-ups' }
        };
      }
      if (q.includes('acne') || q.includes('pimple') || q.includes('pore') || q.includes('blackhead')) {
        return {
          text: "For acne-prone or congested skin, our **Bamboo Charcoal Deep Pore Detox Clean-Up** (₹349) and **Diamond Sparkle Microdermabrasion** (₹699) work wonders by vacuuming impurities without irritating the skin barrier! 🌿✨",
          action: { type: 'services', label: '💆‍♀️ Explore Skin Treatments' }
        };
      }
      return {
        text: "For that luminous, head-turning radiance, you will adore our **24K Gold Luxury Radiance Facial** (Only ₹599) or **Lotus Radiant Diamond Glow** (₹649)! ✨ Infused with pure gold and collagen boosters for 24-hour glass skin. Shall I add this to your booking? 💖",
        action: { type: 'services', label: '💆‍♀️ Browse All 8 Facials' }
      };
    }

    // 4. Hair Care, Haircut & Hair Spa
    if (q.includes('hair') || q.includes('haircut') || q.includes('spa') || q.includes('keratin') || q.includes('frizz') || q.includes('dandruff') || q.includes('hairfall') || q.includes('blowdry')) {
      if (q.includes('haircut') || q.includes('cut') || q.includes('trim')) {
        return {
          text: "Our certified hair stylists provide precision hair trimming, designer layer styling, and blowout styling right at your home! 💇‍♀️✨ Paired with our **Ammonia-Free Touch-up & Volume Blowdry** (₹449) for a stunning salon finish.",
          action: { type: 'services', label: '💇‍♀️ View Hair Services' }
        };
      }
      if (q.includes('frizz') || q.includes('dry') || q.includes('keratin') || q.includes('smooth')) {
        return {
          text: "Say goodbye to unruly frizz! 💇‍♀️ Our **Brazilian Keratin Smoothening** (₹1,499) and **L'Oreal Mythic Deep Nourishing Hair Spa** (₹599) infuse rich argan and avocado proteins for mirror-gloss, silky straight hair lasting up to 12 weeks! ✨",
          action: { type: 'services', label: '💇‍♀️ Explore Hair Spas' }
        };
      }
      if (q.includes('dandruff') || q.includes('scalp') || q.includes('hairfall')) {
        return {
          text: "We have two targeted scalp rituals: 🌿 **Anti-Dandruff & Scalp Detox Spa** (₹499) with Australian tea tree oil, and our **Ayurvedic Bhringraj Hair Fall Control Spa** (₹449) with warm oil head champi! You'll feel so refreshed. 💆‍♀️",
          action: { type: 'services', label: '💇‍♀️ View Hair Care Menu' }
        };
      }
      return {
        text: "Our home hair spas include relaxing pressure-point scalp massages, micro-mist thermal steam, and deep cuticle conditioning! 💇‍♀️ Options start from just **₹449**. Which hair concern can I help you target today, Gorgeous? ✨",
        action: { type: 'services', label: '💇‍♀️ View Hair Spa Packages' }
      };
    }

    // 5. Bridal & Party Makeup / Makeovers / Mehendi
    if (q.includes('bridal') || q.includes('makeup') || q.includes('party') || q.includes('wedding') || q.includes('mehendi') || q.includes('sangeet') || q.includes('haldi') || q.includes('draping')) {
      return {
        text: "Congratulations, Gorgeous! 💍👰 We specialize in high-definition festive glam! Our **Airbrush HD Bridal Glamour with 3D Mink Lashes** (₹2,999) delivers a 24-hr transfer-proof camera-ready base. We also offer **Haldi/Mehendi Dewy Glam** (₹1,499) and **Organic Bridal Mehendi** (₹1,199). Would you like to consult our Senior Bridal Artist? 🌸✨",
        action: { type: 'services', label: '👰 View Bridal Packages' }
      };
    }

    // 6. Waxing & Threading
    if (q.includes('wax') || q.includes('waxing') || q.includes('thread') || q.includes('eyebrow') || q.includes('bikini') || q.includes('rica')) {
      return {
        text: "We use 100% colophony-free Italian RICA wax that is exceptionally gentle on delicate skin! 🍯 **RICA White Chocolate Full Body Wax** is just ₹699, **Italian Roll-on Cartridge Wax** is ₹849, and **Eyebrow Threading Combo** is only ₹89! Zero mess left behind. 💅",
        action: { type: 'services', label: '🍯 View Waxing Packages' }
      };
    }

    // 7. Manicure & Pedicure / Nails
    if (q.includes('mani') || q.includes('pedi') || q.includes('nail') || q.includes('feet') || q.includes('hand') || q.includes('heel')) {
      return {
        text: "Treat your hands and feet like royalty! 💅 Try our **Crystal Detox Foot Spa Pedicure** (₹449) with electronic callus buffing, or our classic **French Gel Lacquer Manicure** (₹349) with chip-free shine for 3+ weeks. Single-use sterile tub liners guaranteed! 🌹",
        action: { type: 'services', label: '💅 View Mani-Pedi Menu' }
      };
    }

    // 8. Pricing, Discounts, Coupons, Travel Fee
    if (q.includes('price') || q.includes('cost') || q.includes('discount') || q.includes('coupon') || q.includes('rate') || q.includes('offer') || q.includes('free')) {
      return {
        text: "We offer super affordable, transparent pricing with **FREE Home Consultant Visit on all orders above ₹499**! 🏷️ Use promo coupon **GLOW100** for flat ₹100 OFF, or **FIRSTBEAUTY** for ₹150 OFF your first home salon booking! ✨",
        action: { type: 'cart', label: '🛍️ View Cart & Total Cost' }
      };
    }

    // 9. Live Tracking
    if (q.includes('track') || q.includes('location') || q.includes('map') || q.includes('live') || q.includes('beautician')) {
      return {
        text: "With our real-time GPS tracking, you can watch your verified female consultant travel towards your doorstep on an interactive map! 🛵📍 Live ETA countdown is updated continuously. Test it with ID `GLOW-DEMO1` below! ✨",
        action: { type: 'tracker', label: '📍 Open Live GPS Tracker' }
      };
    }

    // 10. Shopping Products Store
    if (q.includes('product') || q.includes('shop') || q.includes('serum') || q.includes('cream') || q.includes('buy') || q.includes('shampoo')) {
      return {
        text: "We have an exclusive beauty store! 🛍️ Shop certified **24K Gold Face Serums** (₹499), **L'Oreal Keratin Masks** (₹799), **Kama Kumkumadi Oils** (₹549), and **O3+ Home Facial Kits** (₹449). Delivered to your home or brought along by your consultant! 🌸",
        action: { type: 'shop', label: '🛍️ Browse Beauty Products' }
      };
    }

    // 11. Fallback for unknown / unavailable services
    return {
      text: "Oh, while we don't currently offer that exact treatment, we have an extensive luxury menu of **Facials, Hair Spas, Bridal HD Makeup, RICA Waxing, Manicures, Pedicures, and Beauty Products** tailored for home comfort! 🌸✨ Let me take you to our full menu so you can pick your favorite pampering session! 💖",
      action: { type: 'services', label: '✨ Explore Full Salon Menu' }
    };
  };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      action: null
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate smart thinking delay
    setTimeout(() => {
      const response = generateAIResponse(text);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: response.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: response.action
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleActionClick = (action) => {
    if (!action) return;
    if (action.type === 'booking') onOpenBookingModal();
    else if (action.type === 'cart') onOpenCart();
    else if (action.type === 'tracker') onOpenTracker();
    else if (action.type === 'services') onExploreServices();
    else if (action.type === 'shop') {
      const shopEl = document.getElementById('shop');
      if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Trigger Button at Bottom Right */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-parlour-800 via-rose-600 to-gold-500 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-2.5 border-2 border-white/80 group"
          title="Chat with Glow & Style AI"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-gold-300 animate-spin" style={{ animationDuration: '4s' }} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-white"></span>
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-[10px] uppercase font-bold text-rose-200 block leading-tight">Virtual Assistant</span>
            <span className="text-xs font-bold text-white flex items-center gap-1">
              Glow & Style AI ✨
            </span>
          </div>
        </button>
      )}

      {/* Expandable Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[92vw] sm:w-[410px] h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-rose-200/80 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6">
          
          {/* Upscale Header */}
          <div className="p-4 bg-gradient-to-r from-parlour-950 via-parlour-900 to-parlour-800 text-white flex items-center justify-between border-b border-rose-900/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-gold-400 p-0.5 shadow-md flex items-center justify-center flex-shrink-0">
                <div className="w-full h-full bg-parlour-950 rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-gold-300" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif text-sm font-bold text-white">Glow & Style AI</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>
                <p className="text-[10px] text-rose-200">Personal Salon & Beauty Consultant</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAF7F7]">
            
            {/* Salon Welcome Card Banner */}
            <div className="bg-rose-50 border border-rose-200/60 p-3 rounded-2xl text-center space-y-1">
              <p className="text-xs font-bold text-parlour-800 flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" /> At-Home Luxury Parlour Assistance
              </p>
              <p className="text-[11px] text-gray-500">
                Ask about Facials, Hair Spas, Bridal Makeup, Waxing, Timings (9AM-7PM) & Booking! 🌸
              </p>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-xl bg-parlour-800 text-gold-300 flex items-center justify-center flex-shrink-0 text-xs shadow-xs mt-0.5">
                    ✨
                  </div>
                )}

                <div className={`max-w-[82%] space-y-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-parlour-700 text-white rounded-tr-none'
                        : 'bg-white text-gray-800 border border-rose-100 rounded-tl-none font-medium'
                    }`}
                  >
                    {/* Simple formatting for bold markdown */}
                    {msg.text.split('**').map((part, i) => 
                      i % 2 === 1 ? <strong key={i} className="text-parlour-800 font-extrabold">{part}</strong> : part
                    )}
                  </div>

                  {/* Interactive Action Button (e.g. Schedule Booking, Explore Menu) */}
                  {msg.action && (
                    <button
                      onClick={() => handleActionClick(msg.action)}
                      className="px-4 py-2 bg-gradient-to-r from-parlour-800 to-rose-700 hover:from-parlour-900 hover:to-rose-800 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-all group"
                    >
                      <span>{msg.action.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}

                  <span className="text-[9px] text-gray-400 block px-1">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-xs text-gray-400 italic bg-white px-3 py-2 rounded-2xl w-fit border border-rose-100 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-parlour-500 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-parlour-500 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 rounded-full bg-parlour-500 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                <span className="text-[11px] text-parlour-700 font-semibold ml-1">Glow & Style AI is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="p-2.5 bg-white border-t border-rose-100 overflow-x-auto flex items-center gap-1.5 scrollbar-none">
            {QUICK_SUGGESTIONS.map((sug, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(sug)}
                className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-parlour-800 border border-rose-200/80 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask Glow & Style AI anything..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs focus:ring-2 focus:ring-parlour-500 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-parlour-800 hover:bg-parlour-900 disabled:opacity-40 text-gold-300 rounded-2xl shadow-sm transition-all"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
