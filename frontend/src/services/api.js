import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const profileAPI = {
  getAllProfiles: () => api.get('/profiles/'),
  getProfile: (id) => api.get(`/profiles/${id}/`),
  createProfile: (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    return api.post('/profiles/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  updateProfile: (id, data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    return api.put(`/profiles/${id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  searchProfiles: (searchTerm) => api.get('/profiles/', { params: { search: searchTerm } }),
};

export const photoAPI = {
  getAllPhotos: () => api.get('/photos/'),
  getPhoto: (id) => api.get(`/photos/${id}/`),
  getProfilePhotos: (profileId) => api.get('/photos/', { params: { profile: profileId } }),
  createPhoto: (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    return api.post('/photos/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  deletePhoto: (id) => api.delete(`/photos/${id}/`),
};

export default api;
