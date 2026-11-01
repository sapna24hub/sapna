import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  Plus, 
  Check, 
  Search, 
  Tag, 
  Info, 
  ChevronRight, 
  Heart, 
  Flame, 
  Scissors, 
  Crown, 
  Sun 
} from 'lucide-react';

const ICON_MAP = {
  Sparkles,
  Scissors,
  Flame,
  Heart,
  Crown,
  Sun
};

export default function ServicePricingCatalog({
  categories,
  services,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  cart,
  onAddToCart,
  onOpenCart
}) {
  const [activeInfoModalService, setActiveInfoModalService] = useState(null);

  const getServiceQtyInCart = (svcId) => {
    const item = cart.find(c => c.service.id === svcId);
    return item ? item.quantity : 0;
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-parlour-700 text-xs font-semibold uppercase tracking-wider border border-rose-200">
            <Tag className="w-3.5 h-3.5" />
            <span>Service & Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
            Explore At-Home Parlour & Consultant Services
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            All prices include sterile single-use disposable kits, premium dermatologist-approved cosmetics, and sanitized equipment. Zero hidden travel fees on orders above ₹499.
          </p>
        </div>

        {/* Search Bar & Category Navigation */}
        <div className="mt-10 space-y-6">
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search facials, hair spa, bridal makeup, waxing..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-rose-50/50 border border-rose-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-parlour-500 focus:bg-white transition-all shadow-sm"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedCategory === 'all'
                  ? 'bg-parlour-800 text-white shadow-md shadow-parlour-900/20'
                  : 'bg-rose-50/80 text-gray-700 hover:bg-rose-100 hover:text-parlour-800'
              }`}
            >
              <Sparkles className="w-4 h-4 text-gold-300" />
              <span>All Services ({services.length})</span>
            </button>

            {categories.map((cat) => {
              const IconComp = ICON_MAP[cat.icon] || Sparkles;
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.slug)}
                  className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-parlour-800 text-white shadow-md shadow-parlour-900/20'
                      : 'bg-rose-50/80 text-gray-700 hover:bg-rose-100 hover:text-parlour-800'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isSelected ? 'text-gold-300' : 'text-parlour-600'}`} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Services Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => {
            const qty = getServiceQtyInCart(svc.id);
            const savings = svc.discounted_price ? (svc.price - svc.discounted_price) : 0;

            return (
              <div
                key={svc.id}
                className="group bg-white rounded-3xl border border-rose-100/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Service Image with Badges */}
                  <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                    <img
                      src={svc.image_url}
                      alt={svc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Popular Badge */}
                    {svc.is_popular && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-gold-500 text-parlour-950 font-bold text-[11px] px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3 fill-parlour-950" /> Best Seller
                      </div>
                    )}

                    {/* Savings Tag */}
                    {savings > 0 && (
                      <div className="absolute top-3 right-3 bg-parlour-700 text-white font-bold text-[11px] px-2.5 py-1 rounded-full shadow-md">
                        Save ₹{savings}
                      </div>
                    )}

                    {/* Category pill bottom left */}
                    <div className="absolute bottom-3 left-3 text-white text-xs font-medium bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                      {svc.category_name}
                    </div>

                    {/* Duration badge bottom right */}
                    <div className="absolute bottom-3 right-3 text-white text-xs font-semibold flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-gold-300" /> {svc.duration_minutes} mins
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-3">
                    
                    <h3 className="font-serif text-xl font-bold text-gray-900 group-hover:text-parlour-700 transition-colors">
                      {svc.name}
                    </h3>

                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {svc.description}
                    </p>

                    {/* Benefits pills */}
                    {svc.benefits && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {svc.benefits.split(',').slice(0, 3).map((benefit, idx) => (
                          <span
                            key={idx}
                            className="bg-rose-50 text-parlour-700 text-[11px] font-medium px-2.5 py-0.5 rounded-full"
                          >
                            ✓ {benefit.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* View Details modal toggle */}
                    {svc.includes && (
                      <button
                        onClick={() => setActiveInfoModalService(svc)}
                        className="text-xs text-parlour-600 hover:text-parlour-800 font-semibold flex items-center gap-1 pt-1"
                      >
                        <Info className="w-3.5 h-3.5" /> What's Included & Procedure
                      </button>
                    )}

                  </div>
                </div>

                {/* Card Footer: Pricing and Add Button */}
                <div className="p-6 pt-0 border-t border-rose-50 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-gray-400 block font-medium">Service Total</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{svc.effective_price}
                      </span>
                      {svc.discounted_price && (
                        <s className="text-xs text-gray-400">₹{svc.price}</s>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart button */}
                  {qty === 0 ? (
                    <button
                      onClick={() => onAddToCart(svc)}
                      className="px-5 py-2.5 bg-rose-50 hover:bg-parlour-700 text-parlour-700 hover:text-white rounded-2xl text-xs sm:text-sm font-bold border border-rose-200 hover:border-transparent transition-all flex items-center gap-1.5 shadow-sm group-hover:shadow"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Book</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 bg-parlour-800 text-white px-3 py-1.5 rounded-2xl shadow-sm">
                      <span className="text-xs font-bold text-gold-300">Added ({qty})</span>
                      <button
                        onClick={onOpenCart}
                        className="text-[11px] underline text-rose-200 hover:text-white font-medium"
                      >
                        View Cart
                      </button>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Empty state when searching */}
        {services.length === 0 && (
          <div className="text-center py-16 space-y-4">
            <Sparkles className="w-12 h-12 text-rose-300 mx-auto" />
            <h3 className="text-lg font-bold text-gray-800">No services found</h3>
            <p className="text-sm text-gray-500">
              Try searching with another keyword or select "All Services".
            </p>
            <button
              onClick={() => { onSearchChange(''); onSelectCategory('all'); }}
              className="px-4 py-2 bg-parlour-700 text-white rounded-xl text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Service Details & Procedure Modal */}
      {activeInfoModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold text-parlour-600 uppercase">
                  {activeInfoModalService.category_name}
                </span>
                <h3 className="text-xl font-serif font-bold text-gray-900">
                  {activeInfoModalService.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveInfoModalService(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Description:</h4>
                <p className="text-gray-600 text-xs sm:text-sm">{activeInfoModalService.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-1">What's Included (Home Visit Kit):</h4>
                <div className="bg-rose-50/70 p-3.5 rounded-2xl border border-rose-100 text-xs text-gray-700 leading-relaxed">
                  {activeInfoModalService.includes}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-1">Benefits for Skin & Wellness:</h4>
                <p className="text-xs text-gray-600">{activeInfoModalService.benefits}</p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-gray-100">
                <div>
                  <span className="text-xs text-gray-400">Total Price</span>
                  <p className="text-xl font-bold text-gray-900">₹{activeInfoModalService.effective_price}</p>
                </div>
                <button
                  onClick={() => {
                    onAddToCart(activeInfoModalService);
                    setActiveInfoModalService(null);
                  }}
                  className="px-6 py-2.5 bg-parlour-700 hover:bg-parlour-800 text-white rounded-2xl font-bold text-sm"
                >
                  Add This Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
