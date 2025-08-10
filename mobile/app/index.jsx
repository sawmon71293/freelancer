// GoogleLoginScreen.js
import * as React from "react";
import * as Google from "expo-auth-session/providers/google";
import { View, Button } from "react-native";
import * as AuthSession from "expo-auth-session";

export default function GoogleLoginScreen() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "229227007632-jpk0an6jqv9vr1g525c3buv1lk2jgi2p.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ["openid", "profile", "email"],
    prompt: "select_account",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      // Send the ID token to your backend to authenticate the user
      fetch(`${API_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: id_token }),
      });
    }
  }, [response]);

  return (
    <View style={{ padding: 50 }}>
      <Button
        onPress={promptAsync}
        title="Login in with Google"
        color="#841584"
      />
    </View>
  );
}
