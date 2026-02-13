import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    debugger
//   const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("loggedIn") === "true";
    });

//   useEffect(() => {
//     debugger
//     const stored = localStorage.getItem("loggedIn");
//     if (stored === "true") {
//       setLoggedIn(true);
//     }
//   }, []);

  const login = () => {
    debugger
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
