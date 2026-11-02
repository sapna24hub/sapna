import React, { useState } from 'react';
import { BookOpen, Coffee, Sparkles, Heart, Check, Quote, Star } from 'lucide-react';

export default function BookSpotlight({ onAddToCart }) {
  const [added, setAdded] = useState(false);

  const pairingBundle = {
    id: 99,
    name: "October Literary Pairing: The Shadow & Honey Blend",
    price: 14.50,
    description: "Includes a physical copy of 'The Shadow of the Wind' by Carlos Ruiz Zafón, paired with our signature Sherlock's Smoked Honey Latte.",
    image_url: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
    tags: "Book & Brew Combo, Curated"
  };

  const handleOrder = () => {
    onAddToCart(pairingBundle);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section id="pairing" className="py-20 bg-gradient-to-b from-[#2B1607] to-[#1C0E05] text-[#FAF5EB] relative overflow-hidden">
      {/* Decorative background paper & amber accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#BA8241]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8C5628]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md">
              
              {/* Stacked Book & Cup Visual */}
              <div className="rounded-3xl p-3 bg-gradient-to-tr from-[#5B3314] via-[#8C5628] to-[#D7BA89] shadow-2xl">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-900">
                  <img
                    src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=85"
                    alt="Open hardcover book next to a warm artisan drink in a moody library"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  
                  {/* Floating Stamp */}
                  <div className="absolute top-4 left-4 bg-[#BA8241] text-[#FAF5EB] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Librarian's Pick of the Month</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#2B1607]/90 backdrop-blur-md border border-[#8C5628]/40">
                    <p className="text-xs text-[#D7BA89] font-medium uppercase tracking-wider">Bookstore Special</p>
                    <p className="font-serif text-base font-bold text-white">
                      Hardcover Novel + Large Smoked Honey Latte
                    </p>
                    <p className="text-xs text-stone-300 mt-1">Take the book home, drink the brew here.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative & Pair Details */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5B3314] border border-[#8C5628] text-[#D7BA89] text-xs font-semibold uppercase tracking-wider">
              <Quote className="w-3.5 h-3.5" />
              <span>Curated Literary Experience</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              The Mystery of Barcelona &amp; Torched Rosemary
            </h2>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs font-semibold text-stone-300 ml-1">Universal Patron Acclaim</span>
              </div>
              <p className="text-stone-300 text-sm sm:text-base italic font-serif leading-relaxed">
                "Every book has a soul. The soul of the person who wrote it and of those who read it and lived and dreamed with it."
              </p>
              <p className="text-xs text-[#D7BA89] font-bold">— Carlos Ruiz Zafón, The Shadow of the Wind</p>
            </div>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Every month, our head librarian and master barista design an immersive experience. 
              Pair the Gothic alleys of 1945 Barcelona with our double-roasted espresso, smoked wildflower honey, and torched mountain rosemary. 
              The piney aroma and sweet caramel depth harmonize effortlessly with the suspenseful pages.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div>
                <span className="text-xs text-stone-400 uppercase tracking-wider block">Bundle Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-[#D7BA89]">$14.50</span>
                  <span className="text-xs line-through text-stone-500">$21.00 Value</span>
                </div>
              </div>

              <button
                onClick={handleOrder}
                className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-warm ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#D7BA89] text-[#2B1607] hover:bg-[#FAF5EB]'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5 text-white" />
                    <span>Added to Your Tray!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-[#8C5628]" />
                    <span>Order This Pairing ($14.50)</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
