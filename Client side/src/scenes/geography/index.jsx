import { Box, ToggleButton, ToggleButtonGroup, Button } from "@mui/material";
import GeoMap from "../../components/GeoMap";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { api_production } from "../../service/service";
import { useEffect, useRef, useState } from "react";
import MultipleSelect from "../../components/MultipleSelect";
import { CONST_CATEGORY } from "../../data/ConstVariables";
import { useContext } from "react";
import { ChartsContext } from "../global/Context";
import Slider from "@mui/material/Slider";

const Geography = () => {
  const colors = tokens();

  const {
    setDataGeoChart,
    alignmentGeoChart,
    setAlignmentGeoChart,
    productsGeoChart,
    setProductsGeoChart,
    yearGeoChart,
    setYearGeoChart,
  } = useContext(ChartsContext);
  let yearInterval = 1990;
  const interval = useRef();
  const [text, setText] = useState("Start Animation");

  //When we leave the page, the interval stops
  useEffect(() => {
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  //Start the animation over the years
  const handleAnimation = () => {
    if (text === "Stop Animation" || productsGeoChart.length === 0) {
      clearInterval(interval.current);
      setText("Start Animation");
      return;
    }

    setText("Stop Animation");
    setYearGeoChart(1990);
    interval.current = setInterval(() => {
      yearInterval++;
      setYearGeoChart((prev) => prev + 1);
      if (yearInterval === 2021) clearInterval(interval.current);
    }, 3000);
  };

  //Whether it's export or import.
  const handleChange = (type, newAlignment) => {
    if (newAlignment !== null) setAlignmentGeoChart(newAlignment);
  };

  //When we change the products
  const multipleSelectChange = (event, values) => {
    setProductsGeoChart(values);
  };

  // getting the data according the parameters (products, year, flow)
  useEffect(() => {
    let url = `Countries?`;
    url += `flow=${alignmentGeoChart}&year=${yearGeoChart}`;

    fetch(`${api_production}/` + url, {
      method: "POST",
      body: JSON.stringify(productsGeoChart),
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
          if (result.length < 1) {
            setDataGeoChart({ data: [], max: 1 });
            clearInterval(interval.current);
            setText("Start Animation");
          }
          let values = [];
          let newData = result.map((c, index) => {
            values.push(c.Sum);
            return {
              id: c.Code,
              value: c.Sum,
            };
          });
          values = values.sort(function (a, b) {
            return a - b;
          });
          let max = values[values.length - 4];
          setDataGeoChart({ data: newData, max });
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  }, [yearGeoChart, productsGeoChart, alignmentGeoChart]);

  return (
    <Box m="20px">
      <Header title="Geography" subtitle="Comparison with Geography Chart" />
      <Box display="flex" justifyContent="space-evenly" alignItems="center">
        <MultipleSelect
          type="category"
          handleChange={multipleSelectChange}
          values={productsGeoChart}
          limit={3}
          defaultVal={CONST_CATEGORY}
        />
        <ToggleButtonGroup
          color="secondary"
          value={alignmentGeoChart}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="Export">Export</ToggleButton>
          <ToggleButton value="Import">Import</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <br />
      <Box
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
        className="chart"
        display="flex"
        position="relative"
      >
        <GeoMap />
        <Button
          onClick={handleAnimation}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: 3,
            height: 30,
            cursor: "pointer",
          }}
        >
          {text}
        </Button>
        <Slider
          aria-labelledby="discrete-slider-small-steps"
          value={yearGeoChart}
          step={1}
          marks
          min={1990}
          max={2021}
          valueLabelDisplay="on"
          onChange={(event) => setYearGeoChart(event.target.value)}
          onClick={() => {
            clearInterval(interval.current);
            setText("Start Animation");
          }}
          style={{
            position: "absolute",
            color: colors.greenAccent[300],
            width: "50%",
            bottom: "20%",
            left: "20%",
          }}
        />
      </Box>
    </Box>
  );
};

export default Geography;
