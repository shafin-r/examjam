import React, { createContext, useState, useEffect } from "react";
import { saveToken, getToken, deleteToken } from "@/lib/secure-store";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      const token = await getToken();
      if (token) setUserToken(token);
    };
    loadToken();
  }, []);

  const login = async (email, password) => {
    try {
      const token = await login(email, password);
      setUserToken(token);
      await saveToken(token);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const logout = async () => {
    setUserToken(null);
    await deleteToken();
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
