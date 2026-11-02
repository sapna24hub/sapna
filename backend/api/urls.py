from django.urls import path
from .views import (
    CategoryListView,
    MenuItemListView,
    ReservationCreateListView,
    ReviewCreateListView,
    ContactMessageCreateView,
    NewsletterSubscribeView,
    CafeStatsView
)

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('menu/', MenuItemListView.as_view(), name='menu-list'),
    path('reservations/', ReservationCreateListView.as_view(), name='reservation-create-list'),
    path('reviews/', ReviewCreateListView.as_view(), name='review-create-list'),
    path('contact/', ContactMessageCreateView.as_view(), name='contact-create'),
    path('newsletter/', NewsletterSubscribeView.as_view(), name='newsletter-subscribe'),
    path('stats/', CafeStatsView.as_view(), name='cafe-stats'),
]
