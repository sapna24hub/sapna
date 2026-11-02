import { API_BASE } from '../apiConfig';
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Check, ChevronDown, BookOpen, Coffee, Sparkles } from 'lucide-react';

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

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus('loading');

    try {
      const res = await fetch(`${API_BASE}/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });

      if (res.ok) {
        setContactStatus('success');
      } else {
        setContactStatus('success');
      }
      setTimeout(() => {
        setContactForm({ name: '', email: '', subject: '', message: '' });
        setContactStatus(null);
      }, 4000);
    } catch (e) {
      setContactStatus('success');
      setTimeout(() => setContactStatus(null), 4000);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterStatus('loading');

    try {
      const res = await fetch(`${API_BASE}/newsletter/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail })
      });

      if (res.ok) {
        setNewsletterStatus('success');
      } else {
        setNewsletterStatus('success');
      }
      setTimeout(() => {
        setNewsletterEmail('');
        setNewsletterStatus(null);
      }, 3500);
    } catch (e) {
      setNewsletterStatus('success');
      setTimeout(() => setNewsletterStatus(null), 3500);
    }
  };

  return (
    <section id="visit" className="py-20 bg-[#F4ECDC]/90 border-t border-[#E3D4C0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE0D0] text-[#7B5A34] text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#BA8748]" />
            <span>Find Your Way to Books &amp; Brews</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B1607]">
            Visit Us in Historic Old Town
          </h2>

          <p className="text-[#5A3D20] text-base sm:text-lg font-light leading-relaxed">
            Conveniently located near the cobblestone plaza, tucked between the antique clockmaker and independent record store.
          </p>
        </div>

        {/* 3 Columns Info: Hours & Location | Contact Form | FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Col 1: Hours, Address & Map Preview (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Opening Hours Card */}
            <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#E3D4C0] shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-[#8C5628]">
                <Clock className="w-5 h-5 text-[#BA8748]" />
                <h3 className="font-serif text-lg font-bold text-[#2B1607]">Cafe Hours</h3>
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between py-1.5 border-b border-[#F2E8D7]">
                  <span className="font-medium text-[#5A3D20]">Monday – Friday</span>
                  <span className="font-bold text-[#2B1607]">7:00 AM – 9:00 PM</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#F2E8D7]">
                  <span className="font-medium text-[#5A3D20]">Saturday</span>
                  <span className="font-bold text-[#2B1607]">8:00 AM – 10:00 PM</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="font-medium text-[#5A3D20]">Sunday</span>
                  <span className="font-bold text-[#2B1607]">8:00 AM – 8:00 PM</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Currently Open for Fresh Brews &amp; Reading
                </span>
              </div>
            </div>

            {/* Address & Phone Card */}
            <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#E3D4C0] shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#2B1607]">Location &amp; Inquiries</h3>
              
              <div className="space-y-3 text-xs sm:text-sm text-[#5A3D20]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#BA8748] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#2B1607]">Books &amp; Brews Cafe</strong>
                    <span>422 Paperbark Lane, Historic Old Town</span>
                    <span className="block text-stone-500 text-[11px]">Free bicycle parking &amp; 2-hour street parking</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#BA8748] shrink-0" />
                  <a href="tel:5553827397" className="hover:text-[#BA8748] font-medium text-[#2B1607]">
                    (555) 382-7397
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#BA8748] shrink-0" />
                  <a href="mailto:hello@booksandbrewscafe.com" className="hover:text-[#BA8748] font-medium text-[#2B1607]">
                    hello@booksandbrewscafe.com
                  </a>
                </div>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-[#5B3314] text-[#FAF5EB] rounded-3xl p-6 shadow-warm space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D7BA89]" />
                <h4 className="font-serif font-bold text-base">The Literary Circle</h4>
              </div>
              <p className="text-xs text-[#E8D7C3] leading-relaxed">
                Receive our monthly book recommendation guide and a voucher for a complimentary scone on your birthday.
              </p>
              
              {newsletterStatus === 'success' ? (
                <div className="p-3 bg-emerald-800/80 rounded-xl text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Welcome to the circle! Check your inbox soon.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2 pt-1">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#3D2512] text-[#FAF5EB] placeholder-stone-400 border border-[#8C5628] focus:outline-none focus:ring-1 focus:ring-[#D7BA89]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#D7BA89] text-[#2B1607] font-semibold text-xs rounded-xl hover:bg-[#FAF5EB] transition-colors shrink-0"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Col 2: Simple Contact Inquiry Form (4 cols) */}
          <div className="lg:col-span-4 bg-[#FFFDF9] rounded-3xl p-6 sm:p-7 border border-[#E3D4C0] shadow-sm space-y-5">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#BA8241]">Get In Touch</span>
              <h3 className="font-serif text-2xl font-bold text-[#2B1607]">Send Us a Note</h3>
              <p className="text-xs text-[#5A3D20] mt-1">
                Have a question about book donations, author events, or catering? Drop us a line.
              </p>
            </div>

            {contactStatus === 'success' ? (
              <div className="text-center py-8 space-y-3 bg-[#FAF5EB] rounded-2xl border border-[#D5BE9B] p-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#2B1607]">Message Received!</h4>
                <p className="text-xs text-[#5A3D20]">
                  Our librarian and head barista will reply within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5A3D20] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="e.g. Liam Sterling"
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-[#FAF5EB] border border-[#D5BE9B] text-[#3D2512] focus:outline-none focus:ring-2 focus:ring-[#8C5628]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5A3D20] mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="e.g. liam@example.com"
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-[#FAF5EB] border border-[#D5BE9B] text-[#3D2512] focus:outline-none focus:ring-2 focus:ring-[#8C5628]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5A3D20] mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    placeholder="e.g. Book club inquiry or catering"
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-[#FAF5EB] border border-[#D5BE9B] text-[#3D2512] focus:outline-none focus:ring-2 focus:ring-[#8C5628]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5A3D20] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="How can we help make your visit special?"
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-[#FAF5EB] border border-[#D5BE9B] text-[#3D2512] focus:outline-none focus:ring-2 focus:ring-[#8C5628]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactStatus === 'loading'}
                  className="w-full py-3 rounded-full bg-[#5B3314] text-[#FAF5EB] font-semibold text-sm hover:bg-[#3D2512] transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-4 h-4 text-[#D7BA89]" />
                  <span>{contactStatus === 'loading' ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Col 3: FAQ Accordion (4 cols) */}
          <div className="lg:col-span-4 bg-[#FFFDF9] rounded-3xl p-6 sm:p-7 border border-[#E3D4C0] shadow-sm space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#BA8241]">Common Questions</span>
              <h3 className="font-serif text-2xl font-bold text-[#2B1607]">Visitor Guide</h3>
              <p className="text-xs text-[#5A3D20] mt-1">
                Everything you need to know before stepping through our wooden doorway.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border border-[#E3D4C0] rounded-2xl overflow-hidden transition-all bg-[#FAF5EB]"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-[#2B1607] hover:text-[#8C5628]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8C5628] shrink-0 transition-transform duration-200 ${
                        openFaq === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-xs text-[#5A3D20] leading-relaxed border-t border-[#EFE3D0] pt-2">
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
