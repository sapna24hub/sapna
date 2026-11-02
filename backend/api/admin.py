from django.contrib import admin
from .models import Category, MenuItem, Reservation, Review, ContactMessage, NewsletterSubscriber


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'icon', 'display_order')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'is_bestseller', 'is_available', 'literary_pairing')
    list_filter = ('category', 'is_bestseller', 'is_available')
    search_fields = ('name', 'description', 'literary_pairing', 'tags')
    list_editable = ('price', 'is_bestseller', 'is_available')


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('booking_code', 'full_name', 'date', 'time', 'guests_count', 'nook_preference', 'status')
    list_filter = ('status', 'date', 'nook_preference')
    search_fields = ('booking_code', 'full_name', 'email', 'phone')
    list_editable = ('status',)
    readonly_fields = ('booking_code', 'created_at')


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('author_name', 'rating', 'author_role', 'favorite_item', 'is_featured', 'created_at')
    list_filter = ('rating', 'is_featured', 'created_at')
    search_fields = ('author_name', 'comment', 'book_recommendation')
    list_editable = ('is_featured',)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('created_at',)


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'created_at')
    search_fields = ('email',)
    readonly_fields = ('created_at',)
