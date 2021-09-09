import React, { useState, useCallback } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";
import Card from "./Card";
import Constants from "expo-constants";

interface FeedProps {
  data: any[];
  fetchCats: Function;
}

export default function Feed(props: FeedProps) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await props.fetchCats();
    setRefreshing(false);
  }, []);

  return (
    <>
      <ScrollView
        bounces={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {refreshing && <ActivityIndicator size="large" />}
        {props.data.map((cat, i) => {
          let key = `cat-${i}`;
          return <Card key={key} data={cat} />;
        })}
      </ScrollView>
    </>
  );
}
