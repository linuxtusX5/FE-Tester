// api.ts
import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const API_BASE_URL = import.meta.env.VITE_PUBLIC_API_URL;

// ---- Shared types ----
interface ApiError {
  error?: string;
  detail?: string;
  message?: string;
  [key: string]: unknown;
}
export interface DashboardStats {
  total_items: number;
  available_items: number;
  total_categories: number;
  recent_items: {
    id: number;
    title: string;
    is_available: boolean;
    category_name: string;
    price?: number;
    quantity: number;
  }[];
}

// ---- Axios instance with token ----
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface User {
  id: string;
  username: string;
  email: string;
}

// Automatically add Authorization header if token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ---- Core fetchWithAuth ----
export async function fetchWithAuth<T = unknown>(
  url: string,
  options: AxiosRequestConfig = {}
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await api({
      url,
      ...options,
    });
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiError>;
    const data = error.response?.data;
    throw new Error(
      data?.error || data?.detail || data?.message || "Request failed"
    );
  }
}

// ---- Auth ----
export async function login(userData: Record<string, unknown>): Promise<{
  token: string;
  user: { id: number; username: string; email: string };
}> {
  const response = await api.post("/auth/login/", userData);

  const { token, user_id, username, email } = response.data as {
    token: string;
    user_id: number;
    username: string;
    email: string;
  };

  return {
    token,
    user: {
      id: user_id,
      username,
      email,
    },
  };
}

export async function register(
  userData: Record<string, unknown>
): Promise<unknown> {
  const response = await api.post("/auth/register/", userData);
  return response.data;
}

export async function logout(): Promise<void> {
  await fetchWithAuth("/auth/logout/", { method: "POST" });
}

export async function getProfile<T = unknown>(): Promise<T> {
  const response = await api.get<T>("/auth/profile/");
  return response.data;
}

// ---- Categories ----
export async function getCategories<T = unknown>(search = ""): Promise<T> {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  const response = await api.get<T>(`/categories/${query}`);
  return response.data;
}

export async function createCategory<T = unknown>(
  data: Record<string, unknown>
): Promise<T> {
  const response = await api.post<T>("/categories/", data);
  return response.data;
}

export async function updateCategory<T = unknown>(
  id: number | string,
  data: Record<string, unknown>
): Promise<T> {
  const response = await api.patch<T>(`/categories/${id}/`, data);
  return response.data;
}

export async function deleteCategory(id: number | string): Promise<void> {
  await api.delete(`/categories/${id}/`);
}

// ---- Items ----
export async function getItems<T = unknown>(
  filters: Record<string, string | number | undefined> = {}
): Promise<T> {
  const response = await api.get<T>("/items/", { params: filters });
  return response.data;
}

export async function getItem<T = unknown>(id: number | string): Promise<T> {
  const response = await api.get<T>(`/items/${id}/`);
  return response.data;
}

export async function createItem<T = unknown>(
  data: Record<string, unknown>
): Promise<T> {
  const response = await api.post<T>("/items/", data);
  return response.data;
}

export async function updateItem<T = unknown>(
  id: number | string,
  data: Record<string, unknown>
): Promise<T> {
  const response = await api.patch<T>(`/items/${id}/`, data);
  return response.data;
}

export async function deleteItem(id: number | string): Promise<void> {
  await api.delete(`/items/${id}/`);
}

export async function getMyItems<T = unknown>(): Promise<T> {
  const response = await api.get<T>("/my-items/");
  return response.data;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await api.get<DashboardStats>("/dashboard/stats/");
  return response.data;
}
