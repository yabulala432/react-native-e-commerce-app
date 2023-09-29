import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Screen from "../components/Screen";

const ProfileScreen = () => {
  return (
    <Screen style={styles.container}>
      <Text>Profile Screen</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ProfileScreen;
