export interface User {
  id: string;
  name: string;
  email: string;
  timezone?: string;
  profession?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
