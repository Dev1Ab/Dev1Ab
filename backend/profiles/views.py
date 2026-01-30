from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import FacultyProfile, Photo
from .serializers import (
    FacultyProfileSerializer, 
    FacultyProfileListSerializer,
    PhotoSerializer
)


class FacultyProfileViewSet(viewsets.ModelViewSet):
    """ViewSet for faculty profiles"""
    queryset = FacultyProfile.objects.all()
    permission_classes = [permissions.AllowAny]  # For demo purposes
    
    def get_serializer_class(self):
        if self.action == 'list':
            return FacultyProfileListSerializer
        return FacultyProfileSerializer
    
    def get_queryset(self):
        queryset = FacultyProfile.objects.all()
        
        # Search functionality
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(full_name__icontains=search) |
                Q(department__icontains=search) |
                Q(designation__icontains=search)
            )
        
        # Filter by department
        department = self.request.query_params.get('department', None)
        if department:
            queryset = queryset.filter(department__icontains=department)
        
        return queryset
    
    @action(detail=True, methods=['get'])
    def photos(self, request, pk=None):
        """Get all photos for a specific profile"""
        profile = self.get_object()
        photos = profile.photos.filter(is_public=True)
        serializer = PhotoSerializer(photos, many=True)
        return Response(serializer.data)


class PhotoViewSet(viewsets.ModelViewSet):
    """ViewSet for photos/memories"""
    queryset = Photo.objects.filter(is_public=True)
    serializer_class = PhotoSerializer
    permission_classes = [permissions.AllowAny]  # For demo purposes
    
    def get_queryset(self):
        queryset = Photo.objects.filter(is_public=True)
        
        # Filter by profile
        profile_id = self.request.query_params.get('profile', None)
        if profile_id:
            queryset = queryset.filter(profile_id=profile_id)
        
        return queryset

