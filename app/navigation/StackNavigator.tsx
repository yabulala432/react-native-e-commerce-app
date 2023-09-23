import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { SCREEN_NAMES } from "./screenNames";
import { TabNavigator } from "./TabNavigator";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      >
        <Stack.Screen
          name={SCREEN_NAMES.LOGIN_SCREEN}
          component={LoginScreen}
        />
        <Stack.Screen
          name={SCREEN_NAMES.REGISTER_SCREEN}
          component={RegisterScreen}
        />
        <Stack.Screen
          name={SCREEN_NAMES.MAIN_TAB_NAV}
          component={TabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
