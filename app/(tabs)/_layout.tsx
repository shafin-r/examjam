import React from "react";
import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 80,
          paddingBottom: 10,
          paddingTop: 20,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#113768",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home"
              size={35}
              color={color}
              style={{ height: 35, width: 35 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Feather
              name="grid"
              size={35}
              color={color}
              style={{ height: 35, width: 35 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="bookmark"
              size={35}
              color={color}
              style={{ height: 35, width: 35 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name="user-circle"
              size={35}
              color={color}
              style={{ height: 35, width: 35 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="paper/[paper]"
        options={{
          href: null,
          headerShown: false, // This excludes it from the tabs
        }}
      />
      <Tabs.Screen
        name="sections"
        options={{
          href: null,
          headerShown: false, // This excludes it from the tabs
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          href: null,
          headerShown: false, // This excludes it from the tabs
        }}
      />
      <Tabs.Screen
        name="performance"
        options={{
          href: null,
          headerShown: false, // This excludes it from the tabs
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          href: null,
          headerShown: false, // This excludes it from the tabs
        }}
      />
      <Tabs.Screen
        name="live"
        options={{
          href: null,
          headerShown: false, // This excludes it from the tabs
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
