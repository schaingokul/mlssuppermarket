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
import { colors } from "../../../const/colors";

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

const Upload = ({ initialCoinAmount }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [username, setUsername] = useState("");
  const [UPIID, setUPIID] = useState("");
  const [coin, setCoin] = useState(initialCoinAmount || "");
  const [amount, setAmount] = useState(""); // New amount field
  const [sender, setSender] = useState(""); // New sender field
  const [date, setDate] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Get the current date
    const currentDate = new Date();

    // Format the date (e.g., as 'YYYY-MM-DD')
    const formattedDate = currentDate.toISOString().split("T")[0];

    // Set the formatted date in state
    setDate(formattedDate);
  }, []);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        if (storedUsername) {
          console.log("Stored Username:", storedUsername);
          setUsername(storedUsername);
        } else {
          console.log("No username found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error fetching username from AsyncStorage:", error);
      }
    };
    fetchUsername();
  }, []);

  const handleSubmit = async () => {
    const paymentDetails = {
      username,
      paymentMethod,
      coin,
      amount,
      UPIID,
      sender,
      date,
    };

    console.log("Step 1 - Payment Details being sent:", paymentDetails);

    try {
      const response = await fetch(
        "https://dawn.zetspring.com/payment_send.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...paymentDetails }),
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      Alert.alert(response.statusText, data.message);

      if (data.success) {
        console.log("Step 2 - Payment successful:", data);
      } else {
        console.log("Step 2 - Payment failed:", data);
      }
    } catch (error) {
      console.error("Error submitting payment details:", error);
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
          style={{
            position: "absolute",
            width: 150,
            marginTop: -30,
            marginLeft: "30%",
            borderRadius: 10,
          }}
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
          <Menu.Item
            onPress={() => {
              setPaymentMethod("PhonePe");
              closeMenu();
            }}
            title="PhonePe"
          />
          <Menu.Item
            onPress={() => {
              setPaymentMethod("Google Pay");
              closeMenu();
            }}
            title="Google Pay"
          />
          <Menu.Item
            onPress={() => {
              setPaymentMethod("Paytm");
              closeMenu();
            }}
            title="Paytm"
          />
          <Menu.Item
            onPress={() => {
              setPaymentMethod("Others");
              closeMenu();
            }}
            title="Others"
          />
          <Divider />
        </Menu>

        <Text style={styles.label}>No of Coins</Text>
        <TextInput
          style={styles.input}
          value={coin}
          onChangeText={setCoin}
          placeholder="Enter number of coins"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Sender</Text>
        <TextInput
          style={styles.input}
          value={sender}
          onChangeText={setSender}
          placeholder="Enter sender name"
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
          Buy
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
    paddingLeft: 10,
  },
  button: {
    width: "100%",
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: "flex-start",
  },
  buttonLabel: {
    flex: 1,
    textAlign: "left",
  },
  submitButton: {
    marginTop: 20,
    borderRadius: 10,
    marginBottom: 100,
  },
});

export default Upload;
