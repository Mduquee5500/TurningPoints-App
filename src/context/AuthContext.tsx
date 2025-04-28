import React, { createContext, useState, ReactNode, useEffect } from "react";
import useHttp from "@/lib/use-http.ts";
import { useNavigate } from "react-router-dom";

enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface UserProps {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar: string;
  role: Role;
  createdAt: Date;
}

interface AuthContextType {
  user: UserProps | null;
  loading: boolean;
  setUser: (user: UserProps) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { fetchData } = useHttp();
  useEffect(() => {
    reLogin();
  }, []);

  const reLogin = async () => {
    setLoading(true); // ✅ 一开始设置为 true
    const token = localStorage.getItem("access_token");

    if (token) {
      try {
        const payload = (await fetchData("auth/userinfo")) as UserProps;
        setUser(payload);
      } catch (e) {
        console.warn("Invalid token, forcing logout");
        localStorage.removeItem("access_token");
        setUser(null);
      }
    } else {
      navigate("/login");
    }
    setLoading(false); // ✅ 最后设置为 false
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
