import React, { useContext, useEffect, useState } from "react";
import NewsGrid from "./NewsGrid";
import { ChartsContext } from "../scenes/global/Context";
import { getAllUserFavorites } from "../data/ServiceFunctions";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Box } from "@mui/material";

export default function Favorites() {
  const { userLogged } = useContext(ChartsContext);
  const [items, setItems] = useState([]);

  //Use effect get all the user's favorites
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLogged.IsLogged) navigate("/");
    getAllUserFavorites(userLogged.UserId).then((result) => {
      // Changing prop name using dot notation to match the item format in the NewsGrid component.
      result = changeObjProps(result);
      setItems(result);
    });
  }, []);

  return (
    <Box m="20px">
      <Header title="My Favorites" subtitle="Articles that I added" />
      {items.length > 0 && <NewsGrid items={items} defaultClicked={true} />}
    </Box>
  );
}

const changeObjProps = (arr) => {
  arr.map((item, index) => {
    item.url = item.Url;
    delete item.Url;

    item.author = item.Author;
    delete item.Author;

    item.content = item.Content;
    delete item.Content;

    item.description = item.Description;
    delete item.Description;

    item.publishedAt = item.PublishedAt;
    delete item.PublishedAt;

    item.source = item.Source;
    delete item.Source;
    item.title = item.Title;
    delete item.Title;

    item.urlToImage = item.Picture;
    delete item.Picture;
  });
  return arr;
};
