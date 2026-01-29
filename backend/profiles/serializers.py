from rest_framework import serializers
from django.contrib.auth.models import User
from .models import FacultyProfile, Photo


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['id', 'profile', 'title', 'description', 'image', 'location', 
                  'date_taken', 'is_public', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']


class FacultyProfileSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)
    photo_count = serializers.SerializerMethodField()
    
    class Meta:
        model = FacultyProfile
        fields = ['id', 'user', 'full_name', 'email', 'department', 'designation', 
                  'bio', 'profile_picture', 'joined_date', 'phone', 'website',
                  'photos', 'photo_count', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at', 'joined_date']
    
    def get_photo_count(self, obj):
        return obj.photos.filter(is_public=True).count()


class FacultyProfileListSerializer(serializers.ModelSerializer):
    """Lighter serializer for listing profiles"""
    photo_count = serializers.SerializerMethodField()
    
    class Meta:
        model = FacultyProfile
        fields = ['id', 'full_name', 'email', 'department', 'designation', 
                  'profile_picture', 'photo_count']
    
    def get_photo_count(self, obj):
        return obj.photos.filter(is_public=True).count()
