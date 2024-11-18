import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

export const colors = {
  background: "#f9f9f9",
  cardBackground: "#ffffff",
  border: "#e0e0e0",
  textPrimary: "#333333",
  textSecondary: "#555555",
  primary: "#6200ee",
};

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        console.log("Retrieved Username:", storedUsername);

        if (storedUsername) {
          fetchHistoryData(storedUsername);
        } else {
          Alert.alert("Error", "No username found.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Failed to retrieve username.");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const fetchHistoryData = async (username) => {
    try {
      const response = await fetch(
        `https://dawn.zetspring.com/dawn/super_market/notifications.php`,
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      console.log("API Response:", data);

      if (data.status === "success") {
        const notifications = data.data.notifications || [];
        setHistoryData(notifications.reverse()); // Show latest first
      } else {
        Alert.alert("No data available", "No notifications found.");
      }
    } catch (error) {
      setError(error.message);
      Alert.alert("Error", "Error fetching notifications.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          {error || "Something went wrong!"}
        </Text>
      </SafeAreaView>
    );
  }

  const renderNotificationItem = ({ item }) => (
    <View
      style={{
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: colors.cardBackground,
        borderRadius: 8,
        borderColor: colors.border,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: colors.textPrimary,
          marginBottom: 10,
        }}
      >
        Notification
      </Text>

      <View style={{ flexDirection: "row", marginBottom: 6 }}>
        <Text style={{ fontSize: 16, color: colors.textSecondary, flex: 1 }}>
          Message:
        </Text>
        <Text style={{ fontSize: 16, color: colors.textPrimary, flex: 2 }}>
          {item.message || "N/A"}
        </Text>
      </View>

      <View style={{ flexDirection: "row", marginBottom: 6 }}>
        <Text style={{ fontSize: 16, color: colors.textSecondary, flex: 1 }}>
          Date:
        </Text>
        <Text style={{ fontSize: 16, color: colors.textPrimary, flex: 2 }}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>

      <View style={{ flexDirection: "row", marginBottom: 6 }}>
        <Text style={{ fontSize: 16, color: colors.textSecondary, flex: 1 }}>
          Status:
        </Text>
        <Text style={{ fontSize: 16, color: colors.textPrimary, flex: 2 }}>
          {item.status || "N/A"}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={historyData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderNotificationItem}
      />
    </SafeAreaView>
  );
};

export default History;
