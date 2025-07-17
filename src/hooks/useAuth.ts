import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isDemo } from '../lib/supabase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemo) {
      // Demo mode - simulate logged in user
      const demoUser = {
        id: 'demo-user',
        email: 'demo@example.com',
        user_metadata: { full_name: 'Demo User' }
      } as User;
      setUser(demoUser);
      setLoading(false);
      return;
    }

    if (!supabase) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    if (isDemo) {
      return { data: { user: { email, user_metadata: { full_name: fullName } } }, error: null };
    }
    
    if (!supabase) return { data: null, error: new Error('Supabase not configured') };

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    if (isDemo) {
      return { data: { user: { email, user_metadata: { full_name: 'Demo User' } } }, error: null };
    }
    
    if (!supabase) return { data: null, error: new Error('Supabase not configured') };

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    if (isDemo) {
      setUser(null);
      setSession(null);
      return { error: null };
    }
    
    if (!supabase) return { error: new Error('Supabase not configured') };

    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  };
}