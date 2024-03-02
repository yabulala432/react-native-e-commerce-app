import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import { Cart, cleanCart } from "../redux/cart.reducer";
import {
  address,
  getAllAddresses,
  fetchUserIdService,
  createOrder,
} from "../services/apiService";
import Screen from "../components/Screen";
import { SCREEN_NAMES } from "../navigation/screenNames";

const steps = [
  { title: "Address", content: "Address Form" },
  { title: "Delivery", content: "Delivery Options" },
  { title: "Payment", content: "Payment Details" },
  { title: "Place Order", content: "Order Summary" },
];
const CheckOutScreen = ({ navigation }: any) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [address, setAddress] = useState<address[] | null>([]);
  const [selectedAddress, setSelectedAddress] = useState<address | null>(null);
  const [selectedDelivery, setSelectedDelivery] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<
    "" | "upi" | "card" | "cash"
  >("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    getAllAddresses().then((res) => {
      setAddress(res.data);
    });
    fetchUserIdService().then((res) => {
      setUserId(res);
    });
  }, []);

  const cart: Cart[] = useSelector((state: any) => state.cart.cart);

  const total = cart.reduce((current, previous) => {
    return current + previous.price * previous.quantity;
  }, 0);

  const dispatch = useDispatch();

  const handlePlaceOrder = async () => {
    try {
      const order = {
        user: userId,
        products: cart.map((item) => {
          return {
            name: item.title,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
          };
        }),

        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: selectedPayment,
      };

      if (order.shippingAddress !== null) {
        const response = await createOrder(order);
        if (response) {
          navigation.navigate(SCREEN_NAMES.ORDER_SCREEN);
          dispatch(cleanCart());
          console.log(response.data);
        } else {
          console.log("error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handlePay = async () => {
  //   try {
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Screen
      style={{
        backgroundColor: "#fafafa",
      }}
    >
      <ScrollView style={styles.container}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
              justifyContent: "space-between",
            }}
          >
            {steps.map((step, index) => (
              <View
                style={{
                  paddingHorizontal: 20,
                  alignItems: "center",
                }}
                key={index}
              >
                <View
                  style={{
                    width: index == currentStep ? 50 : 30,
                    height: index == currentStep ? 50 : 30,
                    borderRadius: index == currentStep ? 25 : 15,
                    backgroundColor: index <= currentStep ? "green" : "gray",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {index < currentStep ? (
                    <AppText
                      style={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      &#10003;
                    </AppText>
                  ) : (
                    <AppText
                      style={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {index + 1}
                    </AppText>
                  )}
                </View>

                <AppText
                  style={{
                    textAlign: "center",
                    marginTop: 5,
                    color: index <= currentStep ? "green" : "gray",
                    fontWeight: index <= currentStep ? "bold" : "normal",
                    fontSize: 13,
                  }}
                >
                  {step.title}
                </AppText>
              </View>
            ))}
          </View>
        </View>
        {currentStep == 0 && (
          <View
            style={{
              padding: 20,
            }}
          >
            <AppText
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Select Delivery Address
            </AppText>

            {address?.map((item, index) => (
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 3,
                  marginBottom: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  paddingLeft: 20,
                }}
                key={index}
                onPress={() => setSelectedAddress(item)}
              >
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 3,
                        width: "100%",
                      }}
                    >
                      <AppText
                        style={{
                          color: "#000",
                          fontSize: 13,
                          fontWeight: "bold",
                        }}
                      >
                        {item.fullName}
                      </AppText>
                      <MaterialCommunityIcons
                        name="map-marker-outline"
                        size={24}
                        color="tomato"
                        style={{ marginRight: 10 }}
                      />
                    </View>

                    <AppText
                      style={{
                        color: "#000",
                        fontSize: 13,
                        fontWeight: "normal",
                      }}
                      numberOfLines={1}
                    >
                      {item.houseNumber + " " + item.landmark}
                    </AppText>
                    <AppText
                      style={{
                        color: "#000",
                        fontSize: 13,
                        fontWeight: "normal",
                      }}
                      numberOfLines={1}
                    >
                      {item.subCity + ", " + item.street}
                    </AppText>
                    <AppText
                      style={{
                        color: "#000",
                        fontSize: 13,
                        fontWeight: "normal",
                      }}
                      numberOfLines={1}
                    >
                      {item.city + " " + item.country}
                    </AppText>
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name={
                        selectedAddress == item
                          ? "home-circle-outline"
                          : "circle-outline"
                      }
                      size={27}
                      color="tomato"
                      style={{ marginRight: 10 }}
                    />
                  </View>
                </View>
                {selectedAddress == item && (
                  <View
                    style={{
                      alignItems: "flex-end",
                    }}
                  >
                    <AppButton
                      style={{
                        backgroundColor: "green",
                        fontSize: 13,
                        width: 50,
                        fontWeight: "normal",
                        height: 50,
                        borderRadius: 25,
                      }}
                      title={
                        <MaterialCommunityIcons
                          name="check-circle-outline"
                          size={44}
                          color="white"
                          style={{ marginLeft: 10 }}
                        />
                      }
                      onPress={() => setCurrentStep(currentStep + 1)}
                    />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {currentStep == 1 && (
          <View
            style={{
              flex: 1,
              backgroundColor: "#fafafa",
              padding: 20,
            }}
          >
            <AppText
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Delivery Options
            </AppText>
            <TouchableOpacity
              style={{
                elevation: 10,
                backgroundColor: "white",
                borderRadius: 3,
                flexDirection: "row",
              }}
              onPress={() => setSelectedDelivery(!selectedDelivery)}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name={selectedDelivery ? "check-circle" : "circle-outline"}
                  size={24}
                  color="tomato"
                  style={{ marginRight: 10 }}
                />
              </View>
              <View
                style={{
                  flexDirection: "column",
                }}
              >
                <AppText
                  style={{
                    color: "green",
                    fontSize: 13,
                    fontWeight: "bold",
                  }}
                >
                  Tommorow by 10:00 AM
                </AppText>
                <AppText
                  style={{
                    width: "64%",
                  }}
                  numberOfLines={2}
                >
                  Free Delivery with your Prime membership bla bla bla bla bla
                </AppText>
              </View>
            </TouchableOpacity>
            {selectedDelivery && (
              <View
                style={{
                  alignItems: "flex-end",
                  paddingVertical: 20,
                }}
              >
                <AppButton
                  style={{
                    backgroundColor: "green", //"#008397",
                    fontSize: 13,
                    width: 50,
                    fontWeight: "normal",
                    height: 50,
                    borderRadius: 25,
                  }}
                  title={
                    <MaterialCommunityIcons
                      name="check-circle-outline"
                      size={44}
                      color="white"
                      style={{ marginLeft: 10 }}
                    />
                  }
                  onPress={() => setCurrentStep(currentStep + 1)}
                />
              </View>
            )}
          </View>
        )}

        {currentStep == 2 && (
          <View
            style={{
              padding: 20,
            }}
          >
            <AppText
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Payment Method
            </AppText>

            <TouchableOpacity
              onPress={() => setSelectedPayment("cash")}
              style={{
                backgroundColor: "#fff",
                borderRadius: 3,
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <MaterialCommunityIcons
                name={selectedPayment === "cash" ? "circle" : "circle-outline"}
                size={24}
                color="tomato"
                style={{ marginRight: 10 }}
              />
              <AppText
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Cash on Delivery
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Comming Soon",
                  "Sorry. This feature is not available right now.",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                    },
                  ]
                );
                setSelectedPayment("upi");
              }}
              style={{
                backgroundColor: "#fff",
                borderRadius: 3,
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <MaterialCommunityIcons
                name={selectedPayment === "upi" ? "circle" : "circle-outline"}
                size={24}
                color="tomato"
                style={{ marginRight: 10 }}
              />
              <AppText
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                UPI | Debit Card | Credit Card | Net Banking
              </AppText>
            </TouchableOpacity>

            {selectedPayment && (
              <View
                style={{
                  paddingVertical: 20,
                  alignItems: "flex-end",
                }}
              >
                <AppButton
                  style={{
                    backgroundColor: "green", //"#008397",
                    fontSize: 13,
                    width: 50,
                    fontWeight: "normal",
                    height: 50,
                    borderRadius: 25,
                  }}
                  title={
                    <MaterialCommunityIcons
                      name="check-circle-outline"
                      size={44}
                      color="white"
                      style={{ marginLeft: 10 }}
                    />
                  }
                  onPress={() => setCurrentStep(currentStep + 1)}
                />
              </View>
            )}
          </View>
        )}

        {currentStep == 3 && (
          <View
            style={{
              paddingHorizontal: 20,
            }}
          >
            <AppText
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Order Summary
            </AppText>
            <TouchableOpacity
              onPress={() => setSelectedPayment("cash")}
              style={{
                backgroundColor: "#fff",
                borderRadius: 3,
                borderWidth: 1,
                borderColor: "#ccc",
                paddingVertical: 20,
                paddingHorizontal: 10,
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
                justifyContent: "space-between",
              }}
            >
              <View>
                <AppText
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Save 5% now with Amazon Pay UPI
                </AppText>
                <AppText
                  style={{
                    fontSize: 13,
                    fontWeight: "normal",
                  }}
                >
                  Pay with cash on delivery
                </AppText>
              </View>
              <View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={25}
                  color="black"
                  style={{ marginRight: 10 }}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: "#fff",
                padding: 8,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
              }}
            >
              <AppText>Shipping To {selectedAddress?.fullName}</AppText>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <AppText
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: "grey",
                  }}
                >
                  Items
                </AppText>
                <AppText
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
                  ${total}
                </AppText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <AppText
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: "grey",
                  }}
                >
                  Delivery
                </AppText>
                <AppText
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
                  ${0}
                </AppText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <AppText
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: "grey",
                  }}
                >
                  Total
                </AppText>
                <AppText
                  style={{
                    fontSize: 17,
                    fontWeight: "bold",
                    color: "#c60c30",
                  }}
                >
                  ${total}
                </AppText>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#fff",
                padding: 8,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
              }}
            >
              <AppText
                style={{
                  fontSize: 16,
                  color: "grey",
                  fontWeight: "500",
                }}
              >
                Pay With
              </AppText>
              <AppText
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                Pay on Delivery (CASH)
              </AppText>
            </View>
            <AppButton
              style={{
                marginTop: 20,
                backgroundColor: "green",
                fontSize: 13,
                fontWeight: "normal",
                height: 55,
                borderRadius: 25,
              }}
              title="Place Order"
              onPress={handlePlaceOrder}
            />
          </View>
        )}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CheckOutScreen;
