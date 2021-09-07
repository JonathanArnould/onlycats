import { StyleSheet } from "react-native";

const card = StyleSheet.create({
    card: {
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "lightgray",
        borderRadius: 3
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