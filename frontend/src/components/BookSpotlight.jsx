import React, { useState } from 'react';
import { 
  Pizza, 
  Coffee, 
  Sparkles, 
  Check, 
  Plus, 
  Star, 
  ArrowRight,
  Flame,
  Clock
} from 'lucide-react';

export default function BookSpotlight({ onAddToCart }) {
  const [addedComboId, setAddedComboId] = useState(null);

  const BESTSELLER_COMBOS = [
    {
      id: 901,
      name: "The Ultimate Hangout Feast (For 2)",
      description: "1x Classic Margherita Pizza (8 inch) + 1x Crispy Paneer Burger + 1x Peri-Peri French Fries + 2x Classic Creamy Cold Frappes.",
      price: 499,
      originalPrice: 676,
      savings: 177,
      image_url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      tag: "Best Value • 2-3 Persons"
    },
    {
      id: 902,
      name: "Burger & Chilled Frappe Solo Combo",
      description: "1x Double Cheese Smash Burger + 1x Crispy Peri-Peri Fries + 1x Hazelnut Iced Cold Coffee.",
      price: 299,
      originalPrice: 377,
      savings: 78,
      image_url: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80",
      tag: "Quick Lunch • Solo Bite"
    }
  ];

  const handleOrder = (combo) => {
    onAddToCart({
      id: combo.id,
      name: combo.name,
      price: combo.price,
      description: combo.description,
      image_url: combo.image_url,
      category_slug: 'combos'
    });
    setAddedComboId(combo.id);
    setTimeout(() => setAddedComboId(null), 1800);
  };

  return (
    <section id="spotlight" className="py-20 bg-gradient-to-b from-[#2B1607] to-[#1C0E05] text-[#FAF5EB] relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#BA8241]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8C5628]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5B3314] border border-[#8C5628] text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Chef's Bestseller Cafe Combos</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Special Value Meal Deals
          </h2>
          <p className="text-sm sm:text-base text-stone-300">
            Combine your favorite pizzas, burgers, fries, and cold coffees with massive savings!
          </p>
        </div>

        {/* 2 Combos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {BESTSELLER_COMBOS.map((combo) => {
            const isAdded = addedComboId === combo.id;
            return (
              <div
                key={combo.id}
                className="bg-[#241205] rounded-3xl border border-[#5B3314] overflow-hidden p-6 sm:p-8 flex flex-col justify-between shadow-2xl hover:border-amber-600/50 transition-all group"
              >
                <div className="space-y-5">
                  
                  {/* Image */}
                  <div className="relative h-56 rounded-2xl overflow-hidden bg-stone-900">
                    <img
                      src={combo.image_url}
                      alt={combo.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 bg-amber-500 text-stone-950 text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                      {combo.tag}
                    </span>

                    <span className="absolute bottom-3 right-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-xl shadow-md">
                      Save ₹{combo.savings} OFF
                    </span>
                  </div>

                  {/* Text details */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      {combo.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      {combo.description}
                    </p>
                  </div>

                </div>

                {/* Price and CTA */}
                <div className="pt-6 mt-6 border-t border-[#3D2512] flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase font-bold">Combo Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl font-extrabold text-amber-400">₹{combo.price}</span>
                      <s className="text-xs text-stone-500 font-semibold">₹{combo.originalPrice}</s>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOrder(combo)}
                    className={`px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Tray!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add Combo to Tray</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
