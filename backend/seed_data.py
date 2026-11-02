import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'books_backend.settings')
django.setup()

from api.models import Category, MenuItem, Review, Reservation, NewsletterSubscriber

def seed():
    print("Clearing old data...")
    MenuItem.objects.all().delete()
    Category.objects.all().delete()
    Review.objects.all().delete()
    Reservation.objects.all().delete()

    print("Creating Categories...")
    cat_pizza = Category.objects.create(name="Gourmet Pizzas", slug="pizzas", icon="Pizza", description="Stone-baked hand-tossed pizzas with 100% mozzarella.", display_order=1)
    cat_burger = Category.objects.create(name="Gourmet Burgers", slug="burgers", icon="Flame", description="Sizzling patties with house sauces in toasted brioche buns.", display_order=2)
    cat_cold = Category.objects.create(name="Cold Coffee & Shakes", slug="cold-coffee", icon="Coffee", description="Chilled frappes, thickshakes and Belgian cocoa blends.", display_order=3)
    cat_sandwich = Category.objects.create(name="Sandwiches & Paninis", slug="sandwiches", icon="Sandwich", description="Grilled multi-layer toasties and herb focaccia paninis.", display_order=4)
    cat_sides = Category.objects.create(name="Fries & Quick Bites", slug="sides", icon="UtensilsCrossed", description="Crispy peri peri fries, nachos, and stuffed garlic bread.", display_order=5)
    cat_hot = Category.objects.create(name="Hot Brews & Teas", slug="hot-brews", icon="Coffee", description="Espresso, cappuccino, and aromatic kulhad masala chai.", display_order=6)
    cat_desserts = Category.objects.create(name="Waffles & Desserts", slug="desserts", icon="IceCream", description="Sizzling brownies, Belgian Nutella waffles and cakes.", display_order=7)

    print("Creating Menu Items...")
    menu_items = [
        # Pizzas
        MenuItem(category=cat_pizza, name="Paneer Makhani Cheese Burst Pizza", description="Tandoori marinated cottage cheese, crunchy bell peppers, rich makhani gravy sauce, loaded with 100% mozzarella cheese.", price=279, image_url="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80", tags="Chef's Special, Cheese Burst", is_bestseller=True),
        MenuItem(category=cat_pizza, name="Classic Margherita with Fresh Basil", description="San Marzano tomato herb sauce, extra gooey double mozzarella, olive oil drizzle & fresh garden basil leaves.", price=199, image_url="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80", tags="Authentic Crust, Classic", is_bestseller=True),
        MenuItem(category=cat_pizza, name="Farmhouse Garden Supreme Pizza", description="Golden sweet corn, crisp capsicum, button mushrooms, red onions, sliced black olives & oregano seasoning.", price=249, image_url="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80", tags="Loaded Veggies, Healthy", is_bestseller=False),
        MenuItem(category=cat_pizza, name="Fiery Peri-Peri Paneer & Jalapeno", description="Spicy peri peri glaze, tandoori paneer cubes, spicy pickled jalapenos & golden corn on a crispy thin crust.", price=289, image_url="https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80", tags="Spicy, Customer Favorite", is_bestseller=True),
        MenuItem(category=cat_pizza, name="Smoky Barbecue Chicken Pizza", description="Char-grilled BBQ chicken chunks, caramelized onions, smoked mozzarella & roasted bell peppers.", price=329, image_url="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80", tags="Non-Veg, Smoky BBQ", is_bestseller=True),

        # Burgers
        MenuItem(category=cat_burger, name="Crispy Paneer Supreme Burger", description="Thick panko-crusted cottage cheese patty, creamy thousand island spread, crunchy iceberg lettuce & melted cheese slice.", price=149, image_url="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80", tags="Crispy Patty, Bestseller", is_bestseller=True),
        MenuItem(category=cat_burger, name="Double Cheese Smash Veggie Burger", description="Golden spiced potato-peas herb patty, double cheddar cheese slices, pickled gherkins & signature cafe sauce in a toasted brioche bun.", price=129, image_url="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80", tags="Double Cheese, Value Pick", is_bestseller=True),
        MenuItem(category=cat_burger, name="Peri-Peri Crispy Chicken Zinger", description="Juicy fried chicken breast fillet coated in fiery peri-peri crunch with house ranch sauce and pickles.", price=179, image_url="https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80", tags="Non-Veg, Crunchy Zinger", is_bestseller=True),
        MenuItem(category=cat_burger, name="Garlic Butter Mushroom Melt Burger", description="Butter-sauteed garlic mushrooms, melted Swiss cheese, crisp caramelized onions & herb mayo.", price=159, image_url="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80", tags="Gourmet, Cheesy", is_bestseller=False),

        # Cold Coffee
        MenuItem(category=cat_cold, name="Classic Creamy Cafe Frappe", description="Bold double espresso shot blended with vanilla cream, rich chilled milk and crushed ice, topped with dark cocoa powder.", price=129, image_url="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80", tags="Chilled, Cafe Classic", is_bestseller=True),
        MenuItem(category=cat_cold, name="Hazelnut Iced Cold Coffee", description="Slow-roasted espresso with roasted hazelnut syrup, chilled thick milk and Hershey's chocolate drizzle.", price=149, image_url="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80", tags="Nutty Hazelnut, Top Rated", is_bestseller=True),
        MenuItem(category=cat_cold, name="Belgian Dark Chocolate Thickshake", description="Thick gourmet milkshake made with pure Belgian cocoa, vanilla ice cream scoop, and chocolate fudge.", price=169, image_url="https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80", tags="Thickshake, Pure Belgian", is_bestseller=True),
        MenuItem(category=cat_cold, name="KitKat & Oreo Crumble Shake", description="Loaded thickshake blended with crunchy Oreo biscuits, crushed KitKat fingers and topped with whipped cream.", price=179, image_url="https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80", tags="Loaded Sweet Tooth, Must Try", is_bestseller=True),
        MenuItem(category=cat_cold, name="Caramel Biscoff Iced Frappe", description="Espresso blended with Lotus Biscoff biscuit spread, creamy vanilla milk, crowned with crunchy biscuit crumbs.", price=169, image_url="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80", tags="Biscoff Crunch, Trending", is_bestseller=False),

        # Sandwiches
        MenuItem(category=cat_sandwich, name="Bombay Masala Club Grilled Sandwich", description="Triple-decker sandwich loaded with spiced potato masala, sliced cucumbers, tomatoes, mint chutney & melted cheese.", price=119, image_url="https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80", tags="Desi Favorite, Crispy", is_bestseller=True),
        MenuItem(category=cat_sandwich, name="Cheesy Corn & Spinach Grilled Sandwich", description="Golden sweet corn kernels tossed with baby spinach, garlic cream and mozzarella in butter-toasted jumbo bread.", price=139, image_url="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80", tags="Super Cheesy, Healthy Twist", is_bestseller=False),
        MenuItem(category=cat_sandwich, name="Tandoori Paneer Tikka Panini", description="Charcoal-spiced cottage cheese cubes, bell peppers, mint mayo grilled crisp inside Italian herb focaccia bread.", price=159, image_url="https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80", tags="Tandoori Fusion, Bestseller", is_bestseller=True),
        MenuItem(category=cat_sandwich, name="Smoky Chicken Mayo Toastie", description="Shredded herb chicken breast, garlic mayo, cheese slice grilled golden in buttered artisanal sourdough.", price=169, image_url="https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=800&q=80", tags="Non-Veg, High Protein", is_bestseller=True),

        # Sides
        MenuItem(category=cat_sides, name="Peri-Peri Crinkle French Fries", description="Golden fried crinkle-cut potatoes generously dusted with African bird's eye peri-peri spice. Served with cheesy dip.", price=99, image_url="https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80", tags="Crispy Crunch, Spicy Dip", is_bestseller=True),
        MenuItem(category=cat_sides, name="Loaded Cheesy Mexican Nachos", description="Crispy corn tortilla chips smothered in warm cheese sauce, tomato salsa, refried beans & spicy jalapenos.", price=149, image_url="https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80", tags="Party Platter, Cheese Dip", is_bestseller=True),
        MenuItem(category=cat_sides, name="Cheesy Stuffed Garlic Bread", description="Freshly baked baguette stuffed with mozzarella, sweet corn and oregano garlic butter. Served with dip.", price=139, image_url="https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=800&q=80", tags="Garlic Butter, Pull Apart", is_bestseller=True),

        # Hot Brews
        MenuItem(category=cat_hot, name="Velvety Cappuccino with Foam Art", description="Rich espresso shot topped with velvety steamed whole milk foam and dusted with aromatic cinnamon.", price=99, image_url="https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80", tags="Barista Art, Steaming", is_bestseller=True),
        MenuItem(category=cat_hot, name="Cafe Mocha with Belgian Cocoa", description="Rich espresso layered with Belgian dark chocolate ganache and warm steamed milk with whipped swirl.", price=129, image_url="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80", tags="Rich Chocolate, Warm", is_bestseller=False),
        MenuItem(category=cat_hot, name="Traditional Kullad Masala Chai", description="Freshly brewed Assam tea leaves infused with crushed ginger, green cardamom and whole spices in a rustic clay cup.", price=69, image_url="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80", tags="Desi Kulhad, Ginger Spice", is_bestseller=True),

        # Desserts
        MenuItem(category=cat_desserts, name="Sizzling Choco Brownie with Ice Cream", description="Warm walnut fudge brownie served on a sizzling hot cast-iron plate with melting vanilla scoop & dark chocolate drizzle.", price=169, image_url="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80", tags="Sizzling Hot, Must Try", is_bestseller=True),
        MenuItem(category=cat_desserts, name="Belgian Nutella Waffle with Roasted Nuts", description="Crisp golden waffle drizzled generously with warm Nutella spread, chocolate chips and roasted crushed almonds.", price=189, image_url="https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=80", tags="Nutella Overload, Freshly Baked", is_bestseller=True),
    ]

    MenuItem.objects.bulk_create(menu_items)
    print(f"Created {len(menu_items)} delicious cafe menu items!")

    print("Creating Sample Reviews...")
    reviews = [
        Review(customer_name="Aarav Sharma", rating=5, comment="Best Paneer Makhani Pizza in town! The cheese burst crust was dripping with mozzarella. Their Classic Frappe is equally good.", is_featured=True),
        Review(customer_name="Pooja Verma", rating=5, comment="Loved the Crispy Paneer Burger and Peri-Peri fries. Cozy vibes and free Wi-Fi made our working afternoon so pleasant.", is_featured=True),
        Review(customer_name="Rohan Malik", rating=5, comment="The Sizzling Brownie with ice cream was heavenly. Great coffee, prompt table service, and very reasonable pricing.", is_featured=True)
    ]
    Review.objects.bulk_create(reviews)

    print("Done seeding Cafe database!")

if __name__ == '__main__':
    seed()
