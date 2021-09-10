import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, View, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import favoritesStyle from "../styles/favorites";

interface FavoritesProps extends BottomTabNavigationOptions {
  catData: any[];
}

export default function Favorites(props: FavoritesProps) {

  return (
    <SafeAreaView style={favoritesStyle.container}>
      {props.catData.length > 0 ? (
        <FlatList
          numColumns={4}
          data={props.catData.filter((cat) => cat.isFavorite === true)}
          keyExtractor={(cat) => cat._id}
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
