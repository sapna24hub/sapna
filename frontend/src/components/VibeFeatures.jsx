import React from 'react';
import { 
  Pizza, 
  Coffee, 
  Flame, 
  Wifi, 
  Cat,
  Sparkles
} from 'lucide-react';

export default function VibeFeatures() {
  const features = [
    {
      icon: Pizza,
      title: "Wood-Fired Pizzas",
      desc: "Hand-tossed dough fermented for 24 hours, San Marzano sauce, and 100% pure gooey mozzarella baked to bubbly crisp perfection."
    },
    {
      icon: Flame,
      title: "Gourmet Smash Burgers",
      desc: "Sizzling patties layered with molten cheddar cheese, fresh lettuce, and signature spicy cat sauce in toasted brioche buns."
    },
    {
      icon: Coffee,
      title: "Artisanal Cold Brews",
      desc: "Single-origin Arabica espresso steeped 18 hours, blended with hazelnut, Biscoff, and Belgian dark chocolate thickshakes."
    },
    {
      icon: Cat,
      title: "Aesthetic Cat Vibe & WiFi",
      desc: "Moody dark aesthetic sanctuary with 300 Mbps fiber Wi-Fi, plenty of power plugs, and cozy lounge corners."
    }
  ];

  return (
    <section className="py-16 bg-[#0A0A0A] border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#141414] p-6 rounded-3xl border border-white/10 hover:border-amber-500/40 shadow-lg hover:shadow-[0_10px_30px_rgba(245,158,11,0.12)] transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-black border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base sm:text-lg text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
