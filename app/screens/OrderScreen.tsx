import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import { SCREEN_NAMES } from "../navigation/screenNames";

const OrderScreen = ({ navigation }: any) => {
  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      navigation.navigate(SCREEN_NAMES.HOME_STACK_NAV);
    }, 3000);
  }, []);
  return (
    <Screen>
      <LottieView
        source={require("../animations/animation_ln3ukna8.json")}
        autoPlay
        loop
      />
      <View
        style={{
          width: "100%",
          position: "absolute",
          bottom: 80,
          padding: 20,
          backgroundColor: "#feb546",
        }}
      >
        <AppText
          style={{
            fontWeight: "bold",
            fontSize: 22,
            color: "#ea426e",
            textAlign: "center",
          }}
        >
          Order Placed Successfully
        </AppText>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default OrderScreen;
