import React from "react";
import Feed from "../components/Feed";

interface HomeProps {
  catData : {}[]
}
export default function Home(props : HomeProps) {
console.log("333", props.catData)
  return <Feed data={props.catData} />;
}
