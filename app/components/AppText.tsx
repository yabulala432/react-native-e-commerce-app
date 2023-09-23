import React from "react";
import { Text, StyleSheet, Platform } from "react-native";

interface props {
  children: React.ReactNode;
  style?: object;
  numberOfLines?: number;
}

const AppText = ({ children, numberOfLines, style }: props) => {
  return (
    <Text numberOfLines={numberOfLines} style={[styles.container, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: "#0f0f0f",
    //grey dark
  },
});

export default AppText;
