import React, { useCallback } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  } from "react-native";
import Card from "./Card";

interface FeedProps {
  data: any[];
  fetchCats: Function;
  changeFav: Function;
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
        
        {props.data.map((cat) => {
          return <Card key={cat._id} data={cat} changeFav={props.changeFav}/>;
        })}
      </ScrollView>
    </>
  );
}
