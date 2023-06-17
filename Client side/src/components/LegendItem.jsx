import React from "react";
import { Box } from "@mui/material";

export default function LegendItem({ color, type }) {
  return (
    <Box display="flex" alignItems="center" marginY={1}>
      <Box
        style={{
          width: 30,
          height: 20,
          backgroundColor: color,
          marginRight: 10,
          padding: 15,
          margin: 3,
          borderRadius: 5,
        }}
      />
      <Box
        style={{
          color: "white",
        }}
      >
        {type}
      </Box>
    </Box>
  );
}
