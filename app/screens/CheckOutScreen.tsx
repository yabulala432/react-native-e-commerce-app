import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../components/AppText";
import { getAllAddresses, address } from "../services/apiService";
import Screen from "../components/Screen";
import { TouchableOpacity } from "react-native";
import AppButton from "../components/AppButton";

const steps = [
  { title: "Address", content: "Address Form" },
  { title: "Delivery", content: "Delivery Options" },
  { title: "Payment", content: "Payment Details" },
  { title: "Place Order", content: "Order Summary" },
];
const CheckOutScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [address, setAddress] = useState<address[] | null>([]);
  const [selectedAddress, setSelectedAddress] = useState<address | null>(null);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    getAllAddresses().then((res) => {
      setAddress(res.data);
    });
  }, []);

  return (
    <Screen>
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
              marginHorizontal: 15,
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
                        backgroundColor: "tomato", //"#008397",
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
                      onPress={() => setCurrentStep(1)}
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
              marginHorizontal: 20,
              backgroundColor: "#fafafa",
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
              onPress={() => setSelected(!selected)}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name={selected ? "check-circle" : "circle-outline"}
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
            {selected && (
              <AppButton
                style={{
                  backgroundColor: "tomato", //"#008397",
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
                onPress={() => setCurrentStep(2)}
              />
            )}
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
