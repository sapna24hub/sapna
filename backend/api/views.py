from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
from .models import Category, MenuItem, Reservation, Review, ContactMessage, NewsletterSubscriber
from .serializers import (
    CategorySerializer,
    MenuItemSerializer,
    ReservationSerializer,
    ReviewSerializer,
    ContactMessageSerializer,
    NewsletterSerializer
)


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all().order_by('display_order', 'name')
    serializer_class = CategorySerializer


class MenuItemListView(generics.ListAPIView):
    serializer_class = MenuItemSerializer

    def get_queryset(self):
        queryset = MenuItem.objects.filter(is_available=True)
        category_slug = self.request.query_params.get('category')
        search = self.request.query_params.get('search')
        bestsellers_only = self.request.query_params.get('bestseller')

        if category_slug and category_slug != 'all':
            queryset = queryset.filter(category__slug=category_slug)
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) |
                Q(description__icontains=search) |
                Q(tags__icontains=search) |
                Q(literary_pairing__icontains=search)
            )
        if bestsellers_only in ['true', '1', 'True']:
            queryset = queryset.filter(is_bestseller=True)

        return queryset


class ReservationCreateListView(generics.ListCreateAPIView):
    queryset = Reservation.objects.all().order_by('-created_at')
    serializer_class = ReservationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        reservation = serializer.save()
        return Response({
            'success': True,
            'message': 'Table reserved successfully! We have sent a confirmation to your email.',
            'booking_code': reservation.booking_code,
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)


class ReviewCreateListView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        queryset = Review.objects.all().order_by('-created_at')
        featured_only = self.request.query_params.get('featured')
        if featured_only in ['true', '1']:
            queryset = queryset.filter(is_featured=True)
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        review = serializer.save(is_featured=True)
        return Response({
            'success': True,
            'message': 'Thank you for sharing your Books & Brews experience!',
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)


class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'success': True,
            'message': 'Thank you for reaching out! Our head barista and librarian team will get back to you soon.'
        }, status=status.HTTP_201_CREATED)


class NewsletterSubscribeView(APIView):
    def post(self, request):
        email = request.data.get('email', '').strip().lower()
        if not email or '@' not in email:
            return Response({'error': 'Please provide a valid email address.'}, status=status.HTTP_400_BAD_REQUEST)

        subscriber, created = NewsletterSubscriber.objects.get_or_create(email=email)
        if created:
            message = 'Welcome to the Books & Brews Literary Circle! Check your inbox for our seasonal reading guide & 10% off coupon.'
        else:
            message = "You're already subscribed to our Literary Circle! Happy reading!"
        
        return Response({'success': True, 'message': message}, status=status.HTTP_200_OK)


class CafeStatsView(APIView):
    def get(self, request):
        return Response({
            'cafe_name': 'Books & Brews',
            'tagline': 'Where Stories Meet Steaming Mugs',
            'total_books': '2,800+ Curated Volumes',
            'coffee_varieties': '18 Single-Origin & Blends',
            'happy_readers': '14,000+',
            'book_clubs_hosted': '120+',
            'hours_weekday': 'Mon – Fri: 7:00 AM – 9:00 PM',
            'hours_weekend': 'Sat – Sun: 8:00 AM – 10:00 PM',
            'address': '422 Paperbark Lane, Historic Old Town',
            'phone': '(555) 382-7397 (555-ET-READS)',
            'email': 'hello@booksandbrewscafe.com'
        })
