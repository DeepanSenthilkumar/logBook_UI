import { createContext, useContext, useState } from "react";

type AuthContextType = {
  token: string | null;
  loggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

let logoutHandler: (() => void) | null = null;

export const triggerLogout = () => {
  logoutHandler?.();
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    return sessionStorage.getItem("token");
  });

  const login = (jwtToken: string) => {
    sessionStorage.setItem("token", jwtToken);
    setToken(jwtToken);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
  };

  logoutHandler = logout;

  const loggedIn = !!token;

  return (
    <AuthContext.Provider value={{ token, loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
