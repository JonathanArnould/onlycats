import React from "react";
import Feed from "../components/Feed";

interface HomeProps {
  catData : {}[]
}
export default function Home(props : HomeProps) {
  return <Feed data={props.catData} />;
}
