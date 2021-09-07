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
import { ParamListBase, useIsFocused, useNavigation } from "@react-navigation/native";
import {StackNavigationProp} from '@react-navigation/stack';

type CameraScreenProps = StackNavigationProp<ParamListBase, 'Camera'>;

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [image, setImage] = useState<string>("");
  const cameraRef = useRef<any>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const isFocused = useIsFocused();

  const navigation = useNavigation<CameraScreenProps>();

  const buttonClickedHandler = async () => {
    const pictureMetadata = await cameraRef.current.takePictureAsync();
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

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
