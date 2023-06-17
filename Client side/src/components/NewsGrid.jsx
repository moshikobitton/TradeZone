import { useState } from "react";
import NewsItem from "./NewsItem";

export default function NewsGrid({items, defaultClicked}) {
  const [articles, setArticles] = useState(items);
  //Handle removing from favorites on myfavorite component.
  const handleFavorites = (url) =>{
    setArticles(articles.filter((article)=> url !== article.url));
  }
  return (
    <div className="news-grid">
      {articles.map((item, index) => (
        <NewsItem handleFavorites={handleFavorites} param={index} key={index} item={item} defaultClicked={defaultClicked}/>
      ))}
    </div>
  );
}
