import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { colors, width, height } from "../../const/colors";

export default function Footer({ totalBalance, referral, levelCommission }) {
  return (
    <View style={styles.acontainer}>
      <View style={styles.container}>
        {/* Total Deposit Section */}
        <View style={styles.itemContainer}>
          <MaterialIcons
            name="account-balance-wallet"
            size={30}
            color={colors.primary}
          />
          <Text style={styles.itemTitle}>Total Balance</Text>
          <Text style={styles.itemValue}>₹{totalBalance} </Text>
        </View>

        {/* Total Input Section */}
        <View style={styles.itemContainer}>
          <FontAwesome name="user" size={30} color={colors.primary} />
          <Text style={styles.itemTitle}>Referal Bonus</Text>
          <Text style={styles.itemValue}>₹{referral}</Text>
        </View>

        {/* Total Input Section */}
        <View style={styles.itemContainer}>
          <MaterialIcons name="attach-money" size={30} color={colors.primary} />
          <Text style={styles.itemTitle}>Level Commision </Text>
          <Text style={styles.itemValue}>₹{levelCommission}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  acontainer: {
    width: width,
    backgroundColor: "white",
    elevation: 3,
    padding: 20,
    marginTop: 10,
    borderRadius: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 12,
  },
  itemContainer: {
    alignItems: "center",
    borderRadius: 30,
    padding: 10,
    borderRadius: 12,
    width: "20%",
    backgroundColor: colors.text,
  },
  itemTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
    color: colors.primary,
  },
  itemValue: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
});
