import React from "react";
import { View, StatusBar, StyleSheet, Text } from "react-native";

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
    paddingTop: StatusBar.currentHeight,
  },
});

export default Screen;
