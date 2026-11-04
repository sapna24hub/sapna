import React, { useState, useRef, useEffect } from 'react';
import { Cat, MessageSquare, X, Send, Sparkles, ShoppingBag, Flame, Coffee, Pizza, RotateCcw, ShieldCheck } from 'lucide-react';

export default function AIAssistantChatbot({ onAddToCart, onOpenTray, onOpenAdmin }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Meow! 🐾 Welcome to The Black Cat Cafe! 'Come hungry, leave happy' — great taste every time, because good food means good mood! How can Luna tempt your tastebuds today?",
      quickReplies: [
        '🛵 Free Delivery (Above ₹300)',
        '🍰 Best Cakes & Pastries',
        '🍕 Recommend a Pizza',
        '🍔 Best Burger',
        '🧋 Cold Coffee Picks',
        '🎟️ Discount Coupon'
      ]
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const knowledgeBase = {
    pizza: {
      text: "Our wood-fired pizzas are baked fresh with 100% pure mozzarella! The **Paneer Makhani Cheese Burst (₹279)** and classic **Margherita Basil (₹199)** are absolute customer favorites. Want me to add one to your cart?",
      recommendItem: { id: 1, name: 'Paneer Makhani Cheese Burst Pizza', price: 279, category: 'Pizzas' }
    },
    burger: {
      text: "Craving a smash burger? Try our signature **Black Cat Charcoal Smash Burger (₹189)** or the **Crispy Paneer Supreme (₹149)**! Butter-toasted brioche with smoky house sauce.",
      recommendItem: { id: 6, name: 'Black Cat Charcoal Smash Burger', price: 189, category: 'Burgers' }
    },
    coffee: {
      text: "For a chilled kick, nothing beats our **Signature Black Cat Cold Brew (₹139)** or the thick **Belgian Dark Chocolate Thickshake (₹169)**. For hot sips, try the **Italian Velvet Cappuccino (₹99)**!",
      recommendItem: { id: 10, name: 'Signature Black Cat Cold Brew', price: 139, category: 'Cold Coffee' }
    },
    cold_coffee: {
      text: "Our Cold Coffees are brewed slow and served chilled! Top picks: **Signature Black Cat Cold Brew (₹139)**, **Hazelnut Iced Cold Coffee (₹149)**, and **Caramel Biscoff Frappe (₹169)**. Which one sounds good?",
      recommendItem: { id: 11, name: 'Hazelnut Iced Cold Coffee', price: 149, category: 'Cold Coffee' }
    },
    hot_coffee: {
      text: "Need a warm hug in a mug? Try our **Italian Velvet Cappuccino (₹99)**, **Creamy Cafe Mocha (₹129)**, or our signature **Single Origin Espresso (₹79)**!",
      recommendItem: { id: 14, name: 'Italian Velvet Cappuccino', price: 99, category: 'Hot Coffee' }
    },
    sandwich: {
      text: "Our grilled toasties are crunchy perfection! The **Bombay Masala Club (₹119)** with mint chutney and cheese or the **Tandoori Paneer Panini (₹159)** are top hits.",
      recommendItem: { id: 8, name: 'Bombay Masala Grilled Club', price: 119, category: 'Sandwich' }
    },
    fries: {
      text: "Crispy and golden! Get our **Peri-Peri Crinkle Fries (₹99)** with spicy dusting, or go grand with **Loaded Cheesy Truffle Fries (₹149)**!",
      recommendItem: { id: 12, name: 'Peri-Peri Crinkle Fries', price: 99, category: 'French Fries' }
    },
    coupon: {
      text: "Purr-fect! Use coupon **BLACKCAT50** for Flat ₹50 OFF + Free Cheesy Garlic Bread on orders above ₹499. Or use **BLACKCAT20** for 20% OFF your total bill! 🐾"
    },
    timing: {
      text: "We are open daily from **9:00 AM to 11:00 PM** (until 11:30 PM on weekends). Located at **Kabulpur / Ritauli, Near Senior Secondary School, Rohtak, Haryana**. Dine-in, Takeaway & Delivery available!"
    },
    veg: {
      text: "Yes! 80% of our menu is 100% Pure Vegetarian with separate kitchen prep. You can toggle the 'Pure Veg' filter in our menu section to view all veg delights!"
    },
    delivery: {
      text: "🛵 Purr-fect news! We offer **100% FREE Home Delivery on all orders above ₹300**! For orders below ₹300, delivery fee is just ₹40. Packed in thermal bags so pizzas stay fresh and hot!",
      quickReplies: ['🍕 View Pizzas', '🍔 View Burgers', '🎟️ Discount Coupon', '🛒 Open Cart']
    },
    cakes: {
      text: "Craving something sweet? 🍰 Our artisanal eggless cakes are baked fresh daily! Top picks: **Black Cat Belgian Dark Truffle (₹149)**, **New York Lotus Biscoff Cheesecake (₹179)**, and our warm **Sizzling Molten Choco Lava Cake (₹129)**. Want me to add one to your cart?",
      recommendItem: { id: 33, name: 'Black Cat Belgian Dark Truffle Cake Slice', price: 149, category: 'Cakes' },
      quickReplies: ['🍰 Belgian Dark Truffle', '🍰 Lotus Biscoff Cheesecake', '🍰 Choco Lava Cake', '🛒 Open Cart']
    },
    visitors: {
      text: "🛡️ **Cafe Owner Visitor Intelligence Dashboard Active!**\n\nAap live dekh sakte hain ki kin-kin logo ne website open ki hai, unka **Sheher (City / Rohtak / Haryana), IP Address, Device (Android / iPhone), Time, aur Traffic Source (WhatsApp / Direct)**! Aap apne phone par instant Telegram alerts bhi setup kar sakte hain. Default PIN: **1234**.",
      isVisitorAction: true,
      quickReplies: ['🛡️ Open Visitor Dashboard', '🍕 View Pizzas', '🍰 View Cakes']
    },
    payment: {
      text: "💳 We accept all major secure payment options!\n\n• **⚡ Instant UPI & QR Code** (Google Pay, PhonePe, Paytm, BHIM, Cred)\n• **💵 Cash on Delivery (COD)** / Pay at Counter\n• **💳 Credit & Debit Cards** (Visa, MasterCard, RuPay with 256-bit SSL)\n• **🏦 Net Banking** (HDFC, SBI, ICICI, Axis, PNB)\n\nZero extra transaction fees! You can choose your preferred payment mode in your order cart.",
      quickReplies: ['🛒 Open Cart', '🍕 View Pizzas', '🍰 View Cakes', '🎟️ Discount Coupon']
    },
    google: {
      text: "🌐 **Google Console & Google Sign-In Active!**\n\nAap website ke top menu me **'Google Login'** button par click karke 1-click me Google se sign in kar sakte hain. Cafe owners apne Visitor Dashboard me **'Google Console'** tab me jakar Google Cloud OAuth Client ID aur Google Search Console verification manage kar sakte hain!",
      quickReplies: ['🛡️ Open Visitor Dashboard', '🛒 Open Cart', '🍕 View Pizzas']
    }
  };

  const generateReply = (userText) => {
    const query = userText.toLowerCase();

    if (query.includes('google') || query.includes('gmail') || query.includes('oauth') || query.includes('search console')) return knowledgeBase.google;
    if (query.includes('payment') || query.includes('pay') || query.includes('upi') || query.includes('cod') || query.includes('cash') || query.includes('gpay') || query.includes('phonepe') || query.includes('qr') || query.includes('card') || query.includes('netbanking')) return knowledgeBase.payment;
    if (query.includes('visitor') || query.includes('kin kin') || query.includes('kisne') || query.includes('admin') || query.includes('owner') || query.includes('traffic') || query.includes('analytics') || query.includes('log')) return knowledgeBase.visitors;
    if (query.includes('delivery') || query.includes('deliver') || query.includes('shipping')) return knowledgeBase.delivery;
    if (query.includes('cake') || query.includes('pastry') || query.includes('cheesecake') || query.includes('dessert') || query.includes('lava') || query.includes('sweet')) return knowledgeBase.cakes;
    if (query.includes('pizza')) return knowledgeBase.pizza;
    if (query.includes('burger')) return knowledgeBase.burger;
    if (query.includes('cold coffee') || query.includes('frappe') || query.includes('brew') || query.includes('shake')) return knowledgeBase.cold_coffee;
    if (query.includes('hot coffee') || query.includes('cappuccino') || query.includes('latte') || query.includes('espresso')) return knowledgeBase.hot_coffee;
    if (query.includes('coffee') || query.includes('chai') || query.includes('tea')) return knowledgeBase.coffee;
    if (query.includes('fries') || query.includes('french fries') || query.includes('nachos')) return knowledgeBase.fries;
    if (query.includes('sandwich') || query.includes('panini') || query.includes('toast')) return knowledgeBase.sandwich;
    if (query.includes('coupon') || query.includes('offer') || query.includes('discount') || query.includes('code') || query.includes('promo')) return knowledgeBase.coupon;
    if (query.includes('time') || query.includes('timing') || query.includes('location') || query.includes('address') || query.includes('open') || query.includes('where')) return knowledgeBase.timing;
    if (query.includes('veg') || query.includes('vegetarian') || query.includes('jain')) return knowledgeBase.veg;

    return {
      text: "I can help you explore our Pizza, Burgers, Sandwiches, Crispy French Fries, Hot Brews, Cold Coffees, or help you apply promo coupons like **BLACKCAT50**! What are you in the mood for?",
      quickReplies: ['🍕 Wood-Fired Pizza', '🍔 Smash Burger', '🧋 Cold Coffee', '🍟 Peri-Peri Fries', '🎟️ Promo Coupon']
    };
  };

  const handleSend = (textToSend = null) => {
    const text = textToSend || input.trim();
    if (!text) return;

    if (text === '🛡️ Open Visitor Dashboard') {
      if (onOpenAdmin) onOpenAdmin();
      return;
    }
    if (text === '🛒 Open Cart' || text === '🛒 Open Order Cart') {
      if (onOpenTray) onOpenTray();
      return;
    }

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const replyData = generateReply(text);
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: replyData.text,
        recommendItem: replyData.recommendItem,
        isVisitorAction: replyData.isVisitorAction,
        quickReplies: replyData.quickReplies
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: "Meow! Chat refreshed 🐾 How can Luna help you choose your next favorite snack?",
        quickReplies: [
          '🍕 Recommend a Pizza',
          '🍔 Best Burger',
          '🧋 Cold Coffee Picks',
          '🍟 French Fries & Sides',
          '🎟️ Discount Coupon'
        ]
      }
    ]);
  };

  return (
    <>
      {/* Floating Chatbot Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-2 bg-[#141414] border border-amber-500/30 text-amber-300 text-xs px-3.5 py-2 rounded-2xl shadow-xl animate-fade-in backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold">Ask Luna AI 🐾</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open AI Assistant"
          className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-black flex items-center justify-center shadow-[0_10px_25px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 group border-2 border-amber-300"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-black group-hover:rotate-90 transition-transform" />
          ) : (
            <div className="relative">
              <Cat className="w-7 h-7 text-black group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-black animate-pulse" />
            </div>
          )}
        </button>
      </div>

      {/* Floating Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[580px] h-[85vh] bg-[#121212] border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden backdrop-blur-2xl animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#1A1A1A] via-[#1F1F1F] to-[#141414] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black border border-amber-500/40 text-amber-400 flex items-center justify-center shadow-inner">
                <Cat className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-white">Luna AI</h3>
                  <span className="bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/20">
                    Barista 🐾
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online &amp; Ready to Help</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Reset conversation"
                className="p-2 text-stone-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-stone-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-black font-semibold rounded-br-xs shadow-md'
                      : 'bg-[#1C1C1E] text-stone-200 border border-white/10 rounded-bl-xs shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* 1-Click Add Recommended Item to Cart */}
                  {msg.recommendItem && (
                    <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2">
                      <div className="text-left">
                        <span className="block font-bold text-white text-xs">{msg.recommendItem.name}</span>
                        <span className="text-amber-400 font-extrabold text-xs">₹{msg.recommendItem.price}</span>
                      </div>
                      <button
                        onClick={() => {
                          onAddToCart(msg.recommendItem);
                          if (onOpenTray) onOpenTray();
                        }}
                        className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-[11px] flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add &amp; View Cart</span>
                      </button>
                    </div>
                  )}

                  {/* Visitor Admin Dashboard Action Button */}
                  {msg.isVisitorAction && (
                    <div className="mt-3 pt-2.5 border-t border-white/10">
                      <button
                        onClick={() => {
                          if (onOpenAdmin) onOpenAdmin();
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold text-[11px] flex items-center justify-center gap-2 shadow-sm transition-all"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Open Live Visitor Dashboard</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Quick Reply Chips */}
                {msg.quickReplies && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                    {msg.quickReplies.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(chip)}
                        className="px-2.5 py-1 rounded-xl bg-[#1A1A1A] hover:bg-[#262626] text-amber-300 hover:text-white border border-amber-500/20 text-[11px] font-medium transition-all hover:scale-102 active:scale-95 shadow-xs"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-stone-400 text-xs">
                <div className="w-6 h-6 rounded-lg bg-black border border-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Cat className="w-3.5 h-3.5" />
                </div>
                <div className="bg-[#1C1C1E] px-3 py-2 rounded-2xl rounded-bl-xs border border-white/10 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#161616] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Pizza, Coffee, Offers..."
              className="flex-1 bg-[#0A0A0A] border border-white/10 focus:border-amber-500/50 rounded-2xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-9 h-9 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-black flex items-center justify-center transition-all active:scale-95 shrink-0 font-bold"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
