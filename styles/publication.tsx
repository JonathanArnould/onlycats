import { StyleSheet } from "react-native";

const publication = StyleSheet.create({
    input: {
      height: 40,
      marginBottom: 5,
      borderWidth: 1,
      padding: 5,
      borderRadius: 3,
      backgroundColor: 'white',
      color: 'black'
    },
    label: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
    },
    container: {
      padding: 25,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: "max",
    },
  });

export default publication;