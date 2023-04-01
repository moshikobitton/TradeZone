import { Dimensions, View, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";
import React from "react";

const PieChartGraph = ({ data }) => {
  const totalValues = data.reduce(
    (sum, { productValue }) => sum + productValue,
    0
  );
  const sortedData = data.sort((a, b) => b.productValue - a.productValue);
  const chartConfig = {
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    formatText: (value, name) =>
      `${name}: ${((value / totalValues) * 100).toFixed(2)}%`,
  };

  return (
    <View style={{ marginBottom: 30 }}>
      <PieChart
        data={sortedData}
        width={Dimensions.get("window").width + 170}
        height={400}
        accessor="productValue"
        backgroundColor="transparent"
        paddingLeft="60"
        chartConfig={chartConfig}
        style={{ marginVertical: 8, paddingRight: 0 }}
      />
      <View style={{ flexDirection: "col", alignItems: "flex-start" }}>
        {data.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 5,
            }}
          >
            <View
              style={{
                width: 15,
                height: 15,
                backgroundColor: item.color,
                borderRadius: 15,
                margin: 5,
              }}
            />
            <Text style={{ fontSize: 15, margin: 5, color: "white" }}>{`${(
              (item.productValue / totalValues) *
              100
            ).toFixed(1)}%, ${item.name}`}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
export default PieChartGraph;
