import NewsItem from "./NewsItem";
import { useState } from "react";
import { View } from "react-native";

export default function NewsGrid({ items, favorites }) {
  const [articles, setArticles] = useState(items);
  //Handle removing from favorites on myfavorite component.
  const handleFavorites = (url) =>{
    setArticles(articles.filter((article)=> url !== article.url));
  }
  return (
    <View className="news-grid">
      {items.map((item, index) => (
        <NewsItem handleFavorites={handleFavorites} key={index} item={item} favorites={favorites} />
      ))}
    </View>
  );
}
