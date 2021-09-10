import React, { useEffect, useState } from "react";
import { Image, View, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import favoritesStyle from "../styles/favorites";

interface FavoritesProps {
  catData: any[];
}

export default function Favorites(props: FavoritesProps) {
  const [favoritesCat, setFavoritesCat] = useState<any[]>([]);
  
  useEffect(() => {
    const favCats = props.catData.filter((cat) => cat.isFavorite === true);
    setFavoritesCat(favCats);
  }, [props.catData]);

  return (
    <SafeAreaView style={favoritesStyle.container}>
      {favoritesCat.length > 0 ? (
        <FlatList
          numColumns={4}
          data={favoritesCat}
          keyExtractor={(cat) => cat.id}
          renderItem={(itemCat) => {
            return (
              <View>
                <Image
                  style={favoritesStyle.image}
                  source={{ uri: itemCat.item.url }}
                />
              </View>
            );
          }}
        />
      ) : (
        <View>
          <Text style={{ color: "white" }}>Vous n'avez aucun favori...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
