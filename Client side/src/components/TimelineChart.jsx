import React from "react";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { api_production } from "../service/service";
import TimelineRow from "./TimelineRow";
import LegendItem from "./LegendItem";

export default function TimelineChart({ products }) {
  const [data, setData] = useState([]);
  const legendItems = [
    { color: "#DC143C", type: "Small-World" },
    { color: "#B2BEB5", type: "Regular" },
    { color: "lightsalmon", type: "Scale-Free" },
  ];

  useEffect(() => {
    fetch(`${api_production}/Products/NetowrkType`, {
      method: "POST",
      body: JSON.stringify(products),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setData(result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  }, [data]);

  return (
    <Box>
      <Box position={"absolute"}>
        {legendItems.map((item, index) => (
          <LegendItem key={index} color={item.color} type={item.type} />
        ))}
      </Box>
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
            height: 30,
            width: 50,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            margin: 3,
            borderRadius: 5,
          }}
        >
          Code
        </Box>
        {Array.from({ length: 2022 - 1990 }, (_, index) => 1990 + index).map(
          (year, key) => (
            <Box
              style={{
                width: 20,
                height: 20,
                padding: 15,
                margin: 3,
                borderRadius: 5,
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              key={key}
            >
              {year}
            </Box>
          )
        )}
      </Box>
      {data.length > 0 &&
        data.map((product, key) => <TimelineRow product={product} key={key} />)}
    </Box>
  );
}
