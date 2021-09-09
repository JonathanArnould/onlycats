import React, { useEffect, useState } from "react";
import { Image, View, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { catData } from "../mocks/catData";
import favoritesStyle from "../styles/favorites"


export default function Favorites() {

    const [favoritesCat, setFavoritesCat] = useState<any[]>([])

    useEffect(() => {
        const favCats = catData.filter(cat => cat.isFavorite === true)
        setFavoritesCat(favCats)
    }, [])

    return (
        <SafeAreaView style={favoritesStyle.container}>
            {catData.length > 0 ?
                <FlatList
                    numColumns={4}
                    data={favoritesCat}
                    keyExtractor={(cat) => cat.id}
                    renderItem={(itemCat) => {
                        return(  
                        <View>
                        {itemCat.item.isFavorite ? <Image style={favoritesStyle.image} source={{ uri: itemCat.item.url }}/> : <Text>Vous n'avez aucun favori...</Text>}
                        </View>)}
                    }
                /> : null}
        </SafeAreaView>)
    
        
    
}
