import React from "react";
import { Text, View, Image, StyleSheet, Pressable, Alert } from "react-native";
import { AsyncStorage } from "@react-native-async-storage/async-storage"; // Use correct import for AsyncStorage
import { colors } from "../../const/colors";
import { router } from "expo-router";

const TopBar = ({ setIsLoggedIn }) => {
  // const handleLogout = async () => {
  //   Alert.alert("Logout Confirmation", "Are you sure you want to log out?", [
  //     {
  //       text: "Cancel",
  //       style: "cancel",
  //     },
  //     {
  //       text: "Logout",
  //       onPress: async () => {
  //         try {
  //           setIsLoggedIn(false);
  //           await AsyncStorage.clear();
  //         } catch (error) {
  //           console.error("Failed to logout", error);
  //         }
  //       },
  //     },
  //   ]);
  // };
  //
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: colors.white,
          marginLeft: 10,
        }}
      >
        ML Supermarket
      </Text>
      <View style={{ borderRadius: 10 }}>
        <Pressable
          onPress={() => router.push("/(tabs)/profile")}
          style={styles.logoContainer}
        >
          <Image
            source={require("../../assets/images/person.jpg")}
            style={styles.logo}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    backgroundColor: colors.primaryHighOpacity,
  },
  logoContainer: {
    borderRadius: 100,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    overflow: "hidden",
  },
  logo: {
    width: 50,
    height: 50,
  },
});

export default TopBar;
