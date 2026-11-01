import os
from decimal import Decimal
from datetime import date, timedelta
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import Category, Consultant, Service, Booking, BookingItem, Review, ServiceLocation

class Command(BaseCommand):
    help = "Seed database with beauty parlour services, home consultants, reviews, and sample bookings"

    def handle(self, *args, **options):
        self.stdout.write("Seeding data...")

        # 1. Create Superuser if not exists
        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser("admin", "admin@glowaura.com", "admin123")
            self.stdout.write(self.style.SUCCESS("Created admin user: admin / admin123"))

        # 2. Categories
        categories_data = [
            {
                "name": "Facial & Skin Care",
                "slug": "facial-skin-care",
                "description": "Deep cleanse, dermaplaning, brightening & rejuvenating anti-aging facials at home.",
                "icon": "Sparkles",
                "image_url": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
                "order": 1
            },
            {
                "name": "Hair Care & Styling",
                "slug": "hair-care-styling",
                "description": "Spa treatments, keratin nourishment, root touch-ups & salon-grade blowdry.",
                "icon": "Scissors",
                "image_url": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80",
                "order": 2
            },
            {
                "name": "Waxing & Threading",
                "slug": "waxing-threading",
                "description": "Painless RICA chocolate wax, cartridge waxing & precise facial threading.",
                "icon": "Flame",
                "image_url": "https://images.unsplash.com/photo-1512290900672-1f49633e7d56?auto=format&fit=crop&w=600&q=80",
                "order": 3
            },
            {
                "name": "Manicure & Pedicure",
                "slug": "manicure-pedicure",
                "description": "Rose petal spa, detox salt scrub, cuticle therapy & gel lacquer finish.",
                "icon": "Heart",
                "image_url": "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80",
                "order": 4
            },
            {
                "name": "Bridal & Party Makeovers",
                "slug": "bridal-party-makeovers",
                "description": "HD Airbrush bridal glam, engagement styling, party looks with trial.",
                "icon": "Crown",
                "image_url": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80",
                "order": 5
            },
            {
                "name": "Body Spa & Polishing",
                "slug": "body-spa-polishing",
                "description": "Full body lavender exfoliation, deep tissue herbal massage, glowing skin wrap.",
                "icon": "Sun",
                "image_url": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
                "order": 6
            }
        ]

        cat_objs = {}
        for c in categories_data:
            obj, _ = Category.objects.get_or_create(
                slug=c["slug"],
                defaults={
                    "name": c["name"],
                    "description": c["description"],
                    "icon": c["icon"],
                    "image_url": c["image_url"],
                    "order": c["order"]
                }
            )
            cat_objs[c["slug"]] = obj

        # 3. Home Consultants
        consultants_data = [
            {
                "name": "Pooja Sharma",
                "role": "Senior Aesthetician & Skin Consultant",
                "phone": "+91 98112 34567",
                "photo_url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
                "rating": Decimal("4.95"),
                "total_reviews": 340,
                "total_consultations": 1120,
                "experience_years": 8,
                "bio": "Certified by CIDESCO with 8+ years in clinical facials, skin barrier repair, and bridal preparation.",
                "current_lat": 28.6180,
                "current_lng": 77.2120,
                "vehicle_info": "Honda Activa • Sanitized Medical Grade Kit"
            },
            {
                "name": "Meera Patel",
                "role": "Celebrity Hair Stylist & Trichologist",
                "phone": "+91 98223 45678",
                "photo_url": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
                "rating": Decimal("4.92"),
                "total_reviews": 280,
                "total_consultations": 940,
                "experience_years": 6,
                "bio": "Specialist in organic hair spas, frizz control, balayage consultation, and scalp therapy.",
                "current_lat": 28.6250,
                "current_lng": 77.2200,
                "vehicle_info": "Jupiter Scooter • Heat Styling Travel Station"
            },
            {
                "name": "Ananya Sen",
                "role": "Bridal Makeup Artist & Glow Specialist",
                "phone": "+91 98334 56789",
                "photo_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
                "rating": Decimal("4.98"),
                "total_reviews": 410,
                "total_consultations": 1380,
                "experience_years": 9,
                "bio": "Master of HD makeup, skin tone matching, and flawless festive glam tailored to individual lighting.",
                "current_lat": 28.6100,
                "current_lng": 77.2050,
                "vehicle_info": "Swift Car • Ring Light & Vanity Case"
            },
            {
                "name": "Sunita Verma",
                "role": "Mani-Pedi & Body Wellness Therapist",
                "phone": "+91 98445 67890",
                "photo_url": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
                "rating": Decimal("4.88"),
                "total_reviews": 195,
                "total_consultations": 760,
                "experience_years": 5,
                "bio": "Aroma reflexology specialist with gentle hand and foot treatment mastery.",
                "current_lat": 28.6300,
                "current_lng": 77.2150,
                "vehicle_info": "Electric Scooter • Disposable Tub Liners"
            }
        ]

        consultant_objs = []
        for c in consultants_data:
            c_obj, _ = Consultant.objects.get_or_create(
                name=c["name"],
                defaults=c
            )
            consultant_objs.append(c_obj)

        # 4. Services
        services_data = [
            # Facial
            {
                "category": cat_objs["facial-skin-care"],
                "name": "24K Gold Luxury Radiance Facial",
                "description": "Infused with colloidal gold and botanical antioxidants. Stimulates collagen, revitalizes tired skin, and leaves an unmistakable luminous glow.",
                "duration_minutes": 60,
                "price": Decimal("1499.00"),
                "discounted_price": Decimal("1199.00"),
                "image_url": "https://images.unsplash.com/photo-1512290903080-60b54e7d4fd9?auto=format&fit=crop&w=600&q=80",
                "benefits": "Instant brightening, Anti-aging boost, Pore detox, Velvet soft texture",
                "includes": "Cleansing milk, Gold scrub, Steam, Blackhead extraction, Massage with 24K serum, Gold peel-off mask, SPF hydration",
                "is_popular": True
            },
            {
                "category": cat_objs["facial-skin-care"],
                "name": "O3+ Bridal Glow Deep Oxygen Facial",
                "description": "High-end clinical oxygen infusion for pigmented, dull, or sun-tanned skin. Delivers instant photo-ready clarity.",
                "duration_minutes": 75,
                "price": Decimal("2299.00"),
                "discounted_price": Decimal("1899.00"),
                "image_url": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
                "benefits": "De-tanning, Pigmentation lightening, Deep dermal hydration",
                "includes": "Whitening tonic, Melanin control scrub, Derm ozone steam, Rubber mask, Brightening ampoule",
                "is_popular": True
            },
            {
                "category": cat_objs["facial-skin-care"],
                "name": "Hydra-Dew Fruit Organic Clean-Up",
                "description": "Gentle organic fruit pulp treatment ideal for young, sensitive, or combination skin needing quick refreshed vitality.",
                "duration_minutes": 40,
                "price": Decimal("799.00"),
                "discounted_price": Decimal("599.00"),
                "image_url": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80",
                "benefits": "Natural fruit AHA glow, Cooling calamine mask, Oil-balancing",
                "includes": "Papaya clean-up, Aloe-vera cooling mist, Gentle scrub, Clay pack",
                "is_popular": False
            },
            # Hair Care
            {
                "category": cat_objs["hair-care-styling"],
                "name": "Moroccan Argan Oil Intensive Hair Spa",
                "description": "Intense restorative treatment for dry, damaged, colored, or heat-styled hair. Deeply nourishes hair cuticles from root to tip.",
                "duration_minutes": 55,
                "price": Decimal("1599.00"),
                "discounted_price": Decimal("1299.00"),
                "image_url": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80",
                "benefits": "Eliminates frizz, Restores elasticity, High glossy shine",
                "includes": "Argan shampoo wash, Thermal heat cap steam, Scalp pressure point massage, Keratin smoothing serum",
                "is_popular": True
            },
            {
                "category": cat_objs["hair-care-styling"],
                "name": "Ammonia-Free Root Touch-up & Blowdry",
                "description": "100% grey coverage with organic L'Oreal Inoa ammonia-free color followed by bouncy volume blowdry.",
                "duration_minutes": 60,
                "price": Decimal("1199.00"),
                "discounted_price": Decimal("999.00"),
                "image_url": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80",
                "benefits": "Zero chemical odor, Gentle on scalp, 100% natural sheen",
                "includes": "Scalp skin barrier shield, Precision tint brush, Color lock shampoo, Heat-protect blowdry",
                "is_popular": False
            },
            # Waxing
            {
                "category": cat_objs["waxing-threading"],
                "name": "RICA White Chocolate Full Body Wax",
                "description": "Italian colophony-free liposoluble wax that is exceptionally gentle on delicate and sensitive skin. Prevents redness and ingrown hair.",
                "duration_minutes": 60,
                "price": Decimal("1999.00"),
                "discounted_price": Decimal("1599.00"),
                "image_url": "https://images.unsplash.com/photo-1512290900672-1f49633e7d56?auto=format&fit=crop&w=600&q=80",
                "benefits": "Less pain, No skin pulling, De-tanning effect, Up to 4 weeks hair-free",
                "includes": "Full arms + Full legs + Underarms + Pre-wax gel + Post-wax calming lotion",
                "is_popular": True
            },
            {
                "category": cat_objs["waxing-threading"],
                "name": "Facial Threading & Upper Lip Precision Combo",
                "description": "Flawlessly shaped eyebrows with organic cotton thread and smooth upper lip clearance.",
                "duration_minutes": 20,
                "price": Decimal("249.00"),
                "discounted_price": Decimal("199.00"),
                "image_url": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
                "benefits": "Sharp symmetry, Skin-friendly hypoallergenic thread",
                "includes": "Eyebrows shaping, Forehead, Upper lip, Aloe vera ice massage",
                "is_popular": False
            },
            # Mani Pedi
            {
                "category": cat_objs["manicure-pedicure"],
                "name": "Rose Petal & Himalayan Salt Spa Mani-Pedi",
                "description": "Relaxing warm soak infused with dried rose petals, pink Himalayan crystal salt, and essential oils to melt stress away.",
                "duration_minutes": 70,
                "price": Decimal("1699.00"),
                "discounted_price": Decimal("1349.00"),
                "image_url": "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80",
                "benefits": "Softens cracked heels, Cuticle repair, Relieves foot fatigue",
                "includes": "Disposable sanitized tub liner, Exfoliating foot scrub, Nail shaping, Cuticle massage, Nail polish of choice",
                "is_popular": True
            },
            # Bridal
            {
                "category": cat_objs["bridal-party-makeovers"],
                "name": "HD Glam Party Makeover with Hairdo & Draping",
                "description": "Perfect for weddings, cocktail nights, and festive celebrations. Waterproof HD base, subtle contouring, and customized designer hairstyle.",
                "duration_minutes": 90,
                "price": Decimal("3999.00"),
                "discounted_price": Decimal("3299.00"),
                "image_url": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80",
                "benefits": "16-hour transfer-proof wear, Photographic dimension, Mink-touch lashes",
                "includes": "Skin prep, MAC/Huda HD makeup, Eye drama & false lashes, Saree/Lehenga draping, Floral hairdo",
                "is_popular": True
            },
            {
                "category": cat_objs["bridal-party-makeovers"],
                "name": "Luxury Bridal Consultation & Pre-Bridal Glow Package",
                "description": "Comprehensive at-home consultant assessment. Custom 30-day skin regimen, glow facial, body polish, and full bridal trial.",
                "duration_minutes": 150,
                "price": Decimal("7999.00"),
                "discounted_price": Decimal("6499.00"),
                "image_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
                "benefits": "Personal bridal consultant, Comprehensive skin-prep roadmap, Personalized kit",
                "includes": "Skin analysis, Dermal brightening facial, Full body Ubtan polish, Makeup trial session",
                "is_popular": True
            },
            # Body Spa
            {
                "category": cat_objs["body-spa-polishing"],
                "name": "Lavender & Walnut Full Body Polishing Spa",
                "description": "Luxurious home retreat with crushed walnut shell micro-scrub and calming lavender body butter for silky smooth skin.",
                "duration_minutes": 80,
                "price": Decimal("2499.00"),
                "discounted_price": Decimal("1999.00"),
                "image_url": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
                "benefits": "Removes dead skin cells, Stimulates blood circulation, Deep relaxing scent",
                "includes": "Disposable bed sheet, Full body exfoliating scrub, Warm towel wipe-down, Hydrating lavender body butter wrap",
                "is_popular": False
            }
        ]

        created_services = []
        for s in services_data:
            svc_obj, _ = Service.objects.get_or_create(
                name=s["name"],
                defaults=s
            )
            created_services.append(svc_obj)

        # 5. Reviews
        reviews_data = [
            {
                "customer_name": "Rhea Kapoor",
                "rating": 5,
                "service_name": "24K Gold Luxury Radiance Facial",
                "comment": "Pooja was wonderful! She arrived exactly on time with a completely sealed, sanitized disposable kit. My skin was glowing the entire week for my sister's wedding!",
                "avatar_url": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
            },
            {
                "customer_name": "Sneha Roy",
                "rating": 5,
                "service_name": "HD Glam Party Makeover with Hairdo & Draping",
                "comment": "The live tracking feature was amazing! I could see Ananya moving right towards my apartment and knew exactly when she'd ring the bell. Makeup looked breathtaking in photos.",
                "avatar_url": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80"
            },
            {
                "customer_name": "Priyanka Verma",
                "rating": 5,
                "service_name": "Moroccan Argan Oil Intensive Hair Spa",
                "comment": "Meera's scalp massage was absolute heaven. So convenient having high-end parlour services at home without battling traffic. 10/10 recommended!",
                "avatar_url": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
            },
            {
                "customer_name": "Kavita Malhotra",
                "rating": 4,
                "service_name": "RICA White Chocolate Full Body Wax",
                "comment": "Very polite consultant and completely pain-free waxing. Cleaned up the room completely after the service. Very professional.",
                "avatar_url": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80"
            },
            {
                "customer_name": "Ayesha Khan",
                "rating": 5,
                "service_name": "Rose Petal & Himalayan Salt Spa Mani-Pedi",
                "comment": "Loved the tub liners and hygienic tools. The rose scent was so refreshing. Booking another appointment for my mother too!",
                "avatar_url": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
            }
        ]

        for r in reviews_data:
            Review.objects.get_or_create(
                customer_name=r["customer_name"],
                comment=r["comment"],
                defaults=r
            )

        # 6. Service Locations
        locations_data = [
            {"city": "New Delhi", "area_name": "Connaught Place & Central Delhi", "pincode": "110001", "estimated_arrival_minutes": 25},
            {"city": "New Delhi", "area_name": "South Extension & Defence Colony", "pincode": "110049", "estimated_arrival_minutes": 20},
            {"city": "New Delhi", "area_name": "Vasant Kunj & Green Park", "pincode": "110070", "estimated_arrival_minutes": 30},
            {"city": "New Delhi", "area_name": "Lajpat Nagar & Greater Kailash", "pincode": "110024", "estimated_arrival_minutes": 25},
            {"city": "Gurugram", "area_name": "Cyber City & Golf Course Road", "pincode": "122002", "estimated_arrival_minutes": 25},
            {"city": "Noida", "area_name": "Sector 18 & Sector 62", "pincode": "201301", "estimated_arrival_minutes": 30},
            {"city": "Mumbai", "area_name": "Bandra West & Khar", "pincode": "400050", "estimated_arrival_minutes": 25},
            {"city": "Bengaluru", "area_name": "Indiranagar & Koramangala", "pincode": "560038", "estimated_arrival_minutes": 25},
        ]

        for loc in locations_data:
            ServiceLocation.objects.get_or_create(
                pincode=loc["pincode"],
                defaults=loc
            )

        # 7. Create a Sample Active Booking for immediate Live Tracking showcase
        sample_ref = "GLOW-DEMO1"
        if not Booking.objects.filter(booking_ref=sample_ref).exists():
            demo_consultant = consultant_objs[0] # Pooja Sharma
            booking = Booking(
                booking_ref=sample_ref,
                customer_name="Aaradhya Saxena",
                customer_phone="+91 99887 76655",
                customer_email="aaradhya@example.com",
                customer_address="Flat 402, Royal Palms Residency, South Ext Part 2",
                city="New Delhi",
                pincode="110049",
                notes="Skin is slightly sensitive to retinol. Please bring hypoallergenic moisturizer.",
                scheduled_date=date.today(),
                time_slot="02:00 PM - 03:30 PM",
                consultant=demo_consultant,
                subtotal=Decimal("2498.00"),
                visit_fee=Decimal("0.00"),
                tax_amount=Decimal("449.64"),
                discount_amount=Decimal("100.00"),
                total_cost=Decimal("2847.64"),
                coupon_code="GLOW100",
                status="ON_THE_WAY",
                step_index=2, # On the way
                customer_lat=28.6139,
                customer_lng=77.2090,
                consultant_lat=28.6209,
                consultant_lng=77.2140,
                eta_minutes=14,
                last_status_message="Consultant Pooja Sharma is on her way to your home. Live GPS active."
            )
            booking.save()

            # Add sample items
            BookingItem.objects.create(
                booking=booking,
                service=created_services[0], # Gold Facial
                quantity=1,
                unit_price=created_services[0].effective_price
            )
            BookingItem.objects.create(
                booking=booking,
                service=created_services[3], # Moroccan Hair Spa
                quantity=1,
                unit_price=created_services[3].effective_price
            )

            self.stdout.write(self.style.SUCCESS(f"Created sample live tracking booking: {sample_ref}"))

        self.stdout.write(self.style.SUCCESS("Database seeded successfully with rich parlour data!"))
