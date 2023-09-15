import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";

const LoginScreen = () => {
  return (
    <Screen style={styles.container}>
      <View style={styles.innerContainer}>
        {/* amazon image icon */}
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png",
              width: 170,
              height: 50,
            }}
          />
        </View>

        {/* title */}
        <View style={styles.titleContainer}>
          <AppText style={styles.title}>Login In To Your Account</AppText>
        </View>

        {/* login form */}
        <View style={styles.formContainer}>
          <View style={styles.inputsContainer}>
            {/* email filed */}
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

          {/* password filed */}
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
          {/* keep me signed in and  forgot password area */}
          <View
            style={{
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <TouchableOpacity>
                <AppText style={{ fontSize: 15 }}>Keep me logged in</AppText>
              </TouchableOpacity>
              <TouchableOpacity>
                <AppText style={{ fontSize: 15, color: "dodgerblue" }}>
                  Forgot Password?
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
          {/* log in button */}
          <View style={styles.buttonContainer}>
            <AppButton style={styles.button} title="Login" />
            {/* if user have not account */}
            <View style={styles.registerLink}>
              <TouchableOpacity>
                <AppText style={{ color: "grey" }}>
                  Don't have an account yet? Sign up
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  innerContainer: {
    alignItems: "center",
    paddingTop: 40,
    flex: 1,
    width: "95%",

    // backgroundColor: "red",
  },
  logoContainer: {
    alignItems: "center",
    paddingTop: 40,
  },
  titleContainer: {
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  formContainer: {
    width: "100%",
    padding: 10,
    paddingVertical: 50,
    // backgroundColor: "yellow",
  },
  inputsContainer: {
    width: "100%",
    paddingVertical: 10,
  },
  buttonContainer: {
    paddingTop: 55,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 50,
    // marginBottom: 50,
    // backgroundColor: "red",
  },
  button: {
    width: 200,
    borderRadius: 5,
    backgroundColor: "#f89620",
    height: 50,
  },
  registerLink: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },
});

export default LoginScreen;
