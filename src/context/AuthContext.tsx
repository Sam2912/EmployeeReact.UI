// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { TOKEN } from "../constants/constant";
import { useGlobalErrorHandler } from "./GlobalErrorHandlerContext";
import { jwtDecode, JwtPayload } from "jwt-decode";

export type UserRole = "Admin" | "IT";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void; // Modify the login function to accept a token parameter
  logout: () => void;
  userRole: UserRole[] | null;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { clearGlobalError } = useGlobalErrorHandler();
  const [userRole, setUserRole] = useState<UserRole[] | null>(null);

  useEffect(() => {
    // Check if the user is authenticated (e.g., from localStorage, cookies, etc.)
    const storedToken = localStorage.getItem(TOKEN);
    if (storedToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string) => {
    const decodedToken = jwtDecode<JwtPayload & { role: UserRole[] }>(token);

    setUserRole(decodedToken.role);
    // Perform authentication logic (e.g., API call, validation)
    // For simplicity, we'll just set isAuthenticated to true and store a token in localStorage
    setIsAuthenticated(true);
    localStorage.setItem(TOKEN, token);
  };

  const logout = () => {
    setUserRole(null);
    // Perform logout logic (e.g., clear localStorage, reset state)
    setIsAuthenticated(false);
    localStorage.removeItem(TOKEN);
    clearGlobalError(); // Clear the global error state on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};
