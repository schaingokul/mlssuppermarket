import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Initialize useRouter hook

  const onLoginPress = async () => {
    console.log("Login button pressed.");

    const apiUrl = `https://dawn.zetspring.com/dawn/super_market/moonlight_verification.php?phoneNumber=${username}&pass=${password}`;
    console.log("API URL: ", apiUrl);

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("API Response status: ", response.status);

      const data = await response.json();
      console.log("Response data: ", data);

      if (response.ok && data.status === "success") {
        console.log("Login successful!");
        Alert.alert("Login successful", "You can now proceed to use the app.");

        // Save username and phone number (if available) to AsyncStorage
        await AsyncStorage.setItem("username", data.username);
        await AsyncStorage.setItem("phoneNumber", username); // Save the entered phone number

        router.replace("/(tabs)/home");
      } else {
        console.log("Login failed: ", data.message || "Invalid credentials");
        Alert.alert("Username or password is incorrect", "You can try again", [
          { text: "Retry" },
        ]);
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("An error occurred", "Please try again later", [
        { text: "OK" },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.AuthContainer}>
        <Text style={styles.AuthText}>Login Account</Text> 
          <Text>Welcome Back! Youhhh'vqwere been missed</Text>
      </View>
      {/* Input Fields */}
      <Text style={styles.label}>Username</Text>
      <TextInput
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
        keyboardType="default"
        autoCapitalize="none"
        style={styles.input}
        returnKeyType="next"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        returnKeyType="done"
      />

      {/* Forgot Password Link */}
      <Text
        style={styles.forgot}
        onPress={() => router.push("/forgot")} // Update navigation to use router
      >
        Forgot Password?
      </Text>

      {/* Signup Navigation */}
      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.TextStyle}>
          New user?
          <Text style={styles.TextLink}>Sign Up</Text>
        </Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={onLoginPress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
