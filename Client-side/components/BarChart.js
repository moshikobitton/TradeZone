import { BarChart } from "react-native-chart-kit";
import React from "react";
import { Dimensions } from "react-native";

const BarChartGraph = ({ data }) => {
  const chartConfig = {
    backgroundGradientFrom: "#141b2d",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#141b2d",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 1,
    useShadowColorFromDataset: false,
  };

  return (
    <BarChart
      data={data}
      width={Dimensions.get("window").width}
      height={300}
      yAxisLabel="$"
      yLabelsOffset={-1}
      chartConfig={chartConfig}
      verticalLabelRotation={30}
      style={{ borderRadius: 20, alignSelf: "center" }}
    />
  );
};

export default BarChartGraph;
