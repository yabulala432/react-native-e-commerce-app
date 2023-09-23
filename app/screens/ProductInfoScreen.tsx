import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { addToCart } from "../redux/cart.reducer";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Screen from "../components/Screen";

interface props {
  route?: any;
  navigation?: any;
}

const ProductInfoScreen = ({ route, navigation }: props) => {
  const { width, height } = Dimensions.get("window");
  const [addedToCart, setAddedToCart] = useState({
    isAdded: false,
    title: "Add to Cart",
  });

  const dispatch = useDispatch();

  const handleAddItemToCart = (item: any) => {
    setAddedToCart({ isAdded: true, title: "Added to Cart" });
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart({ isAdded: false, title: "Add to Cart" });
    }, 60000);
  };

  const cart = useSelector((state: any) => state.cart.cart);

  // console.log(route.params);

  return (
    <Screen style={styles.container}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "90%",
          }}
        >
          <AppTextInput
            leftIcon={
              <MaterialCommunityIcons
                name="magnify"
                size={34}
                color="#cfc1c9"
                style={{ paddingLeft: 10 }}
              />
            }
            placeholder="Search"
            style={{ backgroundColor: "#f5f5f5", borderRadius: 10 }}
          />
          <TouchableOpacity style={{ width: "10%" }}>
            <MaterialCommunityIcons
              name="microphone-outline"
              size={34}
              color="#000"
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          style={{
            backgroundColor: "white",
          }}
          showsHorizontalScrollIndicator={false}
        >
          {route.params.carouselImages.map((image: string, index: number) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={{ uri: image }}
                resizeMode="cover"
                style={{
                  width,
                  height: width,
                  borderRadius: 20,
                }}
              >
                <View
                  style={{
                    padding: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: "#c60c30",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12,
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      20% off
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: "#e0e0e0",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="share-variant"
                      size={24}
                      color="black"
                    />
                  </View>
                </View>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#e0e0e0",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    marginTop: "auto",
                    marginLeft: 10,
                    marginBottom: "auto",
                  }}
                >
                  <MaterialCommunityIcons
                    name="heart-outline"
                    size={24}
                    color="black"
                  />
                </View>
              </ImageBackground>
            </View>
          ))}
        </ScrollView>
        <View
          style={{
            padding: 10,
          }}
        >
          <AppText
            style={{
              fontSize: 20,
              fontWeight: "500",

              marginTop: 10,
            }}
          >
            {route.params.title}
          </AppText>
          <AppText
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#c60c30",
              marginTop: 10,
            }}
          >
            ${route.params.price}
          </AppText>
        </View>
        {/* separator */}
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#e0e0e0",
            marginTop: 10,
          }}
        />
        <View
          style={{
            padding: 10,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <AppText
            style={{
              fontSize: 20,
              fontWeight: "500",
              marginTop: 10,
            }}
          >
            Color:
          </AppText>
          <AppText
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            {route.params.color}
          </AppText>
        </View>
        <View
          style={{
            padding: 10,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <AppText
            style={{
              fontSize: 20,
              fontWeight: "500",
              marginTop: 10,
            }}
          >
            Size:{" "}
          </AppText>
          <AppText
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            {route.params.size}
          </AppText>
        </View>
        {/* separator */}
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#e0e0e0",
            marginTop: 10,
          }}
        />
        <View
          style={{
            padding: 10,
            flexDirection: "row",
          }}
        >
          <AppText
            style={{
              fontSize: 20,
              fontWeight: "500",
              marginTop: 10,
            }}
          >
            Total:{" "}
          </AppText>
          <AppText
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            ${route.params.price}
          </AppText>
        </View>

        <AppText style={{ color: "#00ced1", padding: 10 }}>
          FREE delivery Tommorrow by 9pm. Order within 2 hrs 30 mins Details
        </AppText>

        <View
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            marginVertical: 5,
            padding: 10,
          }}
        >
          <MaterialCommunityIcons name="truck-fast" size={24} color="black" />
          <AppText>
            Deliver to Yeabsira Yonas - Addis Ababa 100116, Ethiopia
          </AppText>
        </View>
        {/* </View> */}
        <AppText
          style={{
            fontSize: 20,
            fontWeight: "500",
            marginTop: 10,
            marginHorizontal: 10,
            color: "green",
          }}
        >
          In Stock.
        </AppText>

        <AppButton
          style={{
            alignSelf: "center",
            height: 50,
            marginBottom: 10,
            marginTop: 10,
            width: "90%",
          }}
          title={addedToCart.title}
          onPress={() => {
            handleAddItemToCart(route.params);
            console.log(cart);
          }}
        />
        <AppButton
          style={{
            alignSelf: "center",
            backgroundColor: "#9d447e",
            height: 50,
            marginBottom: 10,
            marginTop: 10,
            width: "90%",
          }}
          title={"Buy Now"}
        />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    color: "white",
    flex: 1,
    justifyContent: "center",
    paddingBottom: 50,
  },
});

export default ProductInfoScreen;
