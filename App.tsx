import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import Navbar from "./components/Navbar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import PublishScreen from "./screens/PublishScreen";
import axios from "axios";
import Constants from "expo-constants";
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();


export default function App() {

  const { manifest } = Constants;
  const uri = `http://${manifest.debuggerHost?.split(`:`).shift().concat(`:4000`)}`;

  const [catData , setCatData] = useState<{}[]>([])

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
              url
              breed
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
  
  console.log("111", catData)
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
      <Header
        barStyle="light-content"
        containerStyle={{
          backgroundColor: 'black',
          justifyContent: 'space-around',
        }}
        leftComponent={
            <Image
              source={{
                height: 60,
                width: 100,
                uri: "https://www.drelseys.com/wp-content/uploads/2020/07/life-of-a-cat-gang-500x0-c-default.png"
              }}
            />  
        }
        centerComponent={
          <Text style={{color: 'white', fontSize:25, fontWeight: 'bold' }}>OnlyCats</Text>
        }
      />
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator>
            <Stack.Screen
              name="App"
              options={{ headerShown: false }}
            >{props => <Navbar {...props} catData={catData} key={""} name="App"/>}
            </Stack.Screen>
              <Stack.Screen name="Publication" component={PublishScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
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
