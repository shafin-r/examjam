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

const handleError = (error) => {
  // Check if error has a "detail" property
  if (error?.detail) {
    // Match the field causing the issue
    const match = error.detail.match(/Key \((.*?)\)=\((.*?)\)/);

    if (match) {
      const field = match[1]; // The field name, e.g., "phone"
      const value = match[2]; // The duplicate value, e.g., "0987654321"
      return `The ${field} already exists. Please use a different value.`;
    }
  }
  return "An unexpected error occurred. Please try again.";
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

  const data = await response.json(); // Parse the response JSON

  if (!response.ok) {
    // Instead of throwing a string, include full error data for debugging
    const error = new Error(data?.detail || "Registration failed");
    (error as any).response = data; // Attach the full response for later use
    throw error;
  }

  await saveToken(data.token); // Save the token to secure storage
  setToken(data.token); // Update the token in context
};
