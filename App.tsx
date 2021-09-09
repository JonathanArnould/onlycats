import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Navbar from "./components/Navbar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import PublishScreen from "./screens/PublishScreen";
import axios from "axios";
import Constants from "expo-constants";

// const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


export default function App() {

  const { manifest } = Constants;
  const uri = `http://${manifest.debuggerHost?.split(`:`).shift().concat(`:4000`)}`;

  const [catData , setCatData] = useState([])

  const fetchData = async () => {
    try{
      const data = await axios({
        url: `${uri}/graphql`,
        method: "post",
        data: {
          query: `{
            getCats(limit: 10) {
              _id
              name
              isFavorite
            }
          }          
        `,
        },
      });
      setCatData(data.data.data.getCats)
    }catch (error) {
      throw error
    }
  }

  useEffect(() => {
    (async () => {
    await fetchData();
    })()
  }, [])
  
  return (
    <View style={styles.container}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="App"
            options={{ headerShown: false }}
          >{props => <Navbar {...props} catData={catData} key={""} name="App"/>}</Stack.Screen>
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
