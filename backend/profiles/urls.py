from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FacultyProfileViewSet, PhotoViewSet

router = DefaultRouter()
router.register(r'profiles', FacultyProfileViewSet, basename='profile')
router.register(r'photos', PhotoViewSet, basename='photo')

urlpatterns = [
    path('', include(router.urls)),
]
