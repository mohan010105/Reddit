import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Session, User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

/**
 * Zustand auth store — optional alternative to AuthContext.
 * Provides the same auth state (session, user, loading) plus
 * action methods for login, register, logout, and password reset.
 *
 * Usage:
 *   const { session, login, register, logout } = useAuthStore();
 *
 * NOTE: The existing AuthContext is the primary auth mechanism and is
 * already integrated with the api-client-react token getter.
 * This store is provided as an additional option per requirements.
 */

interface AuthState {
  session: Session | null;
  supabaseUser: SupabaseUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  register: (email: string, password: string, username: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  setSession: (session: Session | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      session: null,
      supabaseUser: null,
      isLoading: true,
      isAuthenticated: false,

      initialize: async () => {
        try {
          const { data } = await supabase.auth.getSession();
          set({
            session: data.session,
            supabaseUser: data.session?.user ?? null,
            isAuthenticated: !!data.session,
            isLoading: false,
          });

          // Listen for auth state changes
          supabase.auth.onAuthStateChange((_event, session) => {
            set({
              session,
              supabaseUser: session?.user ?? null,
              isAuthenticated: !!session,
            });
          });
        } catch {
          set({ isLoading: false });
        }
      },

      login: async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { error: error.message };
        return { error: null };
      },

      register: async (email, password, username) => {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { username } },
        });
        if (error) return { error: error.message };
        return { error: null };
      },

      logout: async () => {
        await supabase.auth.signOut();
        set({ session: null, supabaseUser: null, isAuthenticated: false });
      },

      resetPassword: async (email) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/`,
        });
        if (error) return { error: error.message };
        return { error: null };
      },

      setSession: (session) => {
        set({
          session,
          supabaseUser: session?.user ?? null,
          isAuthenticated: !!session,
        });
      },
    }),
    {
      name: "threadit-auth",
      // Only persist non-sensitive, stable fields
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
