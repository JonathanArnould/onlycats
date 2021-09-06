import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const buttonClickedHandler = () => {
    console.log('You have been clicked a button!');
    // do something
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <>
      <Camera style={styles.camera} />
      <TouchableOpacity
        onPress={buttonClickedHandler}
        style={styles.picture}>
        <Text></Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  picture: {
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 1,
    position: 'absolute',
    bottom: 15,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  }
});