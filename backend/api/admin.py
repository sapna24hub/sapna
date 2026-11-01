from django.contrib import admin
from .models import Category, Consultant, Service, Booking, BookingItem, Review, ServiceLocation, Product

class BookingItemInline(admin.TabularInline):
    model = BookingItem
    extra = 0

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'order')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Consultant)
class ConsultantAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'phone', 'rating', 'total_consultations', 'is_available')
    list_filter = ('is_available',)
    search_fields = ('name', 'role', 'phone')

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'discounted_price', 'duration_minutes', 'is_popular')
    list_filter = ('category', 'is_popular')
    search_fields = ('name', 'description')

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('booking_ref', 'customer_name', 'scheduled_date', 'time_slot', 'consultant', 'status', 'total_cost', 'created_at')
    list_filter = ('status', 'scheduled_date', 'city')
    search_fields = ('booking_ref', 'customer_name', 'customer_phone', 'customer_address')
    inlines = [BookingItemInline]

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('customer_name', 'rating', 'service_name', 'is_verified', 'created_at')
    list_filter = ('rating', 'is_verified')
    search_fields = ('customer_name', 'comment')

@admin.register(ServiceLocation)
class ServiceLocationAdmin(admin.ModelAdmin):
    list_display = ('pincode', 'area_name', 'city', 'is_serviceable', 'estimated_arrival_minutes')
    list_filter = ('city', 'is_serviceable')
    search_fields = ('pincode', 'area_name', 'city')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand', 'category', 'price', 'discounted_price', 'size_or_weight', 'in_stock', 'is_bestseller')
    list_filter = ('category', 'brand', 'in_stock', 'is_bestseller')
    search_fields = ('name', 'brand', 'description')
