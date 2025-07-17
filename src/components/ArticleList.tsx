import React from 'react';
import { Edit2, Eye, Trash2, Calendar, User, Tag } from 'lucide-react';
import { Article } from '../types/Article';

interface ArticleListProps {
  articles: Article[];
  onEdit: (article: Article) => void;
  onView: (article: Article) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
}

const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  onEdit,
  onView,
  onDelete,
  onCreate
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Edit2 className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles yet</h3>
            <p className="text-gray-600 mb-6">
              Start creating amazing content by writing your first article.
            </p>
            <button
              onClick={onCreate}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Your First Article
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Articles</h2>
        <p className="text-gray-600">Manage and organize your published content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
          >
            {/* Cover Image */}
            {article.coverImage ? (
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <Edit2 className="h-12 w-12 text-blue-300" />
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    article.published
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {article.published ? 'Published' : 'Draft'}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {article.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {article.excerpt}
              </p>

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {article.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {article.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      +{article.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Meta Info */}
              <div className="flex items-center text-xs text-gray-500 mb-4 space-x-3">
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(article.createdAt)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onView(article)}
                    className="flex items-center space-x-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">View</span>
                  </button>
                  <button
                    onClick={() => onEdit(article)}
                    className="flex items-center space-x-1 px-3 py-1.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                    <span className="text-sm">Edit</span>
                  </button>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this article?')) {
                      onDelete(article.id);
                    }
                  }}
                  className="flex items-center space-x-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;