import { Tabs } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { colors, width, height } from "@/const/colors";

const TabsNavigator = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="home"
              color={focused ? colors.primary : colors.primaryLowOpacity}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="wallet"
              color={focused ? colors.primary : colors.primaryLowOpacity}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome
              name="shopping-cart"
              color={focused ? colors.primary : colors.primaryLowOpacity}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome
              name="user"
              color={focused ? colors.primary : colors.primaryLowOpacity}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsNavigator;
