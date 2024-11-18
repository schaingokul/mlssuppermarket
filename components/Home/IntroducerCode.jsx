import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { colors, width, height } from "../../const/colors";

export default function IntroducerCode({ membercount, PIN }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/Offer3.png")}
      />
      <View style={styles.infoSection}>
        <Text style={styles.label}>No of Members</Text>
        <Text style={styles.value}>{membercount}</Text>
      </View>
      <View style={styles.codeSection}>
        <Text style={styles.label}>Your Client Code</Text>
        <Text style={styles.value}>{PIN}</Text>
      </View>
      <View style={styles.advertisement}>
        <Text style={styles.adText}>
          Get 1% for 100 Days with Every Referral!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },

  image: {
    width: "100%",
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  codeSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: colors.primary,
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
  },
  advertisement: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  adText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
});
