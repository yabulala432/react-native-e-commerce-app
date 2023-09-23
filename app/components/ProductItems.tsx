import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import AppButton from "./AppButton";
import AppText from "./AppText";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cart.reducer";

interface product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { count: number; rate: number };
  title: string;
}

interface props {
  product: product;
  onPress?: () => void;
  style?: object;
}

const ProductItems = ({ product, style = {}, onPress }: props) => {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState({
    isAdded: false,
    title: "Add to Cart",
  });
  const handleAddItemToCart = (item: any) => {
    setAddedToCart({ isAdded: true, title: "Added to Cart" });
    dispatch(addToCart(item));
    console.log({ item });

    setTimeout(() => {
      setAddedToCart({ isAdded: false, title: "Add to Cart" });
    }, 60000);
  };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Image
        source={{ uri: product.image }}
        style={{
          //   borderRadius: 20,
          width: 150,
          height: 140,
        }}
      />
      <AppText
        numberOfLines={2}
        style={{
          fontWeight: 600,
          width: 150,
          alignSelf: "center",
        }}
      >
        {product.title}
      </AppText>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 150,
          //   alignSelf: "center",
        }}
      >
        <AppText
          numberOfLines={1}
          style={{
            flex: 2,
            fontWeight: 600,
            color: "darkviolet",
          }}
        >
          {"$" + product.price}
        </AppText>

        <AppText
          numberOfLines={1}
          style={{
            flex: 1,
            fontWeight: 600,
            width: 150,
            alignSelf: "center",
            color: "grey",
          }}
        >
          {product.rating.rate}
        </AppText>
      </View>
      {/* Add to cart button */}

      <AppButton
        title={addedToCart.title}
        onPress={() => handleAddItemToCart(product)}
        style={{
          width: 150,
          height: 50,
          alignSelf: "center",
          backgroundColor: "darkviolet",
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

export default ProductItems;
