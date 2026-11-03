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
  Clock,
  Cat,
  ShoppingBag
} from 'lucide-react';

export default function BookSpotlight({ onAddToCart }) {
  const [addedComboId, setAddedComboId] = useState(null);

  const BESTSELLER_COMBOS = [
    {
      id: 901,
      name: "The Midnight Hangout Feast (For 2-3)",
      description: "1x Large Margherita or Paneer Pizza + 1x Crispy Paneer Burger + 1x Peri-Peri French Fries + 2x Signature Frothy Cold Frappes.",
      price: 499,
      originalPrice: 676,
      savings: 177,
      image_url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      tag: "Best Value • 2-3 Persons"
    },
    {
      id: 902,
      name: "Burger, Peri-Peri Fries & Cold Brew Solo Deal",
      description: "1x Double Cheese Smash Burger + 1x Crispy Peri-Peri French Fries + 1x Signature Black Cat Cold Brew.",
      price: 299,
      originalPrice: 377,
      savings: 78,
      image_url: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80",
      tag: "Solo Feast • Quick Bite"
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
    setTimeout(() => setAddedComboId(null), 1600);
  };

  return (
    <section id="spotlight" className="py-20 bg-[#0A0A0A] border-t border-white/10 text-white relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A1A] border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Cat className="w-3.5 h-3.5 text-amber-400" />
            <span>The Black Cat Chef Combos</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Midnight Feast <span className="text-amber-500">Combos</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-400 leading-relaxed font-normal">
            Bundle your favorite wood-fired pizzas, smash burgers, golden fries, and cold coffees with massive savings!
          </p>
        </div>

        {/* 2 Combos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {BESTSELLER_COMBOS.map((combo) => {
            const isAdded = addedComboId === combo.id;
            return (
              <div
                key={combo.id}
                className="bg-[#141414] rounded-3xl border border-white/10 overflow-hidden p-6 sm:p-8 flex flex-col justify-between shadow-2xl hover:border-amber-500/40 hover:shadow-[0_12px_40px_rgba(245,158,11,0.1)] transition-all group"
              >
                <div className="space-y-5">
                  
                  {/* Image */}
                  <div className="relative h-60 rounded-2xl overflow-hidden bg-black">
                    <img
                      src={combo.image_url}
                      alt={combo.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 bg-amber-500 text-black text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                      {combo.tag}
                    </span>

                    <span className="absolute bottom-3 right-3 bg-emerald-500 text-black text-xs font-extrabold px-3 py-1 rounded-xl shadow-md">
                      Save ₹{combo.savings} OFF
                    </span>
                  </div>

                  {/* Text details */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl sm:text-2xl text-white group-hover:text-amber-400 transition-colors">
                      {combo.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                      {combo.description}
                    </p>
                  </div>

                </div>

                {/* Price and CTA */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase font-bold">Combo Deal Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-amber-400">₹{combo.price}</span>
                      <s className="text-xs text-stone-500 font-semibold">₹{combo.originalPrice}</s>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOrder(combo)}
                    className={`px-6 py-3.5 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all active:scale-95 shadow-md ${
                      isAdded
                        ? 'bg-emerald-500 text-black'
                        : 'bg-amber-500 hover:bg-amber-400 text-black'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add Combo to Cart</span>
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
