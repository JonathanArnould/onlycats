import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import CameraScreen from "../screens/CameraScreen";
import PublishScreen from "../screens/PublishScreen";
import Home from "../screens/Home";
import MapScreen from "../screens/MapScreen";

const Tab = createBottomTabNavigator();

export default function Navbar() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;

            if (route.name === "Camera") {
              iconName = focused ? "camera" : "camera-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "white",
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Camera" component={CameraScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
      </Tab.Navigator>
  );
}


