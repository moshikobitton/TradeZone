import { View } from "react-native";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const LineChartGraph = ({ data }) => {
  return (
    <View style={{ marginTop: 50 }}>
      <LineChart
        data={data}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundGradientFrom: "#141b2d",
          backgroundGradientTo: "#141b2d",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default LineChartGraph;
