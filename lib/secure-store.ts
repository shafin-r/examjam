import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "authToken";

export const saveToken = async (token: string | null) => {
  if (token) {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } else {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  }
};

export const getToken = async () => {
  return await SecureStore.getItemAsync(TOKEN_KEY);
};
