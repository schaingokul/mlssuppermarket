import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Button,
  Menu,
  Divider,
  Provider,
  DefaultTheme,
  Title,
} from "react-native-paper";
import { colors } from "../const/colors";
import { router } from "expo-router";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.secondary,
    background: colors.background,
    text: colors.text,
    surface: colors.white,
    placeholder: colors.primaryMediumOpacity,
    backdrop: colors.primaryLowOpacity,
    notification: colors.primaryHighOpacity,
  },
};

const Upload = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [username, setUsername] = useState("");
  const [UPIID, setUPIID] = useState("");
  const [boxes, setBoxes] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [senderName, setSenderName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [date, setDate] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setDate(currentDate);
  }, []);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error("Error fetching username from AsyncStorage:", error);
      }
    };
    fetchUsername();
  }, []);
  const handleSubmit = async () => {
    // Validate if all required fields are filled
    if (
      !paymentMethod ||
      !boxes ||
      !UPIID ||
      !address ||
      !landmark ||
      !senderName ||
      !contactNumber
    ) {
      Alert.alert("Missing Information", "Please fill in all the fields.");
      return;
    } else {
      // Validate that the quantity is a number
      if (isNaN(boxes) || boxes <= 0) {
        Alert.alert("Invalid Quantity", "Please enter a valid quantity.");
        return;
      }

      const paymentDetails = {
        username,
        paymentMethod,
        amount: boxes * 3000,
        boxes,
        UPIID,
        address,
        landmark,
        sender: senderName,
        phoneNumber: contactNumber,
        date,
      };

      try {
        const response = await fetch(
          "https://dawn.zetspring.com/dawn/super_market/payment_send.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentDetails),
          },
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        router.push("/succesfull");
      } catch (error) {
        console.error("Error submitting payment details:", error);
      }
    }
  };
  return (
    <Provider theme={theme}>
      <ScrollView style={styles.container}>
        <Title style={styles.heading}>Payment Details</Title>
        <Title style={styles.heading}>{username}</Title>

        <Text style={styles.label}>Payment Method:</Text>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button
              style={styles.button}
              onPress={openMenu}
              mode="outlined"
              icon="chevron-down"
              labelStyle={styles.buttonLabel}
            >
              {paymentMethod || "Select Payment Method"}
            </Button>
          }
        >
          {["PhonePe", "Google Pay", "Paytm", "Others"].map((method) => (
            <Menu.Item
              key={method}
              onPress={() => {
                setPaymentMethod(method);
                closeMenu();
              }}
              title={method}
            />
          ))}
          <Divider />
        </Menu>

        <Text style={styles.label}>Quantity</Text>
        <TextInput
          style={styles.input}
          value={boxes}
          onChangeText={setBoxes}
          placeholder="Enter Quantity"
          keyboardType="numeric"
        />
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          value={(boxes * 3000).toString()}
          placeholder="Amount"
          keyboardType="numeric"
          editable={false}
        />

        <Text style={styles.label}>Delivery Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter Delivery Address"
        />

        <Text style={styles.label}>Landmark </Text>
        <TextInput
          style={styles.input}
          value={landmark}
          onChangeText={setLandmark}
          placeholder="Enter Landmark"
        />

        <Text style={styles.label}>Sender Name</Text>
        <TextInput
          style={styles.input}
          value={senderName}
          onChangeText={setSenderName}
          placeholder="Enter sender name"
        />

        <Text style={styles.label}>Contact Number</Text>
        <TextInput
          style={styles.input}
          value={contactNumber}
          onChangeText={setContactNumber}
          placeholder="Enter contact number"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>UPI ID</Text>
        <TextInput
          style={styles.input}
          value={UPIID}
          onChangeText={setUPIID}
          placeholder="Enter UPI ID"
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          Submit
        </Button>
      </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: colors.background,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.primaryDark,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: colors.primaryDark,
    marginBottom: 5,
  },
  input: {
    marginBottom: 15,
    backgroundColor: colors.white,
    padding: 10,
  },
  button: {
    width: "100%",
    marginBottom: 10,
    borderRadius: 10,
  },
  buttonLabel: {
    textAlign: "left",
  },
  submitButton: {
    marginTop: 20,
    borderRadius: 10,
    marginBottom: 100,
  },
});

export default Upload;
