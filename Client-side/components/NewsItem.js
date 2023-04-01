import { Text, Card } from "@rneui/themed";
import { useContext, useState } from "react";
import { Image, View, Linking, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ChartsContext } from "../components/Context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { insertFavoriteToUser, deleteFavorite } from "./ServiceFunctions";


export default function NewsItem({ item, favorites }) {
  const websiteUrl = item.url;
  const website = websiteUrl.split("https://").pop().split("/")[0];
  const date = item.publishedAt;
  const formatDate = date.replace("T", " ");
  const formatTime = formatDate.replace("Z", "");

  const { userLogged } = useContext(ChartsContext);
  const [isFavorites, setisFavorites] = useState(favorites !== undefined ? favorites : false);

  const addToFavorites = () => {
    if (!userLogged.IsLogged) return alert("You need to sign in first");

    //Insert favorites to DB
    let fav = {
      Author: item.author != null ? item.author : "",
      Content: item.content !== null ? item.content:"",
      Description: item.description !== null ? item.description:"",
      PublishedAt: item.publishedAt !== null ? item.publishedAt:"",
      Journal: item.Journal != null ? item.Journal : "",
      Url: item.url !== null ? item.url : "",
      Picture:item.urlToImage !== null ? item.urlToImage : "",
      UserId: userLogged.UserId,
      Title:item.title !== null ? item.title : ""
    };

    insertFavoriteToUser(fav).then((result) => {
      if (result != 1) {
        alert("This article already in your favorites");
      }
      else alert("This article added succefully");
    });
  };

  const favoriteRemove = () => {
    //Remove favorites from DB
    let fav = {
      Url: item.url,
      UserId: userLogged.UserId
    };
    console.log(fav);
    deleteFavorite(fav);
  };

  return (
    <Card containerStyle={{ borderRadius: 10, backgroundColor: "#1F2A40" }}>
      <Pressable onPress={() => Linking.openURL(item.url)}>
        <Card.Title
          style={{
            textAlign: "left",
            color: "#fff",
            fontFamily: "OpenSansBold",
          }}
        >
          {item.title}
        </Card.Title>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{ height: 20, width: 20, marginBottom: 10 }}
            source={{
              uri: `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${website}&size=20`,
            }}
          />
          <Text
            style={{
              marginLeft: 10,
              color: "#e0e0e0",
              fontFamily: "OpenSansBold",
            }}
          >
            {item.source !== undefined ? item.source.name : ''}
          </Text>
        </View>
        <Card.Divider />
        <Card.Image
          style={{ padding: 0, borderRadius: 10 }}
          source={{
            uri: item.urlToImage !== '' ? item.urlToImage : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN0AAADSCAMAAAD5TDX9AAAAYFBMVEX19fWZmZkzMzOEhITZ2dnu7u5HR0dWVlahoaGysrJ7e3vW1ta7u7vc3NxOTk7f399dXV3Ly8upqam4uLg4ODhnZ2fp6ek/Pz+zs7N0dHSKiopubm7ExMSWlpbl5eWlpaUhZLfyAAAEYElEQVR4nO2c65KiMBBGQQdEAbmIoKLM+7/lGm6BkBZ0tibT1Hd+7Gqla+2zSToBg5YFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJjhhMkpTT3b9tL0lISO6Xz+I3mytxXSZCWC4UStYR+azuznRITbGvzyC+0muHAen773Wu5ZZHzTOX5MMOcmCExn+RnOixk3mn0cR2eeLpN7rg789JzFchz1JsMy6BWcyXzcm8z0A6YFZVAc/Ukjr9Iyzd9OZGsybeW0MDiade61nZeby/ZdTtP0Z+zsk7ls3yTSZD+0u+vaI3P5vod2Gb/Ldq0dl7oZ6pKftePSefod2KDo6/efPDrP0eY+b2ez2LHoKuIiu4T+N/8OxAZzUPKJS1oOQ5MYmAvsOAxNfcW07YsMoS78GNxmIabdcNxRdgwmnm4XpthRl34MrhSo1NO3Qv4qC1L/5mtH3eT7liGUnWcu66UQmQ/tyLuc5rJeCpX5oGMY21GpD+wW/Af8Vcg7fTKEimBQVX5gx2CjSa3m0o7aiXK4t0LtxOz+rpf2touAwU6M2kXb3r6FLJkMdtHkuJuHwRUQXVbmYFBUXky8ORhMO8vKieT7rwo0XzLUcBiY5MWpDNC3sxiYZNWUAfp2BhWzRt95sp1z11GdJ9tZdx1xS08261oZ7MI6dN9OvrbzeBTMBl3Rl62aRk7fLGu/KpCN0zYG9/pGTOvmi9WcTb3sWPdpnHWfpFr5KThr3ScYrZWfPn2OzpmTwyemo7Jjzae+BWs+sS9wVvy0RY0TJkH3pEywridlAAAAAAAAAAAAAAAAAABglM3Xb3/i1u2PcQfubPCmZffRZxmw2xy6lzq7/egMyvYaNVQffZYBu23RnVzT2d3GdodpxBsYsHukbtsTGjsnZm53s87X5mVr53hxke0e4pvHW1bPsv7HDUZ2gziZeLgR74/+1+GYFef2mEd1a95kJuyionkQubHL4/gURUG8q3t0R/bdOE6xe7i2X/mPrB70kXu+V+Fl923AbmtZ7dhs7A7nujeccyn+ou3GcYpd1hzb9+ra2kRY+dFEVXn+UdZjs7YLN+3Bmq/6BWmnxCl27ViPNpUIaNs8Q3ZRISRqu7RfymLxlKBit8ka9mqcYtc9PyrM+0jfkJ2VFlVrd7t2LQfRUYpd6Tfkapxi1y0ywq6PzE3ZWWXZ2snBV2dFjkwlTrHrzsQJOxlpzK4q0iV9J+2IvvOndn2kY8zO2hfRvZ53x65FN++knRLX1Zj71M6L2zfG5t2Ta5kIu0qpmaNHdAd2Spzb/t7RY2qXZO1eKDVoV7nber3bxsN1rLyNggfr3Tju2g5wd2pnxU2bszOzmjdcNrWdc94N9iBpEeRVf0UwtBvH+dk2qfz0aGvsfPea5FUQezuDdta13Wd+i/1j9xidd8zc/hdjxvvMUVxSFtnTwtHYtfvMu1X+uh0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMBq+Qcf9zKBTrP28AAAAABJRU5ErkJggg==",
          }}
        />
        <Text
          style={{
            marginBottom: 20,
            marginTop: 20,
            color: "#fff",
            fontFamily: "OpenSans",
          }}
        >
          {item.description}
        </Text>
      </Pressable>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{ marginTop: 5, color: "#e0e0e0", fontFamily: "OpenSansBold" }}
        >
          Published at: {formatTime}
        </Text>

        {isFavorites ? <MaterialIcons name="favorite"
        size={25}
        style={{ textAlign: "right", color: "#fff" }}
         onPress={favoriteRemove} />
        : <Ionicons name="heart-outline"
        size={25}
        style={{ textAlign: "right", color: "#fff" }}
        onPress={addToFavorites} />}
      </View>
    </Card>
  );
}


export const getNotEmptyValue = (str1, str2, str3,str4) => {
  if (str1 != null || str1 != "") return str1;
  if (str2 != null || str2 != "") return str2;
  if (str3 != null || str3 != "") return str3;
  if (str4 != null || str4 != "") return str4;
};
