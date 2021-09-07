import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import React, { useState } from "react";
import { Icon, SearchBar } from "react-native-elements";
import Feed from "../components/Feed";

export default function SearchScreen() {
  const [search, setSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const [timeout, setTimeout] = useState<number | undefined>();

  const searchByBreeds = async () => {
    try {
      const res = await axios.get(
        `https://api.thecatapi.com/v1/images/search?limit=50&breed_id=${search}`,
        {
          headers: {
            "x-api-key": "76fe1047-72a2-474e-abce-ef00142c50d2",
          },
        }
      );
      setFilteredData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <SearchBar
        platform="android"
        placeholder="Type Here..."
        onChangeText={(text) => {
          setSearch(text);
          searchByBreeds();
         
        }}
        value={search}
        onBlur={() => {}}
        onFocus={() => {}}
        onClear={() => {}}
        loadingProps={{}}
        searchIcon={{
          name: "",
        }}
        clearIcon={{
          name: "",
        }}
        showLoading={false}
        onCancel={() => {}}
        cancelButtonTitle={""}
        cancelButtonProps={{}}
        showCancel={false}
        lightTheme={false}
        round={false}
      />
      <Feed data={filteredData} />
    </>
  );
}
