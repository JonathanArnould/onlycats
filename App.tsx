import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import CameraScreen from "./screens/CameraScreen";

const Tab = createBottomTabNavigator();

export default function App() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
