import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import { getAsyncLoginToken, loginService } from "../services/apiService";
import Screen from "../components/Screen";
import { SCREEN_NAMES } from "../navigation/screenNames";

interface props {
  navigation: any;
}

const LoginScreen = ({ navigation }: props) => {
  const [person, setPerson] = useState({
    email: "",
    password: "",
  });

  const hasToken = async (): Promise<void> => {
    await getAsyncLoginToken(SCREEN_NAMES.MAIN_TAB_NAV).then((token) => {
      if (token) {
        navigation.replace(SCREEN_NAMES.MAIN_TAB_NAV);
      }
    });
  };
  useEffect(() => {
    hasToken();
  }, []);

  const handleLogin = () => {
    loginService(person)
      .then(() => {
        navigation.replace(SCREEN_NAMES.MAIN_TAB_NAV);
      })
      .catch((err) => {
        console.log({ err });
        const message = err.response?.data
          ? err.response?.data?.message
          : "Something went wrong. Please try again later.";
        Alert.alert("Error", message);
      });
  };

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

        <View style={styles.titleContainer}>
          <AppText style={styles.title}>Login In To Your Account</AppText>
        </View>

        <ScrollView>
          <View style={[styles.middleContainer, {}]}>
            <View style={styles.formAndButtonContainer}>
              <View style={styles.formContainer}>
                <AppTextInput
                  value={person.email}
                  onChangeText={(text: string) =>
                    setPerson({ ...person, email: text })
                  }
                  style={styles.input}
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
                <AppTextInput
                  value={person.password}
                  onChangeText={(text: string) =>
                    setPerson({ ...person, password: text })
                  }
                  style={styles.input}
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
                <View style={styles.formTextContainer}>
                  <TouchableOpacity>
                    <AppText style={styles.text}>Keep me logged in</AppText>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <AppText style={{ fontSize: 15, color: "dodgerblue" }}>
                      Forgot Password?
                    </AppText>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <AppButton
                  onPress={handleLogin}
                  style={styles.button}
                  title="Login"
                />
              </View>
            </View>
          </View>
          <View style={styles.registerLink}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(SCREEN_NAMES.REGISTER_SCREEN);
              }}
            >
              <AppText style={styles.text}>
                Don't have an account yet? Sign up
              </AppText>
            </TouchableOpacity>
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
    paddingTop: 40,
  },
  middleContainer: {
    alignItems: "center",
    flex: 3,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    paddingTop: 40,
  },
  titleContainer: {
    alignItems: "center",
    paddingTop: 40,
  },
  input: {
    backgroundColor: "#c9c9c9",
    borderRadius: 5,
  },
  text: { color: "grey" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  formContainer: {
    gap: 10,
    padding: 10,
    width: "90%",
  },
  formTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    width: "90%",
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
  formAndButtonContainer: {
    alignItems: "center",
    height: "90%",
    justifyContent: "center",
    width: "100%",
  },
});

export default LoginScreen;
