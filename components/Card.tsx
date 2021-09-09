import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import cardStyle from "../styles/card"

interface CardProps {
    data : any,
    key: string
}

export default function Card({data} : CardProps) {

    const [favorite, setFavorite] = useState(data.isFavorite);

    const onFavorite = (d: any): void => {
        setFavorite(!favorite);
    };

    return(
        <View style={cardStyle.card}>
            <View style={cardStyle.header}>
                <Text style={cardStyle.textName}>{ data.name }</Text>
                <Text style={cardStyle.textLocation}>{ data.breed }</Text>
            </View>
            <Image style={cardStyle.image} source={{ uri: data.url }} accessibilityLabel={data.name} />
            <TouchableOpacity style={cardStyle.favorite} onPress={() => onFavorite(data)}>
                <Ionicons name={"logo-octocat"} size={30} color={favorite ? "yellow" : "gray"} />
            </TouchableOpacity >
        </View>
    );
}
