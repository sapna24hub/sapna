import { API_BASE } from '../apiConfig';
import React, { useState, useEffect } from 'react';
import { Coffee, CupSoda, Croissant, UtensilsCrossed, Sparkles, Search, Plus, Check, Heart, Bookmark, Filter } from 'lucide-react';

export default function MenuSection({ onAddToCart, trayItems = [] }) {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [loading, setLoading] = useState(true);
  const [recentlyAddedId, setRecentlyAddedId] = useState(null);

  // Fallback initial data in case backend server is unreachable
  const defaultCategories = [
    { id: 1, slug: 'all', name: 'Full Menu', icon: 'Sparkles' },
    { id: 2, slug: 'artisan-coffee', name: 'Artisan Coffee', icon: 'Coffee' },
    { id: 3, slug: 'tea-and-infusions', name: 'Specialty Teas', icon: 'CupSoda' },
    { id: 4, slug: 'pastries-and-bakes', name: 'Hearth Pastries', icon: 'Croissant' },
    { id: 5, slug: 'light-bites-and-brunch', name: 'Light Bites & Toast', icon: 'UtensilsCrossed' },
    { id: 6, slug: 'bookstore-specials', name: 'Book & Brew Combos', icon: 'Sparkles' },
  ];

  const defaultItems = [
    {
      id: 1,
      category_slug: 'artisan-coffee',
      name: "Old Paperback Vanilla Cortado",
      description: "Double shot of heirloom Ethiopian espresso cut with silky warm steamed oat milk, real Madagascar vanilla bean syrup, and dusted with cinnamon.",
      price: 4.75,
      literary_pairing: "Pairs with: 'The Catcher in the Rye' or reflective poetry",
      image_url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
      tags: "Barista Special, Vegan Option",
      calories: "140 kcal",
      is_bestseller: true
    },
    {
      id: 2,
      category_slug: 'artisan-coffee',
      name: "Sherlock's Smoked Honey Latte",
      description: "Dark roasted espresso, smoked wildflower mountain honey, steamed velvety whole milk, topped with a torched rosemary sprig.",
      price: 5.75,
      literary_pairing: "Pairs with: Classic Victorian mystery novels & detective fiction",
      image_url: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
      tags: "House Signature, Customer Favorite",
      calories: "210 kcal",
      is_bestseller: true
    },
    {
      id: 3,
      category_slug: 'artisan-coffee',
      name: "The Great Catsby Cold Drip",
      description: "Slow 18-hour cold brew extraction infused with sweet orange peel, roasted cocoa nibs, and served over crystal-clear artisan ice.",
      price: 5.25,
      literary_pairing: "Pairs with: F. Scott Fitzgerald & 1920s American literature",
      image_url: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
      tags: "Single Origin, Refreshing",
      calories: "15 kcal",
      is_bestseller: false
    },
    {
      id: 4,
      category_slug: 'artisan-coffee',
      name: "Parchment & Dark Mocha Truffle",
      description: "Single-origin Colombian espresso blended with melted 70% dark Belgian chocolate, steamed oat milk, and Maldon sea salt flakes.",
      price: 6.00,
      literary_pairing: "Pairs with: Gothic fantasy and stormy afternoon reading",
      image_url: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=800&q=80",
      tags: "Decadent, Barista Pick",
      calories: "260 kcal",
      is_bestseller: true
    },
    {
      id: 5,
      category_slug: 'artisan-coffee',
      name: "Hemingway's Black Chemex Pour-Over",
      description: "Bold, crisp-bodied Kenyan single origin with bright notes of dark blackberry, dried fig, and toasted cedarwood.",
      price: 4.50,
      literary_pairing: "Pairs with: 'The Old Man and the Sea' or travel diaries",
      image_url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
      tags: "Pure Pour-Over, Zero Sugar",
      calories: "5 kcal",
      is_bestseller: false
    },
    {
      id: 6,
      category_slug: 'tea-and-infusions',
      name: "Jane Austen's Earl Grey Cream",
      description: "Loose-leaf Ceylon black tea scented with cold-pressed Italian bergamot, royal blue cornflowers, and a velvety drop of vanilla cream.",
      price: 4.25,
      literary_pairing: "Pairs with: 'Pride and Prejudice' & period drama reads",
      image_url: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
      tags: "Organic, Best with a Biscuit",
      calories: "45 kcal",
      is_bestseller: true
    },
    {
      id: 7,
      category_slug: 'tea-and-infusions',
      name: "Ceremonial Kyoto Matcha Latte",
      description: "First-harvest ceremonial grade Uji matcha traditionally whisked with warm oat milk and lightly sweetened with organic amber agave.",
      price: 5.50,
      literary_pairing: "Pairs with: Haruki Murakami novels & quiet contemplation",
      image_url: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80",
      tags: "Superfood, Vegan",
      calories: "120 kcal",
      is_bestseller: true
    },
    {
      id: 8,
      category_slug: 'pastries-and-bakes',
      name: "Proust's Golden Almond Croissant",
      description: "Double-baked flaky French laminated pastry filled with rich almond frangipane paste, topped with toasted flaked almonds and powdered snow.",
      price: 4.95,
      literary_pairing: "Pairs with: 'In Search of Lost Time' or nostalgic memoirs",
      image_url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
      tags: "Warm Hearth, Baked at 5 AM",
      calories: "380 kcal",
      is_bestseller: true
    },
    {
      id: 9,
      category_slug: 'pastries-and-bakes',
      name: "Edgar Allan Poe Dark Cocoa Brownie",
      description: "Rich, ultra-fudgy dark chocolate brownie infused with a splash of espresso and sprinkled with crunchy smoked sea salt.",
      price: 4.50,
      literary_pairing: "Pairs with: Gothic thrillers & psychological mysteries",
      image_url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
      tags: "Gluten-Free, Ultra Rich",
      calories: "340 kcal",
      is_bestseller: true
    },
    {
      id: 10,
      category_slug: 'pastries-and-bakes',
      name: "Bookworm Blueberry & Lemon Scone",
      description: "Buttery, crumbly Scottish golden scone packed with wild Maine blueberries, finished with tangy Meyer lemon glaze.",
      price: 4.25,
      literary_pairing: "Pairs with: Cozy English countryside mysteries",
      image_url: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=800&q=80",
      tags: "Vegetarian, House Recipe",
      calories: "320 kcal",
      is_bestseller: false
    },
    {
      id: 11,
      category_slug: 'light-bites-and-brunch',
      name: "The Hobbit's Avocado Tartine",
      description: "Thick slice of toasted artisan rustic sourdough, mashed Hass avocado, heirloom cherry tomatoes, sheep's milk feta, microgreens, and chili crisp.",
      price: 8.75,
      literary_pairing: "Pairs with: High fantasy, adventure novels, and healthy mornings",
      image_url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
      tags: "Vegetarian, Healthy, Popular Brunch",
      calories: "410 kcal",
      is_bestseller: true
    },
    {
      id: 12,
      category_slug: 'light-bites-and-brunch',
      name: "Truffled Fontina & Brioche Melt",
      description: "Aged Italian Fontina and Gruyère cheese melted inside buttered brioche with caramelized sweet onions and aromatic white truffle oil.",
      price: 9.50,
      literary_pairing: "Pairs with: Modern philosophical essays & rainy afternoons",
      image_url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
      tags: "Comfort Food, Melty & Decadent",
      calories: "520 kcal",
      is_bestseller: true
    },
    {
      id: 13,
      category_slug: 'bookstore-specials',
      name: "Blind Date with a Book & Brew",
      description: "A mystery handpicked bestseller wrapped in vintage brown kraft paper with handwritten genre hints, plus any handcrafted beverage of your choice.",
      price: 14.50,
      literary_pairing: "Includes a physical hardcover/paperback to take home forever!",
      image_url: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
      tags: "Gift Item, Cafe Bestseller, Unique",
      calories: "Varies",
      is_bestseller: true
    },
    {
      id: 14,
      category_slug: 'bookstore-specials',
      name: "Writer's Sanctuary Bottomless Pot & Pastry",
      description: "Bottomless porcelain table pot of single-origin filter brew, paired with any fresh pastry from our morning glass display.",
      price: 9.00,
      literary_pairing: "Created for study sessions, laptop writers, and long conversations",
      image_url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
      tags: "Infinite Refills, Study Favorite",
      calories: "Varies",
      is_bestseller: true
    }
  ];

  // Fetch live menu from Django backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [catRes, menuRes] = await Promise.all([
          fetch(`${API_BASE}/categories/`),
          fetch(`${API_BASE}/menu/`)
        ]);

        if (catRes.ok && menuRes.ok) {
          const catData = await catRes.json();
          const menuData = await menuRes.json();

          const allCat = [{ id: 0, slug: 'all', name: 'Full Menu', icon: 'Sparkles' }];
          setCategories([...allCat, ...catData]);
          setMenuItems(menuData);
        } else {
          setCategories(defaultCategories);
          setMenuItems(defaultItems);
        }
      } catch (err) {
        console.warn('Backend API connection defaulted to mock data:', err);
        setCategories(defaultCategories);
        setMenuItems(defaultItems);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddItem = (item) => {
    onAddToCart(item);
    setRecentlyAddedId(item.id);
    setTimeout(() => setRecentlyAddedId(null), 1200);
  };

  const getQuantityInTray = (itemId) => {
    const item = trayItems.find(t => t.id === itemId);
    return item ? item.quantity : 0;
  };

  // Filter logic
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category_slug === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags && item.tags.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.literary_pairing && item.literary_pairing.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = selectedTag === 'all' ||
      (item.tags && item.tags.toLowerCase().includes(selectedTag.toLowerCase())) ||
      (selectedTag === 'bestseller' && item.is_bestseller);

    return matchesCategory && matchesSearch && matchesTag;
  });

  const getCategoryIcon = (slug) => {
    switch (slug) {
      case 'artisan-coffee': return Coffee;
      case 'tea-and-infusions': return CupSoda;
      case 'pastries-and-bakes': return Croissant;
      case 'light-bites-and-brunch': return UtensilsCrossed;
      default: return Sparkles;
    }
  };

  return (
    <section id="menu" className="py-20 bg-[#FAF5EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE0D0] text-[#7B5A34] text-xs font-semibold uppercase tracking-wider">
            <Coffee className="w-3.5 h-3.5 text-[#BA8748]" />
            <span>Honest, Transparent &amp; Freshly Handcrafted</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B1607]">
            The Books &amp; Brews Menu
          </h2>

          <p className="text-[#5A3D20] text-base sm:text-lg font-light leading-relaxed">
            Every cup is poured to order using heirloom beans and spring water. Every pastry is shaped at dawn. 
            Enjoy honest prices, organic ingredients, and literary pairings.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-6 mb-12">
          
          {/* Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 gap-2 sm:gap-3 no-scrollbar">
            {categories.map((cat) => {
              const IconComponent = getCategoryIcon(cat.slug);
              const isActive = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id || cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 shadow-sm ${
                    isActive
                      ? 'bg-[#5B3314] text-[#FAF5EB] shadow-warm scale-105'
                      : 'bg-[#EFE3D0] text-[#5A3D20] hover:bg-[#E2D4BF] hover:text-[#2B1607]'
                  }`}
                >
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#D7BA89]' : 'text-[#8C5628]'}`} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Search & Dietary Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F2E8D7] p-3 sm:p-4 rounded-2xl border border-[#D5BE9B]">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#8C5628] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cortado, matcha, scones, sandwiches..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#FAF5EB] rounded-xl border border-[#D5BE9B] text-[#3D2512] placeholder-[#9E7A50] focus:outline-none focus:ring-2 focus:ring-[#8C5628]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C5628] hover:text-[#3D2512]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Dietary Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              {[
                { label: 'All Items', value: 'all' },
                { label: '★ Bestsellers', value: 'bestseller' },
                { label: '🌱 Vegan', value: 'vegan' },
                { label: '🌾 Gluten-Free', value: 'gluten-free' },
                { label: '☕ Barista Pick', value: 'barista' },
              ].map((tag) => (
                <button
                  key={tag.value}
                  onClick={() => setSelectedTag(tag.value)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                    selectedTag === tag.value
                      ? 'bg-[#8C5628] text-white'
                      : 'bg-[#FAF5EB] text-[#5A3D20] hover:bg-[#E8DCC8]'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#F4ECDC] rounded-3xl border border-dashed border-[#C4A277]">
            <BookOpen className="w-12 h-12 text-[#9E7A50] mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#3D2512]">No matching delicious treats found</h3>
            <p className="text-sm text-[#7B5A34] mt-1 max-w-sm mx-auto">
              Try adjusting your search keywords or clearing the dietary filters.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedTag('all'); setSelectedCategory('all'); }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#5B3314] text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const inTrayCount = getQuantityInTray(item.id);
              const isJustAdded = recentlyAddedId === item.id;

              return (
                <div
                  key={item.id}
                  className="group bg-[#FFFDF9] rounded-2xl overflow-hidden border border-[#E3D4C0] hover:border-[#BA8748] shadow-sm hover:shadow-warm-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Item Image with realistic aspect ratio */}
                    <div className="relative h-48 sm:h-52 overflow-hidden bg-[#3D2512]">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                      {/* Price Badge */}
                      <div className="absolute top-3 right-3 bg-[#2B1607]/90 backdrop-blur-sm text-[#FAF5EB] font-serif font-bold text-sm sm:text-base px-3 py-1 rounded-full border border-[#D7BA89]/30 shadow-md">
                        ${Number(item.price).toFixed(2)}
                      </div>

                      {/* Bestseller ribbon if applicable */}
                      {item.is_bestseller && (
                        <div className="absolute top-3 left-3 bg-[#BA8241] text-[#FAF5EB] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Patron Favorite</span>
                        </div>
                      )}

                      {/* Calories badge */}
                      {item.calories && (
                        <div className="absolute bottom-3 left-3 text-[11px] font-medium text-white/90 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                          {item.calories}
                        </div>
                      )}
                    </div>

                    {/* Content Details */}
                    <div className="p-5 sm:p-6 space-y-3">
                      
                      {/* Name */}
                      <h3 className="font-serif text-xl font-bold text-[#2B1607] group-hover:text-[#8C5628] transition-colors">
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#5A3D20] line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Literary Pairing Note (Special feature) */}
                      {item.literary_pairing && (
                        <div className="p-2.5 rounded-xl bg-[#F7F1E5] border border-[#E8DEC8] flex items-start gap-2 text-xs text-[#7B5A34]">
                          <Bookmark className="w-3.5 h-3.5 text-[#BA8748] shrink-0 mt-0.5" />
                          <span className="italic font-serif leading-snug">
                            {item.literary_pairing}
                          </span>
                        </div>
                      )}

                      {/* Tags */}
                      {item.tags && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {item.tags.split(',').map((tag, i) => (
                            <span
                              key={i}
                              className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded bg-[#EFE3D0] text-[#7B5A34]"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Card Bottom: Add to Tray Action */}
                  <div className="p-5 sm:p-6 pt-0 border-t border-[#F2E8D7] mt-3">
                    <div className="flex items-center justify-between pt-3">
                      <div>
                        <span className="text-[11px] text-[#9E7A50] uppercase tracking-wider block">Total</span>
                        <span className="font-serif font-bold text-lg text-[#2B1607]">
                          ${Number(item.price).toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAddItem(item)}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm ${
                          isJustAdded
                            ? 'bg-emerald-600 text-white scale-105'
                            : inTrayCount > 0
                            ? 'bg-[#8C5628] text-white hover:bg-[#5B3314]'
                            : 'bg-[#5B3314] text-[#FAF5EB] hover:bg-[#3D2512]'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-4 h-4 text-white" />
                            <span>Added!</span>
                          </>
                        ) : inTrayCount > 0 ? (
                          <>
                            <span>In Tray ({inTrayCount})</span>
                            <Plus className="w-3.5 h-3.5 text-[#D7BA89]" />
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 text-[#D7BA89]" />
                            <span>Add to Tray</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
