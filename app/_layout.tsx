import { Stack } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../const/colors";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router"; // Import useRouter for navigation

const Stacklayout = () => {
  const [loading, setLoading] = useState(true); // State to manage loading
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to manage authentication status
  const router = useRouter(); // Initialize the router

  // Check if username exists in AsyncStorage
  useFocusEffect(
    useCallback(() => {
      const checkUsername = async () => {
        try {
          const username = await AsyncStorage.getItem("username");
          if (username) {
            setIsAuthenticated(true);
          } else {
            console.log("No username found, staying on the index page.");
          }
        } catch (error) {
          console.error("Error checking username in AsyncStorage:", error);
        } finally {
          setLoading(false); // Set loading to false after check is complete
        }
      };

      checkUsername();
    }, []), // Empty dependency array ensures this runs once on focus
  );

  // Handle navigation based on loading and authentication state
  useEffect(() => {
    // Only navigate after loading is complete
    if (!loading) {
      if (isAuthenticated) {
        router.replace("/home"); // Navigate to home screen if authenticated
      } else {
        router.replace("/getstart"); // Redirect to index page if not authenticated
      }
    }
  }, [loading, isAuthenticated]); // Run when loading or isAuthenticated changes

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.primary,
        }}
      >
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "#f5f5f5" },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />
      <Stack.Screen
        name="(admin)"
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "#f5f5f5" },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />

      <Stack.Screen
        name="getstart"
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "#f5f5f5" },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          animation: "ios",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />
      <Stack.Screen
        name="succesfull"
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: colors.primaryHighOpacity },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          animation: "ios",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />

      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: colors.primaryHighOpacity },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          animation: "ios",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />

      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Register",
          headerStyle: { backgroundColor: colors.primary },
          headerTitleAlign: "center",
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          animation: "ios",
          presentation: "modal",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />
      <Stack.Screen
        name="AddCoin"
        options={{
          title: "Order",
          headerStyle: { backgroundColor: colors.primary },
          headerTitleAlign: "center",
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          animation: "ios",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />
      <Stack.Screen
        name="Orders"
        options={{
          title: "Orders",
          headerStyle: { backgroundColor: colors.primary },
          headerTitleAlign: "center",
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          animation: "ios",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />

      <Stack.Screen
        name="Kyc"
        options={{
          title: "",
          headerStyle: { backgroundColor: colors.primary },
          headerTitleAlign: "center",
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          animation: "ios",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />
      <Stack.Screen
        name="forgot"
        options={{
          title: "Forgot Password",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          animation: "ios",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />
    </Stack>
  );
};

export default Stacklayout;
