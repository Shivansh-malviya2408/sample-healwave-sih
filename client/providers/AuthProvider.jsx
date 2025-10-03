import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

  id: string;
  email?: string;
  name?: string;
  avatarUrl?: string;
  provider?: "google" | "password" | "demo";
};

  user: AuthUser | null;
  signInWithGoogle: () => Promise;
  signInWithEmailPassword: (email) => Promise;
  signUpWithEmailPassword: (email) => Promise;
  signOut: () => Promise;
  mode: "demo" | "production";
};

const AuthContext = createContext(null);
const STORAGE_KEY = "app.auth.user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw)) : null;
    } catch {
      return null;
    }
  });

  const persist = useCallback((u) => {
    if (!u) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  }, []);

  const signInWithGoogle = useCallback(async () => {
    // Demo-only Google sign-in. Replace with real provider (e.g., Supabase/Firebase).
    const demoUser = {
      id: crypto.randomUUID(),
      name: "Demo User",
      email: "demo@example.com",
      provider: "google",
      avatarUrl: undefined,
    };
    setUser(demoUser);
    persist(demoUser);
  }, [persist]);

  const signInWithEmailPassword = useCallback(async (email) => {
    const demoUser = { id: crypto.randomUUID(), email, provider: "password" };
    setUser(demoUser);
    persist(demoUser);
  }, [persist]);

  const signUpWithEmailPassword = useCallback(async (email) => {
    const demoUser = { id: crypto.randomUUID(), email, provider: "password" };
    setUser(demoUser);
    persist(demoUser);
  }, [persist]);

  const signOut = useCallback(async () => {
    setUser(null);
    persist(null);
  }, [persist]);

  const value = useMemo(() => ({
    user,
    signInWithGoogle,
    signInWithEmailPassword,
    signUpWithEmailPassword,
    signOut,
    mode), [user, signInWithGoogle, signInWithEmailPassword, signUpWithEmailPassword, signOut]);

  return {children};
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within ");
  return ctx;
}
