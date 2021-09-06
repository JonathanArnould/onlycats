import React from "react";
import { Text, ScrollView, Image, View } from "react-native";
import styleSheet from "../styles/feed"

interface FeedProps {
  data: any[];
}

export default function Feed(props: FeedProps) {

  console.log("111", props.data)
  return (
    <ScrollView>
      {props.data.map((cat, i) => {
        let key = `cat-${i}`;
        return (
          <View key={key} style={styleSheet.container}>
            {/* <Card data={cat}/> */}
            <Text>{cat.id}</Text>
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2014/03/29/09/17/cat-300572_960_720.jpg",
                width: 300,
                height: 300,
              }}
            />
          </View>
        );
      })}
    </ScrollView>
  );
}
