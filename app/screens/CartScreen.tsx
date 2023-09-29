import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import Screen from "../components/Screen";
import { Cart } from "../redux/cart.reducer";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import {
  cleanCart,
  decreamentQuantity,
  increamentQuantity,
  removeFromCart,
} from "../redux/cart.reducer";
import { SCREEN_NAMES } from "../navigation/screenNames";

const CartScreen = ({ navigation }: any) => {
  const cart: Cart[] = useSelector((state: any) => state.cart.cart);
  // console.log(cart);
  const total = cart.reduce((current, previous) => {
    return current + previous.price * previous.quantity;
  }, 0);

  const dispatch = useDispatch();

  const increaseQuantity = (item: Cart) => {
    dispatch(increamentQuantity(item));
  };

  const decreaseQuantity = (item: Cart) => {
    dispatch(decreamentQuantity(item));
  };

  const deleteItem = (item: Cart) => {
    dispatch(removeFromCart(item));
  };

  const cleanCartItems = () => {
    dispatch(cleanCart());
  };

  return (
    <Screen
      style={{
        paddingBottom: 53,
      }}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          <AppText style={{}}>Subtotal: </AppText>
          <AppText
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {total}
          </AppText>
        </View>
        <AppButton
          disabled={cart.length === 0}
          style={{
            width: "70%",
            backgroundColor: cart.length === 0 ? "#c0c0c0" : "dodgerblue",
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            borderRadius: 50,
            marginBottom: 20,
          }}
          onPress={() => {
            navigation.navigate(SCREEN_NAMES.CHECKOUT_SCREEN);
          }}
          title={`Proceed to Buy ${cart.length} Items.`}
        />

        <View
          style={{
            height: 1,
            borderWidth: 1,
            borderColor: "#D0D0D0",
            width: "100%",
          }}
        />
      </View>
      <ScrollView>
        {cart.map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "#fff",
              marginVertical: 10,
              borderBottomColor: "F0F0F0",
              borderWidth: 0,
              borderBottomWidth: 2,
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                marginVertical: 10,
                flexDirection: "row",
              }}
            >
              <View>
                <Image
                  style={{ width: 140, height: 140 }}
                  source={{ uri: item.image }}
                />
              </View>
              <View>
                <AppText
                  style={{
                    width: 150,
                    marginTop: 10,
                  }}
                  numberOfLines={2}
                >
                  {item.title}
                </AppText>
                <AppText
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {item.price}
                </AppText>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  {item.quantity > 1 ? (
                    <TouchableOpacity
                      onPress={() => {
                        decreaseQuantity(item);
                      }}
                    >
                      <MaterialCommunityIcons
                        name="minus-circle-outline"
                        size={30}
                        color="dodgerblue"
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        deleteItem(item);
                      }}
                    >
                      <MaterialCommunityIcons
                        name="trash-can-outline"
                        size={30}
                        color="tomato"
                      />
                    </TouchableOpacity>
                  )}
                  <AppText
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginHorizontal: 10,
                    }}
                  >
                    {item.quantity}
                  </AppText>
                  <TouchableOpacity
                    onPress={() => {
                      increaseQuantity(item);
                    }}
                  >
                    <MaterialCommunityIcons
                      name="plus-circle"
                      size={30}
                      color="dodgerblue"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}

        <AppButton
          style={{
            width: "70%",
            backgroundColor: "tomato",
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            borderRadius: 5,
            marginBottom: 20,
          }}
          title={`Delete All`}
          onPress={() => {
            cleanCartItems();
          }}
        />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  upperContainer: {
    backgroundColor: "#f1f1f1",
    width: "100%",
    alignItems: "center",
    height: 65,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  textInput: {
    width: "80%",
    flex: 1,
    height: 50,
    backgroundColor: "#fff",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRadius: 50,
  },
});

export default CartScreen;
