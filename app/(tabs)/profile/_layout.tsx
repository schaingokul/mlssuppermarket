import { Button } from "react-native";
import { colors, width, height } from "../../../const/colors";
import { Stack } from "expo-router";

const index = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "#f5f5f5" },
          headerTintColor: "#333",
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />

      <Stack.Screen
        name="Notification"
        options={{
          headerShown: true,
          title: "Notification",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          animation: "ios",
          gestureEnabled: true,
          statusBarStyle: "dark",
        }}
      />
      <Stack.Screen
        name="History"
        options={{
          headerShown: true,
          title: "History",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          animation: "ios",
          gestureEnabled: true,
          statusBarStyle: "dark",
        }}
      />
      <Stack.Screen
        name="Kyc_details"
        options={{
          headerShown: true,
          title: "KYC Details",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          animation: "ios",
          gestureEnabled: true,
          statusBarStyle: "dark",
        }}
      />
    </Stack>
  );
};

export default index;
