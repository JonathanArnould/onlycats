import React, { useState } from "react";
import { View, Text, ImageBackground } from "react-native";
import { SearchBar } from "react-native-elements";
import Feed from "../components/Feed";

export default function SearchScreen() {
  const data = [
    {
      id: 1,
      name: "Kiwi",
      breed: "bengal",
      city: "Lyon",
      url: "https://cdn.pixabay.com/photo/2021/02/10/18/25/bengal-6003107_960_720.jpg",
      isFavorite: true,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem est nobis explicabo excepturi, suscipit earum reiciendis vel iusto placeat. Quas pariatur dicta cupiditate animi illum enim necessitatibus error eligendi quod.",
    },
    {
      id: 2,
      name: "Caramel",
      breed: "maine coon",
      city: "Bordeaux",
      url: "https://cdn.pixabay.com/photo/2021/01/15/17/37/cat-5919989_960_720.jpg",
      isFavorite: false,
    },
    {
      id: 3,
      name: "Speculos",
      breed: "bengal",
      city: "Bordeaux",
      url: "https://cdn.pixabay.com/photo/2021/02/10/18/25/bengal-6003103_960_720.jpg",
      isFavorite: true,
    },
    {
      id: 4,
      name: "Balthazar",
      breed: "maine coon",
      city: "Lille",
      url: "https://cdn.pixabay.com/photo/2018/04/24/19/07/maine-coon-3347769_960_720.jpg",
      isFavorite: false,
    },
    {
      id: 5,
      name: "Sasuke",
      breed: "siamois",
      city: "Nantes",
      url: "https://cdn.pixabay.com/photo/2017/02/15/12/12/cat-2068462_960_720.jpg",
      isFavorite: false,
    },
    {
      id: 6,
      name: "Naruto",
      breed: "siamois",
      city: "Nantes",
      url: "https://cdn.pixabay.com/photo/2015/08/09/19/02/cat-882049_960_720.jpg",
      isFavorite: true,
    },
  ];

  const [search, setSearch] = useState<string>("");

  const filteredCats = () => {
    return data.filter((el: any) => {
      return el.breed.startsWith(`${search.toLowerCase()}`);
    });
  };

  return (
    <>
      <SearchBar
        platform="android"
        placeholder="Type Here..."
        //@ts-ignore
        onChangeText={(text: string): void => {
          setSearch(text);
        }}
        value={search}
        searchIcon={{
          name: "search",
        }}
        clearIcon={{
          name: "close",
        }}
        showCancel={true}
        showLoading={false}
        onBlur={() => {}}
        onFocus={() => {}}
        onClear={() => {}}
        loadingProps={{}}
        onCancel={() => {}}
        cancelButtonTitle={"Cancel"}
        cancelButtonProps={{}}
        lightTheme={false}
        round={false}
      />
      {filteredCats().length > 0 ? (
        <Feed data={filteredCats()} />
      ) : (
        <View
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 24 }}>No results...</Text>

          <ImageBackground
            resizeMode="cover"
            style={{ width: 300, height: 300, marginTop: 50 }}
            source={{
              uri: "https://c.tenor.com/GTcT7HODLRgAAAAM/smiling-cat-creepy-cat.gif",
            }}
          />
        </View>
      )}
    </>
  );
}
