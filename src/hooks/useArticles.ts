import { useState, useEffect } from 'react';
import { supabase, isDemo } from '../lib/supabase';
import { Article } from '../types/Article';
import { useAuth } from './useAuth';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Demo articles for when Supabase is not configured
  const demoArticles: Article[] = [
    {
      id: '1',
      title: 'Welcome to ArticleHub',
      content: '<p>This is a demo article showing the rich text editor capabilities. You can use <strong>bold</strong> and <em>italic</em> formatting, add images, and create beautiful content.</p><p>To get started with the full version, connect to Supabase using the button in the top right corner.</p>',
      excerpt: 'This is a demo article showing the rich text editor capabilities...',
      coverImage: 'https://images.pexels.com/photos/261909/pexels-photo-261909.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'Demo User',
      published: true,
      tags: ['demo', 'welcome'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];
  const fetchArticles = async () => {
    if (isDemo) {
      setArticles(demoArticles);
      setLoading(false);
      return;
    }

    if (!user) {
      setArticles([]);
      setLoading(false);
      return;
    }

    if (!supabase) {
      setError('Database not configured');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedArticles: Article[] = data.map(article => ({
        id: article.id,
        title: article.title,
        content: article.content,
        excerpt: article.excerpt || '',
        coverImage: article.cover_image || '',
        author: article.author,
        published: article.published,
        tags: article.tags || [],
        createdAt: article.created_at,
        updatedAt: article.updated_at,
      }));

      setArticles(formattedArticles);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch articles');
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const createArticle = async (article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (isDemo) {
      const newArticle: Article = {
        ...article,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setArticles(prev => [newArticle, ...prev]);
      return newArticle;
    }

    if (!user) throw new Error('User not authenticated');
    if (!supabase) throw new Error('Database not configured');

    try {
      const { data, error } = await supabase
        .from('articles')
        .insert({
          title: article.title,
          content: article.content,
          excerpt: article.excerpt,
          cover_image: article.coverImage,
          author: article.author,
          published: article.published,
          tags: article.tags,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      const newArticle: Article = {
        id: data.id,
        title: data.title,
        content: data.content,
        excerpt: data.excerpt || '',
        coverImage: data.cover_image || '',
        author: data.author,
        published: data.published,
        tags: data.tags || [],
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };

      setArticles(prev => [newArticle, ...prev]);
      return newArticle;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create article');
      throw err;
    }
  };

  const updateArticle = async (id: string, updates: Partial<Article>) => {
    if (isDemo) {
      const updatedArticle = { ...updates, id, updatedAt: new Date().toISOString() } as Article;
      setArticles(prev => prev.map(article => 
        article.id === id ? { ...article, ...updatedArticle } : article
      ));
      return updatedArticle;
    }

    if (!user) throw new Error('User not authenticated');
    if (!supabase) throw new Error('Database not configured');

    try {
      const { data, error } = await supabase
        .from('articles')
        .update({
          title: updates.title,
          content: updates.content,
          excerpt: updates.excerpt,
          cover_image: updates.coverImage,
          author: updates.author,
          published: updates.published,
          tags: updates.tags,
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      const updatedArticle: Article = {
        id: data.id,
        title: data.title,
        content: data.content,
        excerpt: data.excerpt || '',
        coverImage: data.cover_image || '',
        author: data.author,
        published: data.published,
        tags: data.tags || [],
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };

      setArticles(prev => prev.map(article => 
        article.id === id ? updatedArticle : article
      ));

      return updatedArticle;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update article');
      throw err;
    }
  };

  const deleteArticle = async (id: string) => {
    if (isDemo) {
      setArticles(prev => prev.filter(article => article.id !== id));
      return;
    }

    if (!user) throw new Error('User not authenticated');
    if (!supabase) throw new Error('Database not configured');

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setArticles(prev => prev.filter(article => article.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete article');
      throw err;
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [user]);

  return {
    articles,
    loading,
    error,
    createArticle,
    updateArticle,
    deleteArticle,
    refetch: fetchArticles,
  };
}