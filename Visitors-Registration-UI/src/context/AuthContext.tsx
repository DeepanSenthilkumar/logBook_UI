import { createContext, useContext, useState } from "react";

type AuthContextType = {
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

   const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("loggedIn") === "true";
   });

  const login = () => {
    setLoggedIn(true);
    localStorage.setItem("loggedIn", "true");
  };

  const logout = () => {
    setLoggedIn(false);
    localStorage.setItem("loggedIn", "false");
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
