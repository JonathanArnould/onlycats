import React, { useState } from "react";
import { Alert, Modal, Pressable, ScrollView, Text, View } from "react-native";
import styleSheet from "../styles/feed";
import Card from "./Card";
import cardStyle from "../styles/card";
import { NavigationContainer } from "@react-navigation/native";

interface FeedProps {
  data: any[];
  navigation: any;
}

export default function Feed(props: FeedProps) {

  const [modalVisible, setModalVisible] = useState<boolean>(false)

  return (
    <>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
          }}
      >
        <View style={cardStyle.centeredView}>
          <View style={cardStyle.modalView}>
            <Text style={cardStyle.modalText}>Cette photo est déjà dans vos favoris!</Text>
            <View style={cardStyle.buttonContainer}>
              <Pressable
              style={cardStyle.button}
              onPress={() => setModalVisible(!modalVisible)}
              >
              <Text>Ok!</Text>
              </Pressable>
              <Pressable
              style={cardStyle.button}
              onPress={() => props.navigation.navigate('Camera')}
              >
              <Text>Mes favoris</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView>
        {props.data.map((cat, i) => {
          console.log("cat", cat);
          let key = `cat-${i}`;
          return <Card key={key} data={cat} modalVisible={modalVisible} setModalVisible={setModalVisible}/>;
        })}
      </ScrollView>
    </>
  );
}
