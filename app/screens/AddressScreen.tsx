import { Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AppButton from "../components/AppButton";
import { addNewAddress, fetchUserIdService } from "../services/apiService";
import AppInputWithText from "../components/AppInputWithText";
import Screen from "../components/Screen";
import { SCREEN_NAMES } from "../navigation/screenNames";
import { UserType } from "../../UserContext";

const AddressScreen = () => {
  const navigation = useNavigation();
  const [address, setAddress] = useState<{
    country: string;
    fullName: string;
    phoneNumber: string;
    city: string;
    subCity: string;
    woreda: string;
    houseNumber: string;
    street: string;
    landmark: string;
  }>({
    country: "",
    fullName: "",
    phoneNumber: "",
    city: "",
    subCity: "",
    woreda: "",
    houseNumber: "",
    street: "",
    landmark: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const { userId, setUserId } = useContext(UserType);

  const checkButtonDisabled = () => {
    if (
      address.country === "" ||
      address.fullName === "" ||
      address.phoneNumber === "" ||
      address.city === "" ||
      address.subCity === "" ||
      address.woreda === "" ||
      address.houseNumber === "" ||
      address.street === "" ||
      address.landmark === ""
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };

  const fetchUserId = async () => {
    await fetchUserIdService().then((id) => {
      setUserId(id);
    });
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  const handleSaveAddress = async () => {
    await addNewAddress(userId, address)
      .then((res) => {
        console.log({ res });
        setAddress({
          country: "",
          fullName: "",
          phoneNumber: "",
          city: "",
          subCity: "",
          woreda: "",
          houseNumber: "",
          street: "",
          landmark: "",
        });
        setButtonDisabled(true);
        Alert.alert("Sucess", "Address Saved");
        setTimeout(() => {
          // @ts-ignore
          navigation.navigate(SCREEN_NAMES.ADD_ADDRESS_SCREEN);
        }, 1000);
      })
      .catch((error) => {
        console.log({ error }, "in AddressScreen.tsx line 101");
      });
  };

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <View style={{ height: 50, backgroundColor: "#00CED1" }} />

        <View style={{ padding: 10, alignItems: "center" }}>
          <AppInputWithText
            value={address.country}
            onChangeText={(text: string) => {
              setAddress({ ...address, country: text });
              checkButtonDisabled();
            }}
            placeholder="Ethiopia"
            text={"Add New Address"}
          />

          <AppInputWithText
            value={address.fullName}
            onChangeText={(text: string) => {
              setAddress({ ...address, fullName: text });
              checkButtonDisabled();
            }}
            placeholder="Full Name"
            text={"Full Name (First and Last Name)"}
          />
          <AppInputWithText
            value={address.phoneNumber}
            onChangeText={(text: string) => {
              setAddress({ ...address, phoneNumber: text });
              checkButtonDisabled();
            }}
            placeholder="Phone Number"
            text={"Phone Number"}
          />

          <AppInputWithText
            value={address.city}
            onChangeText={(text: string) => {
              setAddress({ ...address, city: text });
              checkButtonDisabled();
            }}
            placeholder="City"
            text={"City"}
          />
          <AppInputWithText
            value={address.subCity}
            onChangeText={(text: string) => {
              setAddress({ ...address, subCity: text });
              checkButtonDisabled();
            }}
            placeholder="Sub City"
            text={"Sub City"}
          />
          <AppInputWithText
            value={address.woreda}
            onChangeText={(text: string) => {
              setAddress({ ...address, woreda: text });
              checkButtonDisabled();
            }}
            placeholder="Woreda"
            text={"Woreda"}
          />
          <AppInputWithText
            value={address.houseNumber}
            onChangeText={(text: string) => {
              setAddress({ ...address, houseNumber: text });
              checkButtonDisabled();
            }}
            placeholder="House Number"
            text={"House Number"}
          />
          <AppInputWithText
            value={address.street}
            onChangeText={(text: string) => {
              setAddress({ ...address, street: text });
              checkButtonDisabled();
            }}
            placeholder="Street"
            text={"Street"}
          />

          <AppInputWithText
            value={address.landmark}
            onChangeText={(text: string) => {
              setAddress({ ...address, landmark: text });
              checkButtonDisabled();
            }}
            placeholder="Eg. Near Piassa"
            text={"Landmark"}
          />

          <AppButton
            disabled={buttonDisabled}
            onPress={handleSaveAddress}
            title="Save Address"
            style={{
              backgroundColor: buttonDisabled ? "grey" : "#00CED1",
              width: "75%",
              height: 50,
              alignSelf: "center",
              borderRadius: 5,
              marginVertical: 10,
            }}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
  },
});

export default AddressScreen;
