import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import jwtDecode from "jwt-decode";

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

export const getAsyncLoginToken = async (screen: string) => {
  return await AsyncStorage.getItem("loginToken");
};

export const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

interface IAddress {
  country: string;
  fullName: string;
  phoneNumber: string;
  city: string;
  subCity: string;
  woreda: string;
  houseNumber: string;
  street: string;
  landmark: string;
}

export const addNewAddress = async (id: string, address: IAddress) => {
  return await axios.post(`${url}/users/addAddress/${id}`, {
    ...address,
  });
};

export const fetchUserIdService = async () => {
  const token = await getToken();
  const decodedToken = jwtDecode<{ exp: number; iat: number; id: string }>(
    token!
  );
  const id = decodedToken.id;
  if (id) return id;
  else throw new Error("No user id found");
};

export interface address {
  country: string;
  fullName: string;
  phoneNumber: string;
  city: string;
  subCity: string;
  woreda: string;
  houseNumber: string;
  street: string;
  landmark: string;
}

export const getAllAddresses = async () => {
  const id: string = await fetchUserIdService();
  return await axios.get(`${url}/users/getAllAddresses/${id}`);
};

interface orders {
  user: string;
  products: object;
  totalPrice: number;
  shippingAddress: object | null;
  paymentMethod: string;
}

export const createOrder = async (order: orders) => {
  return await axios.post(`${url}/orders/createOrder`, order);
};
