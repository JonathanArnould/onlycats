import React, { useState } from "react";
import { View, Text, ImageBackground } from "react-native";
import { SearchBar } from "react-native-elements";
import Feed from "../components/Feed";

interface SearchScreenProps {
  catData : {}[]
}

export default function SearchScreen(props : SearchScreenProps) {

  const [search, setSearch] = useState<string>("");

  const filteredCats = () => {
    return props.catData.filter((el: any) => {
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
