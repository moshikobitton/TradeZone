import React, { useContext, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom"; // import useHistory
import { ChartsContext } from "../scenes/global/Context";
import { getUser, insertUser } from "../data/ServiceFunctions";

export default function SignWithGoogle() {
  const { setUserLogged, amountRegistered, setAmountRegistered } =
    useContext(ChartsContext);
  const navigate = useNavigate(); // get history from react-router
  const dashboard = () => navigate("/"); // navigate to login page on button click
  useEffect(() => {}, [amountRegistered]);

  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        const googleUser = jwt_decode(credentialResponse.credential);
        //Matching the correct object format to the getUser function.
        let userObj = {
          email: googleUser.email,
          password: googleUser.sub,
        };
        //Check if the user exist in our DB.
        getUser(userObj).then((returnedUser) => {
          if (returnedUser == null) {
            insertUser(googleUser).then((result) => {
              if (result == 1) {
                console.log("Added successfully");
              }
            });
            let numRegistered = amountRegistered + 1;
            setAmountRegistered((prev) => prev + 1);
            let user = {
              UserId: numRegistered,
              FirstName: googleUser.given_name,
              Email: googleUser.email,
              LastName: googleUser.family_name,
              IsLogged: true,
              Image: googleUser.picture,
            };
            setUserLogged({
              UserId: numRegistered,
              FirstName: googleUser.given_name,
              Email: googleUser.email,
              LastName: googleUser.family_name,
              IsLogged: true,
              Image: googleUser.picture,
            });
            console.log(user);
            localStorage.setItem("user", JSON.stringify(user));
            dashboard();
          } else {
            //The user exist already in our DB, so we will set him as logged.
            setUserLogged({
              UserId: returnedUser.UserId,
              FirstName: returnedUser.First_name,
              Email: returnedUser.Email,
              LastName: returnedUser.Last_name,
              IsLogged: true,
              Image: googleUser.picture,
            });
            returnedUser.Image = googleUser.picture;
            localStorage.setItem("user", JSON.stringify(returnedUser));
            dashboard();
          }
        });
      }}
      onError={() => {
        console.log("Not authorized");
      }}
    />
  );
}
