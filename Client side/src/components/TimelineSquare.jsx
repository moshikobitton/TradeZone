import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TimelineSquare(props) {
  const colors = { SM: "#DC143C	", NN: "#B2BEB5", SF: "lightsalmon" };
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        style={{
          width: 20,
          height: 20,
          backgroundColor: colors[props.item[1]],
          padding: 15,
          margin: 3,
          borderRadius: 5,
          cursor: "pointer",
        }}
        onClick={() => navigate("/network", { state: props })}
      ></Box>
    </Box>
  );
}
