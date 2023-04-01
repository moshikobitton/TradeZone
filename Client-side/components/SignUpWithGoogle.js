import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "./GlobalStyle";

WebBrowser.maybeCompleteAuthSession();

const SignUpWithGoogle = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId:
      "581098247799-0sgdjje7hkbqv7lgr6fbu309cfca1tuq.apps.googleusercontent.com",
    expoClientId:
      "581098247799-u65q4upoh1f1s2f6anbi63e1pufvbhh3.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken]);

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const useInfo = await response.json();
    setUser(useInfo);
  }

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <TouchableOpacity
      style={{
        marginTop: 20,
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 10,
      }}
      disabled={!request}
      onPress={() => promptAsync({ useProxy: false, showInRecents: true })}
    >
      <Image
        source={require("../assets/images/google.png")}
        style={{ width: 50, height: 50, borderRadius: 10 }}
      />
      <Text
        style={[
          styles.headerInput,
          { fontFamily: "OpenSansBold", marginLeft: 10, color: "black" },
        ]}
      >
        Sign in with google
      </Text>
    </TouchableOpacity>
  );
};

export default SignUpWithGoogle;
