import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { router } from "expo-router";

const Successfull = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade-in animation for the text
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Redirect to the "order" page after a short delay (e.g., 3 seconds)
    const timer = setTimeout(() => {
      router.push("/order/");
    }, 3000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
        <Text style={styles.successText}>Success!</Text>
        <Text style={styles.messageText}>
          You will be redirected shortly...
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
  },
  textContainer: {
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#e0ffe0",
  },
  successText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: 10,
  },
  messageText: {
    fontSize: 18,
    color: "#555",
  },
});

export default Successfull;
