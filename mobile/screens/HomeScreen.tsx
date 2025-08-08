import * as React from "react";
import { View, Text, Button } from "react-native";

export function HomeScreen({ navigation }) {
  return (
    <React.Fragment>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Home Screen</Text>
        <Button title="Open Menu" onPress={() => navigation.openDrawer()} />
      </View>
    </React.Fragment>
  );
}
