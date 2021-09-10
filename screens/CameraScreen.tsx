import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import camera from "../styles/camera";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  ParamListBase,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type CameraScreenProps = StackNavigationProp<ParamListBase, "Camera">;

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [image, setImage] = useState<string>("");
  const cameraRef = useRef<any>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const isFocused = useIsFocused();

  const navigation = useNavigation<CameraScreenProps>();

  const buttonClickedHandler = async () => {
    const pictureMetadata = await cameraRef.current.takePictureAsync({
      base64: true,
    });
    navigation.navigate("Publication", {
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
      navigation.navigate("Publication", {
        picture: result,
      });
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

      {isFocused && (<Camera style={camera.camera} type={type} ref={cameraRef} />)}

      <TouchableOpacity
        onPress={buttonClickedHandler}
        style={camera.picture}
      ></TouchableOpacity>

      <TouchableOpacity
        style={camera.flip}
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

      <TouchableOpacity onPress={pickImage} style={camera.fileupload}>
        <Text>
          <Ionicons name={"duplicate-outline"} size={30} color={"white"} />
        </Text>
      </TouchableOpacity>
    </>
  );
}
