import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface AppTextInputProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: any;
  autoCapitalize?: any;
  autoCorrect?: boolean;
  secureTextEntry?: boolean;
  leftIcon?: any;
  rightIcon?: any;
  style?: object;
}

const AppTextInput = ({
  placeholder,
  onChangeText,
  keyboardType,
  autoCapitalize,
  autoCorrect,
  secureTextEntry,
  leftIcon,
  rightIcon,
  style,
}: AppTextInputProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ paddingRight: 10 }}>
          {/* <MaterialCommunityIcons name="email" size={30} color="gray" /> */}
          {leftIcon}
        </View>
        <TextInput
          placeholder={placeholder}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          secureTextEntry={secureTextEntry}
          style={{ flex: 1 }}
        />
      </View>
      {rightIcon}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f1f1f4",
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    // marginVertical: 10,
  },
});

export default AppTextInput;
