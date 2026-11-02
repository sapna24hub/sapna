import random
import string
from django.db import models


def generate_booking_code():
    chars = ''.join(random.choices(string.digits, k=4))
    return f"BNB-{chars}"


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    icon = models.CharField(max_length=50, default='coffee')
    description = models.TextField(blank=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['display_order', 'name']

    def __str__(self):
        return self.name


class MenuItem(models.Model):
    category = models.ForeignKey(Category, related_name='items', on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    literary_pairing = models.CharField(max_length=200, blank=True, help_text="e.g. Pairs with: 'The Great Gatsby'")
    image_url = models.URLField(max_length=500, blank=True)
    tags = models.CharField(max_length=200, blank=True, help_text="Comma-separated tags e.g. Vegan, Barista Pick, GF")
    calories = models.CharField(max_length=50, blank=True)
    is_bestseller = models.BooleanField(default=False)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-is_bestseller', 'name']

    def __str__(self):
        return f"{self.name} (${self.price})"


class Reservation(models.Model):
    NOOK_CHOICES = [
        ('window_nook', 'Window Reading Nook (Natural Daylight)'),
        ('armchair_corner', 'Vintage Leather Armchair Corner'),
        ('fireplace_hearth', 'Cozy Fireplace Hearth'),
        ('library_wall', 'The Grand Library Bookshelf Table'),
        ('sunlit_patio', 'Quiet Sunlit Garden Patio'),
        ('community_table', 'Community Wooden Study Table'),
    ]

    STATUS_CHOICES = [
        ('confirmed', 'Confirmed'),
        ('pending', 'Pending Review'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    booking_code = models.CharField(max_length=20, unique=True, default=generate_booking_code)
    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    date = models.DateField()
    time = models.CharField(max_length=20)
    guests_count = models.PositiveIntegerField(default=2)
    nook_preference = models.CharField(max_length=50, choices=NOOK_CHOICES, default='window_nook')
    special_notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='confirmed')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date', '-created_at']

    def __str__(self):
        return f"{self.booking_code} - {self.full_name} ({self.date} {self.time})"


class Review(models.Model):
    author_name = models.CharField(max_length=120)
    author_role = models.CharField(max_length=150, blank=True, help_text="e.g. Literary Enthusiast, Local Author")
    rating = models.PositiveIntegerField(default=5)
    comment = models.TextField()
    favorite_item = models.CharField(max_length=150, blank=True)
    book_recommendation = models.CharField(max_length=200, blank=True)
    avatar_url = models.URLField(max_length=500, blank=True)
    is_featured = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.author_name} ({self.rating} stars)"


class ContactMessage(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Message from {self.name} - {self.subject or 'General Inquiry'}"


class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
