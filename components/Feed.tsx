import React from "react";
import { ScrollView, View } from "react-native";
import styleSheet from "../styles/feed";
import Card from "./Card";

interface FeedProps {
  data: any[];
}

export default function Feed(props: FeedProps) {
  return (
    <ScrollView>
      {props.data.map((cat, i) => {
        let key = `cat-${i}`;
        return <Card key={key} data={cat} />;
      })}
    </ScrollView>
  );
}
