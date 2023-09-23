import React, { useState, useEffect, useRef } from "react";
import { View, Image, StyleSheet, Dimensions, ScrollView } from "react-native";

interface ImageCarouselProps {
  images: string[];
  autoPlay?: boolean;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoPlay = true,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const { width } = Dimensions.get("window");
    const timeout = setTimeout(() => {
      if (autoPlay)
        if (currentPage < images.length - 1) {
          scrollViewRef.current?.scrollTo({
            x: (currentPage + 1) * width,
            animated: true,
          });
        } else {
          scrollViewRef.current?.scrollTo({ x: 0, animated: true });
        }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [currentPage, images.length]);

  const handlePageChange = (event: any) => {
    const { contentOffset } = event.nativeEvent;
    const page = Math.round(contentOffset.x / Dimensions.get("window").width);
    setCurrentPage(page);
  };

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handlePageChange}
        scrollEventThrottle={16}
      >
        {images.map((imageUrl, index) => (
          <Image
            key={`image-${index}`}
            source={{ uri: imageUrl }}
            style={[styles.image]}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <View
            key={`dot-${index}`}
            style={[
              styles.dot,
              index === currentPage ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    width: "100%",
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f1f1",
  },
  image: { width: Dimensions.get("window").width, height: 300 },
  paginationContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#888",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#fff",
  },
});

export default ImageCarousel;
