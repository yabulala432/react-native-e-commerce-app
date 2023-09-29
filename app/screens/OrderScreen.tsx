import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { SCREEN_NAMES } from "../navigation/screenNames";

const OrderScreen = ({ navigation }: any) => {
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
          padding: 10,
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
        <AppButton
          title="Continue Shopping"
          onPress={() => navigation.navigate(SCREEN_NAMES.CART_SCREEN)}
          style={{
            backgroundColor: "#ea426e",
            borderColor: "#ea426e",
            borderWidth: 1,
            marginTop: 5,
          }}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default OrderScreen;
