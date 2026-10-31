"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { AuthUser, LoginFormData, UserRole } from "./types";
import { mockLogin, mockGoogleLogin, MOCK_USERS } from "./mocks";

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginFormData) => Promise<AuthUser>;
  loginWithGoogle: (role: UserRole) => Promise<AuthUser>;
  quickLogin: (role: UserRole) => Promise<AuthUser>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_USER = "homematch_mock_user";
const STORAGE_KEY_TOKEN = "homematch_mock_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      // Ignore parse errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveSession = (authUser: AuthUser, token: string) => {
    setUser(authUser);
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(authUser));
      localStorage.setItem(STORAGE_KEY_TOKEN, token);
    } catch {
      // Storage unavailable
    }
  };

  const login = async (data: LoginFormData): Promise<AuthUser> => {
    const res = await mockLogin(data);
    saveSession(res.user, res.token);
    return res.user;
  };

  const loginWithGoogle = async (selectedRole: UserRole): Promise<AuthUser> => {
    const res = await mockGoogleLogin(selectedRole);
    saveSession(res.user, res.token);
    return res.user;
  };

  const quickLogin = async (selectedRole: UserRole): Promise<AuthUser> => {
    // 1-click instant login for testers
    const res = MOCK_USERS[selectedRole];
    saveSession(res.user, res.token);
    return res.user;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY_USER);
      localStorage.removeItem(STORAGE_KEY_TOKEN);
    } catch {
      // Storage unavailable
    }
  };

  const switchRole = (newRole: UserRole) => {
    if (!user) return;
    const switchedUser = {
      ...user,
      role: newRole,
      fullName: newRole === "owner" ? "Trần Thị Chủ Nhà" : "Nguyễn Văn Thuê",
      email: newRole === "owner" ? "chunha@homematch.vn" : "nguoithue@homematch.vn",
    };
    saveSession(switchedUser, MOCK_USERS[newRole].token);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role ?? null,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithGoogle,
        quickLogin,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

