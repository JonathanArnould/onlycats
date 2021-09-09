import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Card as CardElement } from "react-native-elements";
import cardStyle from "../styles/card";
import FlipCard from "react-native-flip-card";
import card from "../styles/card";
interface CardProps {
  data: any;
}

export default function Card({ data }: CardProps) {
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
        <TouchableOpacity style={cardStyle.favorite}>
          <Ionicons
            name={"logo-octocat"}
            size={30}
            color={data.favorite ? "yellow" : "grey"}
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
