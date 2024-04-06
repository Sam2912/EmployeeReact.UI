// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void; // Modify the login function to accept a token parameter
  logout: () => void;
}

interface AuthProviderProps {
    children: React.ReactNode;
  }

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if the user is authenticated (e.g., from localStorage, cookies, etc.)
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string) => {
    // Perform authentication logic (e.g., API call, validation)
    // For simplicity, we'll just set isAuthenticated to true and store a token in localStorage
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    // Perform logout logic (e.g., clear localStorage, reset state)
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
