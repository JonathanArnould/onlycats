import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import Navbar from "./components/Navbar";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import PublishScreen from "./screens/PublishScreen";

// const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
    <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Navbar}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="PublishScreen" component={PublishScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 0,
    padding: 0,
  },
});

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
