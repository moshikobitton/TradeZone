import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useContext, useState } from "react";
import { ChartsContext } from "../scenes/global/Context";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { insertFavoriteToUser, deleteFavorite } from "../data/ServiceFunctions";
import Swal from "sweetalert2";

export default function NewsItem({ item, defaultClicked, handleFavorites }) {
  const websiteUrl = item.url;
  const website = websiteUrl.split("https://").pop().split("/")[0];
  const date = item.publishedAt;
  const formatDate = date.replace("T", " ");
  const formatTime = formatDate.replace("Z", "");
  const { userLogged } = useContext(ChartsContext);
  const [isClicked, setIsClicked] = useState(defaultClicked);
  const addToFavorites = () => {
    if (!userLogged.IsLogged) {
      alert("you need to sign in first");
      return;
    }
    setIsClicked(true);
    //Insert favorites to DB

    console.log(item);
    let fav = {
      Author: item.author != null ? item.author : "",
      Content: item.content !== null ? item.content : "",
      Description:
        item.description !== null || item.Description !== null
          ? item.description || item.Description
          : "",
      PublishedAt: item.publishedAt !== null ? item.publishedAt : "",
      Journal: item.Journal != null ? item.Journal : "",
      Url: item.url !== null ? item.url : "",
      Picture: item.urlToImage !== null ? item.urlToImage : "",
      UserId: userLogged.UserId,
      Title: item.title !== null ? item.title : "",
    };
    console.log(fav);
    insertFavoriteToUser(fav).then((result) => {
      if (result != 1) {
        Swal.fire({
          title: "This article already in your favorites",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        setIsClicked(false);
      }
    });
  };

  const favoriteRemove = () => {
    //Remove favorites from DB
    let fav = {
      Url: item.url,
      UserId: userLogged.UserId,
    };
    deleteFavorite(fav);
    //Handling only if we are on the My favorite component.
    defaultClicked == false ? setIsClicked(false) : setIsClicked(true);
    if (defaultClicked == true) {
      handleFavorites(item.url);
      return;
    }
  };

  return (
    <div className="article">
      <a href={item.url} target="_blank">
        <div className="article-image">
          <img src={item.urlToImage} alt={item.title} />
        </div>
      </a>
      <div className="article-content">
        <div className="article-source">
          <img
            src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${website}&size=16`}
            alt={item.source != undefined ? item.source.id : ""}
          />
          <span>{item.source != undefined ? item.source.name : ""}</span>
          <span style={{ position: "absolute", right: 10, cursor: "pointer" }}>
            {!isClicked && <FavoriteBorderIcon onClick={addToFavorites} />}
            {isClicked && <FavoriteIcon onClick={favoriteRemove} />}
          </span>
        </div>
        <div className="article-title">
          <h2>{item.title}</h2>
        </div>
        <p>{item.description}</p>
        <div>
          <small>
            <b>Published At: </b>
            {formatTime}
          </small>
        </div>
      </div>
    </div>
  );
}

export const getNotEmptyValue = (str1, str2, str3, str4) => {
  if (str1 != null || str1 != "") return str1;
  if (str2 != null || str2 != "") return str2;
  if (str3 != null || str3 != "") return str3;
  if (str4 != null || str4 != "") return str4;
};
