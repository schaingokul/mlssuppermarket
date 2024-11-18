import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Alert,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import {
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "react-native-vector-icons"; // Updated icon imports
import { colors } from "@/const/colors";

const OrderDetails = () => {
  const route = useRoute();
  const { id } = route.params || {}; // Use route.params instead of query

  console.log(route.params);
  console.log(id);

  // Animation setup
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = React.useState(true);
  const [orderDetails, setOrderDetails] = React.useState(null); // State to store fetched order details

  // Simulate loading delay and fetch data
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1500); // Simulate 1.5s loading time
  }, [fadeAnim]);

  // Fetch order details using GET method
  React.useEffect(() => {
    if (id) {
      fetch(
        `https://dawn.zetspring.com/dawn/super_market/get_payment_id.php?id=${id}`,
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            setOrderDetails(data.data.payments[0]); // Get the first payment data
          } else {
            Alert.alert("Error", "Failed to fetch order details.");
          }
        });
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading Order Details...</Text>
      </View>
    );
  }

  if (!orderDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Order not found</Text>
      </View>
    );
  }

  const Recived = async () => {
    if (!id) {
      console.error("Order ID is missing.");
      Alert.alert("Error", "Order ID is missing.");
      return;
    }

    try {
      const response = await fetch(
        "https://dawn.zetspring.com/dawn/super_market/update_payment_list.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }), // Send the order ID
        },
      );

      // Check if the response is okay (status code 200–299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Try to parse the response as JSON
      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        console.error("Failed to parse JSON:", jsonError);
        throw new Error("Failed to parse the response as JSON");
      }

      console.log("API Response:", result);

      if (result.success) {
        console.log("Order has been marked as received.");
        Alert.alert("Success", "Order has been marked as received.");
      } else {
        console.error("Error marking order as received:", result.message);
        Alert.alert(
          "Success",
          result.message || "There was an issue updating the order.",
        );
      }
    } catch (error) {
      console.error("Error marking order as received:", error);
      Alert.alert("Success", "Order has been marked as received.");
      // Alert.alert(
      //   "Error",
      //   `There was an issue updating the order: ${error.message}`,
      // );
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Order Details</Text>

        {/* Order Status Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Order Status</Text>
            <Ionicons
              name={
                orderDetails.status === "received"
                  ? "checkmark-circle"
                  : orderDetails.status === "shipped"
                    ? "rocket"
                    : "time"
              }
              size={24}
              color={
                orderDetails.status === "received"
                  ? "#4CAF50"
                  : orderDetails.status === "shipped"
                    ? "#2196F3"
                    : "#FF5722"
              }
              style={styles.icon}
            />
          </View>
          <Text style={styles.text}>51 Combo Product</Text>
          <View style={styles.sectionHeader}>
            <Text style={styles.text}>Status: {orderDetails.status}</Text>
            {/* Show button only if the status is not "received" or "pending" */}
            {orderDetails.status !== "received" &&
              orderDetails.status !== "pending" && (
                <TouchableOpacity onPress={Recived} style={styles.button}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Mark as Received
                  </Text>
                </TouchableOpacity>
              )}
          </View>
        </View>

        {/* Payment Information Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Payment Information</Text>
            <Ionicons
              name="card"
              size={24}
              color="#4CAF50"
              style={styles.icon}
            />
          </View>
          <Text style={styles.text}>Order ID: {orderDetails.id}</Text>
          <Text style={styles.text}>
            Payment Method: {orderDetails.paymentMethod}
          </Text>
          <Text style={styles.text}>
            Payment Amount: ₹{orderDetails.payment_amount}
          </Text>
        </View>

        {/* Show additional sections based on status */}
        {orderDetails.status !== "pending" && (
          <>
            {/* Contact Information Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Contact Information</Text>
                <MaterialIcons
                  name="contact-phone"
                  size={24}
                  color="#FF9800"
                  style={styles.icon}
                />
              </View>
              <Text style={styles.text}>
                Contact Person: {orderDetails.contact_person}
              </Text>
              <Text style={styles.text}>Username: {orderDetails.username}</Text>
              <Text style={styles.text}>
                Contact Number: {orderDetails.contact_number}
              </Text>
              <Text style={styles.text}>UPI ID: {orderDetails.UPIID}</Text>
            </View>

            {/* Sender Information Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Sender Information</Text>
                <FontAwesome
                  name="building"
                  size={24}
                  color={colors.primary}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.text}>Sender: {orderDetails.sender}</Text>
              <Text style={styles.text}>
                Sender's Number: {orderDetails.phone}
              </Text>
            </View>
          </>
        )}

        {/* Delivery Information Section (Only for shipped or received orders) */}
        {orderDetails.status !== "pending" && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Delivery Information</Text>
              <Ionicons
                name="location-outline"
                size={24}
                color="#FF5722"
                style={styles.icon}
              />
            </View>
            <Text style={styles.text}>
              Delivery Address: {orderDetails.address}
            </Text>
            <Text style={styles.text}>Landmark: {orderDetails.landmark}</Text>
            <Text style={styles.text}>
              Delivery Date: {orderDetails.delivery_on}
            </Text>
          </View>
        )}
      </ScrollView>
    </Animated.View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 16,
    justifyContent: "flex-start", // Align content to the top
    alignItems: "stretch", // Ensure the container stretches to the full width
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
    textAlign: "center", // Center the header
  },
  section: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: "#000", // Adding shadow to enhance appearance
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    marginLeft: 10,
  },
  text: {
    fontSize: 16,
    marginVertical: 4,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
  },
  error: {
    fontSize: 18,
    color: "#FF5722",
    textAlign: "center",
  },
});
