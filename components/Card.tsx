import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Card as CardElement } from "react-native-elements";
import cardStyle from "../styles/card";
import FlipCard from "react-native-flip-card";
import axios from "axios";
import Constants from "expo-constants";
interface CardProps {
    data : any,
    key?: string
}

export default function Card({ data }: CardProps) {
    const [favorite, setFavorite] = useState(data.isFavorite);
    
    const { manifest } = Constants;
    const uri = `http://${manifest.debuggerHost?.split(`:`).shift().concat(`:4000`)}`;

    const onFavorite = async (id: string): Promise<any> => {
      try{
        const favCat = await axios({
          url: `${uri}/graphql`,
          method: "post",
          data: {
            query: `mutation {
                addToFavorites(fav: {id: "${id}"}) {
                  name
                  isFavorite
                }
              }`
          }
        })
        setFavorite(favCat.data.data.addToFavorites.isFavorite);
      } catch (error){
        console.log(error.response)
        throw error
      }
        

    };
  return (
    <FlipCard flipHorizontal={true}>
      {/*TOP FACE*/}
      <CardElement containerStyle={cardStyle.card}>
        <CardElement.FeaturedTitle>{data.name}</CardElement.FeaturedTitle>
        <CardElement.FeaturedSubtitle>
          {data.city}
        </CardElement.FeaturedSubtitle>
        <CardElement.Divider />
        <CardElement.Image style={cardStyle.image} source={{ uri: data.url }} />
        <TouchableOpacity style={cardStyle.favorite} onPress={() => onFavorite(data._id)}>
          <Ionicons
            name={"logo-octocat"}
            size={30}
            color={favorite ? "yellow" : "grey"}
          />
        </TouchableOpacity>
      </CardElement>

      {/*BOTTOM FACE*/}
      <CardElement containerStyle={cardStyle.card}>
        <CardElement.Title style={cardStyle.title}>Détails</CardElement.Title>
        <CardElement.Divider />
        <View style={cardStyle.bottomFace}>
          <Text style={cardStyle.title}>Race : {data.breed}</Text>
          <Text style={cardStyle.title}>{data.description}</Text>
        </View>
      </CardElement>
    </FlipCard>
  );
}
