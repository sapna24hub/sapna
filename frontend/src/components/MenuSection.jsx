import React, { useState, useEffect } from 'react';
import { 
  Pizza, 
  Coffee, 
  Sandwich, 
  Sparkles, 
  Search, 
  Plus, 
  Check, 
  Heart, 
  Filter, 
  Flame, 
  CheckCircle2,
  Clock,
  Tag,
  ShoppingBag,
  UtensilsCrossed
} from 'lucide-react';
import { API_BASE } from '../apiConfig';

export default function MenuSection({ onAddToCart, trayItems = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState(null);

  // 6 Core Required Categories for Black Cat Cafe
  const categories = [
    { id: 'all', slug: 'all', name: 'All Items', icon: Sparkles, count: 32 },
    { id: 'pizza', slug: 'pizza', name: 'Pizza', icon: Pizza, count: 6 },
    { id: 'burger', slug: 'burger', name: 'Burger', icon: Flame, count: 5 },
    { id: 'sandwich', slug: 'sandwich', name: 'Sandwich', icon: Sandwich, count: 5 },
    { id: 'fries', slug: 'fries', name: 'French Fries', icon: UtensilsCrossed, count: 5 },
    { id: 'hot-coffee', slug: 'hot-coffee', name: 'Hot Coffee', icon: Coffee, count: 6 },
    { id: 'cold-coffee', slug: 'cold-coffee', name: 'Cold Coffee', icon: Coffee, count: 5 },
  ];

  const menuItems = [
    // 🍕 PIZZAS
    {
      id: 1,
      category_slug: 'pizza',
      name: "Black Cat Truffle Mushroom Pizza",
      description: "Charcoal hand-stretched dough, wild sauteed mushrooms, black truffle oil drizzle, fresh thyme, and 100% whole milk mozzarella.",
      price: 319,
      is_veg: true,
      badge: "Chef's Signature",
      prep_time: "15-18 mins",
      image_url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 2,
      category_slug: 'pizza',
      name: "Paneer Makhani Cheese Burst Pizza",
      description: "Tandoori marinated cottage cheese, crunchy bell peppers, rich makhani gravy drizzle, and oozing cheese-burst crust.",
      price: 279,
      is_veg: true,
      badge: "Bestseller",
      prep_time: "15 mins",
      image_url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 3,
      category_slug: 'pizza',
      name: "Classic Margherita Basil Crunch",
      description: "San Marzano plum tomato sauce, fresh creamy buffalo mozzarella, sweet Italian basil leaves, and extra virgin olive oil.",
      price: 199,
      is_veg: true,
      badge: "Classic",
      prep_time: "12 mins",
      image_url: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 4,
      category_slug: 'pizza',
      name: "Farmhouse Fresh Veggie Supreme",
      description: "Crispy button mushrooms, black Spanish olives, sweet corn kernels, capsicum, red paprika, and aromatic oregano.",
      price: 249,
      is_veg: true,
      badge: "Healthy Pick",
      prep_time: "14 mins",
      image_url: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 5,
      category_slug: 'pizza',
      name: "Peri-Peri Spicy Paneer Feast",
      description: "Fiery African bird's eye peri-peri rubbed paneer cubes, pickled jalapeños, red onions, and hot garlic crust.",
      price: 289,
      is_veg: true,
      badge: "Spicy",
      prep_time: "15 mins",
      image_url: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 6,
      category_slug: 'pizza',
      name: "Smoky BBQ Chicken Loaded Pizza",
      description: "Tender shredded hickory BBQ smoked chicken breast, caramelized onions, mozzarella cheese, and fresh coriander.",
      price: 329,
      is_veg: false,
      badge: "Meat Lovers",
      prep_time: "16 mins",
      image_url: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=700&q=80",
    },

    // 🍔 BURGERS
    {
      id: 7,
      category_slug: 'burger',
      name: "Black Cat Charcoal Brioche Smash Burger",
      description: "Artisanal black charcoal brioche bun, double crispy herb patty, smoked cheddar melt, caramel onions, and secret spicy cat sauce.",
      price: 189,
      is_veg: true,
      badge: "Signature Bun",
      prep_time: "12 mins",
      image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 8,
      category_slug: 'burger',
      name: "Crispy Paneer Supreme Burger",
      description: "Jumbo panko-crusted fresh cottage cheese slab tossed in peri-peri seasoning, mint mayo, crunchy lettuce, and sliced tomatoes.",
      price: 149,
      is_veg: true,
      badge: "Top Seller",
      prep_time: "10 mins",
      image_url: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 9,
      category_slug: 'burger',
      name: "Double Cheese Smash Veggie Burger",
      description: "Two seasoned golden potato-veggie smash patties, double layer English cheddar cheese, tangy dill gherkins, and burger relish.",
      price: 129,
      is_veg: true,
      badge: "Value Favorite",
      prep_time: "10 mins",
      image_url: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 10,
      category_slug: 'burger',
      name: "Peri-Peri Crispy Chicken Zinger",
      description: "Thick whole chicken breast marinated in spiced buttermilk, fried till ultra crunchy, topped with garlic aioli and crunchy slaw.",
      price: 179,
      is_veg: false,
      badge: "Hot & Crispy",
      prep_time: "12 mins",
      image_url: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 11,
      category_slug: 'burger',
      name: "Garlic Butter Mushroom Melt Burger",
      description: "Caramelized button mushrooms sautéed in roasted garlic butter, melted Swiss cheese, caramelized onions, and truffle aioli.",
      price: 159,
      is_veg: true,
      badge: "Gourmet",
      prep_time: "12 mins",
      image_url: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=700&q=80",
    },

    // 🥪 SANDWICHES
    {
      id: 12,
      category_slug: 'sandwich',
      name: "Bombay Masala Grilled Club Toastie",
      description: "Three layers of butter-toasted jumbo bread with spicy potato masala, beetroot, cucumber, tomato, amul cheese, and mint chutney.",
      price: 119,
      is_veg: true,
      badge: "Street Legend",
      prep_time: "8 mins",
      image_url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 13,
      category_slug: 'sandwich',
      name: "Cheesy Sweet Corn & Spinach Panini",
      description: "Creamy garlic spinach blend, tender sweet corn, shredded mozzarella, and cheddar grilled in Italian panini bread.",
      price: 139,
      is_veg: true,
      badge: "Cafe Classic",
      prep_time: "10 mins",
      image_url: "https://images.unsplash.com/photo-1554433607-66b5efe9d304?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 14,
      category_slug: 'sandwich',
      name: "Tandoori Paneer Tikka Herb Panini",
      description: "Char-grilled tandoori paneer slices, crunchy onion rings, capsicum, mint mayonnaise, and melted mozzarella inside ciabatta.",
      price: 159,
      is_veg: true,
      badge: "Most Loved",
      prep_time: "10 mins",
      image_url: "https://images.unsplash.com/photo-1619860860774-1e2e17343432?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 15,
      category_slug: 'sandwich',
      name: "Smoky Chicken Mayo Toastie",
      description: "Slow-roasted pulled chicken breast tossed in black pepper herb mayo, roasted peppers, and grilled golden on sourdough.",
      price: 169,
      is_veg: false,
      badge: "High Protein",
      prep_time: "10 mins",
      image_url: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 16,
      category_slug: 'sandwich',
      name: "Triple Layer Cheese Melt Sandwich",
      description: "A decadent combination of sharp cheddar, creamy mozzarella, and parmesan cheese with a hint of garlic herb butter.",
      price: 149,
      is_veg: true,
      badge: "Cheesy Goodness",
      prep_time: "8 mins",
      image_url: "https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?auto=format&fit=crop&w=700&q=80",
    },

    // 🍟 FRENCH FRIES & SIDES
    {
      id: 17,
      category_slug: 'fries',
      name: "Peri-Peri Crinkle French Fries",
      description: "Thick crinkle-cut golden potatoes tossed vigorously in hot African peri-peri spice dust. Served with creamy garlic dip.",
      price: 99,
      is_veg: true,
      badge: "Bestseller Side",
      prep_time: "6 mins",
      image_url: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 18,
      category_slug: 'fries',
      name: "Loaded Cheesy Truffle Fries",
      description: "Golden crispy fries smothered in hot warm cheddar cheese sauce, black truffle oil aroma, and fresh chopped parsley.",
      price: 149,
      is_veg: true,
      badge: "Chef's Decadence",
      prep_time: "8 mins",
      image_url: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 19,
      category_slug: 'fries',
      name: "Classic Salted Golden Crisps",
      description: "Crispy double-fried shoestring potatoes sprinkled with fine sea salt. The timeless accompaniment to burgers and cold brews.",
      price: 89,
      is_veg: true,
      badge: "Classic",
      prep_time: "5 mins",
      image_url: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 20,
      category_slug: 'fries',
      name: "Cheesy Stuffed Garlic Breadsticks",
      description: "Freshly baked herb baguette stuffed with rich molten mozzarella cheese, brushed with aromatic garlic herb butter.",
      price: 139,
      is_veg: true,
      badge: "Warm & Cheesy",
      prep_time: "10 mins",
      image_url: "https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 21,
      category_slug: 'fries',
      name: "Loaded Mexican Cheesy Nachos",
      description: "Crispy stone-ground corn tortilla chips drenched in warm salsa, pickled jalapenos, sour cream, and spiced cheese blend.",
      price: 149,
      is_veg: true,
      badge: "Snack Favorite",
      prep_time: "7 mins",
      image_url: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=700&q=80",
    },

    // ☕ HOT COFFEE
    {
      id: 22,
      category_slug: 'hot-coffee',
      name: "Italian Velvet Cappuccino",
      description: "Rich dark roast Arabica espresso topped with thick micro-textured steamed milk foam and Belgian cocoa powder dusting.",
      price: 99,
      is_veg: true,
      badge: "Barista Favorite",
      prep_time: "4 mins",
      image_url: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 23,
      category_slug: 'hot-coffee',
      name: "Single Origin Black Cat Espresso",
      description: "Double shot of bold medium-dark roasted South Indian Arabica beans with a thick golden hazelnut crema.",
      price: 79,
      is_veg: true,
      badge: "Bold Kick",
      prep_time: "3 mins",
      image_url: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 24,
      category_slug: 'hot-coffee',
      name: "Creamy Dark Chocolate Cafe Mocha",
      description: "Bold espresso blended with rich melted Swiss dark chocolate syrup, steamed milk, and crowned with chocolate curls.",
      price: 129,
      is_veg: true,
      badge: "Chocolate & Coffee",
      prep_time: "5 mins",
      image_url: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 25,
      category_slug: 'hot-coffee',
      name: "Hazelnut Vanilla Roasted Latte",
      description: "Silky smooth steamed whole milk poured over espresso infused with roasted hazelnut and French Madagascar vanilla extract.",
      price: 139,
      is_veg: true,
      badge: "Sweet Aroma",
      prep_time: "4 mins",
      image_url: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 26,
      category_slug: 'hot-coffee',
      name: "Irish Cream Velvet Americano",
      description: "Smooth double espresso diluted with hot water and flavored with non-alcoholic Irish cream syrup for a deep roasted profile.",
      price: 119,
      is_veg: true,
      badge: "Aromatic",
      prep_time: "4 mins",
      image_url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 27,
      category_slug: 'hot-coffee',
      name: "Signature Hot Belgian Chocolate",
      description: "Pure melted Belgian dark chocolate whisked with rich steamed milk and topped with fluffy mini marshmallows.",
      price: 129,
      is_veg: true,
      badge: "Pure Comfort",
      prep_time: "5 mins",
      image_url: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=700&q=80",
    },

    // 🧋 COLD COFFEE
    {
      id: 28,
      category_slug: 'cold-coffee',
      name: "Signature Black Cat Cold Brew",
      description: "Coarsely ground beans steeped in cold mountain spring water for 18 slow hours. Velvety smooth, ultra-low acidity, served on clear ice.",
      price: 139,
      is_veg: true,
      badge: "Signature Brew",
      prep_time: "3 mins",
      image_url: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 29,
      category_slug: 'cold-coffee',
      name: "Classic Creamy Frothy Frappe",
      description: "Thick chilled milk, strong espresso shot, and vanilla ice cream blended with crushed ice and dusted with bittersweet cocoa.",
      price: 129,
      is_veg: true,
      badge: "All-Time Hit",
      prep_time: "4 mins",
      image_url: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 30,
      category_slug: 'cold-coffee',
      name: "Hazelnut Iced Cold Coffee",
      description: "Double espresso shot poured over chilled milk, roasted hazelnut syrup, and crushed ice, topped with a scoop of vanilla cream.",
      price: 149,
      is_veg: true,
      badge: "Nutty Bliss",
      prep_time: "4 mins",
      image_url: "https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 31,
      category_slug: 'cold-coffee',
      name: "Belgian Dark Chocolate Thickshake",
      description: "Extra thick shake churned with Belgian dark chocolate ganache, chocolate fudge ice cream, and chocolate cookie crumbles.",
      price: 169,
      is_veg: true,
      badge: "Ultra Thick",
      prep_time: "5 mins",
      image_url: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 32,
      category_slug: 'cold-coffee',
      name: "Caramel Biscoff Cream Frappe",
      description: "Lotus Biscoff cookie spread whipped with chilled espresso, creamy whole milk, salted caramel drizzle, and biscuit crunch.",
      price: 169,
      is_veg: true,
      badge: "Sweet Indulgence",
      prep_time: "5 mins",
      image_url: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=700&q=80",
    },
  ];

  const handleAdd = (item) => {
    onAddToCart(item);
    setRecentlyAddedId(item.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1200);
  };

  const getTrayQuantity = (itemId) => {
    const found = trayItems.find((i) => i.id === itemId);
    return found ? found.quantity : 0;
  };

  // Filter items
  const displayItems = menuItems.filter((item) => {
    const matchCategory = selectedCategory === 'all' || item.category_slug === selectedCategory;
    const matchSearch =
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.badge && item.badge.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchVeg = !vegOnly || item.is_veg === true;

    return matchCategory && matchSearch && matchVeg;
  });

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#0D0D0D] border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A1A] text-amber-400 text-xs font-bold tracking-wide border border-amber-500/20 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Come Hungry, Leave Happy • Great Taste Every Time</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            The Black Cat <span className="text-amber-500">Menu</span>
          </h2>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
            <strong>Good Food, Good Mood!</strong> Fresh wood-fired pizzas, gourmet smash burgers, crispy French fries, grilled sandwiches &amp; artisan cold brews.
          </p>
        </div>

        {/* Filter Controls: Search & Pure Veg Toggle */}
        <div className="mt-10 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#141414] p-3 rounded-2xl border border-white/10 shadow-lg">
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Pizza, Burger, Fries, Coffee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-[#1F1F1F] border border-white/10 focus:border-amber-500/50 rounded-xl text-xs sm:text-sm text-white placeholder-stone-400 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Pure Veg Toggle Switch */}
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-semibold text-stone-300 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-sm shadow-emerald-500/50" />
              Pure Veg Only
            </span>
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                vegOnly ? 'bg-emerald-500' : 'bg-[#2A2A2A]'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                  vegOnly ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

        </div>

        {/* Category Pills Tabs */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none justify-start sm:justify-center">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 border ${
                  isSelected
                    ? 'bg-amber-500 text-black border-amber-400 shadow-[0_4px_20px_rgba(245,158,11,0.3)] scale-105'
                    : 'bg-[#181818] text-stone-300 border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                <IconComponent className={`w-4 h-4 ${isSelected ? 'text-black' : 'text-amber-400'}`} />
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                  isSelected ? 'bg-black/20 text-black' : 'bg-white/10 text-stone-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Menu Cards Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayItems.map((item) => {
            const inCartQty = getTrayQuantity(item.id);
            const isJustAdded = recentlyAddedId === item.id;

            return (
              <div
                key={item.id}
                className="group bg-[#161616] rounded-3xl border border-white/10 hover:border-amber-500/40 shadow-xl hover:shadow-[0_12px_36px_rgba(245,158,11,0.12)] transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Food Image with Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95 group-hover:brightness-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/75 backdrop-blur-md text-[11px] font-bold border border-white/10 text-white">
                      <span className={`w-2 h-2 rounded-full ${item.is_veg ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-rose-500 shadow-sm shadow-rose-500/50'}`} />
                      <span>{item.is_veg ? 'Veg' : 'Non-Veg'}</span>
                    </span>

                    {item.badge && (
                      <span className="px-2.5 py-1 rounded-xl bg-amber-500 text-black font-extrabold text-[10px] uppercase tracking-wider shadow-md">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Prep Time Tag */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] font-medium text-stone-300 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-lg border border-white/5">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{item.prep_time}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-400 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Price & Add to Cart Action */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-stone-400 uppercase font-semibold">Price</span>
                      <span className="text-xl font-extrabold text-amber-400">
                        ₹{item.price}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAdd(item)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 active:scale-95 shadow-md ${
                        isJustAdded
                          ? 'bg-emerald-500 text-black'
                          : inCartQty > 0
                          ? 'bg-amber-500 text-black hover:bg-amber-400'
                          : 'bg-[#242424] text-white hover:bg-amber-500 hover:text-black border border-white/10'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-4 h-4 text-black animate-bounce" />
                          <span>Added!</span>
                        </>
                      ) : inCartQty > 0 ? (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add More ({inCartQty})</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Empty Search Feedback */}
        {displayItems.length === 0 && (
          <div className="text-center py-16 space-y-4">
            <p className="text-lg font-bold text-stone-400">No items match your search "{searchQuery}"</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setVegOnly(false);
              }}
              className="px-5 py-2.5 rounded-2xl bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
