import React, { useEffect, useState } from "react";
import { styles } from "../components/GlobalStyle";
import { ScrollView } from "react-native-gesture-handler";
import NewsGrid from "../components/NewsGrid";
import NewsLiveSearch from "../components/NewsLiveSearch";

const News = () => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("general");

  useEffect(() => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=baa59cfa2f64449ab76cf4d1b718714f`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setItems(data.articles))
      .catch((err) => console.error("error:" + err));
  }, [category]);

  return (
    <ScrollView flex={1} style={styles.container}>
      <NewsLiveSearch setCategory={setCategory} />
      <NewsGrid items={items} setCategory={setCategory} />
    </ScrollView>
  );
};

export default News;
