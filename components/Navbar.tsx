import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import CameraScreen from "../screens/CameraScreen";
import PublishScreen from "../screens/PublishScreen";

const Tab = createBottomTabNavigator();

export default function Navbar() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Camera") {
              iconName = focused ? "camera" : "camera-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "white",
        })}
      >
        <Tab.Screen name="Camera" component={CameraScreen} />
        <Tab.Screen name="PublishScreen" component={PublishScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(12, 0, 0)',
    background: 'rgb(12, 0, 0)',
    card: 'rgb(12, 0, 0)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(12, 0, 0)',
    notification: 'rgb(255, 69, 58)',
  },
};