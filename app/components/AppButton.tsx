import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import AppText from "./AppText";

interface props {
  style?: object;
  title: string;
  onPress?: any;
}

const AppButton = ({ style, title, onPress }: props) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <View style={styles.button}>
        <AppText style={styles.text}>{title}</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 65,
    borderRadius: 35,
    backgroundColor: "#fcb511",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
});

export default AppButton;
