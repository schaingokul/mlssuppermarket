import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Modal,
  Button,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "@/const/colors"; // Importing colors from your colors file
import { FontAwesome } from "@expo/vector-icons";
import { ScrollViewBase } from "react-native";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [username, setUsername] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch username from AsyncStorage
  useEffect(() => {
    const fetchUsername = async () => {
      const storedUsername = await AsyncStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername); // Set the username from AsyncStorage
      }
    };
    fetchUsername();
  }, []);

  // Fetch orders based on the username
  const getOrders = async () => {
    try {
      const response = await fetch(
        `https://dawn.zetspring.com/dawn/super_market/get_payment_user.php?username=${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const result = await response.json();
      if (result.status === "success") {
        setOrders(result.data.payments); // Update the state with the fetched orders
      } else {
        console.error("Failed to fetch orders:", result.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getOrders(); // Fetch orders when the component mounts or username changes
  }, [selectedOrder]);

  // Set the selected order and show the modal
  const handleOrderPress = (order) => {
    setSelectedOrder(order); // Update selectedOrder state when an order is clicked
    setIsModalVisible(true); // Open the modal
  };

  // Mark the selected order as received
  const handleMarkAsReceived = async () => {
    if (!selectedOrder) return;

    try {
      const response = await fetch(
        "https://dawn.zetspring.com/dawn/super_market/update_payment_list.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: selectedOrder.id }), // Use the selectedOrder id
        },
      );

      const result = await response.json();
      if (result.success) {
        Alert.alert("Success", result.message);
        getOrders(); // Refresh the orders list after updating
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      console.error("Error marking order as received:", error);
      Alert.alert("Error", "There was an issue updating the order.");
    }
    setIsModalVisible(false); // Close the modal after the action
  };
  const handleSupport = () => {
    setIsModalVisible(false); // Close the modal if support button is clicked
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Orders for {username}</Text>
      <Text style={styles.status}>Click the order to know more details</Text>

      <View style={styles.orderList}>
        <FlatList
          data={orders}
          renderItem={({ item }) => (
            <Pressable onPress={() => handleOrderPress(item)}>
              <View style={styles.orderItem}>
                <Text>Transaction ID: {item.id}</Text>
                <Text>Boxes: {item.boxes}</Text>
                <Text>Order Status: {item.status}</Text>
              </View>
            </Pressable>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primaryDark,
    marginBottom: 10,
  },
  status: {
    fontSize: 16,
    color: colors.secondaryText,
    marginBottom: 20,
  },
  orderList: {
    marginBottom: 30,
  },
  orderItem: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  modalOverlay: {
    flex: 1,
    zIndex: -1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lowOpacity,
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  closeButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  markAsReceivedButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  supportButton: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
