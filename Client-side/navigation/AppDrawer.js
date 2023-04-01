import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Dashbord from "../screens/Dashbord";
import Audit from "../screens/Audit";
import News from "../screens/News";
import FAQ from "../screens/FAQ";
import BarChartScreen from "../screens/BarChartScreen";
import PieChartScreen from "../screens/PieChartScreen";
import LineChartScreen from "../screens/LineChartScreen";
import GeographyChartScreen from "../screens/GeographyChartScreen";
import LoginRegisterStack from "./LoginRegisterStack";
import Favorites from "../screens/Favorites";
import { Image, Text, View } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const LogoTitle = () => {
  return (
    <Image
      style={{ width: 35, height: 35, marginLeft: 10 }}
      source={require("../assets/images/logo.png")}
    />
  );
};

const AppDrawer = () => {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerTitle: (props) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#fff",
                  fontFamily: "OpenSansBold",
                }}
              >
                {props.children}
              </Text>
            </View>
            <View>
              <LogoTitle {...props} />
            </View>
          </View>
        ),
        drawerActiveBackgroundColor: "#4cceac",
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: "#141b2d" },
        headerTitleStyle: { color: "#fff" },
        drawerStyle: { color: "#fff" },
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#fff",
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
          fontFamily: "OpenSans",
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
    >
      <Drawer.Screen
        name="Dashboard"
        component={Dashbord}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Audit"
        component={Audit}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="page-next-outline"
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="News"
        component={News}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="newspaper-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="FAQ"
        component={FAQ}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="chat-question-outline"
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Bar Chart"
        component={BarChartScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="bar-chart-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Pie Chart"
        component={PieChartScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="pie-chart-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Line Chart"
        component={LineChartScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-line" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Geography Chart"
        component={GeographyChartScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="map-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="LoginPage"
        component={LoginRegisterStack}
        options={{ headerShown: false, drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="Favorites"
        component={Favorites}
        options={{ drawerItemStyle: { display: "none" }}}
      />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
