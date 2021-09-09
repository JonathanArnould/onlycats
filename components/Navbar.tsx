import React from "react";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import CameraScreen from "../screens/CameraScreen";
import PublishScreen from "../screens/PublishScreen";
import Home from "../screens/Home";
import MapScreen from "../screens/MapScreen";
import { ParamListBase } from "@react-navigation/native";
import Favorites from "../screens/Favorites";

const Tab = createBottomTabNavigator();

interface navbarProps extends RouteProp<ParamListBase, "App"> {
  catData : any[]
} 
export default function Navbar(props: navbarProps){
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
        <Tab.Screen name="Favorites" component={Favorites}/>
      </Tab.Navigator>
  );
}


