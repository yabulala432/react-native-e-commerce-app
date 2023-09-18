import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Screen from "../components/Screen";
import { SCREEN_NAMES } from "../navigation/screenNames";
import { registerService } from "../services/apiService";

interface props {
  navigation: any;
}

const RegisterScreen = ({ navigation }: props) => {
  const [person, setPerson] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleRegister = () => {
    const user = {
      name: person.name,
      email: person.email,
      password: person.password,
    };
    // axios
    //   .post("http://192.168.0.36:3000/users/register", user)
    //   .then((res) => {
    //     Alert.alert(
    //       "Success",
    //       "User registered successfully \n We have sent you an email to verify your account. Please verify your account and login again."
    //     );
    //     setPerson({ email: "", password: "", name: "" });
    //   })
    //   .catch((err) => {
    //     console.log({ err });
    //   });

    registerService(user)
      .then((res) => {
        Alert.alert(
          "Success",
          "User registered successfully \nWe have sent you an email to verify your account. Please verify your account and login again."
        );
        setPerson({ email: "", password: "", name: "" });
      })
      .catch((err) => {
        Alert.alert("Error", "Something went wrong. Please try again later.");
        console.log({ err });
      });
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.innerContainer}>
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
          <AppText style={styles.title}>Register to Amazon</AppText>
        </View>

        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            width: "95%",
          }}
        >
          <View style={styles.formContainer}>
            <View style={styles.inputsContainer}>
              <AppTextInput
                value={person.name}
                onChangeText={(text: string) =>
                  setPerson({ ...person, name: text })
                }
                style={{ borderRadius: 5, backgroundColor: "#c9c9c9" }}
                placeholder="Name"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                leftIcon={
                  <View style={{ paddingRight: 10 }}>
                    <MaterialCommunityIcons
                      name="account"
                      size={30}
                      color="#767676"
                    />
                  </View>
                }
              />
            </View>

            <View style={styles.inputsContainer}>
              <AppTextInput
                value={person.email}
                onChangeText={(text: string) =>
                  setPerson({ ...person, email: text })
                }
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
                value={person.password}
                onChangeText={(text: string) =>
                  setPerson({ ...person, password: text })
                }
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
              <View
                style={{
                  paddingTop: 20,
                  width: "100%",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  <TouchableOpacity>
                    <AppText style={{ fontSize: 15 }}>
                      Keep me logged in
                    </AppText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <AppButton
                onPress={() => {
                  handleRegister();
                }}
                style={styles.button}
                title="Register"
              />
              <View style={styles.registerLink}>
                <TouchableOpacity
                  onPress={() => navigation.navigate(SCREEN_NAMES.LOGIN_SCREEN)}
                >
                  <AppText style={{ color: "grey" }}>
                    Already have an account? Sign in
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    alignItems: "center",
    flex: 1,
    paddingTop: 40,
    width: "100%",
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
    width: "90%",
  },
  inputsContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingVertical: 10,
    width: "100%",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 50,
    paddingTop: 55,
  },
  button: {
    backgroundColor: "#f89620",
    borderRadius: 5,
    height: 50,
    width: 200,
  },
  registerLink: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
});

export default RegisterScreen;
