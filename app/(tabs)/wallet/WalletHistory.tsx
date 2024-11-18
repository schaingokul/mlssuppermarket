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
        `https://dawn.zetspring.com/dawn/super_market/referral_bonus.php?username=${username}`,
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      console.log("API Response:", data);

      if (data.status === "success") {
        const withdrawals = data.data.withdrawals || [];
        console.log("withdrawals:", withdrawals);
        const added = data.data.added || [];

        console.log("Added:", added);
        const combinedData = [
          ...withdrawals.map((item) => ({
            type: "withdrawal",
            amount: item.withdrawal_amount,
            date: item.date,
            referralName: item.referral_name || "N/A", // Assuming referral_name exists in withdrawal data
          })),
          ...added.map((item) => ({
            type: "added",
            referralName: item.username || "N/A", // Assuming referral_name exists in added data
            amount: item.referral_bonus, // Assuming referral_bonus exists in added data
            date: item.date,
          })),
        ];

        setHistoryData(combinedData.reverse()); // Show latest first
      } else {
        Alert.alert("No data available", "No payment history records.");
      }
    } catch (error) {
      setError(error.message);
      Alert.alert("Error", "Error fetching payment details.");
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

  // Filter for only withdrawals
  const withdrawalsData = historyData.filter(
    (item) => item.type === "withdrawal",
  );

  // If no withdrawals data, show a message
  if (withdrawalsData.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 18, color: colors.textPrimary }}>
            No withdrawals available.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={withdrawalsData} // Display only withdrawals
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
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
              Withdrawal
            </Text>

            <View style={{ flexDirection: "row", marginBottom: 6 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.textSecondary,
                  flex: 1,
                }}
              >
                Amount :{" "}
              </Text>
              <Text
                style={{ fontSize: 16, color: colors.textPrimary, flex: 2 }}
              >
                {item.amount || "N/A"}
              </Text>
            </View>

            <View style={{ flexDirection: "row", marginBottom: 6 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.textSecondary,
                  flex: 1,
                }}
              >
                Date:
              </Text>
              <Text
                style={{ fontSize: 16, color: colors.textPrimary, flex: 2 }}
              >
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default History;
