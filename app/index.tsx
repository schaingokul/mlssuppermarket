import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { MD2Colors } from "react-native-paper";
import { colors } from "../const/colors";

const GetStartedSplashScreen = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to manage authentication status
  const [loading, setLoading] = useState(true); // State to manage loading
  const router = useRouter(); // Initialize the router

  // Function to check if username exists in AsyncStorage
  const checkUsername = async () => {
    try {
      const username = await AsyncStorage.getItem("username");
      setIsAuthenticated(!!username); // Set authenticated state based on username presence
    } catch (error) {
      console.error("Error checking username in AsyncStorage:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkUsername(); // Call the function to check username

      const timeoutId = setTimeout(() => {
        setLoading(false); // End loading after 3 seconds
      }, 2000); // Show splash screen for 3 seconds

      return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
    }, []),
  );

  // Handle navigation based on authentication status and loading state
  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.replace("/home"); // Navigate to home screen if authenticated
      } else {
        router.replace("/lost+found"); // Redirect to login page if not authenticated
      }
    }
  }, [loading, isAuthenticated]); // Run when loading or isAuthenticated changes

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Moon Light</Text>
      <ActivityIndicator
        animating={true}
        size="large"
        color={MD2Colors.blueA200}
      />
    </View>
  );
};

export default GetStartedSplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary, // Ensure this matches your intended color
  },
  logoText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#ffffff", // Adjust to your design
    marginBottom: 20,
  },
});
