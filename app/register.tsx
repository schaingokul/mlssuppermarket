import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Button as PaperButton, Checkbox } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons"; // Importing FontAwesome for the eye icon
import { useRouter } from "expo-router"; // Import useRouter
import styles from "./styles";

export default function SignupScreen({ setIsLoggedIn }) {
  const [username, setUsername] = useState(""); // Username state
  const [phoneNumber, setPhoneNumber] = useState("+91"); // Phone number state initialized with "+91"
  const [password, setPassword] = useState(""); // New Password state
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm Password state
  const [referralId, setReferralId] = useState(""); // Optional Referral ID state
  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter(); // Initialize router

  const handleUsernameChange = (text) => {
    // Replace spaces with underscores
    const modifiedText = text.replace(/\s+/g, "_");
    setUsername(modifiedText);
  };

  const handleSignup = async () => {
    if (!username || !phoneNumber || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    if (!termsAccepted) {
      Alert.alert("Error", "You must accept the terms to register.");
      return;
    }

    const userData = {
      username,
      mobileNumber: phoneNumber,
      password,
      introducerCode: referralId,
    };

    const response = await fetch(
      "https://dawn.zetspring.com/dawn/super_market/sign_in_moonlight.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      },
    );

    if (!response.ok) {
      console.log("Network response was not ok", response);
      throw new Error("Network response was not ok");
    }

    const data = await response.json(); // Parse the JSON response
    console.log("User registered: ", data);

    // Store the mobile number in AsyncStorage
    await AsyncStorage.setItem("phoneNumber", phoneNumber);
    console.log(phoneNumber);

    Alert.alert("Success", "Your account has been created");
    // Set login status and route
    router.replace("/login"); // Use router.push instead of navigation.navigate
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          placeholder="Enter Your username"
          value={username}
          onChangeText={handleUsernameChange}
          style={styles.input}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
          keyboardType="phone-pad"
        />
        <Text style={styles.label}>New Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Enter your new password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
        </View>

        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
          />
        </View>

        <Text style={styles.label}>Referral ID (optional)</Text>
        <TextInput
          placeholder="Enter referral ID"
          value={referralId}
          onChangeText={setReferralId}
          style={styles.input}
        />

        <View style={styles.termsContainer}>
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={termsAccepted ? "checked" : "unchecked"}
              onPress={() => {
                setTermsAccepted(!termsAccepted);
              }}
            />
            <Text style={styles.checkboxLabel}>
              By registering, you agree to the terms and conditions
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => router.replace("/login")}>
          <Text style={styles.TextStyle}>
            If you have an account? <Text style={styles.TextLink}>Sign In</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
