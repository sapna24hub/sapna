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
    cat_coffee = Category.objects.create(
        name="Artisan Coffee & Espresso",
        slug="artisan-coffee",
        icon="Coffee",
        description="Carefully sourced single-origin roasts, pulled on our antique copper La Marzocco machine.",
        display_order=1
    )
    cat_tea = Category.objects.create(
        name="Handcrafted Teas & Tisanes",
        slug="tea-and-infusions",
        icon="CupSoda",
        description="Whole-leaf organic teas and botanicals steeped to absolute aromatic precision.",
        display_order=2
    )
    cat_bakes = Category.objects.create(
        name="Fresh Hearth Pastries",
        slug="pastries-and-bakes",
        icon="Croissant",
        description="Baked fresh at 5:00 AM daily in our hearth with organic French butter and unbleached flours.",
        display_order=3
    )
    cat_bites = Category.objects.create(
        name="Literary Light Bites",
        slug="light-bites-and-brunch",
        icon="UtensilsCrossed",
        description="Wholesome tartines, melted cheeses, and warm soups made for unhurried readers.",
        display_order=4
    )
    cat_bundles = Category.objects.create(
        name="Book & Brew Combos",
        slug="bookstore-specials",
        icon="Sparkles",
        description="Signature pairings of literature, curated books, and artisanal comfort drinks.",
        display_order=5
    )

    print("Creating Menu Items...")
    menu_items = [
        # Coffee
        MenuItem(
            category=cat_coffee,
            name="Old Paperback Vanilla Cortado",
            description="Double shot of heirloom Ethiopian espresso cut with silky warm steamed oat milk, real Madagascar vanilla bean syrup, and dusted with cinnamon.",
            price=4.75,
            literary_pairing="Pairs with: 'The Catcher in the Rye' or reflective poetry",
            image_url="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
            tags="Barista Special, Vegan Option",
            calories="140 kcal",
            is_bestseller=True
        ),
        MenuItem(
            category=cat_coffee,
            name="Sherlock's Smoked Honey Latte",
            description="Dark roasted espresso, smoked wildflower mountain honey, steamed velvety whole milk, topped with a torched rosemary sprig.",
            price=5.75,
            literary_pairing="Pairs with: Classic Victorian mystery novels & detective fiction",
            image_url="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
            tags="House Signature, Customer Favorite",
            calories="210 kcal",
            is_bestseller=True
        ),
        MenuItem(
            category=cat_coffee,
            name="The Great Catsby Cold Drip",
            description="Slow 18-hour cold brew extraction infused with sweet orange peel, roasted cocoa nibs, and served over crystal-clear artisan ice.",
            price=5.25,
            literary_pairing="Pairs with: F. Scott Fitzgerald & 1920s American literature",
            image_url="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
            tags="Single Origin, Refreshing",
            calories="15 kcal",
            is_bestseller=False
        ),
        MenuItem(
            category=cat_coffee,
            name="Parchment & Dark Mocha Truffle",
            description="Single-origin Colombian espresso blended with melted 70% dark Belgian chocolate, steamed oat milk, and Maldon sea salt flakes.",
            price=6.00,
            literary_pairing="Pairs with: Gothic fantasy and stormy afternoon reading",
            image_url="https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=800&q=80",
            tags="Decadent, Barista Pick",
            calories="260 kcal",
            is_bestseller=True
        ),
        MenuItem(
            category=cat_coffee,
            name="Hemingway's Black Chemex Pour-Over",
            description="Bold, crisp-bodied Kenyan single origin with bright notes of dark blackberry, dried fig, and toasted cedarwood.",
            price=4.50,
            literary_pairing="Pairs with: 'The Old Man and the Sea' or travel diaries",
            image_url="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
            tags="Pure Pour-Over, Zero Sugar",
            calories="5 kcal",
            is_bestseller=False
        ),
        MenuItem(
            category=cat_coffee,
            name="Lavender Dream Flat White",
            description="Silky microfoam poured over double ristretto infused with organic French culinary lavender blossoms and crushed green cardamom.",
            price=5.50,
            literary_pairing="Pairs with: Romantic fiction & cozy Sunday mornings",
            image_url="https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80",
            tags="Floral, Barista Special",
            calories="160 kcal",
            is_bestseller=False
        ),

        # Teas
        MenuItem(
            category=cat_tea,
            name="Jane Austen's Earl Grey Cream",
            description="Loose-leaf Ceylon black tea scented with cold-pressed Italian bergamot, royal blue cornflowers, and a velvety drop of vanilla cream.",
            price=4.25,
            literary_pairing="Pairs with: 'Pride and Prejudice' & period drama reads",
            image_url="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
            tags="Organic, Best with a Biscuit",
            calories="45 kcal",
            is_bestseller=True
        ),
        MenuItem(
            category=cat_tea,
            name="Ceremonial Kyoto Matcha Latte",
            description="First-harvest ceremonial grade Uji matcha traditionally whisked with warm oat milk and lightly sweetened with organic amber agave.",
            price=5.50,
            literary_pairing="Pairs with: Haruki Murakami novels & quiet contemplation",
            image_url="https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80",
            tags="Superfood, Vegan",
            calories="120 kcal",
            is_bestseller=True
        ),
        MenuItem(
            category=cat_tea,
            name="Shakespearean Spiced Masala Chai",
            description="Slow-simmered Assam orthodox tea with crushed cinnamon bark, green cardamom, star anise, cloves, and spicy fresh ginger root.",
            price=4.75,
            literary_pairing="Pairs with: Historical epics and classic theatre folios",
            image_url="https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=800&q=80",
            tags="Warming, House Made Blend",
            calories="150 kcal",
            is_bestseller=False
        ),
        MenuItem(
            category=cat_tea,
            name="Midnight Reader Chamomile Tisane",
            description="Whole organic Egyptian chamomile flowers, sweet spearmint, calming lemongrass, and local clover honey.",
            price=4.00,
            literary_pairing="Pairs with: Bedtime reading & dream journals",
            image_url="https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80",
            tags="Caffeine-Free, Herbal, Soothing",
            calories="20 kcal",
            is_bestseller=False
        ),

        # Pastries & Bakes
        MenuItem(
            category=cat_bakes,
            name="Proust's Golden Almond Croissant",
            description="Double-baked flaky French laminated pastry filled with rich almond frangipane paste, topped with toasted flaked almonds and powdered snow.",
            price=4.95,
            literary_pairing="Pairs with: 'In Search of Lost Time' or any nostalgic French novel",
            image_url="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
            tags="Warm Hearth, Baked at 5 AM",
            calories="380 kcal",
            is_bestseller=True
        ),
        MenuItem(
            category=cat_bakes,
            name="Bookworm Blueberry & Lemon Scone",
            description="Buttery, crumbly Scottish golden scone packed with wild Maine blueberries, finished with tangy Meyer lemon glaze.",
            price=4.25,
            literary_pairing="Pairs with: Cozy English countryside mysteries",
            image_url="https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=800&q=80",
            tags="Vegetarian, House Recipe",
            calories="320 kcal",
            is_bestseller=False
        ),
        MenuItem(
            category=cat_bakes,
            name="Edgar Allan Poe Dark Cocoa Brownie",
            description="Rich, ultra-fudgy dark chocolate brownie infused with a splash of espresso and sprinkled with crunchy smoked sea salt.",
            price=4.50,
            literary_pairing="Pairs with: Gothic thrillers & psychological mysteries",
            image_url="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
            tags="Gluten-Free, Ultra Rich",
            calories="340 kcal",
            is_bestseller=True
        ),
        MenuItem(
            category=cat_bakes,
            name="Swedish Cardamom Cinnamon Scroll",
            description="Braided buttery cardamom yeast dough rolled with organic dark brown sugar, cinnamon butter, and Swedish pearl crystals.",
            price=4.75,
            literary_pairing="Pairs with: Nordic noir novels & winter mornings",
            image_url="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
            tags="House Favorite, Warm Spiced",
            calories="360 kcal",
            is_bestseller=False
        ),

        # Light Bites
        MenuItem(
            category=cat_bites,
            name="The Hobbit's Avocado Tartine",
            description="Thick slice of toasted artisan rustic sourdough, mashed Hass avocado, heirloom cherry tomatoes, sheep's milk feta, microgreens, and chili crisp.",
            price=8.75,
            literary_pairing="Pairs with: High fantasy, adventure novels, and healthy mornings",
            image_url="https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
            tags="Vegetarian, Healthy, Popular Brunch",
            calories="410 kcal",
            is_bestseller=True
        ),
        MenuItem(
            category=cat_bites,
            name="Truffled Fontina & Brioche Melt",
            description="Aged Italian Fontina and Gruyère cheese melted inside buttered brioche with caramelized sweet onions and aromatic white truffle oil.",
            price=9.50,
            literary_pairing="Pairs with: Modern philosophical essays & rainy afternoons",
            image_url="https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
            tags="Comfort Food, Melty & Decadent",
            calories="520 kcal",
            is_bestseller=True
        ),
        MenuItem(
            category=cat_bites,
            name="Velvet Tomato Bisque & Basil Crostini",
            description="Slow-roasted Roma tomatoes simmered with garlic confit, sweet cream, and fresh basil, served alongside warm grilled parmesan sourdough.",
            price=7.50,
            literary_pairing="Pairs with: Classic short stories & autumn afternoons",
            image_url="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
            tags="Vegetarian, Warm & Soulful",
            calories="290 kcal",
            is_bestseller=False
        ),

        # Bundles & Specials
        MenuItem(
            category=cat_bundles,
            name="Blind Date with a Book & Brew",
            description="A mystery handpicked bestseller wrapped in vintage brown kraft paper with handwritten genre hints, plus any handcrafted beverage of your choice.",
            price=14.50,
            literary_pairing="Includes a full physical book to take home forever!",
            image_url="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
            tags="Gift Item, Cafe Bestseller, Unique",
            calories="Varies",
            is_bestseller=True
        ),
        MenuItem(
            category=cat_bundles,
            name="Writer's Sanctuary Bottomless Pot & Pastry",
            description="Bottomless porcelain table pot of single-origin filter brew, paired with any fresh pastry from our morning glass display.",
            price=9.00,
            literary_pairing="Created for study sessions, laptop writers, and long conversations",
            image_url="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
            tags="Infinite Refills, Study Favorite",
            calories="Varies",
            is_bestseller=True
        )
    ]

    MenuItem.objects.bulk_create(menu_items)
    print(f"Created {len(menu_items)} menu items.")

    print("Creating Reviews...")
    reviews = [
        Review(
            author_name="Eleanor Vance",
            author_role="Historical Fiction Novelist",
            rating=5,
            comment="Books & Brews is pure magic. I drafted three entire chapters of my latest novel sitting in their window nook sipping the Smoked Honey Latte. The gentle jazz, the scent of vintage paperbacks, and the friendly baristas make it an irreplaceable second home.",
            favorite_item="Sherlock's Smoked Honey Latte",
            book_recommendation="'The Shadow of the Wind' by Carlos Ruiz Zafón",
            avatar_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
            is_featured=True
        ),
        Review(
            author_name="Marcus Vance-Lin",
            author_role="Architecture Student & Sketcher",
            rating=5,
            comment="The architectural warmth of this place is extraordinary. Between the exposed brick, floor-to-ceiling bookshelves, and the smell of roasting beans, there's no better spot to study or sketch. And that Almond Croissant is legitimately world class.",
            favorite_item="Proust's Golden Almond Croissant",
            book_recommendation="'Invisible Cities' by Italo Calvino",
            avatar_url="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
            is_featured=True
        ),
        Review(
            author_name="Sofia Rodriguez",
            author_role="Old Town Book Club Moderator",
            rating=5,
            comment="Our book club has gathered at the wooden community table every alternate Thursday for two years now. The staff always reserves our spot and has our Chemex pots ready. It feels like an extension of our own living room.",
            favorite_item="Jane Austen's Earl Grey Cream",
            book_recommendation="'A Gentleman in Moscow' by Amor Towles",
            avatar_url="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
            is_featured=True
        ),
        Review(
            author_name="Dr. Julian Croft",
            author_role="Philosophy Professor",
            rating=5,
            comment="In a world moving too quickly, Books & Brews is a deliberate refuge for slow contemplation. The 'Blind Date with a Book' bundle introduced me to a Japanese mystery novel I never would have picked up otherwise. Extraordinary concept executed with genuine soul.",
            favorite_item="Blind Date with a Book & Brew",
            book_recommendation="'Before the Coffee Gets Cold' by Toshikazu Kawaguchi",
            avatar_url="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
            is_featured=True
        ),
        Review(
            author_name="Maya & Dev Patel",
            author_role="Weekend Regulars",
            rating=5,
            comment="Sunday morning ritual: arrive at 8:30 AM, grab two velvet tomato bisques with avocado tartine, browse the new arrivals bookshelf, and enjoy uninterrupted quiet reading. The peaceful energy here resets our entire week.",
            favorite_item="The Hobbit's Avocado Tartine",
            book_recommendation="'The Midnight Library' by Matt Haig",
            avatar_url="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
            is_featured=True
        )
    ]
    Review.objects.bulk_create(reviews)
    print(f"Created {len(reviews)} reviews.")

    print("Creating sample reservations...")
    Reservation.objects.create(
        booking_code="BNB-7412",
        full_name="Cassandra Morales",
        email="cassandra@example.com",
        phone="555-019-2834",
        date="2026-11-02",
        time="10:30 AM",
        guests_count=2,
        nook_preference="window_nook",
        special_notes="Morning coffee study date with laptop",
        status="confirmed"
    )

    print("Seed completed successfully!")

if __name__ == '__main__':
    seed()
