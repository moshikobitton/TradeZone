import { NavigationContainer } from "@react-navigation/native";
import AppDrawer from "./navigation/AppDrawer";
import "react-native-gesture-handler";
import Context from "./components/Context";
import { useFonts } from "expo-font";


function App() {
  const [fontsLoaded] = useFonts({
    OpenSansBold: require("./assets/fonts/OpenSans-Bold.ttf"),
    OpenSans: require("./assets/fonts/OpenSans-Medium.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <Context>
      <NavigationContainer>
        <AppDrawer />
      </NavigationContainer>
    </Context>
  );
}

export default App;
