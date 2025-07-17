import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key';

// For development, we'll use demo mode if no env vars are set
const isDemoMode = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = isDemoMode ? null : createClient(supabaseUrl, supabaseAnonKey);
export const isDemo = isDemoMode;

export type Database = {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string;
          title: string;
          content: string;
          excerpt: string | null;
          cover_image: string | null;
          author: string;
          published: boolean;
          tags: string[];
          created_at: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          excerpt?: string | null;
          cover_image?: string | null;
          author: string;
          published?: boolean;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          excerpt?: string | null;
          cover_image?: string | null;
          author?: string;
          published?: boolean;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
          user_id?: string;
        };
      };
    };
  };
};