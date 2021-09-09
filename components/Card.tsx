import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import cardStyle from "../styles/card"
import FlipCard from 'react-native-flip-card'
interface CardProps {
    data : any
}

export default function Card({data} : CardProps) {

    const onFavorite = (): void => {
        console.log("i love it")
    }

    const onVote = (): void => {
        console.log("i vote")
    }


    return(
        <FlipCard
        flipHorizontal={true}
        >
        <View style={cardStyle.card}>
            <View style={cardStyle.header}>
                <Text style={cardStyle.textName}>{ data.id }</Text>
                <Text style={cardStyle.textLocation}>{ data.location }</Text>
            </View>
            <Image style={cardStyle.image} source={{ uri: data.url }} accessibilityLabel={data.name} />
            <TouchableOpacity style={cardStyle.favorite} onPress={onFavorite}>
                <Ionicons name={"logo-octocat"} size={30} color={data.favorite ? "yellow" : "gray"} />
            </TouchableOpacity >
            <TouchableOpacity style={cardStyle.vote} onPress={onVote}>
                <Ionicons name={"heart-circle"} size={30} color={data.vote ? "red" : "gray"} />
            </TouchableOpacity>
        </View>

        <View style={cardStyle.card}>
            <View style={cardStyle.header}>
                <Text style={cardStyle.textName}>{ data.id }</Text>
                <Text style={cardStyle.textLocation}>{ data.location }</Text>
            </View>
            <Image style={cardStyle.image} source={{ uri: "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg" }} accessibilityLabel={data.name} />
            
        </View>
        </FlipCard>

    );
}
