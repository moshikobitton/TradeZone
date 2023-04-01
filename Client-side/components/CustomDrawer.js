import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { ChartsContext } from "./Context";

const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const { userLogged, setUserLogged } = useContext(ChartsContext);

  return (
    <View style={{ flex: 1, backgroundColor: "#141b2d" }}>
      <DrawerContentScrollView {...props}>
        <View style={{ marginLeft: 5 }}>
          <Image
            source={require("../assets/images/user-profile.jpg")}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              color: "#fff",
              fontFamily: "OpenSansBold",
              fontSize: 18,
              marginBottom: 5,
              marginLeft: 15,
            }}
          >
            {userLogged.IsLogged ? userLogged.FirstName : "Guest"}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            paddingTop: 10,
          }}
        >
          <DrawerItemList {...props} />
          <View>
            <View
              style={{
                marginTop: 25,
                paddingLeft: 15,
                paddingTop: 15,
                borderTopColor: "#fff",
                borderTopWidth: 1,
              }}
            >
              {userLogged.IsLogged ? (
                <TouchableOpacity
                onPress={() => navigation.navigate("Favorites")}
                style={{ paddingVertical: 15 }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Fontisto name="favorite" color="#fff" size={22} style={{
                      marginLeft: 4,
                    }} />
                  <Text
                    style={{
                      fontSize: 15,
                      marginLeft: 9,
                      color: "#fff",
                      fontFamily: "OpenSans",
                    }}
                  >
                    My Favorites
                  </Text>
                </View>
              </TouchableOpacity>
              ) : (
                ""
              )}

              <TouchableOpacity
                onPress={() => {
                  setUserLogged({
                    UserId: -1,
                    FirstName: "",
                    LastName: "",
                    Email: "",
                    IsLogged: false,
                    Image: "",
                  });
                  navigation.navigate("LoginPage");
                }}
                style={{ paddingVertical: 15 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="exit-outline" color="#fff" size={22} />
                  <Text
                    style={{
                      fontSize: 15,
                      marginLeft: 5,
                      color: "#fff",
                      fontFamily: "OpenSans",
                    }}
                  >
                    {!userLogged.IsLogged && "Sign in"}
                    {userLogged.IsLogged && "Sign out"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
