import React, { useRef, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  Animated,
  Dimensions,
} from "react-native";
import { colors } from "../../const/colors";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Set a base margin based on the screen height (for better consistency across devices)
const verticalMargin = screenHeight * 0.02; // 2% of the screen height

const images = [
  require("../../assets/images/Banner1.jpg"),
  require("../../assets/images/Banner2.jpg"),
  require("../../assets/images/Banner3.jpg"),
  require("../../assets/images/Banner4.jpg"),
  require("../../assets/images/Banner5.jpg"),
];

export default function TopBar({ username }) {
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const currentIndex = useRef(0);

  // Infinite scroll logic
  const infiniteScroll = () => {
    currentIndex.current = (currentIndex.current + 1) % images.length;
    flatListRef.current.scrollToIndex({
      index: currentIndex.current,
      animated: true,
    });
  };

  useEffect(() => {
    const interval = setInterval(infiniteScroll, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderImage = ({ item }) => (
    <View style={styles.card}>
      <Image source={item} style={styles.image} resizeMode="cover" />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images.concat(images)} // Duplicate for infinite scroll effect
        renderItem={renderImage}
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        getItemLayout={(data, index) => ({
          length: screenWidth * 0.9, // Adjust the width of the item (card) here
          offset: (screenWidth * 0.9 + 20) * index, // Add some space between items
          index,
        })}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
      />

      {/* Dot indicators */}
      <View style={styles.dotContainer}>
        {images.map((_, i) => {
          const scale = scrollX.interpolate({
            inputRange: [
              (i - 1) * screenWidth,
              i * screenWidth,
              (i + 1) * screenWidth,
            ],
            outputRange: [0.8, 1.2, 0.8],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={i}
              style={[styles.dot, { transform: [{ scale }] }]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: 220,
    backgroundColor: colors.primaryLowOpacity,
    overflow: "hidden",
    paddingTop: 10,
    marginBottom: verticalMargin,
  },
  card: {
    width: screenWidth * 0.9, // Adjust this for card width
    height: 180,
    marginHorizontal: 12,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    backgroundColor: "white",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    opacity: 0.9,
  },
  dotContainer: {
    position: "absolute",
    bottom: 15,
    flexDirection: "row",
    alignSelf: "center",
  },
  dot: {
    width: 10, // Increased size for better visibility
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginHorizontal: 6, // Increased spacing for better clarity
  },
});
