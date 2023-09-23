import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import ImageCarousel from "../components/ImageCarousel";
import ProductItems from "../components/ProductItems";
import Screen from "../components/Screen";
import { SCREEN_NAMES } from "../navigation/screenNames";
import { useSelector } from "react-redux";

const data = [
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

const images = [
  "https://eheim.com/media/image/07/ce/7f/1020220_300_saugstutzen.jpg",
  "https://m.media-amazon.com/images/I/71m5ZPOPHOL._AC_UF1000,1000_QL80_.jpg",
  "https://m.media-amazon.com/images/I/61gtJqKPhFL.jpg",
  "https://static-01.daraz.pk/p/70b82a91f4305daac46ef618e6b75b64.jpg",
];

const deals = [
  {
    id: 0,
    title: "Samsung A13",
    oldPrice: 14999,
    price: 13999,
    image: "https://eheim.com/media/image/07/ce/7f/1020220_300_saugstutzen.jpg",
    carouselImages: [
      "https://static-01.daraz.pk/p/70b82a91f4305daac46ef618e6b75b64.jpg",
      "https://picsum.photos/300/300",
      "https://picsum.photos/400/200",
      "https://picsum.photos/200/400",
    ],
    color: "Pastel Green",
    size: "8GB RAM, 128GB Storage",
  },
  {
    id: 1,
    title: "Nokia ",
    oldPrice: 24999,
    price: 23999,
    image:
      "https://m.media-amazon.com/images/I/71m5ZPOPHOL._AC_UF1000,1000_QL80_.jpg",
    carouselImages: [
      "https://m.media-amazon.com/images/I/71LRBr1a+WL._AC_UY218_.jpg",
      "https://m.media-amazon.com/images/I/71LRBr1a+WL._AC_UY218_.jpg",
      "https://m.media-amazon.com/images/I/71LRBr1a+WL._AC_UY218_.jpg",
      "https://m.media-amazon.com/images/I/71LRBr1a+WL._AC_UY218_.jpg",
    ],
    color: "Pastel Green",
    size: "8GB RAM, 128GB Storage",
  },
  {
    id: 3,
    title: "IPhone",
    oldPrice: 24999,
    price: 23999,
    image:
      "https://m.media-amazon.com/images/I/71m5ZPOPHOL._AC_UF1000,1000_QL80_.jpg",
    carouselImages: [
      "https://m.media-amazon.com/images/I/71LRBr1a+WL._AC_UY218_.jpg",
      "https://m.media-amazon.com/images/I/71LRBr1a+WL._AC_UY218_.jpg",
      "https://m.media-amazon.com/images/I/71LRBr1a+WL._AC_UY218_.jpg",
      "https://m.media-amazon.com/images/I/71LRBr1a+WL._AC_UY218_.jpg",
    ],
    color: "Pastel Green",
    size: "8GB RAM, 128GB Storage",
  },
  {
    id: 4,
    title: "Pixel",
    oldPrice: 24999,
    price: 23999,
    image:
      "https://m.media-amazon.com/images/I/71m5ZPOPHOL._AC_UF1000,1000_QL80_.jpg",
    carouselImages: [
      "https://m.media-amazon.com/images/I/71LRBr1a+WL._AC_UY218_.jpg",
      "https://m.media-amazon.com/images/I/71LRBr1a+WL._AC_UY218_.jpg",
      "https://m.media-amazon.com/images/I/71LRBr1a+WL._AC_UY218_.jpg",
      "https://m.media-amazon.com/images/I/71LRBr1a+WL._AC_UY218_.jpg",
    ],
    color: "Pastel Green",
    size: "8GB RAM, 128GB Storage",
  },
];

const offers = [
  {
    id: 0,
    title: "OnePlus Nord CE 3 Lite 5G (Pastel Green, 8GB RAM, 128GB Storage)",
    oldPrice: 24999,
    price: 23999,
    image:
      "https://www.phoneplacekenya.com/wp-content/uploads/2021/01/Airpods-Max-e.jpg",
    carouselImages: [
      "https://www.shutterstock.com/shutterstock/photos/2072382449/display_1500/stock-photo-paris-france-jan-new-silver-apple-computers-airpods-max-over-ear-headphones-adaptive-2072382449.jpg",
      "https://external-preview.redd.it/wZXeybc8foaPUKqfcrgBuXDwD4JJ7CubgkmGfo7BAxY.jpg?width=640&crop=smart&auto=webp&s=b515af663e81202d37fbeff8fb2df54281509d25",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREbzdI-RtfxEIoHef6uDfNAGAmFJ77iydYxxYdsoTxVHtPZXbzchyC5Lt8JWn2PTZ8K_Y&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8pKxrOpavK5-XRpjjGAQTZoOoiNJnss4GbeYVAqmq8bxe5ohCmsmCv1QrkZ8tRGdPPgg&usqp=CAU",
    ],
    color: "Pastel Green",
    size: "8GB RAM, 128GB Storage",
    offer: "20%",
  },
  {
    id: 1,
    title: "OnePlus Nord CE 3 Lite 5G (Pastel Green, 8GB RAM, 128GB Storage)",
    oldPrice: 24999,
    price: 23999,
    image:
      "https://image.shutterstock.com/image-photo/air-pods-pro-wireless-charging-260nw-1717067044.jpg",
    carouselImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLygIy3QxNnbER5vIzhFOYAkJQkyqzUan_E01_pcff63hyXUAx5R7NItI_PaRDnFZOFfU&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMz1WEkLmgtqdNChZ1JGfjwPxwsPngv6Ry4Biq48h8yB0BZXGQTWLC32UNcKx0CnVYxys&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST8kTIGEKAMRUiZMipR6Rm8mMJ2uHHdn-gDh3MRtXhM-RXoFHv2Yfqdnq-LhZbJ-QdGRk&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHSv0E51mRcbwYLWE52lA0rlHVNoTqpvLdEy5lEhkicHK2NHiLWLaywL4OQzDaqTzvrJs&usqp=CAU",
    ],
    color: "Pastel Green",
    size: "8GB RAM, 128GB Storage",
    offer: "20%",
  },
  {
    id: 2,
    title: "OnePlus Nord CE 3 Lite 5G (Pastel Green, 8GB RAM, 128GB Storage)",
    oldPrice: 24999,
    price: 23999,
    image: "https://picsum.photos/200/200",
    carouselImages: [
      "https://picsum.photos/200/200",
      "https://picsum.photos/200/200",
      "https://picsum.photos/200/200",
      "https://picsum.photos/200/200",
    ],
    color: "Pastel Green",
    size: "8GB RAM, 128GB Storage",
    offer: "20%",
  },
  {
    id: 3,
    title: "OnePlus Nord CE 3 Lite 5G (Pastel Green, 8GB RAM, 128GB Storage)",
    oldPrice: 24999,
    price: 23999,
    image: "https://picsum.photos/200/200",
    carouselImages: [
      "https://picsum.photos/200/200",
      "https://picsum.photos/200/200",
      "https://picsum.photos/200/200",
      "https://picsum.photos/200/200",
    ],
    color: "Pastel Green",
    size: "8GB RAM, 128GB Storage",
    offer: "20%",
  },
  {
    id: 4,
    title: "OnePlus Nord CE 3 Lite 5G (Pastel Green, 8GB RAM, 128GB Storage)",
    oldPrice: 24999,
    price: 23999,
    image: "https://picsum.photos/200/200",
    carouselImages: [
      "https://picsum.photos/200/200",
      "https://picsum.photos/200/200",
      "https://picsum.photos/200/200",
      "https://picsum.photos/200/200",
    ],
    color: "Pastel Green",
    size: "8GB RAM, 128GB Storage",
    offer: "20%",
  },
];

