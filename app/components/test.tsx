import React from "react";
import {
  Image,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";
import AppTextInput from "./AppTextInput";
import AppButton from "./AppButton";

const test = () => {
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View>
          <View style={styles.logoContainer}>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png",
                width: 170,
                height: 50,
              }}
            />
          </View>
          <View style={styles.titleContainer}>
            <AppText style={styles.title}>Login In To Your Account</AppText>
          </View>
        </View>
      </View>

      <View style={styles.lowerContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  middleContainer: {
    // backgroundColor: "gold",
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  inputsContainer: {
    width: "90%",
    // backgroundColor: "green",
    padding: 10,
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  lowerContainer: {
    backgroundColor: "red",
    flex: 1,
  },
});

export default test;

/** 
 * <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            // backgroundColor: "red",
          }}
        >
          <View style={styles.inputsContainer}>
            <AppTextInput
              style={{ borderRadius: 5, backgroundColor: "#c9c9c9" }}
              placeholder="Email"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              leftIcon={
                <View style={{ paddingRight: 10 }}>
                  <MaterialCommunityIcons
                    name="email"
                    size={30}
                    color="#767676"
                  />
                </View>
              }
            />
          </View>
          <View style={styles.inputsContainer}>
            <AppTextInput
              style={{ borderRadius: 5, backgroundColor: "#c9c9c9" }}
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              leftIcon={
                <View style={{ paddingRight: 10 }}>
                  <MaterialCommunityIcons
                    name="lock"
                    size={30}
                    color="#767676"
                  />
                </View>
              }
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "90%",
              paddingTop: 10,
              //   backgroundColor: "red",
              paddingHorizontal: 10,
            }}
          >
            <View>
              <AppText style={{ color: "grey" }}>Keep me signed in</AppText>
            </View>
            <View>
              <AppText style={{ color: "dodgerblue" }}>
                Forgot Password?
              </AppText>
            </View>
          </View>
        </ScrollView>
 * */
