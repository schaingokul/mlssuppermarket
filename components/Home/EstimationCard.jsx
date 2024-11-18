import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { colors, width } from "../../const/colors";
import { Link, router } from "expo-router";

export default function EstimationCard({
  walletBalance,
  growth_percentage,
  ml_coin_rate,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>51 Product Combo</Text>
      <View style={styles.walletBalance}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            router.push("/home/View");
          }}
        >
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            router.push("/home/deposit");
          }}
        >
          <Text style={styles.buyButtonText}>Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: width,
    padding: 20,
    marginTop: -40,
    borderRadius: 10,
  },
  container: {
    backgroundColor: "white",
    elevation: 3,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primaryDark,
    marginBottom: 10,
    textAlign: "center",
  },
  walletBalance: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  buttonContainer: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  viewButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600",
  },
  buyButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600",
  },
});
