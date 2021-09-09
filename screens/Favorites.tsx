import React from "react";
import { Image, View, FlatList, Text } from "react-native";
import { catData } from "../mocks/catData";
import favoritesStyle from "../styles/favorites"


export default function Favorites() {

    return catData.length > 0 ?
        <FlatList
            style={favoritesStyle.grid}
            data={catData}
            keyExtractor={(cat) => cat.id}
            renderItem={(itemCat) => {
                console.log(itemCat)
                return  itemCat.item.isFavorite ? <Image style={favoritesStyle.image} source={{ uri: itemCat.item.url }}/> : null
                }
            }
        /> : 

        <Text>Vous n'avez aucun favori...</Text>
    
}
