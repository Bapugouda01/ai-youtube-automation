import React, { useState, useEffect } from 'react';
import { trendingService } from '../services/projects';
import { Button } from './ui/Button';
import { Alert, AlertDescription } from './ui/Alert';
import { AlertCircle, Trending2, Save } from 'lucide-react';

export default function TrendingTopics() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('technology');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedTopics, setSavedTopics] = useState([]);

  const categories = [
    'Technology',
    'Entertainment',
    'Business',
    'Health',
    'Science',
    'Sports',
    'Education',
  ];

  useEffect(() => {
    fetchTrendingTopics();
    fetchSavedTopics();
  }, [selectedCategory]);

  const fetchTrendingTopics = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await trendingService.getTrendingTopicsByCategory(
        selectedCategory
      );
      setTopics(response.data.topics || []);
    } catch (err) {
      setError('Failed to fetch trending topics');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSavedTopics = async () => {
    try {
      const response = await trendingService.getSavedTopics();
      setSavedTopics(response.data.topics || []);
    } catch (err) {
      console.error('Failed to fetch saved topics');
    }
  };

  const handleSearchTopics = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError('');
    try {
      const response = await trendingService.searchTopics(searchQuery);
      setTopics(response.data.topics || []);
    } catch (err) {
      setError('Failed to search topics');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTopic = async (topic) => {
    try {
      await trendingService.saveTopic({
        title: topic.title,
        category: selectedCategory,
        trendingData: topic,
      });
      fetchSavedTopics();
    } catch (err) {
      setError('Failed to save topic');
    }
  };

  const handleRemoveSavedTopic = async (topicId) => {
    try {
      await trendingService.removeSavedTopic(topicId);
      fetchSavedTopics();
    } catch (err) {
      setError('Failed to remove topic');
    }
  };

  const isTopicSaved = (topicTitle) =>
    savedTopics.some((t) => t.title === topicTitle);

  return (
    <div className="space-y-6">
      {error && (
        <Alert className="bg-red-900/20 border-red-500/50">
          <AlertCircle className="w-4 h-4" />
          <AlertDescription className="text-red-200">{error}</AlertDescription>
        </Alert>
      )}

      {/* Search Section */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Trending2 className="w-5 h-5 mr-2" />
          Search Topics
        </h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearchTopics()}
            placeholder="Search for topics..."
            className="flex-1 bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
          <Button
            onClick={handleSearchTopics}
            disabled={isLoading || !searchQuery.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Search
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-sm font-medium text-slate-300 mb-3">Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(cat)}
              size="sm"
              className={
                selectedCategory === cat
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'text-slate-300'
              }
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topics.map((topic, idx) => (
            <div
              key={idx}
              className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-blue-500 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-white font-semibold flex-1 pr-2">
                  {topic.title}
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    isTopicSaved(topic.title)
                      ? handleRemoveSavedTopic(topic.id)
                      : handleSaveTopic(topic)
                  }
                  className={
                    isTopicSaved(topic.title)
                      ? 'text-yellow-400'
                      : 'text-slate-400'
                  }
                >
                  <Save className="w-4 h-4" />
                </Button>
              </div>

              {topic.description && (
                <p className="text-slate-400 text-sm mb-3">
                  {topic.description}
                </p>
              )}

              <div className="flex gap-2 flex-wrap mb-3">
                {topic.tags?.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="px-2 py-1 bg-blue-900/30 text-blue-200 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {topic.trendingScore && (
                <div className="text-xs text-slate-400">
                  <p>Trending Score: {topic.trendingScore}/100</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {topics.length === 0 && !isLoading && (
        <div className="text-center py-12 text-slate-400">
          <Trending2 className="w-12 h-12 mx-auto mb-3 text-slate-500" />
          <p>No trending topics found</p>
        </div>
      )}

      {/* Saved Topics */}
      {savedTopics.length > 0 && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-4">
            Saved Topics
          </h3>
          <div className="space-y-2">
            {savedTopics.map((topic) => (
              <div
                key={topic.id}
                className="flex items-center justify-between p-3 bg-slate-700 rounded"
              >
                <div>
                  <p className="text-white font-medium">{topic.title}</p>
                  <p className="text-xs text-slate-400">{topic.category}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveSavedTopic(topic.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
