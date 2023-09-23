import React from "react";
import { Provider } from "react-redux";
import { StyleSheet } from "react-native";

import StackNavigator from "./app/navigation/StackNavigator";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "dodgerblue",
  },
});

export default App;
