from django.urls import path
from .views import (
    CategoryListView, ServiceListView, ConsultantListView,
    BookingCreateView, BookingDetailView, BookingListView,
    BookingSimulateStepView, BookingUpdateStatusView,
    ReviewListCreateView, LocationCheckView, StatsView,
    ProductListView
)

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('services/', ServiceListView.as_view(), name='service-list'),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('consultants/', ConsultantListView.as_view(), name='consultant-list'),
    path('bookings/', BookingCreateView.as_view(), name='booking-create'),
    path('bookings/all/', BookingListView.as_view(), name='booking-list-all'),
    path('bookings/<str:booking_ref>/', BookingDetailView.as_view(), name='booking-detail'),
    path('bookings/<str:booking_ref>/simulate-step/', BookingSimulateStepView.as_view(), name='booking-simulate-step'),
    path('bookings/<str:booking_ref>/update-status/', BookingUpdateStatusView.as_view(), name='booking-update-status'),
    path('reviews/', ReviewListCreateView.as_view(), name='review-list-create'),
    path('locations/check/', LocationCheckView.as_view(), name='location-check'),
    path('stats/', StatsView.as_view(), name='stats-overview'),
]
