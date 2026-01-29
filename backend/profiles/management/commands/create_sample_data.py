from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from profiles.models import FacultyProfile, Photo
from datetime import date


class Command(BaseCommand):
    help = 'Creates sample data for faculty profiles'

    def handle(self, *args, **kwargs):
        # Clear existing data
        Photo.objects.all().delete()
        FacultyProfile.objects.all().delete()
        User.objects.all().delete()
        
        self.stdout.write('Creating sample data...')
        
        # Create sample users and profiles
        sample_data = [
            {
                'username': 'john_doe',
                'email': 'john.doe@university.edu',
                'full_name': 'Dr. John Doe',
                'department': 'Computer Science',
                'designation': 'Professor',
                'bio': 'Specializing in Machine Learning and Artificial Intelligence with 15 years of experience.',
                'phone': '+1 234 567 8900',
                'website': 'https://johndoe.com'
            },
            {
                'username': 'jane_smith',
                'email': 'jane.smith@university.edu',
                'full_name': 'Dr. Jane Smith',
                'department': 'Mathematics',
                'designation': 'Associate Professor',
                'bio': 'Expert in Applied Mathematics and Statistical Analysis.',
                'phone': '+1 234 567 8901',
                'website': 'https://janesmith.com'
            },
            {
                'username': 'robert_johnson',
                'email': 'robert.johnson@university.edu',
                'full_name': 'Prof. Robert Johnson',
                'department': 'Physics',
                'designation': 'Professor',
                'bio': 'Research focus on Quantum Mechanics and Particle Physics.',
                'phone': '+1 234 567 8902',
                'website': 'https://robertjohnson.com'
            },
            {
                'username': 'emily_brown',
                'email': 'emily.brown@university.edu',
                'full_name': 'Dr. Emily Brown',
                'department': 'Computer Science',
                'designation': 'Assistant Professor',
                'bio': 'Working on Cybersecurity and Network Systems.',
                'phone': '+1 234 567 8903',
                'website': 'https://emilybrown.com'
            },
            {
                'username': 'michael_davis',
                'email': 'michael.davis@university.edu',
                'full_name': 'Dr. Michael Davis',
                'department': 'Chemistry',
                'designation': 'Associate Professor',
                'bio': 'Organic Chemistry and Biochemistry researcher.',
                'phone': '+1 234 567 8904',
                'website': ''
            }
        ]
        
        for data in sample_data:
            # Create user
            user = User.objects.create_user(
                username=data['username'],
                email=data['email'],
                password='password123'
            )
            
            # Create profile
            profile = FacultyProfile.objects.create(
                user=user,
                full_name=data['full_name'],
                email=data['email'],
                department=data['department'],
                designation=data['designation'],
                bio=data['bio'],
                phone=data['phone'],
                website=data['website']
            )
            
            # Create sample photos for each profile
            photo_titles = [
                ('Annual Conference 2023', 'Great memories from the annual academic conference', 'San Francisco, CA'),
                ('Lab Research', 'Working on exciting new research projects', 'University Lab'),
                ('Team Meeting', 'Collaborative discussion with research team', 'Conference Room')
            ]
            
            for title, desc, location in photo_titles:
                Photo.objects.create(
                    profile=profile,
                    title=f"{title} - {profile.full_name}",
                    description=desc,
                    location=location,
                    date_taken=date.today(),
                    is_public=True
                )
            
            self.stdout.write(self.style.SUCCESS(f'Created profile: {profile.full_name}'))
        
        self.stdout.write(self.style.SUCCESS('Sample data created successfully!'))
