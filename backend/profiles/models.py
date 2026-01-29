from django.db import models
from django.contrib.auth.models import User


class FacultyProfile(models.Model):
    """Model for faculty member profiles"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='faculty_profile')
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    department = models.CharField(max_length=100)
    designation = models.CharField(max_length=100)
    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    joined_date = models.DateField(auto_now_add=True)
    phone = models.CharField(max_length=20, blank=True)
    website = models.URLField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.full_name


class Photo(models.Model):
    """Model for photos/memories"""
    profile = models.ForeignKey(FacultyProfile, on_delete=models.CASCADE, related_name='photos')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='memories/')
    location = models.CharField(max_length=100, blank=True)
    date_taken = models.DateField(blank=True, null=True)
    is_public = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} - {self.profile.full_name}"
