import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  Star, 
  Search, 
  Tag, 
  Check, 
  Plus, 
  Info, 
  ShieldCheck, 
  Package, 
  Zap, 
  X 
} from 'lucide-react';

const PRODUCT_CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'SKINCARE', label: 'Skin Care & Serums' },
  { id: 'HAIRCARE', label: 'Hair Care & Oils' },
  { id: 'FACIAL_KITS', label: 'Home Facial & Bleach Kits' },
  { id: 'BODY_BATH', label: 'Body Polishes & Scrubs' },
];

export default function BeautyShop({
  products,
  cart,
  onAddToCart,
  onOpenCart
}) {
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeInfoProduct, setActiveInfoProduct] = useState(null);

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCat === 'all' || p.category === selectedCat;
    const matchesSearch = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.benefits && p.benefits.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const getProductQtyInCart = (prodId) => {
    const item = cart.find(c => c.product && c.product.id === prodId);
    return item ? item.quantity : 0;
  };

  return (
    <section id="shop" className="py-20 bg-gradient-to-b from-white via-rose-50/30 to-white border-t border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-parlour-700 text-xs font-semibold uppercase tracking-wider border border-rose-200">
            <ShoppingBag className="w-3.5 h-3.5 text-parlour-600" />
            <span>Salon Beauty Store • Doorstep Delivery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
            Shop Professional Salon & Beauty Products
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Bring parlour care home! Certified dermat-approved serums, professional hair masks, and single-use facial kits with prices up to 50% OFF.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-10 space-y-6">
          
          {/* Search Box */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search serums, hair masks, O3+ kits, oils..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-rose-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-parlour-500 shadow-sm transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
            {PRODUCT_CATEGORIES.map((cat) => {
              const isSelected = selectedCat === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-parlour-800 text-white shadow-md shadow-parlour-900/20'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-parlour-300'
                  }`}
                >
                  <Package className={`w-3.5 h-3.5 ${isSelected ? 'text-gold-300' : 'text-gray-400'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Products Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => {
            const qty = getProductQtyInCart(prod.id);
            const savings = prod.discounted_price ? (prod.price - prod.discounted_price) : 0;

            return (
              <div
                key={prod.id}
                className="bg-white rounded-3xl border border-rose-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  
                  {/* Product Image */}
                  <div className="relative h-56 w-full overflow-hidden bg-rose-50/40 p-4 flex items-center justify-center">
                    <img
                      src={prod.image_url}
                      alt={prod.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Bestseller Badge */}
                    {prod.is_bestseller && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-gold-500 text-parlour-950 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3 fill-parlour-950" /> Bestseller
                      </div>
                    )}

                    {/* Savings Tag */}
                    {savings > 0 && (
                      <div className="absolute top-3 right-3 bg-parlour-700 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-sm">
                        Save ₹{savings.toFixed(0)}
                      </div>
                    )}

                    {/* Size tag bottom left */}
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2 py-0.5 rounded-lg">
                      {prod.size_or_weight}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2">
                    
                    {/* Brand and Rating */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-parlour-700 text-[11px] uppercase tracking-wider">
                        {prod.brand}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 font-bold text-[11px]">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{prod.rating}</span>
                        <span className="text-gray-400 font-normal">({prod.total_reviews})</span>
                      </div>
                    </div>

                    {/* Product Title */}
                    <h4 className="font-bold text-sm text-gray-900 group-hover:text-parlour-700 transition-colors line-clamp-2 leading-snug">
                      {prod.name}
                    </h4>

                    {/* Description preview */}
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>

                    {/* Key Benefit Pill */}
                    {prod.benefits && (
                      <div className="pt-1">
                        <span className="inline-block bg-emerald-50 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-emerald-200">
                          ✓ {prod.benefits.split(',')[0]}
                        </span>
                      </div>
                    )}

                    {/* View Details modal */}
                    <button
                      onClick={() => setActiveInfoProduct(prod)}
                      className="text-[11px] text-parlour-600 hover:text-parlour-800 font-semibold flex items-center gap-1 pt-1"
                    >
                      <Info className="w-3 h-3" /> View Benefits & Details
                    </button>

                  </div>
                </div>

                {/* Footer: Price and Add Button */}
                <div className="p-5 pt-0 border-t border-gray-100 mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block font-medium">Price</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-extrabold text-gray-900">
                        ₹{prod.effective_price}
                      </span>
                      {prod.discounted_price && (
                        <s className="text-xs text-gray-400 font-normal">₹{prod.price}</s>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart button */}
                  {qty === 0 ? (
                    <button
                      onClick={() => onAddToCart(prod, 'product')}
                      className="px-4 py-2 bg-parlour-50 hover:bg-parlour-700 text-parlour-700 hover:text-white rounded-xl text-xs font-bold border border-parlour-200 hover:border-transparent transition-all flex items-center gap-1 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 bg-parlour-800 text-white px-2.5 py-1 rounded-xl text-xs">
                      <span className="font-bold text-gold-300">In Bag ({qty})</span>
                      <button
                        onClick={onOpenCart}
                        className="underline text-[10px] text-rose-200 hover:text-white"
                      >
                        View
                      </button>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Empty Search state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <Package className="w-12 h-12 text-rose-300 mx-auto" />
            <h4 className="font-bold text-gray-800 text-base">No products found</h4>
            <p className="text-xs text-gray-500">
              Try searching with another keyword or select "All Products".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCat('all'); }}
              className="px-4 py-1.5 bg-parlour-800 text-white rounded-xl text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Product Details Modal */}
      {activeInfoProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-bold text-parlour-600 tracking-wider">
                  {activeInfoProduct.brand} • {activeInfoProduct.size_or_weight}
                </span>
                <h3 className="text-lg font-serif font-bold text-gray-900 mt-0.5">
                  {activeInfoProduct.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveInfoProduct(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="h-44 w-full bg-rose-50/50 rounded-2xl flex items-center justify-center p-4">
              <img
                src={activeInfoProduct.image_url}
                alt={activeInfoProduct.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="space-y-2.5 text-xs text-gray-700">
              <div>
                <h5 className="font-bold text-gray-900 mb-0.5">Product Description:</h5>
                <p className="text-gray-600 leading-relaxed">{activeInfoProduct.description}</p>
              </div>

              <div>
                <h5 className="font-bold text-gray-900 mb-0.5">Proven Benefits:</h5>
                <div className="bg-rose-50 p-2.5 rounded-xl border border-rose-100 text-[11px] text-gray-700">
                  {activeInfoProduct.benefits}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-gray-100">
                <div>
                  <span className="text-[10px] text-gray-400 block font-medium">Special Price</span>
                  <p className="text-xl font-extrabold text-gray-900">₹{activeInfoProduct.effective_price}</p>
                </div>
                <button
                  onClick={() => {
                    onAddToCart(activeInfoProduct, 'product');
                    setActiveInfoProduct(null);
                  }}
                  className="px-6 py-2.5 bg-parlour-700 hover:bg-parlour-800 text-white rounded-xl font-bold text-xs shadow-md"
                >
                  Add Product to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
