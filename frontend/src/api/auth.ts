import api from "./client";
import type { AuthResponse } from "../types/auth";

interface SignupPayload {
  name: string;
  email: string;
  password: string;
  timezone?: string;
  profession?: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const signupRequest = async (data: SignupPayload): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/api/auth/signup", data);
  return res.data;
};

export const loginRequest = async (data: LoginPayload): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/api/auth/login", data);
  return res.data;
};

export const meRequest = async () => {
  const res = await api.get<{ user: AuthResponse["user"] }>("/api/auth/me");
  return res.data.user;
};
