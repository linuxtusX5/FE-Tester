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

// export interface Category {
//   id: number;
//   name: string;
//   price?: number;
//   quantity: number;
//   is_available: boolean;
//   category_name: string;
// }
export interface Category {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
}

export interface Item {
  id?: string;
  title: string;
  description: string;
  category: string;
  price?: number | string;
  quantity: number | string;
  is_available: boolean;
  tags?: string[];
}

export interface ItemModalProps {
  item?: Item | null;
  categories: Category[];
  onSave: (data: Omit<Item, "id">) => Promise<void>;
  onClose: () => void;
}
