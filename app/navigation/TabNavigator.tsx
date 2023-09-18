import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { SCREEN_NAMES } from "./screenNames";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CartScreen from "../screens/CartScreen";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const [size, setSize] = useState(20);
  useEffect(() => {
    Animated.timing(new Animated.Value(0), {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [size]);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 15,
          right: 15,
          elevation: 1,
          backgroundColor: "#aedbca",
          borderRadius: 15,
          borderTopRightRadius: 60,
          borderTopLeftRadius: 60,
          height: 70,
        },
      }}
    >
      <Tab.Screen
        name={SCREEN_NAMES.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: { color: "#212122", fontSize: 12 },
          tabBarIcon: ({ color, size, focused }) => {
            return focused ? (
              <View style={styles.selectedTab}>
                <MaterialCommunityIcons
                  name="account-outline"
                  size={size + size}
                  color={"#3a8c63"}
                />
              </View>
            ) : (
              <MaterialCommunityIcons
                name="account"
                size={size + size / 2}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.HOME_SCREEN}
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: "#212122", fontSize: 12 },
          tabBarIcon: ({ color, size, focused }) => {
            return focused ? (
              <View style={styles.selectedTab}>
                <MaterialCommunityIcons
                  name="home-circle-outline"
                  size={size + size}
                  color={"#3a8c63"}
                />
              </View>
            ) : (
              <MaterialCommunityIcons
                name="home-circle"
                size={size + size / 2}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.CART_SCREEN}
        component={CartScreen}
        options={{
          tabBarLabel: "Cart",
          tabBarLabelStyle: { color: "#212122", fontSize: 12 },
          tabBarIcon: ({ color, size, focused }) => {
            return focused ? (
              <View style={styles.selectedTab}>
                <MaterialCommunityIcons
                  name="cart"
                  size={size + size}
                  color={"#3a8c63"}
                />
              </View>
            ) : (
              <MaterialCommunityIcons
                name="cart-outline"
                size={size + size / 2}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  selectedTab: {
    // "#aedbca" more darker than this
    backgroundColor: "#aedbca",
    borderRadius: 20,
    padding: 5,
    marginBottom: 10,
    elevation: 3,
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateY: -10 }],
  },
});
