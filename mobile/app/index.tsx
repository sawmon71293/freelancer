// GoogleLoginScreen.js
import * as React from "react";
import { View, Button, Text, ActivityIndicator } from "react-native";
import { useAuth } from "@/context/auth";
import LoginForm from "@/components/LoginForm";

export default function Index() {
  const { user, signOut, isLoading } = useAuth();
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!user) {
    return <LoginForm />;
  }
  return (
    <View style={{ padding: 50 }}>
      <Text>{JSON.stringify(user)}</Text>
      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  );
}
