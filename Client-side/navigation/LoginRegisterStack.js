import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/LoginScreen";
import Register from "../screens/RegisterScreen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DrawerActions } from "@react-navigation/native";

const Stack = createStackNavigator();

const LoginRegisterStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerStyle: {
            backgroundColor: "#141b2d",
          },
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "OpenSansBold",
            fontSize: 20,
          },
          headerLeft: () => {
            return (
              <Ionicons
                name="menu-outline"
                size={30}
                color="#fff"
                style={{ marginLeft: 15 }}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerStyle: {
            backgroundColor: "#141b2d",
          },
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "OpenSansBold",
            fontSize: 20,
          },
          headerLeft: () => {
            return (
              <MaterialIcons
                name="arrow-back-ios"
                size={22}
                color="#fff"
                style={{ marginLeft: 15 }}
                onPress={() => navigation.navigate("Login")}
              />
            );
          },
          headerRight: () => {
            return (
              <Ionicons
                name="home-outline"
                size={22}
                color="#fff"
                style={{ marginRight: 15 }}
                onPress={() => navigation.goBack()}
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default LoginRegisterStack;
