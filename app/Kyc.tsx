import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../const/colors";

const Kyc = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [fatherOrSpouseName, setFatherOrSpouseName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [upiId, setUpiId] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      const storedUsername = await AsyncStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    };
    fetchUsername();
  }, []);

  const handleSubmit = async () => {
    if (
      !username ||
      !fatherOrSpouseName ||
      !phoneNumber ||
      !address ||
      !landmark ||
      !upiId ||
      !aadharNumber ||
      !bankName ||
      !accountNumber ||
      !ifscCode
    ) {
      Alert.alert("Validation Error", "Please fill all the fields.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://dawn.zetspring.com/dawn/super_market/add_kyc.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            fatherOrSpouseName,
            phoneNumber,
            address,
            landmark,
            upiId,
            aadharNumber,
            bankName,
            accountNumber,
            ifscCode,
          }),
        },
      );

      const data = await response.json();
      console.log("API Response data: ", data);
      if (response.ok && data.status === "success") {
        Alert.alert("Success", "KYC details saved successfully.");
        console.log("KYC details saved successfully.", data);
      } else {
        console.log("Error saving KYC details: ", data.message);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while saving data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>KYC Verification</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Father/Spouse Name"
        value={fatherOrSpouseName}
        onChangeText={setFatherOrSpouseName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Landmark"
        value={landmark}
        onChangeText={setLandmark}
      />
      <TextInput
        style={styles.input}
        placeholder="UPI ID"
        value={upiId}
        onChangeText={setUpiId}
      />
      <TextInput
        style={styles.input}
        placeholder="Aadhar Number"
        value={aadharNumber}
        onChangeText={setAadharNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Bank Name"
        value={bankName}
        onChangeText={setBankName}
      />
      <TextInput
        style={styles.input}
        placeholder="Bank Account Number"
        value={accountNumber}
        onChangeText={setAccountNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="IFSC Code"
        value={ifscCode}
        onChangeText={setIfscCode}
        autoCapitalize="characters"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: colors.primary,
    width: "50%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: colors.text,
  },
});

export default Kyc;
