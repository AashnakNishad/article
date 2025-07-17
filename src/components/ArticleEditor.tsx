import React, { useState, useRef, useEffect } from 'react';
import { Bold, Italic, Image, Save, X, Eye, Tag } from 'lucide-react';
import { Article } from '../types/Article';
import ImageUpload from './ImageUpload';

interface ArticleEditorProps {
  article?: Article | null;
  onSave: (article: Article) => void;
  onCancel: () => void;
}

const ArticleEditor: React.FC<ArticleEditorProps> = ({ article, onSave, onCancel }) => {
  const [title, setTitle] = useState(article?.title || '');
  const [content, setContent] = useState(article?.content || '');
  const [author, setAuthor] = useState(article?.author || '');
  const [coverImage, setCoverImage] = useState(article?.coverImage || '');
  const [tags, setTags] = useState<string[]>(article?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [published, setPublished] = useState(article?.published || false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  const contentRef = useRef<HTMLDivElement>(null);

  const formatText = (command: string) => {
    document.execCommand(command, false);
    contentRef.current?.focus();
  };

  const insertImage = (imageUrl: string) => {
    if (contentRef.current) {
      const img = document.createElement('img');
      img.src = imageUrl;
      img.className = 'max-w-full h-auto rounded-lg my-4';
      img.style.maxHeight = '400px';
      
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.insertNode(img);
        range.collapse(false);
      } else {
        contentRef.current.appendChild(img);
      }
    }
    setShowImageUpload(false);
  };

  const handleContentChange = () => {
    if (contentRef.current) {
      setContent(contentRef.current.innerHTML);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim() || !author.trim()) {
      alert('Please fill in all required fields (title, content, author)');
      return;
    }

    const articleData: Article = {
      id: article?.id || Date.now().toString(),
      title: title.trim(),
      content,
      excerpt: content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
      coverImage,
      author: author.trim(),
      createdAt: article?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published,
      tags
    };

    onSave(articleData);
  };

  const generatePreviewContent = () => {
    return content.replace(/<[^>]*>/g, '').substring(0, 300) + '...';
  };

  useEffect(() => {
    if (contentRef.current && article) {
      contentRef.current.innerHTML = article.content;
    }
  }, [article]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Editor Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {article ? 'Edit Article' : 'Create New Article'}
            </h2>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Eye className="h-4 w-4" />
                <span>{showPreview ? 'Edit' : 'Preview'}</span>
              </button>
              <button
                onClick={onCancel}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>

        {showPreview ? (
          /* Preview Mode */
          <div className="p-6">
            <div className="max-w-3xl mx-auto">
              {coverImage && (
                <img
                  src={coverImage}
                  alt="Cover"
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{title || 'Untitled'}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
                <span>By {author || 'Unknown Author'}</span>
                <span>•</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: content || '<p>Start writing your article...</p>' }}
              />
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <div className="p-6">
            {/* Article Meta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter article title..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name..."
                />
              </div>
            </div>

            {/* Cover Image */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image URL
              </label>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
              {coverImage && (
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="mt-3 w-full h-48 object-cover rounded-lg"
                />
              )}
            </div>

            {/* Tags */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex items-center space-x-2 mb-3">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add a tag..."
                />
                <button
                  onClick={addTag}
                  className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Tag className="h-4 w-4" />
                  <span>Add</span>
                </button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span
                      key={tag}
                      className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      <span>{tag}</span>
                      <button
                        onClick={() => removeTag(tag)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Formatting Toolbar */}
            <div className="flex items-center space-x-2 mb-4 p-3 bg-gray-50 rounded-lg">
              <button
                onClick={() => formatText('bold')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                title="Bold"
              >
                <Bold className="h-4 w-4" />
              </button>
              <button
                onClick={() => formatText('italic')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                title="Italic"
              >
                <Italic className="h-4 w-4" />
              </button>
              <div className="w-px h-6 bg-gray-300 mx-2" />
              <button
                onClick={() => setShowImageUpload(true)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                title="Insert Image"
              >
                <Image className="h-4 w-4" />
              </button>
            </div>

            {/* Content Editor */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <div
                ref={contentRef}
                contentEditable
                onInput={handleContentChange}
                className="w-full min-h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent prose prose-lg max-w-none"
                style={{ outline: 'none' }}
                data-placeholder="Start writing your article..."
              />
            </div>

            {/* Publishing Options */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Publish immediately</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Image Upload Modal */}
      {showImageUpload && (
        <ImageUpload
          onImageSelect={insertImage}
          onClose={() => setShowImageUpload(false)}
        />
      )}
    </div>
  );
};

export default ArticleEditor;