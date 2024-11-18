import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Clipboard,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage"; // To access AsyncStorage
import { colors } from "../../../const/colors";
import { router } from "expo-router";

const Deposit = () => {
  const [imageUri, setImageUri] = useState(null);
  const [username, setUsername] = useState(""); // State to store username

  useEffect(() => {
    const fetchUsername = async () => {
      const storedUsername = await AsyncStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername); // Set the username state
      }
    };
    fetchUsername();
  }, []);

  const upiid = "9790472122@airtel";

  const handleCopyUPI = () => {
    Clipboard.setString("9790472122@airtel");
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Instruction: Copy the UPI ID, make a payment using it, and click
          "Order Details " to fill in the details as per the instructions. Each
          box costs ₹3000, so please ensure that you make the correct payment
          for box's and enter the details accurately in the form.
        </Text>

        {username && <Text style={styles.username}>Hello, {username}!</Text>}

        {/* Copyable UPI ID */}
        <TouchableOpacity onPress={handleCopyUPI} style={styles.upiContainer}>
          <Text style={styles.upiText}>UPI ID: {upiid}</Text>
          <Text style={styles.copyText}>(Tap to Copy)</Text>
        </TouchableOpacity>

        {/* UPI QR code image placeholder */}
        <View style={styles.qrContainer}>
          <Image
            source={require("../../../assets/images/QR.png")}
            style={styles.qrImage}
          />
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          {/* Image upload button and display */}
          <TouchableOpacity
            onPress={() => router.push("/AddCoin")}
            style={styles.Button}
          >
            <Text style={styles.ButtonText}>Order Details</Text>
          </TouchableOpacity>
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
          )}
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primaryDark,
    marginBottom: 20,
  },
  instructions: {
    fontSize: 14,
    color: "#4a4a4a",
    textAlign: "center",
    marginBottom: 20,
  },
  username: {
    fontSize: 18,
    color: colors.primaryDark,
    marginBottom: 20,
    fontWeight: "bold",
  },
  upiContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: colors.primaryLowOpacity,
    borderRadius: 8,
    marginBottom: 20,
  },
  upiText: {
    fontSize: 16,
    color: colors.primaryDark,
    fontWeight: "bold",
  },
  copyText: {
    fontSize: 12,
    color: colors.primary,
    marginLeft: 8,
  },
  qrContainer: {
    width: 200,
    height: 200,
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 4,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  qrText: {
    fontSize: 14,
    color: colors.primaryDark,
    marginBottom: 10,
  },
  qrImage: {
    width: 180,
    height: 180,
  },
  input: {
    width: "95%",
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.white,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 20,
    color: "#333",
  },
  uploadedImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 20,
  },
  Button: {
    backgroundColor: colors.primary,
    padding: 10,
    width: "auto",
    borderRadius: 8,
    alignItems: "center",
  },
  ButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Deposit;
