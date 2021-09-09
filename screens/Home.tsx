import React, { useEffect, useState } from "react";
import axios from "axios";
import Feed from "../components/Feed";
import { catData } from "../mocks/catData";

export default function Home() {
  const [catList, setCatList] = useState<{}[]>(catData);

  return <Feed data={catList} />;
}
