import { StyleSheet, Dimensions } from "react-native";

const map = StyleSheet.create({
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

export default map