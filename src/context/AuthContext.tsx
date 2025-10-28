import type { ReactNode } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
} from "../services/api";
import type { RegisterData, User, LoginData } from "../types/authTypes";

interface AuthContextType {
  user: User | null;
  register: (data: RegisterData) => Promise<unknown>;
  login: (data: LoginData) => Promise<unknown>;
  logout: () => Promise<void>;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (data: LoginData) => {
    try {
      const response = await apiLogin(data);
      const { token, user } = response as { token: string; user: any };
      if (!user || !user.id || !user.username || !user.email) {
        throw new Error("Invalid user data from server");
      }
      const userData: User = {
        id: user.id,
        username: user.username,
        email: user.email,
      };
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setToken(token);
      setUser(userData);
      return response;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";
      throw new Error(errorMessage);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await apiRegister(data);
      const { token, user_id, username, email } = response as {
        token: string;
        user_id: number;
        username: string;
        email: string;
      };
      const userData: User = { id: user_id, username, email };
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setToken(token);
      setUser(userData);
      return response;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";
      throw new Error(errorMessage);
    }
  };
  const logout = async () => {
    try {
      await apiLogout();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Logout failed";
      throw new Error(errorMessage);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };
  const value: AuthContextType = {
    user,
    token,
    register,
    login,
    logout,
    isAuthenticated: !!token,
    loading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
