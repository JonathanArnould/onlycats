import React from "react";
import { RouteProp } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CameraScreen from "../screens/CameraScreen";
import Home from "../screens/Home";
import MapScreen from "../screens/MapScreen";
import { ParamListBase } from "@react-navigation/native";
import Favorites from "../screens/Favorites";
import SearchScreen from "../screens/SearchScreen";

const Tab = createBottomTabNavigator();
type IconNames = "camera" | "star" | "map" | "search" | "home";
type OutlineIconNames = "camera-outline" | "star-outline" | "map-outline" | "search-outline" | "home-outline";
type AllIconNames = IconNames | OutlineIconNames;
const iconNameByFocus = (iconName: IconNames, focused: boolean): AllIconNames =>
  focused ? iconName : `${iconName}-outline`;

const getIconName = (name: string, focused: boolean) => {
  switch (name) {
    case "Camera":
      return iconNameByFocus("camera", focused);
    case "Favorites":
      return iconNameByFocus('star', focused);
    case "Map":
      return iconNameByFocus('map', focused);
    case "Search":
      return iconNameByFocus('search', focused);
    case "Home":
      return iconNameByFocus('home', focused);
    default:
      break;
  }
};

interface navbarProps extends RouteProp<ParamListBase, "App"> {
  catData: {}[];
  fetchCats: Function;
}
export default function Navbar(props: navbarProps) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Ionicons
              name={getIconName(route.name, focused)}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
      })}
    >
      <Tab.Screen
        name="Home"
        children={() => (
          <Home catData={props.catData} fetchCats={props.fetchCats} />
        )}
      />
      <Tab.Screen
        name="Search"
        children={() => <SearchScreen catData={props.catData} />}
      />
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen
        name="Map"
        children={() => <MapScreen catData={props.catData} />}
      />
      <Tab.Screen
        name="Favorites"
        children={() => <Favorites catData={props.catData} fetchCats={props.fetchCats}/>}
        options={{unmountOnBlur: true}}
        listeners={({navigation}) => ({blur: () => navigation.setParams({screen: undefined})})}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  header: { flex: 1, justifyContent: "center", alignItems: "center" },
});
