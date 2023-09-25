import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./AppText";
import AppTextInput from "./AppTextInput";

interface props {
  text: string;
  placeholder?: string;
  textStyle?: object;
  textInputStyle?: object;
  value?: string;
  onChangeText?: any;
  style?: object;
}

const AppInputWithText = ({
  text,
  placeholder,
  textStyle,
  textInputStyle,
  value,
  onChangeText,
  style,
}: props) => {
  return (
    <View style={[styles.container, style]}>
      <AppText style={[styles.appText, textStyle]}>{text}</AppText>

      <AppTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[styles.inputStyle, textInputStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  appText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  inputStyle: {
    padding: 10,
    borderColor: "#D0D0D0",
    borderBottomWidth: 1,
    marginTop: 10,
    borderRadius: 5,
    elevation: 10,
    width: "95%",
  },
});

export default AppInputWithText;
