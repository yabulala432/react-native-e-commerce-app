import React from "react";
import { StyleSheet } from "react-native";
import StackNavigator from "./app/navigation/StackNavigator";

import Screen from "./app/components/Screen";
import AppButton from "./app/components/AppButton";
function App() {
  return (
    <Screen style={styles}>
      <StackNavigator />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "dodgerblue",
  },
});

export default App;
