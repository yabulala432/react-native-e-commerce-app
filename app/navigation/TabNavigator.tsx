import { Animated, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";

import CartStackNavigator from "./CartStackNavigator";
import HomeStackNavigator from "./HomeStackNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import { SCREEN_NAMES } from "./screenNames";

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
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 5,
          left: 15,
          right: 15,
          elevation: 1,
          backgroundColor: "#fff",
          borderRadius: 15,
          borderTopRightRadius: 60,
          borderTopLeftRadius: 60,
          height: 50,
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
                  color={"#abcdef"}
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
        name={SCREEN_NAMES.HOME_STACK_NAV}
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: "#212122", fontSize: 12 },
          tabBarIcon: ({ color, size, focused }) => {
            return focused ? (
              <View style={styles.selectedTab}>
                <MaterialCommunityIcons
                  name="home-circle-outline"
                  size={size + size}
                  color={"#abcdef"}
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
        name={SCREEN_NAMES.CART_STACK_NAV}
        component={CartStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Cart",
          tabBarLabelStyle: { color: "#212122", fontSize: 12 },
          tabBarIcon: ({ color, size, focused }) => {
            return focused ? (
              <View style={styles.selectedTab}>
                <MaterialCommunityIcons
                  name="cart"
                  size={size + size}
                  color={"#abcdef"}
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
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    padding: 0,
    marginBottom: 0,
    elevation: 3,
    height: "100%",
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateY: -2 }],
  },
});
