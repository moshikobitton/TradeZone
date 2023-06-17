import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Menu from "../../components/Menu";
import NewsGrid from "../../components/NewsGrid";

const News = () => {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(1);
  const [category, setCategory] = useState("general");

  useEffect(() => {
    const url = `https://roeilavie.pythonanywhere.com/?category=${category}`;
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setItems([]);
        setItems(data.articles);
      })
      .catch((err) => console.error("error:" + err));
  }, [category]);

  return (
    <Box m="20px">
      <Header title="News" subtitle="World News" />
      <Menu active={active} setActive={setActive} setCategory={setCategory} />
      {items.length > 0 && <NewsGrid items={items} defaultClicked={false} />}
    </Box>
  );
};

export default News;
