import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

type TokenCache = {
  getToken: (key: string) => Promise<string, null>;
  saveToken: (key: string) => Promise<string, null>;
  deleteToken: (key: string) => Promise<string, null>;
};
// const createTokenCache = (): TokenCache => {
//     return {
//         getToken: async ()
//     }
// };
