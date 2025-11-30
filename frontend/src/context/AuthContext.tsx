import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { User } from "../types/auth";
import { loginRequest, signupRequest, meRequest } from "../api/auth";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    timezone?: string,
    profession?: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState<boolean>(true);

  // On mount: if we have a token, fetch the current user
  useEffect(() => {
    const init = async () => {
      if (token) {
        try {
          const me = await meRequest();
          setUser(me);
        } catch (err) {
          console.error("Failed to fetch current user:", err);
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };
    init();
  }, [token]);

  const handleLogin = async (email: string, password: string) => {
    const res = await loginRequest({ email, password });
    setToken(res.token);
    localStorage.setItem("token", res.token);
    setUser(res.user);
  };

  const handleSignup = async (
    name: string,
    email: string,
    password: string,
    timezone?: string,
    profession?: string
  ) => {
    const res = await signupRequest({ name, email, password, timezone, profession });
    setToken(res.token);
    localStorage.setItem("token", res.token);
    setUser(res.user);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  const value: AuthContextValue = {
    user,
    token,
    loading,
    login: handleLogin,
    signup: handleSignup,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>



};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
