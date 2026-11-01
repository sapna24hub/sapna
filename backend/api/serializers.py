from rest_framework import serializers
from decimal import Decimal
from .models import Category, Consultant, Service, Booking, BookingItem, Review, ServiceLocation, Product

class CategorySerializer(serializers.ModelSerializer):
    services_count = serializers.IntegerField(source='services.count', read_only=True)
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'icon', 'image_url', 'order', 'services_count']


class ConsultantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultant
        fields = '__all__'


class ServiceSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    effective_price = serializers.ReadOnlyField()

    class Meta:
        model = Service
        fields = [
            'id', 'category', 'category_name', 'name', 'description',
            'duration_minutes', 'price', 'discounted_price', 'effective_price',
            'image_url', 'benefits', 'includes', 'is_popular'
        ]


class BookingItemSerializer(serializers.ModelSerializer):
    service_name = serializers.ReadOnlyField(source='service.name')
    service_image = serializers.ReadOnlyField(source='service.image_url')
    service_duration = serializers.ReadOnlyField(source='service.duration_minutes')

    class Meta:
        model = BookingItem
        fields = ['id', 'service', 'service_name', 'service_image', 'service_duration', 'quantity', 'unit_price', 'total_price']


class BookingSerializer(serializers.ModelSerializer):
    items = BookingItemSerializer(many=True, read_only=True)
    consultant = ConsultantSerializer(read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Booking
        fields = [
            'id', 'booking_ref', 'customer_name', 'customer_phone', 'customer_email',
            'customer_address', 'city', 'pincode', 'notes',
            'scheduled_date', 'time_slot', 'consultant',
            'subtotal', 'visit_fee', 'tax_amount', 'discount_amount', 'total_cost', 'coupon_code',
            'status', 'status_display', 'step_index',
            'consultant_lat', 'consultant_lng', 'customer_lat', 'customer_lng',
            'eta_minutes', 'last_status_message', 'created_at', 'updated_at',
            'items'
        ]


class CreateBookingItemSerializer(serializers.Serializer):
    service_id = serializers.IntegerField()
    quantity = serializers.IntegerField(default=1, min_value=1)


class BookingCreateSerializer(serializers.Serializer):
    customer_name = serializers.CharField(max_length=150)
    customer_phone = serializers.CharField(max_length=20)
    customer_email = serializers.EmailField(required=False, allow_blank=True)
    customer_address = serializers.CharField()
    city = serializers.CharField(default="New Delhi")
    pincode = serializers.CharField(max_length=10)
    notes = serializers.CharField(required=False, allow_blank=True)
    scheduled_date = serializers.DateField()
    time_slot = serializers.CharField(max_length=50)
    coupon_code = serializers.CharField(required=False, allow_blank=True)
    customer_lat = serializers.FloatField(required=False, default=28.6139)
    customer_lng = serializers.FloatField(required=False, default=77.2090)
    items = CreateBookingItemSerializer(many=True)

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        coupon_code = validated_data.get('coupon_code', '').strip().upper()

        # Calculate subtotal
        subtotal = Decimal('0.00')
        services_to_add = []

        for item in items_data:
            try:
                svc = Service.objects.get(id=item['service_id'])
                qty = item['quantity']
                price = svc.effective_price
                subtotal += (Decimal(str(price)) * qty)
                services_to_add.append((svc, qty, price))
            except Service.DoesNotExist:
                raise serializers.ValidationError(f"Service id {item['service_id']} not found.")

        # Home visit fee: Free if subtotal >= 499, otherwise ₹49
        visit_fee = Decimal('0.00') if subtotal >= Decimal('499.00') else Decimal('49.00')

        # Tax: 18% GST
        tax_amount = (subtotal * Decimal('0.18')).quantize(Decimal('0.01'))

        # Coupon Discount
        discount_amount = Decimal('0.00')
        if coupon_code == 'GLOW100':
            discount_amount = min(Decimal('100.00'), subtotal)
        elif coupon_code == 'GLOW20':
            discount_amount = (subtotal * Decimal('0.20')).quantize(Decimal('0.01'))
        elif coupon_code == 'FIRSTBEAUTY':
            discount_amount = min(Decimal('150.00'), subtotal)

        total_cost = subtotal + visit_fee + tax_amount - discount_amount
        if total_cost < 0:
            total_cost = Decimal('0.00')

        # Pick an available consultant automatically
        consultant = Consultant.objects.filter(is_available=True).order_by('?').first()

        cust_lat = validated_data.get('customer_lat', 28.6139)
        cust_lng = validated_data.get('customer_lng', 77.2090)

        # Consultant initial position (offset by ~2.5km)
        cons_lat = cust_lat + 0.022
        cons_lng = cust_lng + 0.018

        booking = Booking.objects.create(
            customer_name=validated_data['customer_name'],
            customer_phone=validated_data['customer_phone'],
            customer_email=validated_data.get('customer_email', ''),
            customer_address=validated_data['customer_address'],
            city=validated_data.get('city', 'New Delhi'),
            pincode=validated_data['pincode'],
            notes=validated_data.get('notes', ''),
            scheduled_date=validated_data['scheduled_date'],
            time_slot=validated_data['time_slot'],
            consultant=consultant,
            subtotal=subtotal,
            visit_fee=visit_fee,
            tax_amount=tax_amount,
            discount_amount=discount_amount,
            total_cost=total_cost,
            coupon_code=coupon_code,
            status='CONFIRMED',
            step_index=0,
            customer_lat=cust_lat,
            customer_lng=cust_lng,
            consultant_lat=cons_lat,
            consultant_lng=cons_lng,
            eta_minutes=25,
            last_status_message=f"Consultant {consultant.name if consultant else 'team'} scheduled for your home visit."
        )

        for svc, qty, price in services_to_add:
            BookingItem.objects.create(
                booking=booking,
                service=svc,
                quantity=qty,
                unit_price=price
            )

        return booking


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'customer_name', 'rating', 'service_name', 'comment', 'is_verified', 'avatar_url', 'created_at']


class ServiceLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceLocation
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    effective_price = serializers.ReadOnlyField()
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'brand', 'category', 'category_display', 'description',
            'price', 'discounted_price', 'effective_price', 'size_or_weight',
            'rating', 'total_reviews', 'image_url', 'benefits', 'in_stock',
            'is_bestseller', 'created_at'
        ]
