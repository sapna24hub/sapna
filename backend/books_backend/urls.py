from django.contrib import admin
from django.urls import path, include

admin.site.site_header = "Books & Brews Cafe Administration"
admin.site.site_title = "Books & Brews Admin Portal"
admin.site.index_title = "Welcome to Books & Brews Management Portal"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
