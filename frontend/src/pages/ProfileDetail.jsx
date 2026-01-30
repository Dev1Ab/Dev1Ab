import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { profileAPI, photoAPI } from '../services/api';
import PhotoCard from '../components/PhotoCard';

const ProfileDetail = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, [id]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const [profileRes, photosRes] = await Promise.all([
        profileAPI.getProfile(id),
        photoAPI.getProfilePhotos(id)
      ]);
      setProfile(profileRes.data);
      setPhotos(photosRes.data.results || photosRes.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-48 h-48 rounded-full overflow-hidden bg-white shadow-xl"
            >
              {profile.profile_picture ? (
                <img 
                  src={profile.profile_picture} 
                  alt={profile.full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-6xl">
                  👤
                </div>
              )}
            </motion.div>
            
            <div className="flex-1 text-center md:text-left">
              <motion.h1 
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                className="text-4xl font-bold mb-2"
              >
                {profile.full_name}
              </motion.h1>
              <motion.p 
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl mb-4"
              >
                {profile.designation} - {profile.department}
              </motion.p>
              {profile.bio && (
                <motion.p 
                  initial={{ x: -50 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg mb-4 max-w-2xl"
                >
                  {profile.bio}
                </motion.p>
              )}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {profile.email && (
                  <span className="flex items-center gap-2">
                    📧 {profile.email}
                  </span>
                )}
                {profile.phone && (
                  <span className="flex items-center gap-2">
                    📞 {profile.phone}
                  </span>
                )}
                {profile.website && (
                  <a 
                    href={profile.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:underline"
                  >
                    🌐 Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Photos Section */}
      <div className="container mx-auto px-4 py-12">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold text-gray-800 mb-8"
        >
          Photos & Memories ({photos.length})
        </motion.h2>
        
        {photos.length === 0 ? (
          <div className="text-center text-gray-600 py-12">
            <p className="text-xl">No photos uploaded yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PhotoCard 
                  photo={photo} 
                  onClick={setSelectedPhoto}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-4xl w-full bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={selectedPhoto.image} 
                  alt={selectedPhoto.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 bg-white text-gray-800 rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-gray-200"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedPhoto.title}
                </h3>
                {selectedPhoto.description && (
                  <p className="text-gray-600 mb-4">
                    {selectedPhoto.description}
                  </p>
                )}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {selectedPhoto.location && (
                    <span className="flex items-center gap-1">
                      📍 {selectedPhoto.location}
                    </span>
                  )}
                  {selectedPhoto.date_taken && (
                    <span className="flex items-center gap-1">
                      📅 {new Date(selectedPhoto.date_taken).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDetail;
