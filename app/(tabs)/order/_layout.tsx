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
          animation: "ios",
          statusBarColor: "transparent",
        }}
      />
      <Stack.Screen
        name="OrderDetails"
        options={{
          headerShown: true,
          title: "Details",
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
        name="OrderHistory"
        options={{
          headerShown: true,
          title: "Order History",
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
        name="CurrentOrder"
        options={{
          headerShown: true,
          title: "Current Order's",
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
        name="PendingOrder"
        options={{
          headerShown: true,
          title: "Pending Order's",
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
