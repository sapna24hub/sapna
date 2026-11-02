import React, { useState, useEffect } from 'react';
import { 
  Pizza, 
  Coffee, 
  Sandwich, 
  UtensilsCrossed, 
  Sparkles, 
  Search, 
  Plus, 
  Check, 
  Heart, 
  Filter, 
  Flame, 
  IceCream, 
  CheckCircle2,
  Clock,
  Tag
} from 'lucide-react';
import { API_BASE } from '../apiConfig';

export default function MenuSection({ onAddToCart, trayItems = [] }) {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState(null);

  // Modern Cafe Categories
  const defaultCategories = [
    { id: 'all', slug: 'all', name: 'All Items', icon: 'Sparkles', count: 26 },
    { id: 'pizzas', slug: 'pizzas', name: 'Pizzas', icon: 'Pizza', count: 5 },
    { id: 'burgers', slug: 'burgers', name: 'Burgers', icon: 'Flame', count: 4 },
    { id: 'cold-coffee', slug: 'cold-coffee', name: 'Cold Coffee & Shakes', icon: 'Coffee', count: 5 },
    { id: 'sandwiches', slug: 'sandwiches', name: 'Sandwiches', icon: 'Sandwich', count: 4 },
    { id: 'sides', slug: 'sides', name: 'Fries & Sides', icon: 'UtensilsCrossed', count: 3 },
    { id: 'hot-brews', slug: 'hot-brews', name: 'Hot Brews & Teas', icon: 'Coffee', count: 3 },
    { id: 'desserts', slug: 'desserts', name: 'Waffles & Desserts', icon: 'IceCream', count: 2 },
  ];

  // Complete Mouthwatering Menu Items
  const defaultItems = [
    // PIZZAS
    {
      id: 1,
      category_slug: 'pizzas',
      name: "Paneer Makhani Cheese Burst Pizza",
      description: "Tandoori marinated cottage cheese, crunchy bell peppers, rich makhani gravy sauce, loaded with 100% mozzarella cheese.",
      price: 279,
      image_url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      tags: "Chef's Special, Cheese Burst",
      is_veg: true,
      prep_time: "15-20 min",
      is_bestseller: true
    },
    {
      id: 2,
      category_slug: 'pizzas',
      name: "Classic Margherita with Fresh Basil",
      description: "San Marzano tomato herb sauce, extra gooey double mozzarella, olive oil drizzle & fresh garden basil leaves.",
      price: 199,
      image_url: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80",
      tags: "Authentic Crust, Classic",
      is_veg: true,
      prep_time: "12-15 min",
      is_bestseller: true
    },
    {
      id: 3,
      category_slug: 'pizzas',
      name: "Farmhouse Garden Supreme Pizza",
      description: "Golden sweet corn, crisp capsicum, button mushrooms, red onions, sliced black olives & oregano seasoning.",
      price: 249,
      image_url: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
      tags: "Loaded Veggies, Healthy",
      is_veg: true,
      prep_time: "15 min",
      is_bestseller: false
    },
    {
      id: 4,
      category_slug: 'pizzas',
      name: "Fiery Peri-Peri Paneer & Jalapeno",
      description: "Spicy peri peri glaze, tandoori paneer cubes, spicy pickled jalapenos & golden corn on a crispy thin crust.",
      price: 289,
      image_url: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
      tags: "Spicy, Customer Favorite",
      is_veg: true,
      prep_time: "15 min",
      is_bestseller: true
    },
    {
      id: 5,
      category_slug: 'pizzas',
      name: "Smoky Barbecue Chicken Pizza",
      description: "Char-grilled BBQ chicken chunks, caramelized onions, smoked mozzarella & roasted bell peppers.",
      price: 329,
      image_url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
      tags: "Non-Veg, Smoky BBQ",
      is_veg: false,
      prep_time: "18-20 min",
      is_bestseller: true
    },

    // BURGERS
    {
      id: 6,
      category_slug: 'burgers',
      name: "Crispy Paneer Supreme Burger",
      description: "Thick panko-crusted cottage cheese patty, creamy thousand island spread, crunchy iceberg lettuce & melted cheese slice.",
      price: 149,
      image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      tags: "Crispy Patty, Bestseller",
      is_veg: true,
      prep_time: "10-12 min",
      is_bestseller: true
    },
    {
      id: 7,
      category_slug: 'burgers',
      name: "Double Cheese Smash Veggie Burger",
      description: "Golden spiced potato-peas herb patty, double cheddar cheese slices, pickled gherkins & signature cafe sauce in a toasted brioche bun.",
      price: 129,
      image_url: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
      tags: "Double Cheese, Value Pick",
      is_veg: true,
      prep_time: "10 min",
      is_bestseller: true
    },
    {
      id: 8,
      category_slug: 'burgers',
      name: "Peri-Peri Crispy Chicken Zinger",
      description: "Juicy fried chicken breast fillet coated in fiery peri-peri crunch with house ranch sauce and pickles.",
      price: 179,
      image_url: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80",
      tags: "Non-Veg, Crunchy Zinger",
      is_veg: false,
      prep_time: "12-15 min",
      is_bestseller: true
    },
    {
      id: 9,
      category_slug: 'burgers',
      name: "Garlic Butter Mushroom Melt Burger",
      description: "Butter-sauteed garlic mushrooms, melted Swiss cheese, crisp caramelized onions & herb mayo.",
      price: 159,
      image_url: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
      tags: "Gourmet, Cheesy",
      is_veg: true,
      prep_time: "12 min",
      is_bestseller: false
    },

    // COLD COFFEE & SHAKES
    {
      id: 10,
      category_slug: 'cold-coffee',
      name: "Classic Creamy Cafe Frappe",
      description: "Bold double espresso shot blended with vanilla cream, rich chilled milk and crushed ice, topped with dark cocoa powder.",
      price: 129,
      image_url: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
      tags: "Chilled, Cafe Classic",
      is_veg: true,
      prep_time: "5 min",
      is_bestseller: true
    },
    {
      id: 11,
      category_slug: 'cold-coffee',
      name: "Hazelnut Iced Cold Coffee",
      description: "Slow-roasted espresso with roasted hazelnut syrup, chilled thick milk and Hershey's chocolate drizzle.",
      price: 149,
      image_url: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80",
      tags: "Nutty Hazelnut, Top Rated",
      is_veg: true,
      prep_time: "5 min",
      is_bestseller: true
    },
    {
      id: 12,
      category_slug: 'cold-coffee',
      name: "Belgian Dark Chocolate Thickshake",
      description: "Thick gourmet milkshake made with pure Belgian cocoa, vanilla ice cream scoop, and chocolate fudge.",
      price: 169,
      image_url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
      tags: "Thickshake, Pure Belgian",
      is_veg: true,
      prep_time: "6 min",
      is_bestseller: true
    },
    {
      id: 13,
      category_slug: 'cold-coffee',
      name: "KitKat & Oreo Crumble Shake",
      description: "Loaded thickshake blended with crunchy Oreo biscuits, crushed KitKat fingers and topped with whipped cream.",
      price: 179,
      image_url: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80",
      tags: "Loaded Sweet Tooth, Must Try",
      is_veg: true,
      prep_time: "6 min",
      is_bestseller: true
    },
    {
      id: 14,
      category_slug: 'cold-coffee',
      name: "Caramel Biscoff Iced Frappe",
      description: "Espresso blended with Lotus Biscoff biscuit spread, creamy vanilla milk, crowned with crunchy biscuit crumbs.",
      price: 169,
      image_url: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
      tags: "Biscoff Crunch, Trending",
      is_veg: true,
      prep_time: "5 min",
      is_bestseller: false
    },

    // SANDWICHES & PANINIS
    {
      id: 15,
      category_slug: 'sandwiches',
      name: "Bombay Masala Club Grilled Sandwich",
      description: "Triple-decker sandwich loaded with spiced potato masala, sliced cucumbers, tomatoes, mint chutney & melted cheese.",
      price: 119,
      image_url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
      tags: "Desi Favorite, Crispy",
      is_veg: true,
      prep_time: "10 min",
      is_bestseller: true
    },
    {
      id: 16,
      category_slug: 'sandwiches',
      name: "Cheesy Corn & Spinach Grilled Sandwich",
      description: "Golden sweet corn kernels tossed with baby spinach, garlic cream and mozzarella in butter-toasted jumbo bread.",
      price: 139,
      image_url: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
      tags: "Super Cheesy, Healthy Twist",
      is_veg: true,
      prep_time: "10 min",
      is_bestseller: false
    },
    {
      id: 17,
      category_slug: 'sandwiches',
      name: "Tandoori Paneer Tikka Panini",
      description: "Charcoal-spiced cottage cheese cubes, bell peppers, mint mayo grilled crisp inside Italian herb focaccia bread.",
      price: 159,
      image_url: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80",
      tags: "Tandoori Fusion, Bestseller",
      is_veg: true,
      prep_time: "12 min",
      is_bestseller: true
    },
    {
      id: 18,
      category_slug: 'sandwiches',
      name: "Smoky Chicken Mayo Toastie",
      description: "Shredded herb chicken breast, garlic mayo, cheese slice grilled golden in buttered artisanal sourdough.",
      price: 169,
      image_url: "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=800&q=80",
      tags: "Non-Veg, High Protein",
      is_veg: false,
      prep_time: "12 min",
      is_bestseller: true
    },

    // FRIES & SIDES
    {
      id: 19,
      category_slug: 'sides',
      name: "Peri-Peri Crinkle French Fries",
      description: "Golden fried crinkle-cut potatoes generously dusted with African bird's eye peri-peri spice. Served with cheesy dip.",
      price: 99,
      image_url: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80",
      tags: "Crispy Crunch, Spicy Dip",
      is_veg: true,
      prep_time: "8 min",
      is_bestseller: true
    },
    {
      id: 20,
      category_slug: 'sides',
      name: "Loaded Cheesy Mexican Nachos",
      description: "Crispy corn tortilla chips smothered in warm cheese sauce, tomato salsa, refried beans & spicy jalapenos.",
      price: 149,
      image_url: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80",
      tags: "Party Platter, Cheese Dip",
      is_veg: true,
      prep_time: "10 min",
      is_bestseller: true
    },
    {
      id: 21,
      category_slug: 'sides',
      name: "Cheesy Stuffed Garlic Bread",
      description: "Freshly baked baguette stuffed with mozzarella, sweet corn and oregano garlic butter. Served with dip.",
      price: 139,
      image_url: "https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=800&q=80",
      tags: "Garlic Butter, Pull Apart",
      is_veg: true,
      prep_time: "12 min",
      is_bestseller: true
    },

    // HOT BREWS & TEAS
    {
      id: 22,
      category_slug: 'hot-brews',
      name: "Velvety Cappuccino with Foam Art",
      description: "Rich espresso shot topped with velvety steamed whole milk foam and dusted with aromatic cinnamon.",
      price: 99,
      image_url: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80",
      tags: "Barista Art, Steaming",
      is_veg: true,
      prep_time: "5 min",
      is_bestseller: true
    },
    {
      id: 23,
      category_slug: 'hot-brews',
      name: "Cafe Mocha with Belgian Cocoa",
      description: "Rich espresso layered with Belgian dark chocolate ganache and warm steamed milk with whipped swirl.",
      price: 129,
      image_url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
      tags: "Rich Chocolate, Warm",
      is_veg: true,
      prep_time: "5 min",
      is_bestseller: false
    },
    {
      id: 24,
      category_slug: 'hot-brews',
      name: "Traditional Kullad Masala Chai",
      description: "Freshly brewed Assam tea leaves infused with crushed ginger, green cardamom and whole spices in a rustic clay cup.",
      price: 69,
      image_url: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
      tags: "Desi Kulhad, Ginger Spice",
      is_veg: true,
      prep_time: "5 min",
      is_bestseller: true
    },

    // DESSERTS & WAFFLES
    {
      id: 25,
      category_slug: 'desserts',
      name: "Sizzling Choco Brownie with Ice Cream",
      description: "Warm walnut fudge brownie served on a sizzling hot cast-iron plate with melting vanilla scoop & dark chocolate drizzle.",
      price: 169,
      image_url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
      tags: "Sizzling Hot, Must Try",
      is_veg: true,
      prep_time: "8 min",
      is_bestseller: true
    },
    {
      id: 26,
      category_slug: 'desserts',
      name: "Belgian Nutella Waffle with Roasted Nuts",
      description: "Crisp golden waffle drizzled generously with warm Nutella spread, chocolate chips and roasted crushed almonds.",
      price: 189,
      image_url: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=80",
      tags: "Nutella Overload, Freshly Baked",
      is_veg: true,
      prep_time: "10 min",
      is_bestseller: true
    }
  ];

  // Fetch or fallback
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

          if (menuData && menuData.length > 0) {
            setMenuItems(menuData);
            setCategories([{ id: 'all', slug: 'all', name: 'All Items', icon: 'Sparkles' }, ...catData]);
            return;
          }
        }
        // Fallback to rich cafe menu
        setCategories(defaultCategories);
        setMenuItems(defaultItems);
      } catch (err) {
        setCategories(defaultCategories);
        setMenuItems(defaultItems);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAdd = (item) => {
    onAddToCart(item);
    setRecentlyAddedId(item.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1400);
  };

  const getTrayQuantity = (itemId) => {
    const found = trayItems.find((i) => i.id === itemId);
    return found ? found.quantity : 0;
  };

  // Filter items
  const displayItems = (menuItems.length > 0 ? menuItems : defaultItems).filter((item) => {
    const matchCategory = selectedCategory === 'all' || item.category_slug === selectedCategory;
    const matchSearch =
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags && item.tags.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchVeg = !vegOnly || item.is_veg === true;

    return matchCategory && matchSearch && matchVeg;
  });

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#FCF8F2] border-t border-[#EAE0D0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE0D0] text-[#5B3314] text-xs font-semibold tracking-wide border border-[#D5BE9B] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#BA8748]" />
            <span>Freshly Made Upon Order • Realistic Indian Cafe Pricing</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B1607] tracking-tight">
            Our Handcrafted Cafe Menu
          </h2>

          <p className="text-sm sm:text-base text-[#6E4F32] leading-relaxed">
            From bubbling hot wood-fired pizzas and crispy smash burgers to chilled frappes and grilled triple-decker sandwiches — freshly prepared for you!
          </p>
        </div>

        {/* Search & Veg Filter Bar */}
        <div className="mt-10 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-[#8C6B4B] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search pizzas, burgers, cold coffee, fries, sandwiches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#DAC9B2] rounded-2xl text-sm font-medium text-[#2B1607] placeholder-[#A08568] focus:outline-none focus:ring-2 focus:ring-[#BA8748] shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#8C6B4B] hover:text-[#2B1607]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Pure Veg Toggle */}
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`w-full sm:w-auto px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border transition-all ${
              vegOnly
                ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm ring-2 ring-emerald-500/30'
                : 'bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-50'
            }`}
          >
            <span className="w-3.5 h-3.5 rounded-full border-2 border-current flex items-center justify-center p-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-current block" />
            </span>
            <span>{vegOnly ? 'Showing Pure Veg Only' : 'Filter Pure Veg'}</span>
          </button>
        </div>

        {/* Category Pills Slider */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none justify-start sm:justify-center">
          {(categories.length > 0 ? categories : defaultCategories).map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id || cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#4A260F] text-[#FAF5EB] shadow-md -translate-y-0.5'
                    : 'bg-white text-[#5B3314] hover:bg-[#EAE0D0] border border-[#E3D4C0]'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((item) => {
            const inTrayQty = getTrayQuantity(item.id);
            const isRecentlyAdded = recentlyAddedId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-[#E8DCB8] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Item Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Veg / Non-Veg Indicator */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xl shadow-md flex items-center gap-1.5 text-[11px] font-bold">
                      <span className={`w-3.5 h-3.5 rounded-sm border-2 flex items-center justify-center p-0.5 ${
                        item.is_veg !== false ? 'border-emerald-600' : 'border-rose-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full block ${
                          item.is_veg !== false ? 'bg-emerald-600' : 'bg-rose-600'
                        }`} />
                      </span>
                      <span className={item.is_veg !== false ? 'text-emerald-800' : 'text-rose-800'}>
                        {item.is_veg !== false ? 'Veg' : 'Non-Veg'}
                      </span>
                    </div>

                    {/* Tags pill */}
                    {item.tags && (
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-xs text-amber-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-amber-300/30">
                        {item.tags.split(',')[0]}
                      </div>
                    )}

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between text-white">
                      <span className="font-serif text-2xl font-bold drop-shadow-md text-[#FFF5EA]">
                        ₹{item.price}
                      </span>
                      {item.prep_time && (
                        <span className="text-[11px] font-medium text-amber-200 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {item.prep_time}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-2.5">
                    <h3 className="font-serif text-lg font-bold text-[#2B1607] group-hover:text-[#8C5628] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#6B4E33] leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleAdd(item)}
                    className={`w-full py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                      isRecentlyAdded
                        ? 'bg-emerald-600 text-white shadow-md'
                        : inTrayQty > 0
                        ? 'bg-[#3D2512] text-amber-300 hover:bg-[#2B1607] shadow-sm'
                        : 'bg-[#5B3314] text-[#FAF5EB] hover:bg-[#3D2512] shadow-sm hover:shadow-md'
                    }`}
                  >
                    {isRecentlyAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Order Tray!</span>
                      </>
                    ) : inTrayQty > 0 ? (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add Another (In Tray: {inTrayQty})</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 text-amber-300" />
                        <span>Add to Order Tray • ₹{item.price}</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {displayItems.length === 0 && (
          <div className="mt-16 text-center max-w-md mx-auto p-8 bg-white rounded-3xl border border-[#E8DCB8] space-y-3">
            <Pizza className="w-12 h-12 text-[#9E7A50] mx-auto opacity-60" />
            <h4 className="font-serif text-lg font-bold text-[#2B1607]">No items found</h4>
            <p className="text-xs text-[#7B5A34]">
              Try searching for something else like "pizza", "burger", "frappe", or clear the pure veg filter.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setVegOnly(false); }}
              className="mt-2 px-5 py-2.5 rounded-full bg-[#5B3314] text-white text-xs font-semibold"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
