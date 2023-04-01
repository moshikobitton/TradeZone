import { useCallback, useContext, useEffect, useState } from "react";
import NewsGrid from "../components/NewsGrid";
import { ChartsContext } from "../components/Context";
import { getAllUserFavorites } from "../components/ServiceFunctions";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "../components/GlobalStyle";

//const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=baa59cfa2f64449ab76cf4d1b718714f`;
export default function Favorites() {
  const { userLogged } = useContext(ChartsContext);
  const [items, setItems] = useState([]);
  const navigation = useNavigation();
  //Use effect get all the user's favorites

  useFocusEffect(
    useCallback(() => {
      if (!userLogged.IsLogged) () => navigation.navigate("Login");
    getAllUserFavorites(userLogged.UserId).then((result) => {
      // Changing prop name using dot notation to match the item format in the NewsGrid component.
      result = changeObjProps(result);
      setItems(result);
    });
  }));

  return (
    <View flex={1} style={styles.container}>
      {items.length > 0 ? (
        <ScrollView>
          <NewsGrid items={items} defaultClicked={false} favorites={true} />
        </ScrollView>
      ) : (
        <View>
      <Text style={[styles.headerInput, { fontFamily: "OpenSansBold" }]}>
        You don't have any favorite news...{'\n'}{" "}
        <Pressable onPress={() => navigation.navigate("News")}>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold", fontFamily: "OpenSansBold", textDecorationLine: 'underline' }}>
            click here for News page!
          </Text>
        </Pressable>
      </Text>
    </View>
      )}
    </View>
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