interface props {
  navigation: any;
}

const HomeScreen = ({ navigation }: props) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [items, setItems] = useState([
    { label: "All", value: "" },
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "Electronics", value: "electronics" },
    { label: "Women's clothing", value: "women's clothing" },
  ]);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const getProducts = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get("https://fakestoreapi.com/products");
      await setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const cart = useSelector((state: any) => state.cart.cart);
  console.log({ cart });

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
          <View>
            <FlatList
              data={data}
              keyExtractor={(data) => data.id.toString()}
              horizontal
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      marginHorizontal: 5,
                      alignItems: "center",
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

          <View style={{ padding: 6 }}>
            <ImageCarousel images={images} />
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {deals.map((deal, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(SCREEN_NAMES.PRODUCT_INFO_SCREEN, {
                    id: deal.id,
                    title: deal.title,
                    image: deal.image,
                    carouselImages: deal.carouselImages,
                    color: deal.color,
                    size: deal.size,
                    price: deal.price,
                    oldPrice: deal.oldPrice,
                    deal: deal,
                  });
                }}
              >
                <View
                  key={index}
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: 10,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      source={{ uri: deal.image }}
                      style={{ width: 180, height: 140 }}
                    />
                    <View style={{ marginLeft: 10 }}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <AppText
                          style={{
                            color: "#aaa",
                            textDecorationLine: "line-through",
                          }}
                        >
                          {deal.oldPrice}
                        </AppText>
                        <AppText
                          style={{
                            color: "#000",
                            fontWeight: "bold",
                            marginLeft: 10,
                          }}
                        >
                          {deal.price}
                        </AppText>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Separator */}
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#ccc",
            marginVertical: 10,
          }}
        />

        <View>
          <AppText
            style={{ paddingHorizontal: 10, fontSize: 20, fontWeight: "bold" }}
          >
            Today's Deals for You
          </AppText>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {offers.map((offer, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(SCREEN_NAMES.PRODUCT_INFO_SCREEN, {
                    id: offer.id,
                    title: offer.title,
                    image: offer.image,
                    carouselImages: offer.carouselImages,
                    color: offer.color,
                    size: offer.size,
                    price: offer.price,
                    oldPrice: offer.oldPrice,
                    offer: offer,
                  });
                }}
                key={index}
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <View>
                  <Image
                    resizeMode="contain"
                    source={{ uri: offer.image }}
                    style={{
                      width: 180,
                      height: 140,
                      borderRadius: 10,
                    }}
                  />
                  <View
                    style={{
                      paddingTop: 2,
                    }}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        backgroundColor: "tomato",
                        width: "85%",
                        alignSelf: "center",
                        borderRadius: 5,
                      }}
                    >
                      <AppText
                        style={{
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      >
                        {"Upto " + offer.offer + " Off"}
                      </AppText>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View
          style={{
            marginHorizontal: 10,
            marginTop: 20,
            width: "45%",
            marginBottom: open ? 50 : 15,
          }}
        >
          <DropDownPicker
            style={{ backgroundColor: "#fff" }}
            open={open}
            value={category}
            items={items}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setItems}
            placeholder="Select Category"
            placeholderStyle={{}}
            onOpen={onOpen}
            // onChangeValue={onChange}
            zIndex={3000}
            zIndexInverse={1000}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {products
            .filter((product) => {
              if (category === "") {
                return product;
              } else if (product.category === category) {
                return product;
              }
            })
            .map((product, index) => {
              return <ProductItems key={index} product={product} />;
            })}
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
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
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  horizontalListContainer: {
    padding: 10,
  },
});

export default HomeScreen;
