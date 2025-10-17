import type { ReactNode } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { register as apiRegister } from "../services/api";
import type { RegisterData, User } from "../types/authTypes";

interface AuthContextType {
  user: User | null;
  register: (data: RegisterData) => Promise<unknown>;
  token: string | null;
  loading: boolean;
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
  const value: AuthContextType = {
    user,
    token,
    register,
    loading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
