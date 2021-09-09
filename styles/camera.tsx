import { StyleSheet } from "react-native";

const camera = StyleSheet.create({
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

  export default card