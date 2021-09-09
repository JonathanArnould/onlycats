import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions, Alert, Image } from "react-native";
import * as Location from "expo-location";

const cats = [
  {
    id: "1234",
    name: "kiwi",
    coordinate: {
      latitude: 44.84132461780238,
      longitude: -0.5701245711323272,
    },
    image: "https://www.i-cad.fr/uploads/Connaitre_chat.jpg",
  },
  {
    id: "4567",
    name: "simba",
    coordinate: {
      latitude: 44.83427724121175,
      longitude: -0.5649559458391263,
    },
    image:
      "https://cdn.lelynx.fr/wp-content/uploads/2020/05/GettyImages-1214907564.jpg",
  },
];

export default function MapScreen(props: { catData: any[] }) {
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  console.log("mapScreen:", props.catData);
  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission error",
        "Permission to access location was denied",
        [
          {
            text: "Retry",
            onPress: async () => await requestLocationPermission(),
            style: "cancel",
          },
          { text: "OK" },
        ]
      );
      return;
    }
  };

  const PICTURE_SIZE = 1;

  useEffect(() => {
    (async () => {
      await requestLocationPermission();
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Lowest,
      });
      setUserLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          ...userLocation,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}
        followsUserLocation={true}
      >
        <Marker coordinate={userLocation} />
        {props?.catData?.map((cat, id) => {
          return (
            <Marker
              title={cat.name}
              description={cat.description}
              key={cat.id}
              coordinate={cat.coordinates}
            >
              <View style={styles.marker}>
                <Image source={{ uri: cat.url }} style={styles.image} />
              </View>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  image: {
    borderRadius: 100,
    width: 50,
    height: 50,
  },
  marker: {
    backgroundColor: "blue",
    padding: 2,
    borderRadius: 100,
  },
});
