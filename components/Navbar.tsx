import React from "react";
import { StyleSheet, Image} from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import CameraScreen from "../screens/CameraScreen";
import PublishScreen from "../screens/PublishScreen";
import Home from "../screens/Home";
import MapScreen from "../screens/MapScreen";
import SearchScreen from "../screens/SearchScreen";


const Tab = createBottomTabNavigator();
type IconNames = 'camera'
type OutlineIconNames = 'camera-outline'
type AllIconNames = IconNames | OutlineIconNames
const iconNameByFocus = (iconName: IconNames, focused: boolean): AllIconNames =>
  focused ? iconName : `${iconName}-outline`

const getIconName = (name: string, focused: boolean) => {
  switch (name) {
    case "Camera":
      return iconNameByFocus('camera', focused)
      default:
        break;
  }
}

export default function Navbar() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, 
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name={getIconName(route.name, focused)} size={size} color={color} />;
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "white",
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Camera" component={CameraScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
      </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  header: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});