import React, { useEffect, useState, useCallback } from "react";
import {
  Pressable,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

import { address, getAllAddresses } from "../services/apiService";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Screen from "../components/Screen";
import { SCREEN_NAMES } from "../navigation/screenNames";
import AppButton from "../components/AppButton";

const AddAddressScreen = () => {
  const navigation = useNavigation();

  const [addresses, setAddresses] = useState<address[]>([]);
  const fetchAddresses = async () => {
    try {
      await getAllAddresses().then((res) => {
        setAddresses(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // refresh the screen when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <View style={styles.upperContainer}>
          <AppTextInput
            leftIcon={
              <MaterialCommunityIcons
                name="magnify"
                size={34}
                color="#cfc1c9"
                style={{ paddingLeft: 10 }}
              />
            }
            placeholder="Search"
            style={styles.textInput}
          />
          <TouchableOpacity>
            <MaterialCommunityIcons
              // mic icon
              name="microphone-outline"
              size={34}
              color="#000"
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: "100%",
            height: 50,
            backgroundColor: "#fff",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 5,
            justifyContent: "space-between",
            borderColor: "#D0D0D0",
            borderBottomWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 10,
            borderTopWidth: 1,
          }}
        >
          <AppText
            style={{
              color: "#000",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Your Addresses
          </AppText>
        </View>
        <View
          style={{
            alignItems: "center",
            padding: 4,
          }}
        >
          {addresses.map((address, index) => {
            return (
              <View
                key={index}
                style={{
                  width: "95%",
                  paddingHorizontal: 20,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  paddingVertical: 5,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 10,
                    width: "100%",
                  }}
                >
                  <AppText
                    style={{
                      color: "#000",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {address.fullName}
                  </AppText>
                  <MaterialCommunityIcons
                    name="map-marker-outline"
                    size={24}
                    color="tomato"
                    style={{ marginRight: 10 }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <AppText
                    style={{
                      color: "grey",
                    }}
                  >
                    House No. {address.houseNumber + " "}
                  </AppText>
                  <AppText
                    style={{
                      color: "grey",
                    }}
                  >
                    {address.landmark}
                  </AppText>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <AppText
                    style={{
                      color: "grey",
                    }}
                  >
                    {address.street + ", "}
                  </AppText>
                  <AppText
                    style={{
                      color: "grey",
                    }}
                  >
                    {address.subCity}
                  </AppText>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <AppText
                    style={{
                      color: "grey",
                    }}
                  >
                    {address.city + ", "}
                  </AppText>
                  <AppText
                    style={{
                      color: "grey",
                    }}
                  >
                    {address.country}
                  </AppText>
                </View>
                <AppText
                  style={{
                    color: "grey",
                  }}
                >
                  Phone Number: {address.phoneNumber}
                </AppText>
                <View
                  style={{
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <AppButton
                    title="Edit"
                    style={{
                      width: "auto",
                      paddingHorizontal: 10,
                      height: 50,
                      backgroundColor: "#fff",
                      borderWidth: 1,
                      borderColor: "#000",
                      borderRadius: 10,
                    }}
                    textStyle={{
                      color: "#000",
                      fontWeight: "normal",
                      fontSize: 16,
                    }}
                  />
                  <AppButton
                    title="Set as Default"
                    style={{
                      width: "auto",
                      paddingHorizontal: 10,
                      height: 50,
                      backgroundColor: "#fff",
                      borderWidth: 1,
                      borderColor: "#000",
                      borderRadius: 10,
                    }}
                    textStyle={{
                      color: "#000",
                      fontWeight: "normal",
                      fontSize: 16,
                    }}
                  />
                  <AppButton
                    title="Delete"
                    style={{
                      backgroundColor: "tomato",
                      borderRadius: 10,
                      paddingHorizontal: 10,
                      height: 50,
                      width: "auto",
                    }}
                    textStyle={{
                      fontSize: 16,
                    }}
                  />
                </View>
              </View>
            );
          })}
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate(SCREEN_NAMES.ADDRESS_SCREEN as never);
          }}
          style={{
            width: "100%",
            height: 50,
            backgroundColor: "#fff",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            justifyContent: "space-between",
            borderColor: "#D0D0D0",
            borderBottomWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 10,
            borderTopWidth: 1,
          }}
        >
          <AppText>Add Address</AppText>
          <MaterialCommunityIcons
            name="chevron-right"
            size={34}
            color="#000"
            style={{ marginRight: 10 }}
          />
        </Pressable>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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

export default AddAddressScreen;
