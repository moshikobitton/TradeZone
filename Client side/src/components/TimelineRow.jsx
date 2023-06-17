import React, { useState } from "react";
import { Box } from "@mui/material";
import TimelineSquare from "./TimelineSquare";
import { tokens } from "../theme";

export default function TimelineRow(props) {
  const colors = tokens();
  const [product, setProduct] = useState(props.product);
  const dictionaryArray = Object.entries(props.product.TimelineSquare);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const popupStyle = {
    position: "absolute",
    width: 250,
    transform: "translateX(-50%)",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "5px",
    opacity: isHovered ? 1 : 0,
    transition: "opacity 0.3s ease-in-out",
  };

  return (
    <Box>
      <Box
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Box
          style={{
            color: "white",
            backgroundColor: colors.blueAccent[700],
            height: 30,
            width: 50,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            margin: 3,
            borderRadius: 5,
            position: "relative",
            cursor: "pointer",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {product.Code}
          <Box style={popupStyle}>{product.Details}</Box>
        </Box>
        {dictionaryArray.length > 0 &&
          dictionaryArray.map((item, key) => (
            <TimelineSquare
              item={item}
              code={product.Code}
              name={product.Details}
              key={key}
            />
          ))}
      </Box>
    </Box>
  );
}
