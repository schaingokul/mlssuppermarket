import React, { useState } from "react";
import { Text, TouchableOpacity, TextInput, View, Alert } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, width, height } from "../../colors.jsx";
import styles from "./styles.js";

export default function AuthScreen({ navigation, setIsLoggedIn }) {
  const [usernames, setUsernames] = useState("");
  const [passwords, setPasswords] = useState("");
  const [confirmPasswords, setConfirmPasswords] = useState("");
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const handleLogin = () => {
    if (!usernames || !passwords) {
      Alert.alert("Please enter both username and password");
      return;
    }

    if (usernames.length < 6) {
      Alert.alert("Username must be at least 6 characters long");
      return;
    }

    if (passwords.length < 6) {
      Alert.alert("Password must be at least 6 characters long");
      return;
    }

    setIsLoggedIn(false);
    navigation.navigate("Auth"); // Navigate to home screen
  };
  return (
    <View style={styles.container}>
      <View style={styles.AuthContainer}>
        <Text style={styles.AuthText}>Reset Password</Text>
        <Text style={styles.AuthSubText}>
          You need to make sure your account
        </Text>
      </View>
      <Text style={styles.label}>Username</Text>
      <TextInput
        placeholder="Enter your username"
        value={usernames}
        onChangeText={setUsernames}
        keyboardType="default"
        autoCapitalize="none"
        style={styles.input}
        returnKeyType="password"
        required
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="Enter your password"
        value={passwords}
        onChangeText={setPasswords}
        secureTextEntry
        returnKeyType="done"
        required
        style={styles.input}
      />
      <Text style={styles.label}>Re-Enter Password</Text>
      <TextInput
        placeholder="Re-Enter your password"
        value={confirmPasswords}
        onChangeText={setConfirmPasswords}
        secureTextEntry
        returnKeyType="done"
        required
        style={styles.input}
      />
      <TouchableOpacity
        mode="contained"
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}
