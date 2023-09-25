import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import ProductInfoScreen from "../screens/ProductInfoScreen";
import { SCREEN_NAMES } from "./screenNames";
import AddAddressScreen from "../screens/AddAddressScreen";
import AddressScreen from "../screens/AddressScreen";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_bottom",
      }}
    >
      <Stack.Screen name={SCREEN_NAMES.HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen
        name={SCREEN_NAMES.PRODUCT_INFO_SCREEN}
        component={ProductInfoScreen}
      />
      <Stack.Screen
        name={SCREEN_NAMES.ADD_ADDRESS_SCREEN}
        component={AddAddressScreen}
      />
      <Stack.Screen
        name={SCREEN_NAMES.ADDRESS_SCREEN}
        component={AddressScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
