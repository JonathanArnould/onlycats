import React, { useEffect, useState } from "react";
import axios from "axios";
import Feed from "../components/Feed";

export default function Home() {
  const [catList, setCatList] = useState<{}[]>([]);

  const data = async () => {
    try {
      const res = await axios.get(
        "https://api.thecatapi.com/v1/images/search",
        {
          headers: {
            "Test-Header": "76fe1047-72a2-474e-abce-ef00142c50d2",
          },
        }
      );
      setCatList(res.data);
      console.log(catList)
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(()=> {
    data()
  }, [])


  return <Feed data={catList} />;
}
