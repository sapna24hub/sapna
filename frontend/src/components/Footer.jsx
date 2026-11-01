import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Instagram, 
  Youtube, 
  Facebook, 
  Clock, 
  Heart, 
  CheckCircle2, 
  Calendar, 
  Navigation 
} from 'lucide-react';

export default function Footer({ onExploreServices, onOpenTracker }) {
  return (
    <>
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-white to-rose-50/50 border-t border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-parlour-700 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>Effortless Experience</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-gray-900">
              How Home Beauty Consultation Works
            </h2>
            <p className="text-gray-600 text-sm">
              From our mobile vanity to your living room in 4 simple steps.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            
            <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-sm space-y-3 relative group hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-parlour-50 text-parlour-700 flex items-center justify-center font-serif text-xl font-bold">
                01
              </div>
              <h4 className="font-bold text-base text-gray-900">Select Services</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Choose from facial, hair spa, bridal glam, mani-pedi or waxing packages with clear upfront pricing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-sm space-y-3 relative group hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-gold-600 flex items-center justify-center font-serif text-xl font-bold">
                02
              </div>
              <h4 className="font-bold text-base text-gray-900">Pick Date & Time</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Choose a morning, afternoon, or evening slot that fits your personal schedule.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-sm space-y-3 relative group hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-serif text-xl font-bold">
                03
              </div>
              <h4 className="font-bold text-base text-gray-900">Live GPS Tracking</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Track your certified beautician in real-time as they travel to your home with a sanitized kit.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-sm space-y-3 relative group hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-serif text-xl font-bold">
                04
              </div>
              <h4 className="font-bold text-base text-gray-900">Relax & Glow</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Enjoy 5-star parlour care in comfort. Zero mess left behind. Pay after 100% satisfaction.
              </p>
            </div>

          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onExploreServices}
              className="px-8 py-3.5 bg-parlour-700 hover:bg-parlour-800 text-white rounded-2xl text-xs font-bold shadow-md shadow-rose-900/10"
            >
              Book Your Appointment Now
            </button>
          </div>

        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-parlour-950 text-rose-100 pt-16 pb-12 border-t border-parlour-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* Brand column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-gold-400 p-0.5 flex items-center justify-center shadow-md">
                  <div className="w-full h-full bg-parlour-950 rounded-[14px] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-gold-300" />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Glow<span className="text-rose-400">Aura</span>
                  </h3>
                  <p className="text-[11px] text-rose-300">Luxury At-Home Beauty Parlour & Consultant</p>
                </div>
              </div>

              <p className="text-xs text-rose-200/80 leading-relaxed max-w-sm">
                Transforming at-home self-care with verified female aestheticians, clinical skin barrier therapies, sterile monodose beauty kits, and real-time live tracking.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-rose-200">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-rose-200">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-rose-200">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center text-white">
                  <PhoneCall className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold-300">Popular Services</h4>
              <ul className="space-y-2 text-xs text-rose-200/80">
                <li><button onClick={onExploreServices} className="hover:text-white">24K Gold Luxury Facial</button></li>
                <li><button onClick={onExploreServices} className="hover:text-white">Moroccan Argan Hair Spa</button></li>
                <li><button onClick={onExploreServices} className="hover:text-white">HD Bridal Glam & Draping</button></li>
                <li><button onClick={onExploreServices} className="hover:text-white">RICA Chocolate Body Wax</button></li>
                <li><button onClick={onExploreServices} className="hover:text-white">Rose Petal Spa Mani-Pedi</button></li>
              </ul>
            </div>

            {/* Service Cities */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold-300">Coverage Hubs</h4>
              <ul className="space-y-2 text-xs text-rose-200/80">
                <li>New Delhi & NCR</li>
                <li>Gurugram & Cyber City</li>
                <li>Noida & Greater Noida</li>
                <li>Mumbai & Bandra / Juhu</li>
                <li>Bengaluru & Indiranagar</li>
              </ul>
            </div>

            {/* Direct Contact */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold-300">Consultant Helpline</h4>
              <div className="space-y-2 text-xs text-rose-200/80">
                <p className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                  <span>+91 98765 43210</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-rose-400" />
                  <span>support@glowaura.com</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-rose-400" />
                  <span>9:00 AM - 7:00 PM (Daily)</span>
                </p>
                <p className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Background Verified</span>
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 border-t border-parlour-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-rose-300/60">
            <p>© 2026 GlowAura Home Salon & Beauty Consultant. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for luxury home self-care.
            </p>
          </div>

        </div>
      </footer>
    </>
  );
}
