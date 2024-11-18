import { colors } from "@/const/colors";
import { Stack } from "expo-router";

const index = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
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
        name="View"
        options={{
          title: "Product List",
          headerTitleAlign: "center",
          headerShown: true,
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />
      <Stack.Screen
        name="deposit"
        options={{
          title: "Buy Now",
          headerTitleAlign: "center",
          headerShown: true,
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />
    </Stack>
  );
};

export default index;
