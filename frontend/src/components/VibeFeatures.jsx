import React from 'react';
import { 
  Pizza, 
  Coffee, 
  Flame, 
  Heart, 
  Users, 
  Sparkles, 
  Wifi, 
  ShieldCheck,
  UtensilsCrossed
} from 'lucide-react';

export default function VibeFeatures() {
  const features = [
    {
      icon: Pizza,
      title: "Wood-Fired Fresh Pizzas",
      desc: "Hand-tossed dough fermented for 24 hours, San Marzano tomato sauce, and 100% pure gooey mozzarella baked to bubbly golden perfection."
    },
    {
      icon: Flame,
      title: "Crispy Sizzling Burgers",
      desc: "Gourmet patties grilled crisp, layered with cheddar cheese, fresh lettuce, and signature house sauces in buttery toasted brioche."
    },
    {
      icon: Coffee,
      title: "Chilled Artisan Cold Coffees",
      desc: "Single-origin Arabica espresso brewed slow and blended with velvety cream, hazelnut syrup, and decadent Belgian chocolate thickshakes."
    },
    {
      icon: Wifi,
      title: "Cozy Vibe & Free Wi-Fi",
      desc: "A warm, aesthetic sanctuary for friendly hangouts, couple dates, casual work sessions, or reading your favorite book."
    }
  ];

  return (
    <section className="py-16 bg-[#FAF6EE] border-b border-[#E8DCB8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-[#E8DCB8] shadow-xs hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#5B3314] text-amber-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2B1607] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B4E33] leading-relaxed">
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
