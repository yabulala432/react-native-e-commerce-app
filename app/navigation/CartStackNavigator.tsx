import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import CartScreen from "../screens/CartScreen";
import CheckoutScreen from "../screens/CheckOutScreen";
import OrderScreen from "../screens/OrderScreen";
import { SCREEN_NAMES } from "./screenNames";

const Stack = createNativeStackNavigator();

const CartStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={SCREEN_NAMES.CART_SCREEN}
        component={CartScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Checkout",
          headerTitleAlign: "center",
        }}
        name={SCREEN_NAMES.CHECKOUT_SCREEN}
        component={CheckoutScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={SCREEN_NAMES.ORDER_SCREEN}
        component={OrderScreen}
      />
    </Stack.Navigator>
  );
};
export default CartStackNavigator;
