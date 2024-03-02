import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import {
  UserType,
  fetchUserFile,
  getAllOrders,
  removeToken,
} from "../services/apiService";
import Screen from "../components/Screen";
import { SCREEN_NAMES } from "../navigation/screenNames";

const ProfileScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        // backgroundColor: "red",
      },
      headerLeft: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 10,
            // backgroundColor: "red",
            justifyContent: "center",
          }}
        >
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png",
            }}
            width={100}
            height={50}
            resizeMode="contain"
            style={{ marginLeft: 10, marginTop: 21 }}
          />
          <AppText
            style={{
              fontSize: 27,
              fontWeight: "bold",
              marginLeft: 10,
              marginTop: 10,
              color: "orange",
            }}
          >
            Clone !
          </AppText>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 60,
            marginRight: 10,
          }}
        >
          <MaterialCommunityIcons name="bell-outline" size={24} color="black" />

          <MaterialCommunityIcons name="magnify" size={24} color="black" />
        </View>
      ),
    });
  }, []);

  const [user, setUser] = useState<UserType | undefined | null>(null);
  const [orders, setOrders] = useState<{
    orders: any;
    loading: boolean;
  }>({ orders: null, loading: true });

  const fetchUser = async () => {
    const data = await fetchUserFile();
    setUser(data);
  };

  const fetchOrder = async () => {
    setOrders({ orders: null, loading: true });
    const { data } = await getAllOrders();
    setOrders({ orders: data, loading: false });
  };

  useEffect(() => {
    fetchUser();
    fetchOrder();
  }, []);
  return (
    <Screen style={styles.container}>
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          marginTop: 10,
          marginLeft: 20,
          textAlign: "center",
          color: "orange",
        }}
      >
        {user?.name}
      </Text>
      <View
        style={{
          flex: 1,
          paddingBottom: 75,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 10,
            width: "100%",
          }}
        >
          <AppButton
            title="My Orders"
            onPress={() => 1}
            style={{
              backgroundColor: "orange",
              width: 150,
              height: 50,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          <AppButton
            title="Logout"
            style={{
              backgroundColor: "orange",
              width: 150,
              height: 50,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={async () => {
              await removeToken();
              // @ts-ignore
              navigation.navigate(SCREEN_NAMES.LOGIN_SCREEN);
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 10,
            width: "100%",
          }}
        >
          <AppButton
            title="Your Account"
            onPress={() => 1}
            style={{
              backgroundColor: "orange",
              width: 150,
              height: 50,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          />

          <AppButton
            title="Go Back"
            onPress={() => 2}
            style={{
              backgroundColor: "orange",
              width: 150,
              height: 50,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          />
        </View>
      </View>
      <ScrollView horizontal>
        {orders.loading ? (
          <Text>Loading...</Text>
        ) : (
          orders.orders.map((order: any) => (
            <View
              key={order._id}
              style={{
                padding: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#ddd",
              }}
            >
              <Image
                source={{ uri: order.products[0]["image"] }}
                style={{ width: 200, height: 200 }}
              />
            </View>
          ))
        )}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default ProfileScreen;
