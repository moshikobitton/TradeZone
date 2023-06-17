import { Box, IconButton } from "@mui/material";
import { useContext } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom"; // import useHistory
import { ChartsContext } from "./Context";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LogoutIcon from "@mui/icons-material/Logout";

const Topbar = () => {
  const navigate = useNavigate(); // get history from react-router
  const { userLogged, setUserLogged } = useContext(ChartsContext);
  const login = () => {
    setUserLogged({
      FirstName: "",
      LastName: "",
      Email: "",
      IsLogged: false,
      Image:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-9.jpg",
    });
    localStorage.clear();
    //toggle userLogged
    navigate("/login");
  }; // navigate to login page on button click
  const myFavorites = () => {
    navigate("/favorites");
  };
  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      {/* ICONS */}
      <Box display="flex">
        {userLogged.IsLogged && (
          <IconButton onClick={myFavorites}>
            <BookmarkBorderIcon />
          </IconButton>
        )}
        <IconButton onClick={login}>
          {!userLogged.IsLogged && <LoginIcon />}
          {userLogged.IsLogged && <LogoutIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
