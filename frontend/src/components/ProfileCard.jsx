import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProfileCard = ({ profile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
    >
      <Link to={`/profile/${profile.id}`}>
        <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500">
          {profile.profile_picture ? (
            <img 
              src={profile.profile_picture} 
              alt={profile.full_name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white text-6xl">
              👤
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            {profile.full_name}
          </h3>
          <p className="text-sm text-purple-600 font-medium mb-2">
            {profile.designation}
          </p>
          <p className="text-sm text-gray-600 mb-3">
            {profile.department}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>📧 {profile.email}</span>
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
              {profile.photo_count} photos
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProfileCard;
