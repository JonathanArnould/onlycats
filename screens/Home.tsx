import React from "react";
import Feed from "../components/Feed";

interface HomeProps {
  catData : {}[];
  fetchCats: Function;
  changeFav: Function;
}
export default function Home(props : HomeProps) {
  return <Feed data={props.catData} fetchCats={props.fetchCats} changeFav={props.changeFav}/>;
}
