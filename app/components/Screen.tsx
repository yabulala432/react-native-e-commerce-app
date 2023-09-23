import React from "react";
import { View, StatusBar, StyleSheet, Platform } from "react-native";

import Constants from "expo-constants";
interface ScreenProps {
  children: React.ReactNode;
  style?: object;
}

const Screen = ({ children, style }: ScreenProps) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight, //Platform.OS === "android" ? 24 : 0,
  },
});

export default Screen;
