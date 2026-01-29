import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { profileAPI } from '../services/api';
import ProfileCard from '../components/ProfileCard';

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await profileAPI.getAllProfiles();
      setProfiles(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      setError('Failed to load profiles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      fetchProfiles();
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const response = await profileAPI.searchProfiles(searchTerm);
      setProfiles(response.data.results || response.data);
    } catch (error) {
      console.error('Error searching profiles:', error);
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            className="text-5xl font-bold mb-4"
          >
            Faculty Photo Album
          </motion.h1>
          <motion.p 
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="text-xl mb-8"
          >
            Connect with our amazing faculty members and explore their memories
          </motion.p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, department, or designation..."
                className="flex-1 px-6 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition"
              >
                Search
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Profiles Grid */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full"
            />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-12">
            <p className="text-xl">{error}</p>
            <button 
              onClick={fetchProfiles}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Try Again
            </button>
          </div>
        ) : profiles.length === 0 ? (
          <div className="text-center text-gray-600 py-12">
            <p className="text-xl">No profiles found</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {profiles.map((profile, index) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProfileCard profile={profile} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;
