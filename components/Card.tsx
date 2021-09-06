import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import cardStyle from "../styles/card"

export default function Card() {
    const [cat, setCat] = useState({
        name: "Flutter",
        location: "Bordeaux",
        img: "https://www.equilibre-et-instinct.com/blog/wp-content/uploads/2018/12/413071-786x640.jpg",
        favorite: true,
        vote: true,
    })

    const onFavorite = (): void => {
        setCat({ ...cat, favorite: !cat.favorite})
    }

    const onVote = (): void => {
        setCat({ ...cat, vote: !cat.vote})
    }


    return(
        <View style={cardStyle.card}>
            <View style={cardStyle.header}>
                <Text style={cardStyle.textName}>{ cat.name }</Text>
                <Text style={cardStyle.textLocation}>{ cat.location }</Text>
            </View>
            <Image style={cardStyle.image} source={{ uri: cat.img }} accessibilityLabel={cat.name} />
            <TouchableOpacity style={cardStyle.favorite} onPress={onFavorite}>
                <Ionicons name={"logo-octocat"} size={30} color={cat.favorite ? "yellow" : "gray"} />
            </TouchableOpacity >
            <TouchableOpacity style={cardStyle.vote} onPress={onVote}>
                <Ionicons name={"heart-circle"} size={30} color={cat.vote ? "red" : "gray"} />
            </TouchableOpacity>
        </View>
    );
}