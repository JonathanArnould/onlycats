import React, { useEffect, useState } from "react";
import axios from "axios";
import Feed from "../components/Feed";

export default function Home() {
  const [catList, setCatList] = useState<{}[]>([]);

  const randomCats = async () => {
    try {
      const res = await axios.get(
        "https://api.thecatapi.com/v1/images/search?limit=50",
        {
          headers: {
            "x-api-key" : "76fe1047-72a2-474e-abce-ef00142c50d2",
          },
        }
      );
      const resGraph = await axios({
        url: "http://localhost:4000/graphql",
        method: "get",
        data: {
          query: `
          query GetRandomCats{
            getRandomCats(limit: 3){
              id,
              name,
              url
            }
          }
        `,
        },
      });
      console.log(res);
      return res.data;
    } catch (error) {
      console.log("error", error);
    }
  };

  const uploadedCats = async () => {
    try {
      const res = await axios.get("https://api.thecatapi.com/v1/images", {
        headers: {
          "x-api-key": "76fe1047-72a2-474e-abce-ef00142c50d2",
        },
      });
      return res.data;
    } catch (error) {
      console.log("error", error);
    }
  };

  const allCats = async () => {
    const res = await Promise.all([randomCats(), uploadedCats()]);
    setCatList([...res[0], ...res[1]]);
  };

  useEffect(() => {
    allCats();
  }, []);

  return <Feed data={catList} />;
}
