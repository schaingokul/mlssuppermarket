import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const KycDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [kycData, setKycData] = useState({
    name: "",
    fatherOrSpouseName: "",
    phoneNumber: "",
    address: "",
    aadharNumber: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    upiId: "",
    landmark: "",
  });

  useEffect(() => {
    const fetchKycData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        if (!storedUsername) {
          Alert.alert("Error", "Username not found in local storage.");
          return;
        }

        const response = await fetch(
          `https://dawn.zetspring.com/dawn/super_market/get_kyc_user.php?name=${storedUsername}`,
        );

        console.log("API Response status: ", response.status);
        console.log("API Response headers: ", response);
        if (response.ok) {
          const responseData = await response.json();
          const data = responseData.data[0]; // Access the first item in the data array
          console.log("API Response data: ", data);

          setKycData({
            name: data.name || "",
            fatherOrSpouseName: data.fatherOrSpouseName || "",
            phoneNumber: data.phoneNumber || "",
            address: data.address || "",
            aadharNumber: data.aadharNumber || "",
            bankName: data.bankName || "",
            accountNumber: data.accountNumber || "",
            ifscCode: data.ifscCode || "",
            landmark: data.landmark || "",
            upiId: data.upiId || "", // If this field is missing from response, leave it empty
          });
        } else {
          router.back();
          Alert.alert(
            "No data",
            "Try to Submit KYC Verification and try again.",
          );
        }
      } catch (error) {
        router.back();
        Alert.alert("No data", "Try to Submit KYC Verification and try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchKycData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading KYC details...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>KYC Details</Text>

      <View style={styles.card}>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{kycData.name}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Father/Spouse Name:</Text>
          <Text style={styles.value}>{kycData.fatherOrSpouseName}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.value}>{kycData.phoneNumber}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{kycData.address}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Aadhar Number:</Text>
          <Text style={styles.value}>{kycData.aadharNumber}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Bank Name:</Text>
          <Text style={styles.value}>{kycData.bankName}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Account Number:</Text>
          <Text style={styles.value}>{kycData.accountNumber}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>UPI ID:</Text>
          <Text style={styles.value}>{kycData.upiId || "Not available"}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>IFSC Code:</Text>
          <Text style={styles.value}>{kycData.ifscCode}</Text>
        </View>
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
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    marginBottom: 20,
  },
  detailContainer: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    fontSize: 16,
  },
  value: {
    color: "#666",
    flex: 2,
    fontSize: 16,
  },
});

export default KycDetails;
