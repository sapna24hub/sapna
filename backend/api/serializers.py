from rest_framework import serializers
from .models import Category, MenuItem, Reservation, Review, ContactMessage, NewsletterSubscriber


class MenuItemSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    category_slug = serializers.ReadOnlyField(source='category.slug')

    class Meta:
        model = MenuItem
        fields = [
            'id', 'category', 'category_name', 'category_slug',
            'name', 'description', 'price', 'literary_pairing',
            'image_url', 'tags', 'calories', 'is_bestseller',
            'is_available', 'created_at'
        ]


class CategorySerializer(serializers.ModelSerializer):
    items = MenuItemSerializer(many=True, read_only=True)
    item_count = serializers.IntegerField(source='items.count', read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'icon', 'description', 'display_order', 'item_count', 'items']


class ReservationSerializer(serializers.ModelSerializer):
    nook_display = serializers.CharField(source='get_nook_preference_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Reservation
        fields = [
            'id', 'booking_code', 'full_name', 'email', 'phone',
            'date', 'time', 'guests_count', 'nook_preference',
            'nook_display', 'special_notes', 'status', 'status_display', 'created_at'
        ]
        read_only_fields = ['id', 'booking_code', 'status', 'created_at']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            'id', 'author_name', 'author_role', 'rating', 'comment',
            'favorite_item', 'book_recommendation', 'avatar_url',
            'is_featured', 'created_at'
        ]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']


class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ['id', 'email', 'created_at']
        read_only_fields = ['id', 'created_at']
