import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

type TokenCache = {
  getToken: (key: string) => Promise<string | null>;
  saveToken: (key: string, token: string) => Promise<void>;
  deleteToken: (key: string) => Promise<void>;
};

const createTokenCache = (): TokenCache => {
  return {
    saveToken: async (key: string, token: string) => {
      return await SecureStore.setItemAsync(key, token);
    },
    getToken: async (key: string) => {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (!item) {
          console.log("we don't have a cached session");
        } else {
          console.log("Session stored from cache", item);
        }
        return item;
      } catch (e) {
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    deleteToken: async (key: string) => {
      return SecureStore.deleteItemAsync(key);
    },
  };
};

export const tokenCache = createTokenCache();
