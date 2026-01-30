import { motion } from 'framer-motion';

const PhotoCard = ({ photo, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      onClick={() => onClick && onClick(photo)}
    >
      <div className="relative h-64 bg-gray-200">
        {photo.image ? (
          <img 
            src={photo.image} 
            alt={photo.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-6xl">
            🖼️
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h4 className="font-semibold text-gray-800 mb-1 truncate">
          {photo.title}
        </h4>
        {photo.description && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {photo.description}
          </p>
        )}
        <div className="flex items-center justify-between text-xs text-gray-500">
          {photo.location && (
            <span className="flex items-center">
              📍 {photo.location}
            </span>
          )}
          {photo.date_taken && (
            <span>📅 {new Date(photo.date_taken).toLocaleDateString()}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PhotoCard;
