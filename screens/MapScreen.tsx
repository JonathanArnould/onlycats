import React, { useState, useEffect, useRef } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { View, Alert, Image } from "react-native";
import * as Location from "expo-location";
import map from "../styles/map";

export default function MapScreen(props: { catData: any[] }) {
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  let mapRef = useRef();

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
      mapRef?.current?.fitToSuppliedMarkers([
        "user",
        {
          edgePadding: {},
          animated: true,
        },
      ]);
    })();
  }, []);
  const fitToView = () => {};

  return (
    <View style={map.container}>
      <MapView
        ref={mapRef}
        style={map.map}
        initialRegion={{
          ...userLocation,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}
      >
        <Marker identifier={"user"} coordinate={userLocation} />
        {props?.catData?.map((cat, id) => {
          return (
            <Marker
              title={cat.name}
              description={cat.description}
              key={id}
              coordinate={cat.coordinates}
            >
              <View style={map.marker}>
                <Image source={{ uri: cat.url }} style={map.image} />
              </View>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}

