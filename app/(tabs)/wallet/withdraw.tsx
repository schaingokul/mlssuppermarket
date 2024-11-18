import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { colors } from "../../../const/colors";

const Withdraw = () => {
  const [username, setUsername] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      const storedUsername = await AsyncStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername); // Set the username state
      }
    };
    fetchUsername();
  }, []);

  const handleRequest = async () => {
    if (!withdrawAmount) {
      setModalMessage("Please fill in all fields.");
      setModalVisible(true);
      return;
    }

    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setModalMessage("Please enter a valid withdrawal amount.");
      setModalVisible(true);
      return;
    }

    // Check if the withdraw amount is less than 500
    if (amount < 500) {
      setModalMessage("The minimum withdrawal amount is ₹500.");
      setModalVisible(true);
      return;
    }

    console.log("Username:", username); // Debugging line
    console.log("Withdraw Amount:", withdrawAmount); // Debugging line
    try {
      setLoading(true); // Show loading state while making the request
      const response = await fetch(
        "https://dawn.zetspring.com/dawn/super_market/withdrawals_api.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            amount,
          }),
        },
      );

      const data = await response.json();
      console.log("Request response:", data);

      if (data.status === "success") {
        Alert.alert("Success", "Payment request submitted successfully.");
        router.push("/wallet/");
      } else {
        setModalMessage(`Error: ${data.message}`);
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Error submitting request", error);
      setModalMessage("Something went wrong. Please try again.");
      setModalVisible(true);
    } finally {
      setLoading(false); // Hide loading state after the request is completed
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primaryDark} />
      ) : (
        <>
          <Text style={styles.instruction}></Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Withdraw Amount :</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Withdraw Amount"
              keyboardType="numeric"
              value={withdrawAmount}
              onChangeText={setWithdrawAmount}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleRequest}>
            <Text style={styles.buttonText}>Request</Text>
          </TouchableOpacity>
        </>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 20,
    alignItems: "center", // Center content horizontally
  },
  text: {
    fontSize: 18,
    color: colors.primaryDark,
    marginBottom: 20,
    marginTop: 10,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: colors.primaryDark,
    marginBottom: 5,
  },
  input: {
    height: 50,
    width: "100%", // Ensure input takes full width of container
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: colors.white,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: "60%", // Make the button full width
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent black background
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalText: {
    fontSize: 18,
    color: colors.primaryDark,
    marginBottom: 15,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "bold",
  },
});

export default Withdraw;
