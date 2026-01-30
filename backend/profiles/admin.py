from django.contrib import admin
from .models import FacultyProfile, Photo


@admin.register(FacultyProfile)
class FacultyProfileAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email', 'department', 'designation', 'joined_date']
    list_filter = ['department', 'designation', 'joined_date']
    search_fields = ['full_name', 'email', 'department', 'designation']
    date_hierarchy = 'joined_date'


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ['title', 'profile', 'location', 'date_taken', 'is_public', 'created_at']
    list_filter = ['is_public', 'date_taken', 'created_at']
    search_fields = ['title', 'description', 'profile__full_name']
    date_hierarchy = 'created_at'

