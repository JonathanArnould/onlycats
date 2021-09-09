import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import Constants from "expo-constants";
import * as Location from "expo-location";

type CatInput = {
  name: string;
  city: string;
  breed: string;
  category: string;
  file: string;
  address: string;
};

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const isFocused = useIsFocused();

  const { manifest } = Constants;

  const buttonClickedHandler = async () => {
    const pictureMetadata = await cameraRef.current.takePictureAsync();
    // console.log("pictureMetadata", pictureMetadata);
    navigation.navigate("PublishScreen", {
      picture: pictureMetadata,
    });
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const getPositionByAddress = async ({
    address,
    city,
  }: {
    address: string;
    city: string;
  }) => {
    return Location.geocodeAsync(`${address} ${city}`);
  };

  const uploadCatData = async ({
    name,
    file,
    category,
    breed,
    address,
    city,
  }: CatInput) => {
    const coordinates = await getPositionByAddress({ address, city });

    const body = {
      query: `
    mutation {
      createCat(cat: {name: "${name}", file: "${file}", category: "${category}", breed: "${breed}", city: "${city}", coordinates: {longitude: ${coordinates[0].longitude}, latitude: ${coordinates[0].latitude}}}) {
        _id
        url
        coordinates {
          longitude
          latitude
        }
        createdAt
      }
    }
    `,
    };
    try {
      await axios({
        url: `http://${manifest.debuggerHost
          ?.split(`:`)
          .shift()
          .concat(`:4000`)}/graphql`,
        method: "post",
        data: body,
      });
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <>
      {isFocused && (
        <Camera style={styles.camera} type={type} ref={cameraRef} />
      )}

      <TouchableOpacity
        onPress={buttonClickedHandler}
        style={styles.picture}
      ></TouchableOpacity>

      <TouchableOpacity
        style={styles.flip}
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      >
        <Text>
          <Ionicons name={"camera-reverse-outline"} size={30} color={"white"} />
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={pickImage} style={styles.fileupload}>
        <Text>
          <Ionicons name={"duplicate-outline"} size={30} color={"white"} />
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  picture: {
    borderStyle: "solid",
    borderColor: "white",
    borderWidth: 1,
    position: "absolute",
    bottom: 15,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignSelf: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  fileupload: {
    position: "absolute",
    bottom: 15,
    left: 15,
  },
  flip: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
