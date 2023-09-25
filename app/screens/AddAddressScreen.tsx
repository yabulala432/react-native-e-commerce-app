import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Screen from "../components/Screen";
import { SCREEN_NAMES } from "../navigation/screenNames";

const AddAddressScreen = () => {
  const navigation = useNavigation();

  const [addresses, setAddresses] = useState([]);
  // fetch addresses from db
  const fetchAddresses = async () => {};

  useEffect(() => {}, []);

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
