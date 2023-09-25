import React from "react";
import { Provider } from "react-redux";
import { StyleSheet } from "react-native";

import StackNavigator from "./app/navigation/StackNavigator";
import store from "./store";
import { UserContext } from "./UserContext";

function App() {
  return (
    <Provider store={store}>
      <UserContext>
        <StackNavigator />
      </UserContext>
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
