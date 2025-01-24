import React, { createContext, useContext, useState, useEffect } from "react";
import { getToken, saveToken } from "@/lib/secure-store";
import { useRouter } from "expo-router";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // On app load, check if there's a token in secure storage
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = await getToken();
      if (storedToken) {
        setToken(storedToken);
        router.replace("/home"); // Redirect to the home page if logged in
      } else {
        router.replace("/"); // Redirect to the login page if not logged in
      }
    };

    initializeAuth();
  }, []);

  // Function to log out
  const logout = async () => {
    setToken(null);
    await saveToken(null); // Remove token from secure storage
    router.replace("/login"); // Redirect to login screen
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
