import React, { useState, useEffect } from 'react';
import { PlusCircle, BookOpen, Edit3, LogOut, User } from 'lucide-react';
import ArticleEditor from './components/ArticleEditor';
import ArticleList from './components/ArticleList';
import ArticleView from './components/ArticleView';
import AuthForm from './components/AuthForm';
import { Article } from './types/Article';
import { useAuth } from './hooks/useAuth';
import { useArticles } from './hooks/useArticles';

function App() {
  const [currentView, setCurrentView] = useState<'list' | 'editor' | 'view'>('list');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [viewingArticle, setViewingArticle] = useState<Article | null>(null);
  const [showAuthForm, setShowAuthForm] = useState(false);

  const { user, loading: authLoading, signOut } = useAuth();
  const { articles, loading: articlesLoading, createArticle, updateArticle, deleteArticle } = useArticles();

  // Show auth form if user is not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      setShowAuthForm(true);
    } else {
      setShowAuthForm(false);
    }
  }, [user, authLoading]);

  const handleCreateNew = () => {
    setEditingArticle(null);
    setCurrentView('editor');
  };

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setCurrentView('editor');
  };

  const handleViewArticle = (article: Article) => {
    setViewingArticle(article);
    setCurrentView('view');
  };

  const handleSaveArticle = async (article: Article) => {
    try {
      if (editingArticle) {
        await updateArticle(editingArticle.id, article);
      } else {
        await createArticle(article);
      }
      setCurrentView('list');
      setEditingArticle(null);
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Failed to save article. Please try again.');
    }
  };

  const handleDeleteArticle = async (id: string) => {
    try {
      await deleteArticle(id);
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Failed to delete article. Please try again.');
    }
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setEditingArticle(null);
    setViewingArticle(null);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setCurrentView('list');
      setEditingArticle(null);
      setViewingArticle(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Show loading screen while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show auth form if user is not authenticated
  if (showAuthForm) {
    return <AuthForm onSuccess={() => setShowAuthForm(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Edit3 className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">ArticleHub</h1>
            </div>
            
            <nav className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="h-4 w-4" />
                <span className="text-sm">{user?.user_metadata?.full_name || user?.email}</span>
              </div>
              
              <button
                onClick={handleBackToList}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <BookOpen className="h-5 w-5" />
                <span>Articles</span>
              </button>
              
              <button
                onClick={handleCreateNew}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PlusCircle className="h-5 w-5" />
                <span>New Article</span>
              </button>
              
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {articlesLoading && currentView === 'list' ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading articles...</p>
          </div>
        ) : (
          <>
        {currentView === 'list' && (
          <ArticleList
            articles={articles}
            onEdit={handleEditArticle}
            onView={handleViewArticle}
            onDelete={(id) => {
              if (window.confirm('Are you sure you want to delete this article?')) {
                handleDeleteArticle(id);
              }
            }}
            onCreate={handleCreateNew}
          />
        )}
        
        {currentView === 'editor' && (
          <ArticleEditor
            article={editingArticle}
            onSave={handleSaveArticle}
            onCancel={handleBackToList}
          />
        )}
        
        {currentView === 'view' && viewingArticle && (
          <ArticleView
            article={viewingArticle}
            onEdit={() => handleEditArticle(viewingArticle)}
            onBack={handleBackToList}
          />
        )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;