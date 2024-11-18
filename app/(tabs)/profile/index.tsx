import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Linking,
  ScrollView,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { colors } from "@/const/colors";

const openSupportEmail = () => {
  const email = "support@example.com";
  const subject = "Support Request";

  // Construct the mailto URL
  const url = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

  // Open the email client
  Linking.openURL(url).catch((err) =>
    console.error("Error opening email app:", err),
  );
};

export default function ProfileScreen() {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      const storedUsername = await AsyncStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername); // Set the username state
      }
    };
    console.log(username);
    const fetchPhoneNumber = async () => {
      const storedPhoneNumber = await AsyncStorage.getItem("phoneNumber");
      if (storedPhoneNumber) {
        setPhoneNumber(storedPhoneNumber);
      }
    };

    fetchUsername();
  }, []);
  const handleLogout = async () => {
    Alert.alert("Logout Confirmation", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async () => {
          try {
            await AsyncStorage.clear();
            router.push("/login");
          } catch (error) {
            console.error("Failed to logout", error);
          }
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <View>
          <Image
            source={require("../../../assets/images/person.jpg")}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userId}>{username}</Text>
          {/* <Text style={styles.userEmail}>Admin@gmail.com</Text> */}
          {/* <Text style={styles.userPhone}>+97123231211</Text> */}
        </View>
      </View>

      <ScrollView>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.navigate("/profile/Kyc_details")}
        >
          <Text style={styles.menuText}>KYC Details</Text>
          <MaterialIcons
            name="chevron-right"
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.navigate("/Kyc")}
        >
          <Text style={styles.menuText}>KYC Verificatin </Text>
          <MaterialIcons
            name="chevron-right"
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity */}
        {/*   style={styles.menuItem} */}
        {/*   onPress={() => router.navigate("/Orders")} */}
        {/* > */}
        {/*   <Text style={styles.menuText}>Orders</Text> */}
        {/*   <MaterialIcons */}
        {/*     name="chevron-right" */}
        {/*     size={24} */}
        {/*     color={colors.primary} */}
        {/*   /> */}
        {/* </TouchableOpacity> */}

        {/**/}
        {/* <TouchableOpacity style={styles.menuItem}> */}
        {/*   <Text style={styles.menuText}>Settings</Text> */}
        {/*   <MaterialIcons name="chevron-right" size={24} color="#ccc" /> */}
        {/* </TouchableOpacity> */}
        {/**/}
        <TouchableOpacity style={styles.menuItem} onPress={openSupportEmail}>
          <Text style={styles.menuText}>Support </Text>
          <MaterialIcons
            name="chevron-right"
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.navigate("/(tabs)/profile/Notification")}
        >
          <Text style={styles.menuText}>Notifications</Text>
          <MaterialIcons
            name="chevron-right"
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Language</Text>
          <Text style={styles.languageText}>English</Text>
          <MaterialIcons
            name="chevron-right"
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Text style={styles.menuText}>Log out</Text>
          <MaterialIcons
            name="chevron-right"
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  profileInfo: {
    backgroundColor: colors.primary,
    paddingTop: 40,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    justifyContent: "space-between",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    marginLeft: 15,
    flex: 1,
  },
  userId: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "bold",
  },
  userEmail: {
    color: "#b0c4de",
    fontSize: 15,
  },
  userPhone: {
    color: colors.text,
    fontSize: 14,
  },
  editIcon: {
    position: "absolute",
    top: 20,
    left: 65,
    backgroundColor: "#4f68f7",
    borderRadius: 15,
    padding: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  languageText: {
    color: colors.primary,
    marginRight: 8,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#f7f7f7",
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: "#4f68f7",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
