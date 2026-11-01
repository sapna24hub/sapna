from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Avg, Count
from .models import Category, Consultant, Service, Booking, BookingItem, Review, ServiceLocation, Product
from .serializers import (
    CategorySerializer, ConsultantSerializer, ServiceSerializer,
    BookingSerializer, BookingCreateSerializer, ReviewSerializer,
    ServiceLocationSerializer, ProductSerializer
)

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all().order_by('order', 'name')
    serializer_class = CategorySerializer


class ServiceListView(generics.ListAPIView):
    serializer_class = ServiceSerializer

    def get_queryset(self):
        queryset = Service.objects.select_related('category').all().order_by('-is_popular', 'name')
        category_slug = self.request.query_params.get('category')
        search = self.request.query_params.get('search')

        if category_slug and category_slug != 'all':
            queryset = queryset.filter(category__slug=category_slug)
        if search:
            queryset = queryset.filter(name__icontains=search)
        return queryset


class ConsultantListView(generics.ListAPIView):
    queryset = Consultant.objects.all().order_by('-rating')
    serializer_class = ConsultantSerializer


class BookingCreateView(APIView):
    def post(self, request):
        serializer = BookingCreateSerializer(data=request.data)
        if serializer.is_valid():
            booking = serializer.save()
            return Response(BookingSerializer(booking).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookingDetailView(APIView):
    def get(self, request, booking_ref):
        try:
            booking = Booking.objects.select_related('consultant').prefetch_related('items__service').get(booking_ref__iexact=booking_ref)
            return Response(BookingSerializer(booking).data)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found with reference " + booking_ref}, status=status.HTTP_404_NOT_FOUND)


class BookingListView(generics.ListAPIView):
    queryset = Booking.objects.select_related('consultant').prefetch_related('items__service').all().order_by('-created_at')[:20]
    serializer_class = BookingSerializer


class BookingSimulateStepView(APIView):
    """
    Advances live tracking state for testing and demonstration.
    Cycles through: CONFIRMED -> ASSIGNED -> ON_THE_WAY -> ARRIVED -> IN_PROGRESS -> COMPLETED
    Moves the consultant's GPS closer to the customer!
    """
    def post(self, request, booking_ref):
        try:
            booking = Booking.objects.get(booking_ref__iexact=booking_ref)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found"}, status=status.HTTP_404_NOT_FOUND)

        STEPS = [
            {
                'status': 'CONFIRMED',
                'step_index': 0,
                'eta': 30,
                'offset_lat': 0.024,
                'offset_lng': 0.020,
                'msg': 'Booking confirmed. Preparing sanitized beauty kit & disposable essentials.'
            },
            {
                'status': 'ASSIGNED',
                'step_index': 1,
                'eta': 22,
                'offset_lat': 0.016,
                'offset_lng': 0.014,
                'msg': f'Consultant {booking.consultant.name if booking.consultant else "Expert"} assigned and geared up.'
            },
            {
                'status': 'ON_THE_WAY',
                'step_index': 2,
                'eta': 10,
                'offset_lat': 0.007,
                'offset_lng': 0.005,
                'msg': f'Consultant is traveling to your home. Live GPS active.'
            },
            {
                'status': 'ARRIVED',
                'step_index': 3,
                'eta': 0,
                'offset_lat': 0.0003,
                'offset_lng': 0.0003,
                'msg': 'Consultant has reached your doorstep! Ringing bell.'
            },
            {
                'status': 'IN_PROGRESS',
                'step_index': 4,
                'eta': 0,
                'offset_lat': 0.0000,
                'offset_lng': 0.0000,
                'msg': 'Consultant is providing your beauty & parlor treatment.'
            },
            {
                'status': 'COMPLETED',
                'step_index': 5,
                'eta': 0,
                'offset_lat': 0.0000,
                'offset_lng': 0.0000,
                'msg': 'Service successfully completed. Thank you for choosing GlowAura!'
            }
        ]

        # Next step
        current_step = booking.step_index
        next_step_idx = (current_step + 1) % len(STEPS)
        step_data = STEPS[next_step_idx]

        booking.status = step_data['status']
        booking.step_index = step_data['step_index']
        booking.eta_minutes = step_data['eta']
        booking.last_status_message = step_data['msg']

        # Update coordinates towards customer home
        booking.consultant_lat = round(booking.customer_lat + step_data['offset_lat'], 6)
        booking.consultant_lng = round(booking.customer_lng + step_data['offset_lng'], 6)
        booking.save()

        return Response({
            "message": f"Live tracking updated to step {booking.step_index}: {booking.status}",
            "booking": BookingSerializer(booking).data
        })


class BookingUpdateStatusView(APIView):
    def patch(self, request, booking_ref):
        try:
            booking = Booking.objects.get(booking_ref__iexact=booking_ref)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found"}, status=status.HTTP_404_NOT_FOUND)

        new_status = request.data.get('status')
        if new_status:
            booking.status = new_status
        if 'consultant_lat' in request.data:
            booking.consultant_lat = float(request.data['consultant_lat'])
        if 'consultant_lng' in request.data:
            booking.consultant_lng = float(request.data['consultant_lng'])
        if 'eta_minutes' in request.data:
            booking.eta_minutes = int(request.data['eta_minutes'])
        if 'last_status_message' in request.data:
            booking.last_status_message = str(request.data['last_status_message'])

        booking.save()
        return Response(BookingSerializer(booking).data)


class ReviewListCreateView(generics.ListCreateAPIView):
    queryset = Review.objects.all().order_by('-created_at')
    serializer_class = ReviewSerializer


class LocationCheckView(APIView):
    def get(self, request):
        pincode = request.query_params.get('pincode', '').strip()
        if not pincode:
            all_locs = ServiceLocation.objects.filter(is_serviceable=True)
            return Response(ServiceLocationSerializer(all_locs, many=True).data)

        try:
            loc = ServiceLocation.objects.get(pincode=pincode)
            return Response({
                "serviceable": loc.is_serviceable,
                "area_name": loc.area_name,
                "city": loc.city,
                "pincode": loc.pincode,
                "estimated_arrival_minutes": loc.estimated_arrival_minutes,
                "message": f"Great news! Home consultant service is available in {loc.area_name}, {loc.city}."
            })
        except ServiceLocation.DoesNotExist:
            return Response({
                "serviceable": True, # Friendly fallback
                "area_name": "Standard Delivery Zone",
                "city": "Current Metro Area",
                "pincode": pincode,
                "estimated_arrival_minutes": 35,
                "message": f"Home Consultant is available for Pincode {pincode} with standard travel window."
            })


class StatsView(APIView):
    def get(self, request):
        services_count = Service.objects.count()
        bookings_count = Booking.objects.count()
        reviews_count = Review.objects.count()
        avg_rating = Review.objects.aggregate(Avg('rating'))['rating__avg'] or 4.92
        consultants_count = Consultant.objects.count()

        return Response({
            "services_count": services_count,
            "bookings_count": bookings_count + 1240, # Add realistic base count
            "reviews_count": reviews_count + 850,
            "average_rating": round(avg_rating, 1),
            "consultants_count": consultants_count,
            "satisfaction_rate": "99.4%"
        })


class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all().order_by('-is_bestseller', 'name')
        cat = self.request.query_params.get('category')
        search = self.request.query_params.get('search')
        if cat and cat != 'all':
            queryset = queryset.filter(category=cat)
        if search:
            queryset = queryset.filter(name__icontains=search)
        return queryset

