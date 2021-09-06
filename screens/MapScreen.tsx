import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions, Alert } from "react-native";
import * as Location from "expo-location";

export default function MapScreen() {
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission error",
        "Permission to access location was denied",
        [
          {
            text: "Retry",
            onPress: async() => await requestLocationPermission(),
            style: "cancel",
          },
          { text: "OK" },
        ]
      );
      return;
    }
  };

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
        region={{ ...userLocation, latitudeDelta: 0, longitudeDelta: 0 }}
      >
        <Marker coordinate={userLocation} />
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
});
