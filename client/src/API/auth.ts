import { apiClient } from "./client";

type AuthResponse = {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
};

export async function login(data: { email: string; password: string }) {
  const res = await apiClient.post<AuthResponse>("/auth/login", data);
  return res.data;
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await apiClient.post<AuthResponse>("/auth/register", data);
  return res.data;
}