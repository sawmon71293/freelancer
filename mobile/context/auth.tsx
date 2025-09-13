import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as jose from "jose";
import {
  AuthError,
  AuthRequestConfig,
  DiscoveryDocument,
  makeRedirectUri,
  useAuthRequest,
  exchangeCodeAsync,
} from "expo-auth-session";
import { BASE_URL } from "@/constants";
import { Platform } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  picture?: string;
  given_name: string;
  family_name: string;
  email_verified?: boolean;
  provider?: string;
  exp?: number;
  cookieExpiration?: number;
};

const AuthContext = React.createContext({
  user: null as AuthUser | null,
  signIn: () => {},
  signOut: () => {},
  fetchWithAuth: async (url: string, options?: RequestInit) =>
    Promise.resolve(new Response()),
  isLoading: false,
  error: null as AuthError | null,
});

const config: AuthRequestConfig = {
  clientId: "google",
  scopes: ["openid", "profile", "email"],
  redirectUri: makeRedirectUri(),
};

const discovery: DiscoveryDocument = {
  authorizationEndpoint: `${BASE_URL}/api/auth/authorize`,
  tokenEndpoint: `${BASE_URL}/api/auth/token`,
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<AuthError | null>(null);
  const [request, response, promptAsync] = useAuthRequest(config, discovery);
  const isWeb = Platform.OS === "web";
  const [accessToken, setAccessToken] = React.useState(null);
  React.useEffect(() => {
    handleResponse();
  }, [response]);

  const handleResponse = async () => {
    if (response?.type === "success") {
      const { code } = response.params;
      try {
        setIsLoading(true);

        const formData = new FormData();
        formData.append("code", code);
        if (isWeb) {
          formData.append("platform", "web");
        }
        const tokenResponse = await fetch(
          "exp://192.168.100.12:8081/api/auth/token",
          {
            method: "POST",
            body: formData,
            credentials: isWeb ? "include" : "same-origin",
          }
        );

        const token = await tokenResponse.json();
        const accessToken = token.accessToken;
        if (!accessToken) {
          console.log("Didn't get an access token");
          return;
        }
        console.log("Access token is ===> ", accessToken);
        setAccessToken(accessToken);
        const decoded = jose.decodeJwt(accessToken);
        setUser(decoded as AuthUser);
      } catch (error) {
        setIsLoading(false);
      }
    } else if (response?.type === "error") {
      setError(response.error as AuthError);
    }
  };
  const signIn = async () => {
    try {
      if (!request) {
        console.log("no request");
        return;
      }
      promptAsync();
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {};
  const fetchWithAuth = async (url: string, options?: RequestInit) => {};
  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        fetchWithAuth,
        isLoading: false,
        error: null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
