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
        console.log("cat", cat)
        let key = `cat-${i}`;
        return (
          <View key={key} style={styleSheet.container}>
            {/* <Card data={cat}/> */}
            <Text>{cat.id}</Text>
            <Image
              source={{
                uri: `${cat.url}`,
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
