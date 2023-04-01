import { WebView } from "react-native-webview";
import { styles } from "../components/GlobalStyle";
import { View } from "react-native";

const GeographyChartScreen = () => {
  return (
    <View flex={1} style={styles.container}>
      <WebView
        source={{ uri: "https://proj.ruppin.ac.il/cgroup1/test2/tar3/build/" }}
      />
    </View>
  );
};

export default GeographyChartScreen;
