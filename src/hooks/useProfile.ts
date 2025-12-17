import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  created_at: string | null;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, display_name, created_at')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateDisplayName = useCallback(async (displayName: string) => {
    if (!user) return { error: new Error('Not authenticated') };

    const trimmedName = displayName.trim();
    
    const { error } = await supabase
      .from('profiles')
      .update({ display_name: trimmedName || null })
      .eq('id', user.id);

    if (!error) {
      setProfile(prev => prev ? { ...prev, display_name: trimmedName || null } : null);
    }

    return { error };
  }, [user]);

  return {
    profile,
    loading,
    displayName: profile?.display_name,
    updateDisplayName,
    refetch: fetchProfile,
  };
};
