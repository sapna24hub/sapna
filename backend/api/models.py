import uuid
from django.db import models
from django.utils import timezone

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, default='Sparkles')
    image_url = models.URLField(blank=True, max_length=500)
    order = models.IntegerField(default=0)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['order', 'name']

    def __str__(self):
        return self.name


class Consultant(models.Model):
    name = models.CharField(max_length=120)
    role = models.CharField(max_length=150, default="Senior Beauty & Aesthetic Consultant")
    phone = models.CharField(max_length=20, default="+91 98765 43210")
    photo_url = models.URLField(max_length=500)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=4.9)
    total_reviews = models.IntegerField(default=120)
    total_consultations = models.IntegerField(default=450)
    experience_years = models.IntegerField(default=5)
    bio = models.TextField(blank=True)
    is_available = models.BooleanField(default=True)
    current_lat = models.FloatField(default=28.6139) # default Delhi / sample coords
    current_lng = models.FloatField(default=77.2090)
    vehicle_info = models.CharField(max_length=100, default="Scooter - Sanitized Beauty Kit")

    def __str__(self):
        return f"{self.name} ({self.role})"


class Service(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='services')
    name = models.CharField(max_length=150)
    description = models.TextField()
    duration_minutes = models.IntegerField(default=45)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    discounted_price = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    image_url = models.URLField(max_length=500)
    benefits = models.TextField(blank=True, help_text="Comma-separated or bullet benefits")
    includes = models.TextField(blank=True, help_text="What's included in this service")
    is_popular = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - ₹{self.effective_price}"

    @property
    def effective_price(self):
        return self.discounted_price if self.discounted_price else self.price


class Booking(models.Model):
    STATUS_CHOICES = [
        ('CONFIRMED', 'Booking Confirmed'),
        ('ASSIGNED', 'Consultant Assigned'),
        ('ON_THE_WAY', 'Consultant On the Way'),
        ('ARRIVED', 'Arrived at Your Home'),
        ('IN_PROGRESS', 'Service in Progress'),
        ('COMPLETED', 'Service Completed'),
        ('CANCELLED', 'Cancelled'),
    ]

    booking_ref = models.CharField(max_length=32, unique=True, editable=False)
    customer_name = models.CharField(max_length=150)
    customer_phone = models.CharField(max_length=20)
    customer_email = models.EmailField(blank=True)
    customer_address = models.TextField()
    city = models.CharField(max_length=100, default="New Delhi")
    pincode = models.CharField(max_length=10)
    notes = models.TextField(blank=True)

    scheduled_date = models.DateField()
    time_slot = models.CharField(max_length=50)

    consultant = models.ForeignKey(Consultant, on_delete=models.SET_NULL, null=True, blank=True, related_name='bookings')
    
    # Financial breakdown
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    visit_fee = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    tax_amount = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    discount_amount = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    total_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    coupon_code = models.CharField(max_length=30, blank=True)

    # Status & Live Tracking
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='CONFIRMED')
    step_index = models.IntegerField(default=0) # 0 to 5
    consultant_lat = models.FloatField(default=28.6200)
    consultant_lng = models.FloatField(default=77.2150)
    customer_lat = models.FloatField(default=28.6139)
    customer_lng = models.FloatField(default=77.2090)
    eta_minutes = models.IntegerField(default=25)
    last_status_message = models.CharField(max_length=255, default="Booking received and confirmed.")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.booking_ref:
            # Generate readable reference like GLOW-8492
            short_id = uuid.uuid4().hex[:6].upper()
            self.booking_ref = f"GLOW-{short_id}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.booking_ref} - {self.customer_name} ({self.status})"


class BookingItem(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='items')
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    unit_price = models.DecimalField(max_digits=8, decimal_places=2)

    @property
    def total_price(self):
        return self.quantity * self.unit_price

    def __str__(self):
        return f"{self.service.name} x {self.quantity} for {self.booking.booking_ref}"


class Review(models.Model):
    customer_name = models.CharField(max_length=120)
    rating = models.IntegerField(default=5)
    service_name = models.CharField(max_length=150, default="Facial & Glow Treatment")
    comment = models.TextField()
    is_verified = models.BooleanField(default=True)
    avatar_url = models.URLField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.customer_name} - {self.rating}★"


class ServiceLocation(models.Model):
    city = models.CharField(max_length=100)
    area_name = models.CharField(max_length=150)
    pincode = models.CharField(max_length=10, unique=True)
    is_serviceable = models.BooleanField(default=True)
    estimated_arrival_minutes = models.IntegerField(default=30)

    def __str__(self):
        return f"{self.pincode} - {self.area_name}, {self.city}"


class Product(models.Model):
    CATEGORY_CHOICES = [
        ('SKINCARE', 'Skin Care & Serums'),
        ('HAIRCARE', 'Hair Care & Oils'),
        ('FACIAL_KITS', 'Home Facial & Bleach Kits'),
        ('BODY_BATH', 'Body Polishes & Scrubs'),
    ]

    name = models.CharField(max_length=180)
    brand = models.CharField(max_length=100, default="GlowAura Professional")
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='SKINCARE')
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2) # MRP
    discounted_price = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    size_or_weight = models.CharField(max_length=50, default="100 ml")
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=4.9)
    total_reviews = models.IntegerField(default=85)
    image_url = models.URLField(max_length=500)
    benefits = models.TextField(blank=True, help_text="Comma-separated benefits")
    in_stock = models.BooleanField(default=True)
    is_bestseller = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-is_bestseller', 'name']

    def __str__(self):
        return f"{self.brand} - {self.name} (Rs.{self.effective_price})"

    @property
    def effective_price(self):
        return self.discounted_price if self.discounted_price else self.price

