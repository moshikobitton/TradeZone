import React from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoFeatures } from "../data/mockGeoFeatures";
import { useContext } from "react";
import { ChartsContext } from "../scenes/global/Context";

function MyResponsiveChoropleth({ isDashboard = false }) {
  const { dataGeoChart } = useContext(ChartsContext);
  return (
    <ResponsiveChoropleth
      data={dataGeoChart.data !== undefined ? dataGeoChart.data : []}
      colors="YlOrRd"
      features={geoFeatures.features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      domain={[0, dataGeoChart.max]}
      unknownColor="#666666"
      valueFormat=".2s"
      projectionScale={isDashboard ? 40 : 190}
      projectionTranslation={isDashboard ? [0.49, 0.6] : [0.5, 0.6]}
      projectionRotation={[0, 0, 0]}
      borderWidth={1.5}
      borderColor="#ffffff"
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-left",
                direction: "column",
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: "grey",
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#ffffff",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
}

export default MyResponsiveChoropleth;
