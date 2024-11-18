import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

// colors
import { colors } from "@/const/colors";

const Orders = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [shippedOrders, setShippedOrders] = useState([]);
  const [username, setUsername] = useState("");

  // Fetch data function to get the latest orders and payment info
  const fetchOrdersData = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);

        const response = await fetch(
          `https://dawn.zetspring.com/dawn/super_market/get_payment_user.php?username=${storedUsername}`,
        );
        const data = await response.json();
        if (!response.ok) {
          console.log(data);
          setDeliveredOrders([]);
          setPendingOrders([]);
          setRecentOrders([]);
          setShippedOrders([]);
        }

        if (data.status === "success") {
          const received = data.data.payments.filter(
            (payment) => payment.status === "received",
          );
          const pending = data.data.payments.filter(
            (payment) => payment.status === "pending",
          );
          const shipped = data.data.payments.filter(
            (payment) => payment.status === "shipped",
          );

          setDeliveredOrders(received); // Last 3 delivered orders
          setPendingOrders(pending);
          setRecentOrders(pending.slice(0, 3)); // Last 3 recent orders
          setShippedOrders(shipped);
        } else {
          console.error("Failed to fetch payment data");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrdersData();
    }, []),
  );

  const onOrderPress = (id) => {
    router.push({ pathname: "/(tabs)/order/OrderDetails", params: { id } });
  };

  const onDeliveredOrdersPress = () => {
    router.push("/(tabs)/order/OrderHistory");
  };

  const onPendingOrdersPress = () => {
    router.push("/(tabs)/order/PendingOrder");
  };

  const onShippedOrdersPress = () => {
    router.push("/(tabs)/order/CurrentOrder");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Orders Summary</Text>
        <Text style={styles.subHeader}>
          Manage and track your orders effectively
        </Text>
      </View>

      {/* Summary Section */}
      <View style={styles.summaryContainer}>
        <TouchableOpacity
          onPress={onDeliveredOrdersPress}
          style={styles.cardButton}
        >
          <Text style={styles.summaryButtonText}>
            Orders: {deliveredOrders.length}
          </Text>
          <Icon name="keyboard-arrow-right" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPendingOrdersPress}
          style={styles.cardButton}
        >
          <Text style={styles.summaryButtonText}>
            Pending Orders: {pendingOrders.length}
          </Text>
          <Icon name="keyboard-arrow-right" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onShippedOrdersPress}
          style={styles.cardButton}
        >
          <Text style={styles.summaryButtonText}>
            Shipped Orders: {shippedOrders.length}
          </Text>
          <Icon name="keyboard-arrow-right" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Recent Orders */}
      <Text style={styles.header}>Recent Orders</Text>
      <Text style={styles.subHeader}>Here are your latest received orders</Text>

      {/* Check if there are received orders */}
      {deliveredOrders.length === 0 && pendingOrders.length === 0 ? (
        <Text style={styles.noDataText}>No orders available</Text>
      ) : (
        <FlatList
          data={recentOrders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Animated.View style={styles.card}>
              <TouchableOpacity
                style={styles.cardContent}
                onPress={() => onOrderPress(item.id)}
              >
                <Icon name="history" size={24} color={colors.primary} />
                <View style={styles.details}>
                  <Text style={styles.orderText}>Order ID: {item.id}</Text>
                  <Text style={styles.orderText}>
                    Amount: ₹{item.payment_amount}
                  </Text>
                  <Text style={styles.orderStatus}>Status: {item.status}</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}
        />
      )}
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  headerContainer: {
    marginBottom: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 12,
    color: colors.primaryDark,
  },
  subHeader: {
    fontSize: 14,
    color: colors.primaryDark,
    marginBottom: 8,
  },
  summaryContainer: {
    borderRadius: 10,
    marginBottom: 16,
  },
  cardButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  summaryButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  details: {
    marginLeft: 16,
    flex: 1,
  },
  orderText: {
    fontSize: 14,
    color: colors.primaryDark,
    marginBottom: 4,
  },
  orderStatus: {
    fontSize: 12,
    color: colors.primaryLight,
  },
  noDataText: {
    fontSize: 16,
    color: colors.primaryDark,
    textAlign: "center",
    marginTop: 20,
  },
});
