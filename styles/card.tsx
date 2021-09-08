import { StyleSheet } from "react-native";

const card = StyleSheet.create({
    button: {
      borderRadius: 20,
      padding: 10,
      margin: 10,
      elevation: 2,
      backgroundColor: "#2196F3",
    },
    buttonContainer: {
        flexDirection: "row"
    },
    card: {
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "lightgray",
        borderRadius: 3
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    favorite: {
        width: 30,
        height: 30,
        backgroundColor: "transparent",
        position: "absolute",
        top: 50,
        right: 0,
        margin: 10
    },
    header: {
        borderStyle: "solid",
        borderBottomWidth: 2,
        borderBottomRightRadius: 3,
        borderColor: "lightgray"
    },
    image: {
        width: 410,
        height: 410,
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    textName: {
        padding: 2,
        paddingLeft: 5,
        fontWeight: "bold"
    },
    textLocation: {
        padding: 2,
        paddingLeft: 5,
    },
    vote: {
        width: 30,
        height: 30,
        backgroundColor: "transparent",
        position: "absolute",
        bottom: 0,
        right: 0,
        margin: 10
    }
});

export default card;