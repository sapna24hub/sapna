import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Check, ChevronDown, Sparkles, Cat } from 'lucide-react';

export default function ContactAndLocation() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [contactStatus, setContactStatus] = useState(null);
  const [newsletterStatus, setNewsletterStatus] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "Do you offer pure vegetarian choices?",
      a: "Yes! We have an extensive 100% Pure Veg menu with separate preparation, fresh mozzarella pizzas, crispy paneer burgers, and grilled toasties."
    },
    {
      q: "How long does it take for orders to be prepared?",
      a: "Our kitchen prepares fresh hand-tossed pizzas, gourmet burgers, and artisan cold brews in just 12-15 minutes."
    },
    {
      q: "Can we host birthday parties or group hangouts here?",
      a: "Yes! You can call us directly or drop us a message below for birthday celebrations, farewells, or student group hangouts."
    },
    {
      q: "Is there high-speed WiFi and comfortable seating available?",
      a: "Yes, we provide complimentary 300 Mbps high-speed WiFi, plenty of charging sockets, and cozy air-conditioned seating for work and hanging out."
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactStatus('loading');
    setTimeout(() => {
      setContactStatus('success');
      setContactForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setContactStatus(null), 4000);
    }, 700);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setNewsletterStatus('success');
    setNewsletterEmail('');
    setTimeout(() => setNewsletterStatus(null), 3500);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#0D0D0D] border-t border-white/10 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181818] border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Find Your Way to The Black Cat Cafe 🐾</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-black text-white">
            Visit &amp; <span className="text-amber-500">Connect</span>
          </h2>

          <p className="text-stone-400 text-base sm:text-lg font-normal leading-relaxed">
            Conveniently located in Model Town with convenient street parking, outdoor patio, and aesthetic indoor AC lounge.
          </p>
        </div>

        {/* 3 Columns Info: Hours & Location | Contact Form | FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Col 1: Hours, Address & Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Opening Hours Card */}
            <div className="bg-[#141414] rounded-3xl p-6 border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center gap-2.5 text-amber-400">
                <Clock className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-lg text-white">Cafe Hours</h3>
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-stone-400">Monday – Friday</span>
                  <span className="font-bold text-white">9:00 AM – 11:00 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-stone-400">Saturday – Sunday</span>
                  <span className="font-bold text-amber-400">9:00 AM – 11:30 PM</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Kitchen &amp; Barista Currently Open
                </span>
              </div>
            </div>

            {/* Address & Phone Card */}
            <div className="bg-[#141414] rounded-3xl p-6 border border-white/10 shadow-xl space-y-4">
              <h3 className="font-bold text-lg text-white">Location &amp; Inquiries</h3>
              
              <div className="space-y-3 text-xs sm:text-sm text-stone-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">The Black Cat Cafe</strong>
                    <span>422 Paperbark Lane, Model Town</span>
                    <span className="block text-stone-500 text-[11px]">Free bicycle &amp; car parking available</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <a href="tel:+919876543210" className="hover:text-amber-400 font-medium text-white transition-colors">
                    +91 98765 43210
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <a href="mailto:hello@blackcatcafe.com" className="hover:text-amber-400 font-medium text-white transition-colors">
                    hello@blackcatcafe.com
                  </a>
                </div>
              </div>
            </div>

            {/* VIP Club Subscription */}
            <div className="bg-gradient-to-br from-[#1C1C1E] to-[#121212] text-white rounded-3xl p-6 border border-amber-500/30 shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <Cat className="w-4 h-4 text-amber-400" />
                <h4 className="font-bold text-base text-white">Black Cat VIP Club</h4>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed font-normal">
                Join our club to get exclusive secret menu items, invite-only tasting events, and ₹100 birthday voucher.
              </p>
              
              {newsletterStatus === 'success' ? (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-400 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Welcome to the club! Check your email soon.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2 pt-1">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-black border border-white/10 text-white placeholder-stone-500 focus:outline-none focus:border-amber-500/50"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-500 text-black font-extrabold text-xs rounded-xl hover:bg-amber-400 transition-colors shrink-0"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Col 2: Contact Form (4 cols) */}
          <div className="lg:col-span-4 bg-[#141414] rounded-3xl p-6 sm:p-7 border border-white/10 shadow-xl space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Say Hello</span>
              <h3 className="font-bold text-2xl text-white">Send Us a Message</h3>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Have a query about private events, catering, or bulk party orders? Drop us a line.
              </p>
            </div>

            {contactStatus === 'success' ? (
              <div className="text-center py-8 space-y-3 bg-[#1C1C1E] rounded-2xl border border-white/10 p-6">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg text-white">Message Received! 🐾</h4>
                <p className="text-xs text-stone-300">
                  Our manager and head barista will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-stone-400 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="e.g. Sneh Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1C1E] border border-white/10 text-white placeholder-stone-500 focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-stone-400 mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="e.g. sneh@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1C1E] border border-white/10 text-white placeholder-stone-500 focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-stone-400 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    placeholder="e.g. Birthday Party Booking or Feedback"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1C1E] border border-white/10 text-white placeholder-stone-500 focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-stone-400 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="How can we make your visit purr-fect?"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1C1E] border border-white/10 text-white placeholder-stone-500 focus:outline-none focus:border-amber-500/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactStatus === 'loading'}
                  className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm transition-all active:scale-95 shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{contactStatus === 'loading' ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Col 3: FAQ Accordion (4 cols) */}
          <div className="lg:col-span-4 bg-[#141414] rounded-3xl p-6 sm:p-7 border border-white/10 shadow-xl space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Quick Answers</span>
              <h3 className="font-bold text-2xl text-white">Cafe FAQ</h3>
              <p className="text-xs text-stone-400 mt-1">
                Helpful details about our food preparation, seating &amp; takeaway.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border border-white/10 rounded-2xl overflow-hidden transition-all bg-[#181818]"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:text-amber-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-200 ${
                        openFaq === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-xs text-stone-400 leading-relaxed border-t border-white/5 pt-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
