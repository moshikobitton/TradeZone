import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { ChartsContext } from "../scenes/global/Context";
import { useContext } from "react";

const BarChart = ({ layout }) => {
  const colors = tokens();
  const { dataBarChart } = useContext(ChartsContext);

  return (
    <ResponsiveBar
      data={dataBarChart}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      keys={["Sum"]}
      indexBy="Code"
      margin={{ top: 50, right: 130, bottom: 50, left: 100 }}
      padding={0.3}
      layout={layout}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      enableLabel={false}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 3,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: layout === "vertical" ? "Country code" : "Values in milions",
        legendPosition: "middle",
        legendOffset: 40,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: layout === "vertical" ? "Values in milions" : "Country code",
        legendPosition: "middle",
        legendOffset: -80,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;
