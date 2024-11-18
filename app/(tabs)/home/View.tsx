import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { products } from "@/const/products"; // Assuming products is an array of your items

const CompositionEvent = () => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity is 0 (invisible)

  useEffect(() => {
    // Fade-in effect when the component mounts
    Animated.timing(fadeAnim, {
      toValue: 1, // Final opacity value (fully visible)
      duration: 1000, // Duration of the animation (1 second)
      useNativeDriver: true, // Use native driver for performance
    }).start();
  }, []);

  const renderItem = ({ item, index }) => (
    <Animated.View style={[styles.itemContainer, { opacity: fadeAnim }]}>
      <Text style={styles.serialNumber}>Serial No: {index + 1}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.name}>Name: {item.item}</Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
      </View>
    </Animated.View>
  );

  return (
    <FlashList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      estimatedItemSize={80}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  serialNumber: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  textContainer: {
    marginTop: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  quantity: {
    fontSize: 14,
    color: "#666",
  },
});

export default CompositionEvent;
