import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios, { AxiosError } from "axios";

const url = "http://192.168.0.36:3000";

export const registerService = async (person: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post(`${url}/users/register`, person);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const loginService = async (person: {
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post(`${url}/users/login`, person);
    AsyncStorage.setItem("token", res.data.token);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAsyncToken = async (screen: string) => {
  return await AsyncStorage.getItem("loginToken");
};
