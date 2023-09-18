import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import AppTextInput from "../components/AppTextInput";
import AppText from "../components/AppText";
import { SliderBox } from "react-native-image-slider-box";

const images = [];

const items = [
  {
    id: 1,
    image: "https://picsum.photos/200/200",
    name: "Home",
  },
  {
    id: 2,
    image: "https://picsum.photos/200/200",
    name: "Deals",
  },
  {
    id: 3,
    image: "https://picsum.photos/200/200",
    name: "Electronics",
  },
  {
    id: 4,
    image: "https://picsum.photos/200/200",
    name: "Mobiles",
  },
  {
    id: 5,
    image: "https://picsum.photos/200/200",
    name: "Fashion",
  },
  {
    id: 6,
    image: "https://picsum.photos/200/200",
    name: "Computers",
  },
  {
    id: 7,
    image: "https://picsum.photos/200/200",
    name: "Clothing",
  },
  {
    id: 8,
    image: "https://picsum.photos/200/200",
    name: "Beauty",
  },
  {
    id: 9,
    image: "https://picsum.photos/200/200",
    name: "Books",
  },
];

const HomeScreen = () => {
  return (
    <Screen style={styles.container}>
      <ScrollView style={{ padding: 0 }}>
        <View style={styles.upperContainer}>
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
            style={styles.textInput}
          />
          <TouchableOpacity>
            <MaterialCommunityIcons
              // mic icon
              name="microphone-outline"
              size={34}
              color="#000"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={30}
            color="#000"
          />
          <AppText>Deliver to Yeabsira</AppText>
          <MaterialCommunityIcons name="chevron-down" size={30} color="#000" />
        </View>

        <View style={[styles.horizontalListContainer]}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    marginHorizontal: 5,
                    backgroundColor: "#f1f1f1",
                    alignItems: "center",
                    // borderRadius: 50,
                  }}
                >
                  <TouchableOpacity>
                    <View
                      style={{
                        width: 80,
                        height: 80,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        resizeMode="contain"
                        source={{ uri: item.image }}
                        style={{
                          width: "90%",
                          height: "90%",
                          borderRadius: 50,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                  <AppText>{item.name}</AppText>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>

      <SliderBox
        images={images}
        sliderBoxHeight={200}
        onCurrentImagePressed={(index) =>
          console.warn(`image ${index} pressed`)
        }
        dotColor="#FFEE58"
        inactiveDotColor="#90A4AE"
        paginationBoxVerticalPadding={20}
        autoplay
        circleLoop
        resizeMethod={"resize"}
        resizeMode={"cover"}
        paginationBoxStyle={{
          position: "absolute",
          bottom: 0,
          padding: 0,
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          paddingVertical: 10,
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          padding: 0,
          margin: 0,
          backgroundColor: "rgba(128, 128, 128, 0.92)",
        }}
        ImageComponentStyle={{ borderRadius: 15, width: "97%", marginTop: 5 }}
        imageLoadingColor="#2196F3"
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "red",
  },
  upperContainer: {
    backgroundColor: "#f1f1f1",
    width: "100%",
    alignItems: "center",
    height: 65,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  textInput: {
    width: "80%",
    flex: 1,
    height: 50,
    backgroundColor: "#fff",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRadius: 50,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    // justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  horizontalListContainer: {
    padding: 10,
  },
});

export default HomeScreen;
