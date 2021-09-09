import { StyleSheet } from "react-native";

const card = StyleSheet.create({
  card: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 3,
    backgroundColor: "black",
  },
  title: {
    color: "white",
  },
  favorite: {
    width: 30,
    height: 30,
    backgroundColor: "transparent",
    position: "absolute",
    top: 70,
    right: 0,
    margin: 10,
  },
  image: {
    width: 410,
    height: 410,
  },
  bottomFace: {
    height: 410,
  }
});

export default card;
