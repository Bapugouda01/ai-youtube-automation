import api from './api';

export const projectService = {
  getProjects: () =>
    api.get('/projects'),

  getProject: (id) =>
    api.get(`/projects/${id}`),

  createProject: (data) =>
    api.post('/projects', data),

  updateProject: (id, data) =>
    api.put(`/projects/${id}`, data),

  deleteProject: (id) =>
    api.delete(`/projects/${id}`),

  duplicateProject: (id) =>
    api.post(`/projects/${id}/duplicate`),

  getProjectStatus: (id) =>
    api.get(`/projects/${id}/status`),

  updateProjectStatus: (id, data) =>
    api.put(`/projects/${id}/status`, data),
};

export const scriptService = {
  generateScript: (data) =>
    api.post('/scripts/generate', data),

  improveScript: (data) =>
    api.post('/scripts/improve', data),

  getScript: (projectId) =>
    api.get(`/scripts/${projectId}`),

  updateScript: (id, data) =>
    api.put(`/scripts/${id}`, data),

  getTemplates: () =>
    api.get('/scripts/templates/list'),

  generateVariations: (id, data) =>
    api.post(`/scripts/${id}/variations`, data),
};

export const videoService = {
  generateImage: (data) =>
    api.post('/videos/generate-image', data),

  generateVideo: (data) =>
    api.post('/videos/generate-video', data),

  generateVoiceover: (data) =>
    api.post('/videos/voiceover', data),

  generateSubtitles: (data) =>
    api.post('/videos/subtitles', data),

  combineVideoAssets: (projectId, data) =>
    api.post(`/videos/${projectId}/combine`, data),

  getPreview: (projectId) =>
    api.get(`/videos/${projectId}/preview`),

  getVideoStatus: (projectId) =>
    api.get(`/videos/${projectId}/status`),
};

export const uploadService = {
  uploadToYoutube: (data) =>
    api.post('/uploads/youtube', data),

  getUploadStatus: (videoId) =>
    api.get(`/uploads/youtube/status/${videoId}`),

  updateVideoMetadata: (videoId, data) =>
    api.put(`/uploads/youtube/${videoId}`, data),

  deleteYoutubeVideo: (videoId) =>
    api.delete(`/uploads/youtube/${videoId}`),

  uploadFile: (formData) =>
    api.post('/uploads/file', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  batchUpload: (data) =>
    api.post('/uploads/batch', data),
};

export const trendingService = {
  getTrendingTopics: (category = 'technology', limit = 10) =>
    api.get('/trending/topics', { params: { category, limit } }),

  getTrendingTopicsByCategory: (category, limit = 20) =>
    api.get(`/trending/topics/${category}`, { params: { limit } }),

  searchTopics: (query, limit = 10) =>
    api.post('/trending/topics/search', { query, limit }),

  getTrendingHashtags: (limit = 20) =>
    api.get('/trending/hashtags', { params: { limit } }),

  getTrendingHashtagsByCategory: (category, limit = 10) =>
    api.get(`/trending/hashtags/${category}`, { params: { limit } }),

  getCategoryAnalytics: (category) =>
    api.get(`/trending/analytics/category/${category}`),

  getHistoricalTrends: (days = 30) =>
    api.get('/trending/analytics/historical', { params: { days } }),

  saveTopic: (data) =>
    api.post('/trending/saved', data),

  getSavedTopics: () =>
    api.get('/trending/saved'),

  removeSavedTopic: (topicId) =>
    api.delete(`/trending/saved/${topicId}`),
};

export default {
  authService,
  projectService,
  scriptService,
  videoService,
  uploadService,
  trendingService,
};
