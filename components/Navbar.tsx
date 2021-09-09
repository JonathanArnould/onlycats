import React from "react";
import { RouteProp } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import CameraScreen from "../screens/CameraScreen";
import Home from "../screens/Home";
import MapScreen from "../screens/MapScreen";
import { ParamListBase } from "@react-navigation/native";
import Favorites from "../screens/Favorites";
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

interface navbarProps extends RouteProp<ParamListBase, "App"> {
  catData : any[]
} 
export default function Navbar(props: navbarProps){
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
        <Tab.Screen name="Favorites" component={Favorites}/>
      </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  header: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});