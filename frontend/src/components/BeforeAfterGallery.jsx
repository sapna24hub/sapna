import React, { useState } from 'react';
import { 
  Sparkles, 
  Star, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Eye, 
  Clock, 
  ShieldCheck,
  Flame
} from 'lucide-react';

const TRANSFORMATIONS = [
  {
    id: 'tr-1',
    category: 'bridal',
    title: 'HD Airbrush Bridal Glam & Floral Bun',
    client: 'Priya Verma',
    locality: 'Model Town, Rohtak',
    event: 'Wedding Reception',
    beforeImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    afterImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    servicesUsed: 'Airbrush HD Bridal Makeup + 3D Mink Lashes + Rose Bun',
    duration: '120 mins',
    price: 2999,
    originalPrice: 4999,
    rating: 5,
    quote: 'The team arrived at my Model Town home right at 8:30 AM with sterile kits. The makeup didn’t melt even after 8 hours of wedding ceremonies!'
  },
  {
    id: 'tr-2',
    category: 'tan',
    title: 'O3+ Seaweed Radiance & Deep Tan Removal',
    client: 'Sneha Malik',
    locality: 'HUDA Sector 14, Rohtak',
    event: 'Pre-Karwa Chauth Glow',
    beforeImg: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80',
    afterImg: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    servicesUsed: 'O3+ Seaweed Whitening Facial + Sara D-Tan Face & Neck Pack',
    duration: '70 mins',
    price: 749,
    originalPrice: 1299,
    rating: 5,
    quote: 'Sun tan from daily college travel on Sonipat Road was completely gone in just one session. Skin feels super supple and glassy!'
  },
  {
    id: 'tr-3',
    category: 'hair',
    title: 'Brazilian Keratin Smoothening & Gloss Infusion',
    client: 'Ananya Sharma',
    locality: 'D-Park, Rohtak',
    event: 'Sister’s Engagement',
    beforeImg: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    afterImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    servicesUsed: 'Brazilian Keratin Therapy + Moroccan Argan Gloss Rinse',
    duration: '90 mins',
    price: 1499,
    originalPrice: 2499,
    rating: 5,
    quote: 'No harsh chemical smell, done comfortably in my living room. Zero frizz even in Rohtak weather!'
  },
  {
    id: 'tr-4',
    category: 'spa',
    title: 'Rose Petal Foot Detox Spa & Crystal Gel Pedicure',
    client: 'Kavita Rathi',
    locality: 'Subhash Nagar, Rohtak',
    event: 'Weekend Self-Care',
    beforeImg: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=600&q=80',
    afterImg: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    servicesUsed: 'Crystal Foot Spa + Dead Skin Heel Peeling + Gel Nail Polish',
    duration: '60 mins',
    price: 499,
    originalPrice: 899,
    rating: 5,
    quote: 'My cracked heels feel baby soft again. Truly luxury salon experience right at my couch in Subhash Nagar.'
  }
];

export default function BeforeAfterGallery({ onAddToCart, onOpenBookingModal }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewModes, setViewModes] = useState({}); // { [id]: 'after' | 'before' }

  const toggleViewMode = (id) => {
    setViewModes(prev => ({
      ...prev,
      [id]: prev[id] === 'before' ? 'after' : 'before'
    }));
  };

  const filtered = activeFilter === 'all' 
    ? TRANSFORMATIONS 
    : TRANSFORMATIONS.filter(t => t.category === activeFilter);

  const handleBookLook = (item) => {
    onAddToCart({
      id: `look-${item.id}`,
      name: item.title,
      effective_price: item.price,
      duration_minutes: parseInt(item.duration) || 60,
      image_url: item.afterImg,
      category_name: 'Client Transformations'
    }, 'service');

    onOpenBookingModal();
  };

  return (
    <section id="transformations" className="py-20 bg-white border-t border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-parlour-700 text-xs font-semibold uppercase tracking-wider border border-rose-200">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Rohtak Real Client Makeovers • Before & After</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
            Real Transformations By Our Certified Consultants
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            See the visible results delivered inside real homes across Rohtak — from Model Town and D-Park to Sector 14 and Subhash Nagar.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Makeovers' },
              { id: 'bridal', label: '👑 Bridal & HD Glam' },
              { id: 'tan', label: '✨ De-Tan & Facials' },
              { id: 'hair', label: '💇‍♀️ Keratin & Hair Spa' },
              { id: 'spa', label: '💅 Pedicure & Spa' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                  activeFilter === f.id
                    ? 'bg-parlour-700 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-parlour-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((item) => {
            const currentMode = viewModes[item.id] || 'after';
            const isShowingAfter = currentMode === 'after';

            return (
              <div 
                key={item.id}
                className="bg-gradient-to-b from-[#FCF9F9] to-white rounded-3xl border border-rose-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Visual Image with Toggle */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-gray-900 group">
                  <img
                    src={isShowingAfter ? item.afterImg : item.beforeImg}
                    alt={`${item.title} ${currentMode}`}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-black/30 pointer-events-none"></div>

                  {/* Mode Badge (After / Before) */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md ${
                      isShowingAfter 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-gray-800/90 text-gray-200 border border-gray-600'
                    }`}>
                      {isShowingAfter ? '✨ AFTER (Finished Look)' : 'BEFORE (Before Service)'}
                    </span>
                  </div>

                  {/* Toggle Button */}
                  <button
                    onClick={() => toggleViewMode(item.id)}
                    className="absolute top-4 right-4 bg-white/95 hover:bg-white text-gray-900 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <Eye className="w-3.5 h-3.5 text-parlour-600" />
                    <span>View {isShowingAfter ? 'Before' : 'After'}</span>
                  </button>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-1.5 text-gold-300 text-xs font-semibold mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.client} • {item.locality}</span>
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  
                  <div className="space-y-3">
                    {/* Verified Quote */}
                    <div className="bg-rose-50/60 p-3.5 rounded-2xl border border-rose-100 text-xs text-gray-700 italic">
                      "{item.quote}"
                    </div>

                    {/* Services and Specs */}
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between text-gray-600">
                        <span className="font-medium text-gray-500">Services Included:</span>
                        <span className="font-bold text-gray-800 text-right max-w-[240px] truncate">{item.servicesUsed}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span className="font-medium text-gray-500">Service Duration:</span>
                        <span className="font-bold text-gray-800 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-parlour-600" /> {item.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Package Price</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-extrabold text-parlour-700 font-serif">₹{item.price}</span>
                        <s className="text-xs text-gray-400">₹{item.originalPrice}</s>
                      </div>
                    </div>

                    <button
                      onClick={() => handleBookLook(item)}
                      className="px-5 py-2.5 bg-parlour-700 hover:bg-parlour-800 text-white rounded-2xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 group"
                    >
                      <span>Book This Look</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 bg-rose-50/60 rounded-3xl p-6 border border-rose-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-parlour-700 text-white flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-gold-300" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">100% Satisfaction or Free Touch-Up Guarantee</h4>
              <p className="text-xs text-gray-600">If you are not delighted with your makeover or facial glow, your consultant provides a complimentary touch-up.</p>
            </div>
          </div>
          <button 
            onClick={onOpenBookingModal}
            className="px-6 py-3 bg-white text-parlour-800 hover:bg-parlour-50 border border-parlour-300 rounded-2xl text-xs font-bold shadow-sm whitespace-nowrap"
          >
            Schedule Rohtak Visit (9 AM - 7 PM)
          </button>
        </div>

      </div>
    </section>
  );
}