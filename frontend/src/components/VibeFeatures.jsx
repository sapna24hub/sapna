import React from 'react';
import { BookOpen, Coffee, Flame, Heart, Users, Sparkles, Feather, ShieldCheck } from 'lucide-react';

export default function VibeFeatures() {
  const features = [
    {
      icon: BookOpen,
      title: "Floor-to-Ceiling Library",
      desc: "Over 2,800 curated volumes spanning literary fiction, poetry, art monographs, and vintage classics. Read freely while you sip, or buy your favorite book to take home.",
      badge: "Free to Browse"
    },
    {
      icon: Coffee,
      title: "Slow-Drip Single Origin",
      desc: "Ethically traded, single-origin specialty coffees roasted in micro-batches and poured on manual Chemex, V60, and antique copper espresso gear.",
      badge: "Direct Trade"
    },
    {
      icon: Flame,
      title: "Cozy Armchairs & Fireplace",
      desc: "Deep leather chesterfields, warm banker's lamps, soft wool throws, and crackling cedarwood in winter create an unhurried sanctuary away from screen fatigue.",
      badge: "Quiet Nooks"
    },
    {
      icon: Users,
      title: "Community & Book Clubs",
      desc: "Bi-weekly community book clubs, quiet writing sprints on Tuesday mornings, and local author discussions around our long wooden communal table.",
      badge: "Gather & Connect"
    }
  ];

  return (
    <section id="about" className="py-16 bg-[#F4ECDC]/70 border-y border-[#E3D4C0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAE0D0] text-[#7B5A34] text-xs font-semibold uppercase tracking-wider">
            <Feather className="w-3.5 h-3.5" />
            <span>The Books &amp; Brews Philosophy</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1607]">
            Crafted for Readers, Thinkers &amp; Dreamers
          </h2>
          <p className="text-[#5A3D20] text-base sm:text-lg font-light leading-relaxed">
            We built this space as a deliberate antidote to fast-paced rushed cafes. Come for the exceptional coffee, stay for the quiet companionship of good books.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-[#FAF5EB] rounded-2xl p-6 border border-[#E3D4C0] hover:border-[#BA8748] shadow-sm hover:shadow-warm transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#EAE0D0] text-[#8C5628] group-hover:bg-[#8C5628] group-hover:text-[#FAF5EB] flex items-center justify-center transition-colors duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold tracking-wider text-[#8C5628] bg-[#EFE3D0] px-2.5 py-0.5 rounded-full uppercase">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#2B1607] mb-2 group-hover:text-[#8C5628] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#5A3D20] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EFE3D0] flex items-center text-xs font-medium text-[#7B5A34] group-hover:text-[#BA8748] transition-colors">
                  <span>Learn more</span>
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
