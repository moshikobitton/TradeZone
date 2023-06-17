import React from "react";
import { Box, Button, TextField, IconButton } from "@mui/material";
import { Formik } from "formik";
import Header from "./Header";
import { useState, useContext } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Swal from "sweetalert2";
import { validateEmail } from "../service/service";
import { ChartsContext } from "../scenes/global/Context";
import { useNavigate } from "react-router-dom"; // import useHistory
import SignWithGoogle from "./SignWithGoogle";
import { getUser } from "../data/ServiceFunctions";

export default function Login() {
  const navigate = useNavigate(); // get history from react-router
  const register = () => navigate("/register"); // navigate to login page on button click
  const [validEmail, setValidEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //Toggle the show password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const checkKeyUp = async (event) => {
    await setValidEmail(validateEmail(event.target.value));
  };
  const { userLogged, setUserLogged } = useContext(ChartsContext);
  const handleFormSubmit = (values) => {
    if (!validEmail) {
      Swal.fire({
        icon: "info",
        title: "Email is not valid",
        text: "Enter a valid email!",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          // User clicked the confirm button
          // You can perform the delete operation here
        }
      });
      return;
    }

    getUser(values)
      .then((user) => {
        if (user == null) {
          Swal.fire({
            icon: "info",
            title: "Unknown user",
            text: "You are not registered, press Confirm to register",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          }).then((result) => {
            if (result.isConfirmed) {
              register();
            }
          });
        } else {
          setUserLogged({
            UserId: user.UserId,
            FirstName: user.First_name,
            Email: user.Email,
            LastName: user.Last_name,
            IsLogged: true,
            Image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX1mtYL8f3jCPWwGO9yCiCJlbi8LikmuJMew&usqp=CAU",
          });
          localStorage.setItem("user", JSON.stringify(user));
          let dashboard = () => navigate("/");
          dashboard();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <Box m="20px">
      <Header
        title="Sign in"
        underline="click me"
        subtitle="didn't sign up yet? "
        onClick={register}
      />
      <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
        {({ handleBlur, values, handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
              <TextField
                required={true}
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                onKeyUp={checkKeyUp}
                name="email"
                id="email"
                // Pass the validateEmail function as a prop
                error={!!values.email && !validateEmail(values.email)}
                helperText={
                  !values.email || validateEmail(values.email)
                    ? ""
                    : "Please enter a valid email address"
                }
              />
            </Box>

            <br />
            <br />
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
              <TextField
                variant="filled"
                required={true}
                value={values.password}
                label="Password"
                id="password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  //Where the password toggle will be shown, end is at the end of the textfield.
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  ),
                }}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Box>
            <Box justifyContent="start" mt="50px" display="flex" gap="30px">
              <Button type="submit" color="secondary" variant="contained">
                Login
              </Button>
              <SignWithGoogle />
            </Box>
          </form>
        )}
      </Formik>
      {!validEmail && (
        <script>{`document.getElementById('email').focus();`}</script>
      )}
         
    </Box>
  );
}
