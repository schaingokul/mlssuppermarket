import { Stack } from "expo-router";
import { colors } from "../../../const/colors";

const index = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "#f5f5f5" },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />
      <Stack.Screen
        name="upload"
        options={{
          title: "",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          animation: "ios",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />

      <Stack.Screen
        name="LevelHistory"
        options={{
          title: "Level Commission ",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          animation: "ios",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />

      <Stack.Screen
        name="WalletHistory"
        options={{
          title: "Wallet History",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          animation: "ios",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />

      <Stack.Screen
        name="ReferralHisotry"
        options={{
          title: "Referral History",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          animation: "ios",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />

      <Stack.Screen
        name="deposit"
        options={{
          title: "Deposit",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          animation: "ios",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />
      <Stack.Screen
        name="withdraw"
        options={{
          title: "Withdraw",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "formSheet",
          animation: "ios",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />

      <Stack.Screen
        name="History"
        options={{
          title: "History",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "formSheet",
          animation: "ios",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />
    </Stack>
  );
};

export default index;
