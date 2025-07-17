import React from 'react';
import { Edit2, ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { Article } from '../types/Article';

interface ArticleViewProps {
  article: Article;
  onEdit: () => void;
  onBack: () => void;
}

const ArticleView: React.FC<ArticleViewProps> = ({ article, onEdit, onBack }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Articles</span>
        </button>
        
        <button
          onClick={onEdit}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Edit2 className="h-4 w-4" />
          <span>Edit Article</span>
        </button>
      </div>

      {/* Article Content */}
      <article className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Cover Image */}
        {article.coverImage && (
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        )}

        <div className="p-6 md:p-8">
          {/* Status Badge */}
          <div className="flex items-center justify-between mb-6">
            <span
              className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                article.published
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {article.published ? 'Published' : 'Draft'}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>By {article.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Published on {formatDate(article.createdAt)}</span>
            </div>
            {article.updatedAt !== article.createdAt && (
              <div className="flex items-center space-x-2">
                <span>• Updated {formatDate(article.updatedAt)}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  <Tag className="h-3 w-3" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          )}

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-em:text-gray-700"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </article>
    </div>
  );
};

export default ArticleView;