import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import { colors } from "../const/colors";

const { width, height } = Dimensions.get("window");

const GetStartedSplashScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../assets/images/Logo1.png")}
        />
      </View>

      <View style={styles.container}>
        <Image
          style={styles.welcomeImage}
          source={require("../assets/images/welcome.png")}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.titleText}>Buy Product </Text>
        <Text style={styles.titleText}>Get Reward</Text>
        <View style={styles.textContainer}>
          <Text style={styles.subText}>
            Easist way to Get reward For Buying
          </Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.mainText}>MOONLIGHT SUPERMARKET</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.navigate("/login")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GetStartedSplashScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.02,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    resizeMode: "contain",
  },
  welcomeImage: {
    width: width * 0.6,
    height: width * 0.6,
    resizeMode: "contain",
  },
  titleText: {
    color: colors.primary,
    fontSize: width * 0.08,
    fontWeight: "bold",
    textAlign: "center",
  },
  subText: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomContainer: {
    height: height * 0.2,
    alignItems: "center",
    marginTop: height * 0.03,
    paddingHorizontal: width * 0.1,
  },
  mainText: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    marginBottom: height * 0.02,
    textAlign: "center",
  },
  button: {
    width: "85%",
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.06,
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
});
