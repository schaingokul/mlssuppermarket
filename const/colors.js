import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const colors = {
  primary: "#FF5A00", // BigBasket's signature orange color
  primaryHighOpacity: "rgba(255, 90, 0, 0.8)", // High opacity orange
  primaryMediumOpacity: "rgba(255, 90, 0, 0.7)", // Medium opacity orange
  primaryLowOpacity: "rgba(255, 90, 0, 0.3)", // Low opacity orange
  secondary: "#00B140", // BigBasket's green color for secondary elements
  background: "#F4F4F4", // Light grayish background for a soft look
  text: "#fff", // Dark gray text for better readability
  textSecondary: "#666666", // Lighter gray for secondary text
  white: "#FFFFFF", // Pure white
  lowOpacity: "rgba(0, 0, 0, 0.1)", // Light shadow for subtle elements
  primaryDark: "#4C3C3D", // Dark brownish-gray for darker elements
};

export { width, height, colors };
