import React, { useState, useRef, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  Pressable,
  Image,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import {
  validateEmail,
  checkEmailExist,
  insertUser,
} from "../components/ServiceFunctions";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { styles, loginStyle } from "../components/GlobalStyle";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { ChartsContext } from "../components/Context";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

export default function Register() {
  const [validEmail, setValidEmail] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [emptyName, setEmptyName] = useState(false);
  const [emptysurName, setEmptysurName] = useState(false);
  const emailRef = useRef(null);
  const [passwordShown, setPasswordShown] = useState(true);
  const { setUserLogged, userLogged, amountRegistered, setAmountRegistered } =
    useContext(ChartsContext);
  const checkKeyUp = (text) => {
    // check if the entered email is valid
    setValidEmail(validateEmail(text));
  };

  const initialValues = { email: "", password: "", firstName: "", surName: "" };
  const handleFormSubmit = (values) => {
    //Take the props from the values obj, and checks if they are empty or invalid.
    const { email, password, firstName, surName } = values;
    if (!email || !password || !firstName || !surName) {
      setEmptyEmail(!email);
      setEmptyPassword(!password);
      setEmptyName(!firstName);
      setEmptysurName(!surName);
      return;
    }
    //The email is not valid
    else if (!validEmail) {
      Alert.alert("Invalid Email", "Enter a valid email", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => emailRef.current.focus() },
      ]);
      return;
    }

    //Checking the email doesn't exist in the DB.
    else {
      checkEmailExist(values.email).then((result) => {
        if (result != 0) {
          Alert.alert("This email already been used", "Enter a new email", [
            { text: "OK", onPress: () => emailRef.current.focus() },
          ]);
          return;
        }
        let userObj = {
          email: values.email,
          given_name: values.firstName,
          family_name: values.surName,
          sub: values.password,
        };
        insertUser(userObj).then((result) => {
          if (result == 1) {
            //Navigate to dashboard after user logged in.
            let numRegistered = amountRegistered + 1;
            setAmountRegistered((prev) => prev + 1);
            setUserLogged({
              UserId: numRegistered,
              FirstName: values.firstName,
              Email: values.email,
              LastName: values.surName,
              IsLogged: true,
              Image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX1mtYL8f3jCPWwGO9yCiCJlbi8LikmuJMew&usqp=CAU",
            });
            return navigation.navigate("Dashboard");
          }
        });
      });
    }
  };

  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container} flex={1}>
      <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
        {({ handleChange, handleSubmit, values, touched }) => (
          <View
            style={[
              styles.container,
              styles.headerInput,
              { marginTop: "20%", marginLeft: "20%", marginRight: "20%" },
            ]}
          >
            <Image
              source={require("../assets/images/logo.png")}
              style={{ alignSelf: "center" }}
            />
            <Text
              style={[
                styles.headerInput,
                {
                  fontSize: 30,
                  marginBottom: "20%",
                  fontFamily: "OpenSansBold",
                },
              ]}
            >
              TradeZone
            </Text>

            {/* First name input */}
            <View style={loginStyle.viewElement}>
              <TextInput
                style={[
                  styles.headerInput,
                  { fontFamily: "OpenSans", marginLeft: 10 },
                ]}
                onChangeText={(text) => {
                  handleChange("firstName")(text);
                  setEmptyName(false);
                }}
                id="firstName"
                name="firstName"
                label="First Name"
                value={values.name}
                required={true}
                placeholder="Enter your name"
                placeholderTextColor="gray"
                error={!!values.firstname && values.firstname === ""}
              />
            </View>

            {/* Shows error notation if the name is empty when submitted. */}
            {values.firstName == "" && emptyName && (
              <Text style={{ color: "red" }}>Name is required</Text>
            )}

            {/* Sur name input */}
            <View style={loginStyle.viewElement}>
              <TextInput
                style={[
                  styles.headerInput,
                  { fontFamily: "OpenSans", marginLeft: 10 },
                ]}
                onChangeText={(text) => {
                  handleChange("surName")(text);
                  setEmptysurName(false);
                }}
                id="surName"
                name="surName"
                label="Sur Name"
                value={values.surName}
                required={true}
                placeholder="Enter your Surname"
                placeholderTextColor="gray"
                error={!!values.surName && values.surName === ""}
              />
            </View>

            {/* Shows error notation if the surName is empty when submitted. */}
            {emptysurName && (
              <Text style={{ color: "red" }}>surName is required</Text>
            )}

            {/* Email input */}
            <View style={loginStyle.viewElement}>
              <TextInput
                ref={emailRef}
                style={[
                  styles.headerInput,
                  { fontFamily: "OpenSans", marginLeft: 10 },
                ]}
                onChangeText={(text) => {
                  handleChange("email")(text);
                  checkKeyUp(text);
                  setEmptyEmail(false);
                }}
                id="email"
                name="email"
                label="Email"
                value={values.email}
                required={true}
                placeholder="Enter your email"
                placeholderTextColor="gray"
                error={!!values.email && !validateEmail(values.email)}
                touched={touched.email}
              />
              {/* Shows V mark if the email is correct */}
              {validEmail && (
                <Ionicons
                  name="checkmark-circle-outline"
                  color="green"
                  size={22}
                  style={{ marginLeft: 8 }}
                />
              )}
              {/* Shows X if the email is not valid */}
              {!!values.email && !validEmail && (
                <Entypo
                  name="circle-with-cross"
                  color="red"
                  size={22}
                  style={{ marginLeft: 8 }}
                />
              )}
            </View>

            {/* Shows required of the field is empty after submit */}
            {emptyEmail && (
              <Text style={{ color: "red" }}>Email is required</Text>
            )}

            {/* Password input */}
            <View style={loginStyle.viewElement}>
              <TextInput
                style={[
                  styles.headerInput,
                  {
                    fontFamily: "OpenSans",
                    width: 180,
                    textAlign: "left",
                    marginLeft: 10,
                  },
                ]}
                onChangeText={(text) => {
                  handleChange("password")(text);
                  setEmptyPassword(false);
                }}
                id="password"
                name="password"
                label="Password"
                value={values.password}
                isRequired={true}
                placeholder="Enter password"
                placeholderTextColor="gray"
                secureTextEntry={passwordShown}
                error={touched.password}
                touched={touched.password}
              />
              {/* Eye icon to show password's visibility */}
              <Ionicons
                name={passwordShown ? "eye-off-outline" : "eye-outline"}
                color="white"
                size={22}
                style={{ marginRight: 5 }}
                onPress={() => setPasswordShown(!passwordShown)}
              />
            </View>

            {/* Shows error if the password field is empty */}
            {emptyPassword && (
              <Text style={{ color: "red" }}>Password is required</Text>
            )}

            <View
              style={[btnStyles.appButtonContainer, btnStyles.appButtonText]}
            >
              <Pressable onPress={handleSubmit} title="Submit">
                <Text style={btnStyles.buttonStyle}>Register</Text>
              </Pressable>
            </View>
            {/* If presses he goes to the login page */}
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.headerInput, { fontFamily: "OpenSans" }]}>
                Already signed up?{" "}
              </Text>
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text
                  style={[
                    styles.headerInput,
                    {
                      textDecorationLine: "underline",
                      fontFamily: "OpenSans",
                    },
                  ]}
                >
                  click here
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

//Creating button styles.
const btnStyles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: "100%",
    backgroundColor: "lightgreen",
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  buttonStyle: {
    fontFamily: "OpenSansBold",
    fontSize: 18,
    textAlign: "center",
  },
});
