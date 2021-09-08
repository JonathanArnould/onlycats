import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal, Pressable, Alert } from "react-native";
import cardStyle from "../styles/card"

interface CardProps {
    data : any
    modalVisible: any
    setModalVisible: any
}


export default function Card({data, modalVisible, setModalVisible} : CardProps) {

    const onFavorite = async (d: any):  Promise<any> => {
        try{
            await axios.post("https://api.thecatapi.com/v1/favourites", {image_id: d.id, sub_id: "WILDCODESCHOOL"}, {headers: {"x-api-key": "76fe1047-72a2-474e-abce-ef00142c50d2"}});
            Alert.alert("Ajouté aux favoris!")
        } catch (error: any) {
                if (error.response.data.message === "DUPLICATE_FAVOURITE - favourites are unique for account + image_id + sub_id") {
                    setModalVisible(!modalVisible)
                }
            }
        };

    const onVote = async (d: any): Promise<any> => {
        const postVote = await axios.post("https://api.thecatapi.com/v1/votes", {image_id: d.id, value: 1}, {headers: {"x-api-key": "76fe1047-72a2-474e-abce-ef00142c50d2"}});
        console.log(postVote);
    };


    return(
        <View style={cardStyle.card}>
            <View style={cardStyle.header}>
                <Text style={cardStyle.textName}>{ data.id }</Text>
                <Text style={cardStyle.textLocation}>{ data.location }</Text>
            </View>
            <Image style={cardStyle.image} source={{ uri: data.url }} accessibilityLabel={data.name} />
            <TouchableOpacity style={cardStyle.favorite} onPress={()=>onFavorite(data)}>
                <Ionicons name={"logo-octocat"} size={30} color={data.favorite ? "yellow" : "gray"} />
            </TouchableOpacity >
            <TouchableOpacity style={cardStyle.vote} onPress={() => onVote(data)}>
                <Ionicons name={"heart-circle"} size={30} color={data.vote ? "red" : "gray"} />
            </TouchableOpacity>
        </View>
    );
}
