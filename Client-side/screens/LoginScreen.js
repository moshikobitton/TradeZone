import React, { useState, useRef, useContext } from "react";
import { View, Text, TextInput, Alert, Pressable, Image } from "react-native";
import { Formik } from "formik";
import { validateEmail, getUser } from "../components/ServiceFunctions";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { styles, loginStyle } from "../components/GlobalStyle";
import { StyleSheet } from "react-native";
import { ChartsContext } from "../components/Context";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();
  const [validEmail, setValidEmail] = useState(false); // state for checking valid email
  const [passwordShown, setPasswordShown] = useState(true);
  const emailRef = useRef(null);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const { setUserLogged } = useContext(ChartsContext);

  //Check empty values
  const handleFormSubmit = (values) => {
    const { email, password } = values;
    if (!email || !password) {
      setEmptyEmail(!email);
      setEmptyPassword(!password);
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
    //Check if the user exists in our DB. continue tommorow
    else {
      getUser(values)
        .then((user) => {
          if (user == null) {
            Alert.alert(
              "Incorrect details",
              "Emaill or password are incorrect",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Canceled"),
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => console.log("Moving to registeration"),
                },
              ]
            );
          } else {
            setUserLogged({
              UserId: user.UserId,
              FirstName: user.First_name,
              Email: user.Email,
              LastName: user.Last_name,
              IsLogged: true,
              Image: "",
            });
            navigation.navigate("Dashboard");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const checkKeyUp = (text) => {
    // check if the entered email is valid
    setValidEmail(validateEmail(text));
  };

  const initialValues = { email: "", password: "" };

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
        {({ handleChange, handleSubmit, values, touched }) => (
          <View style={[styles.container, { margin: "20%" }]}>
            <Image
              source={require("../assets/images/logo.png")}
              style={{ alignSelf: "center" }}
            />
            <Text
              style={[
                styles.headerInput,
                {
                  fontSize: 25,
                  marginBottom: "20%",
                  fontFamily: "OpenSansBold",
                },
              ]}
            >
              TradeZone
            </Text>
            <View style={[loginStyle.inputContainer]}></View>
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
              {/* Shows required of the field is empty after submit */}
            </View>
            {emptyEmail && (
              <Text style={{ color: "red" }}>Email is required</Text>
            )}

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
            {emptyPassword && (
              <Text style={{ color: "red", fontFamily: "OpenSansBold" }}>
                Password is required
              </Text>
            )}

            <View
              style={[
                stylesLocally.appButtonContainer,
                stylesLocally.appButtonText,
              ]}
            >
              <Pressable onPress={handleSubmit} title="Submit">
                <Text style={stylesLocally.buttonStyle}>Login</Text>
              </Pressable>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.headerInput, { fontFamily: "OpenSans" }]}>
                Didn't sign up yet?{" "}
              </Text>
              <Pressable onPress={() => navigation.navigate("Register")}>
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
    </View>
  );
}

const stylesLocally = StyleSheet.create({
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
