# Faculty Photo Album Website

A modern photo album web application for faculty members, featuring profile management and photo sharing capabilities. Built with React, Framer Motion, Tailwind CSS, and Django REST Framework.

## Features

- 👥 **Faculty Profiles**: View detailed profiles of faculty members with their information
- 📸 **Photo Gallery**: Browse and view photos/memories shared by faculty
- 🔍 **Search**: Search profiles by name, department, or designation
- 🎨 **Beautiful UI**: Modern, responsive design with smooth animations
- 🚀 **Fast Performance**: Built with React and Django REST API
- 📱 **Mobile Responsive**: Works seamlessly on all devices

## Tech Stack

### Frontend
- **React** - UI library
- **Framer Motion** - Smooth animations and transitions
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend
- **Django** - Web framework
- **Django REST Framework** - RESTful API
- **Pillow** - Image processing
- **SQLite** - Database (default, can be changed to PostgreSQL/MySQL)

## Project Structure

```
Dev1Ab/
├── backend/              # Django backend
│   ├── faculty_album/    # Django project settings
│   ├── profiles/         # Main app for profiles and photos
│   ├── media/           # User uploaded images
│   ├── manage.py
│   └── requirements.txt
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Create sample data (optional):
```bash
python manage.py create_sample_data
```

6. Create a superuser for admin access:
```bash
python manage.py createsuperuser
```

7. Start the Django development server:
```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
# Edit .env if needed to match your backend URL
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Usage

### Admin Panel
Access the Django admin at `http://localhost:8000/admin` to manage profiles and photos.

### API Endpoints

**Profiles:**
- `GET /api/profiles/` - List all profiles
- `GET /api/profiles/{id}/` - Get profile details
- `POST /api/profiles/` - Create profile
- `PUT /api/profiles/{id}/` - Update profile
- `GET /api/profiles/?search=query` - Search profiles

**Photos:**
- `GET /api/photos/` - List all photos
- `GET /api/photos/{id}/` - Get photo details
- `GET /api/photos/?profile={id}` - Get photos by profile
- `POST /api/photos/` - Upload photo
- `DELETE /api/photos/{id}/` - Delete photo

### Web Interface

1. **Home Page** - Browse all faculty profiles with search functionality
2. **Profile Detail** - View individual profile with all their photos
3. **Gallery** - Browse all photos from all faculty members

## Development

### Backend Development
```bash
cd backend
source venv/bin/activate
python manage.py runserver
```

### Frontend Development
```bash
cd frontend
npm run dev
```

### Building for Production

**Important Security Notes:**

⚠️ **Before deploying to production, you MUST:**

1. **Backend Security:**
   - Change `SECRET_KEY` to a strong random value stored in environment variables
   - Set `DEBUG = False`
   - Configure `ALLOWED_HOSTS` with your specific domains
   - Replace `CORS_ALLOW_ALL_ORIGINS = True` with specific `CORS_ALLOWED_ORIGINS`
   - Implement proper authentication (replace `AllowAny` permissions)
   - Use HTTPS in production
   - Set up proper database (PostgreSQL/MySQL)

2. **Frontend Security:**
   - Update `VITE_API_BASE_URL` in `.env` to your production API URL
   - Enable HTTPS
   - Configure proper CORS origins

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
- Configure production settings in `settings.py`
- Set up a production database (PostgreSQL recommended)
- Configure static and media file serving
- Use a production WSGI server like Gunicorn
- Set up SSL/TLS certificates

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.

## Contact

**Sadeeq (Abubakar Aminu)**
- LinkedIn: [Abubakar Aminu](https://linkedin.com/in/abubakar-aminu-886696263)
- Email: sitelive806@gmail.com
- Portfolio: [dev1ab.github.io/trial](https://dev1ab.github.io/trial/)

---

Made with ❤️ by Dev1Ab
