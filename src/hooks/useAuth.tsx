import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/database';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile with timeout to prevent blocking
          setTimeout(async () => {
            if (!mounted) return;
            try {
              const { data: profile, error } = await supabase
                .from('profiles')
                .select('*, colleges(*)')
                .eq('user_id', session.user.id)
                .maybeSingle();
              
              if (mounted && !error) {
                setProfile(profile);
              }
            } catch (error) {
              console.error('Error fetching profile:', error);
            }
          }, 0);
        } else {
          setProfile(null);
        }
        
        if (mounted) {
          setLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      
      setSession(session);
      setUser(session?.user ?? null);
      
      // Fetch profile if user exists
      if (session?.user) {
        setTimeout(async () => {
          if (!mounted) return;
          try {
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('*, colleges(*)')
              .eq('user_id', session.user.id)
              .maybeSingle();
            
            if (mounted && !error) {
              setProfile(profile);
            }
          } catch (error) {
            console.error('Error fetching profile:', error);
          }
        }, 0);
      }
      
      if (mounted) {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      
      if (error) {
        console.error('Sign in error:', error);
        return { error };
      }
      
      return { error: null, data };
    } catch (error: any) {
      console.error('Unexpected sign in error:', error);
      return { error: { message: 'An unexpected error occurred during sign in' } };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName.trim(),
          },
        },
      });
      
      if (error) {
        console.error('Sign up error:', error);
        return { error };
      }
      
      // Since auto-confirm is enabled, user should be signed in immediately
      return { error: null, data };
    } catch (error: any) {
      console.error('Unexpected sign up error:', error);
      return { error: { message: 'An unexpected error occurred during sign up' } };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
      }
      // Clear local state
      setUser(null);
      setSession(null);
      setProfile(null);
    } catch (error) {
      console.error('Unexpected sign out error:', error);
    }
  };

  const value = {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}