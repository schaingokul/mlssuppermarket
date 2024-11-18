import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { router, withLayoutContext } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Already imported
import CircularProgress from "react-native-circular-progress-indicator";
import { colors, width } from "../../../const/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Animatable from "react-native-animatable";

export default function WalletScreen() {
  const [walletData, setWalletData] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  const getUsername = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem("username");
      return storedUsername || "";
    } catch (error) {
      console.error("Error retrieving username from AsyncStorage", error);
      return "";
    }
  };

  const fetchData = async () => {
    try {
      const usernameFromStorage = await getUsername();
      setUsername(usernameFromStorage);

      const walletResponse = await fetch(
        "https://dawn.zetspring.com/dawn/super_market/home_api.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: usernameFromStorage }),
        },
      );
      const walletData = await walletResponse.json();
      console.log(walletData);

      const memberResponse = await fetch(
        "https://dawn.zetspring.com/dawn/super_market/member_list_user.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: usernameFromStorage }),
        },
      );

      const memberData = await memberResponse.json();
      const members = memberData.data.members;
      console.log(members);

      setWalletData(walletData.data);
      setMemberList(members);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  const defaultImage = "../../../assets/images/person.jpg";

  if (loading) {
    return (
      <Animatable.View
        animation="pulse"
        iterationCount="infinite"
        style={styles.loadingContainer}
      >
        <Text style={styles.loadingText}>Loading...</Text>
      </Animatable.View>
    );
  }

  const {
    total_balance,
    referral_bonus,
    level_commission,
    wallet_balance,
    total_withdrawals,
  } = walletData;

  const percentage = (wallet_balance / total_balance) * 100;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.acontainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Hello, {username}!</Text>
        </View>

        <View style={styles.balanceSection}>
          <View>
            <CircularProgress
              value={percentage}
              radius={50}
              progressValueColor={colors.primary}
              activeStrokeColor={colors.primaryHighOpacity}
              inActiveStrokeColor={colors.white}
              inActiveStrokeOpacity={1}
              inActiveStrokeWidth={25}
              activeStrokeWidth={20}
              showProgressValue={false}
            />
          </View>
          <View>
            <Text style={styles.headerText}>Total Balance</Text>
            <Text style={styles.totalBalance}>₹{total_balance || 0}</Text>
            <Text style={styles.headerText}>Total Withdrawals</Text>
            <Text style={styles.totalBalance}>₹{total_withdrawals || 0}</Text>
          </View>
        </View>

        <View style={styles.balanceDetails}>
          <View style={styles.balanceBox}>
            <Text style={styles.balanceLabel}>Wallet Balance</Text>
            <Text style={styles.balanceAmount}>₹{wallet_balance || "0"}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/wallet/WalletHistory")}
            >
              <MaterialCommunityIcons
                name="arrow-right"
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.balanceBox}>
            <Text style={styles.balanceLabel}>Referral Bonus</Text>
            <Text style={styles.balanceAmount}>₹{referral_bonus || 0}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/wallet/ReferralHisotry")}
            >
              <MaterialCommunityIcons
                name="arrow-right"
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.balanceBox}>
            <Text style={styles.balanceLabel}>Level Commission</Text>
            <Text style={styles.balanceAmount}>₹{level_commission || "0"}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/wallet/LevelHistory")}
            >
              <MaterialCommunityIcons
                name="arrow-right"
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.balanceBox,
            {
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            },
          ]}
          onPress={() => router.push("/wallet/withdraw")}
        >
          <Text style={styles.balanceLabel}>Withdraw </Text>
          <MaterialCommunityIcons
            name="arrow-right"
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.memberListSection}>
        <Text style={styles.memberListText}>Members Who Used Your Code</Text>
        {memberList.map((member, index) => (
          <View style={styles.memberItem} key={index}>
            <Image
              source={require("../../../assets/images/person.jpg")}
              style={styles.memberImage}
            />
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>{member.username}</Text>
              <Text style={styles.memberReferralCode}>
                Referral Code: {member.introducerCode}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  acontainer: {
    backgroundColor: colors.primaryHighOpacity,
    width: width,
    paddingBottom: 10,
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  balanceSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  totalBalance: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
  },
  balanceDetails: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-around",
  },
  balanceBox: {
    backgroundColor: colors.text,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    width: "auto",
    alignItems: "center",
  },
  balanceLabel: {
    color: colors.primary,
  },
  balanceAmount: {
    color: colors.primary,
    fontWeight: "bold",
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  memberListSection: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  memberListText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.textSecondary,
    marginBottom: 10,
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primaryMediumOpacity,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  memberImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  memberReferralCode: {
    fontSize: 14,
    color: colors.text,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4", // Light background for contrast
    opacity: 0.9, // Slight opacity for a soft look
  },
  loadingText: {
    fontSize: 20, // Slightly larger text
    fontWeight: "bold",
    color: "#333", // Darker text for readability
    letterSpacing: 1.5, // Slight spacing for style
    textAlign: "center",
    padding: 10,
    backgroundColor: "#fff", // White background for text
    borderRadius: 5, // Rounded corners
    elevation: 5, // Shadow for depth
  },
  // Adding animation to the loading text
  loadingTextAnimated: {
    animation: "pulse 1.5s infinite", // Animating the text with a pulse effect
  },
});
