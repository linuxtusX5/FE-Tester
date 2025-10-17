// Represents a user object
export interface User {
  id: number;
  username: string;
  email: string;
}

// The data sent when registering a new user
export interface RegisterData {
  username: string;
  email: string;
  password: string;
  [key: string]: unknown; // optional extra fields
}
export interface LoginData {
  username: string;
  password: string;
  [key: string]: unknown; // optional extra fields
}
// Response returned by login or register API
export interface AuthApiResponse {
  token: string;
  user_id: number;
  username: string;
  email: string;
  [key: string]: unknown;
}

// Shape of the AuthContext
export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<AuthApiResponse>;
  logout: () => void;
  register: (data: RegisterData) => Promise<AuthApiResponse>;
}
