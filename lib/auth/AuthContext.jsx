"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "pooja_admin_auth";

// Mock credentials - replace with real API-backed auth later.
const MOCK_USER = { username: "pooja", password: "qwerty" };

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setUser(JSON.parse(saved));
    } catch {
      // localStorage unavailable - ignore
    }
    setReady(true);
  }, []);

  const value = useMemo(
    () => ({
      user,
      ready,
      isAuthenticated: !!user,
      login: (username, password) => {
        if (username === MOCK_USER.username && password === MOCK_USER.password) {
          const session = { username, name: "Pooja" };
          setUser(session);
          try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
          } catch {
            // localStorage unavailable - ignore
          }
          return true;
        }
        return false;
      },
      logout: () => {
        setUser(null);
        try {
          window.localStorage.removeItem(STORAGE_KEY);
        } catch {
          // localStorage unavailable - ignore
        }
      },
    }),
    [user, ready]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
