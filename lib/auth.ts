import { saveToken } from "./secure-store";
import { router } from "expo-router";

export const API_URL = "https://examjam-api.pptx704.com";

export const login = async (
  form: { email: string; password: string },
  setToken: (token: string | null) => void
) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Login failed");

  await saveToken(data.token); // Save the token to secure storage
  setToken(data.token); // Update the token in context
};

export const register = async (
  form: {
    name: string;
    institution: string;
    sscRoll: string;
    hscRoll: string;
    email: string;
    phone: string;
    password: string;
  },
  setToken: (token: string | null) => void
) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Registration failed");

  await saveToken(data.token); // Save the token to secure storage
  setToken(data.token); // Update the token in context
};
