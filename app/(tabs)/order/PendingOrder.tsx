import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage"; // Make sure to import AsyncStorage
import { colors } from "@/const/colors"; // Assume colors are defined elsewhere
import { FontAwesome } from "@expo/vector-icons";

const Orders = () => {
  const [receivedPayments, setReceivedPayments] = useState([]); // State for received payments
  const [pendingPayments, setPendingPayments] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        console.log("Retrieved Username:", storedUsername);
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };
    fetchUsername();
  }, []);

  useEffect(() => {
    if (username) {
      fetch(
        `https://dawn.zetspring.com/dawn/super_market/get_payment_user.php?username=${username}`,
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            const pending = data.data.payments.filter(
              (payment) => payment.status === "pending",
            );
            setPendingPayments(pending);
            console.log("Pending payments:", pending);
          } else {
            console.error("Failed to fetch payment data");
          }
        })
        .catch((error) => {
          console.error("Error fetching payment data:", error);
        });
    }
  }, [username]);

  const onCardPress = async (id) => {
    console.log("Current page", id);
    router.push({ pathname: "/(tabs)/order/OrderDetails", params: { id } });
  };

  // Animation setup for card
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.95);
  const iconScaleAnim = new Animated.Value(0.8);
  const iconRotateAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();

    Animated.parallel([
      Animated.spring(iconScaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.timing(iconRotateAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim, iconScaleAnim, iconRotateAnim]);

  return (
    <View style={styles.container}>
      {pendingPayments.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No Current Order's</Text>
        </View>
      ) : (
        <FlatList
          data={pendingPayments}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Animated.View
              style={[
                styles.card,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              <TouchableOpacity
                style={styles.cardContent}
                onPress={() => onCardPress(item.id)}
              >
                <Animated.View
                  style={{
                    transform: [
                      { scale: iconScaleAnim },
                      {
                        rotate: iconRotateAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ["0deg", "15deg"],
                        }),
                      },
                    ],
                  }}
                >
                  <Icon name="payment" size={24} color={colors.primary} />
                </Animated.View>
                <View style={styles.details}>
                  <Text style={styles.orderHead}>51 Product Combo</Text>
                  <Text style={styles.orderText}>
                    Method: {item.paymentMethod}
                  </Text>
                  <Text style={styles.orderText}>
                    Expected Delivery: {item.delivery_on}
                  </Text>

                  <Text style={styles.orderText}>
                    Amount: ₹{item.payment_amount}
                  </Text>
                  <Text style={styles.orderText}>Date: {item.date}</Text>
                </View>
                <Icon
                  name="arrow-forward-ios"
                  size={20}
                  color={colors.primaryDark}
                  style={styles.arrowIcon}
                />
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
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Ensures elements are spaced evenly
  },
  details: {
    marginLeft: 16,
    flex: 1,
  },
  orderHead: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primaryDark,
  },
  orderText: {
    fontSize: 14,
    color: colors.primaryDark,
    marginBottom: 4, // Adds space between the order texts
  },
  arrowIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  noDataContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  noDataText: {
    fontSize: 18,
    color: colors.primaryDark,
    textAlign: "center",
  },
});
