import { Box, Button, Typography } from "@mui/material";
import Header from "../../components/Header";
import HistogramChart from "../../components/HistogramChart";
import LiveSearch from "../../components/LiveSearch";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useEffect, useState, useRef } from "react";
import { api_production } from "../../service/service";
import { tokens } from "../../theme";
import Slider from "@mui/material/Slider";

const Histogram = () => {
  const colors = tokens();
  const [year, setYear] = useState(1);
  const [product, setProduct] = useState({
    Id: 0,
    Details: "All",
    Code: "All",
  });
  const [alignment, setAlignment] = useState("Export");
  const [data, setData] = useState([]);
  let yearInterval = 1990;
  const interval = useRef();
  const [text, setText] = useState("Start Animation");
  const [showYear, setShowYear] = useState(false);
  const [countriesNumber, setCountriesNumber] = useState(10);

  // changing the flow (Export/import)
  const importOrExportChange = (event, newAlignment) => {
    if (newAlignment !== null) setAlignment(newAlignment);
  };

  // changing the product/year
  const liveSearchChange = (value, type) => {
    setShowYear(false);
    setText("Start Animation");

    if (type === "year") {
      if (value === "All") setYear(1);
      else setYear(value);
    } else setProduct(value);
  };

  // getting the data according the parameters (category, year, flow)
  useEffect(() => {
    if (product === null || year === null) {
      setShowYear(false);
      setText("Start Animation");
      return;
    }

    const url = `${api_production}/Countries?ind=${product.Code}&flow=${alignment}&year=${year}&countriesNumber=${countriesNumber}`;

    fetch(url, {
      method: "GET",
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
  }, [alignment, product, year, countriesNumber]);

  //When we leave the page, the interval stops
  useEffect(() => {
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  //Start the animation over the years
  const handleAnimation = () => {
    if (product === null || year === null) return;

    setShowYear(!showYear);
    if (text === "Stop Animation") {
      setText("Start Animation");
      return;
    }

    setText("Stop Animation");
    interval.current = setInterval(() => {
      yearInterval++;
      setYear((prev) => prev + 1);
      if (yearInterval === 2021) clearInterval(interval.current);
    }, 3000);
  };

  useEffect(() => {
    if (text === "Start Animation") {
      clearInterval(interval.current);
    } else {
      setYear(1990);
    }
  }, [text]);

  return (
    <Box m="20px">
      <Header
        title="Histogram Chart"
        subtitle="Explore trends in the world by using Histogram Chart"
      />
      <Box display="flex" justifyContent="space-evenly" alignItems="center">
        <LiveSearch
          type="category"
          chart="HistogramChart"
          handleChange={liveSearchChange}
        />
        <LiveSearch
          type="year"
          chart="HistogramChart"
          handleChange={liveSearchChange}
        />
        <ToggleButtonGroup
          color="secondary"
          value={alignment}
          exclusive
          onChange={importOrExportChange}
          aria-label="Platform"
        >
          <ToggleButton value="Export">Export</ToggleButton>
          <ToggleButton value="Import">Import</ToggleButton>
        </ToggleButtonGroup>
        <Box width="15%" textAlign="center">
          <Slider
            step={1}
            value={countriesNumber}
            marks
            min={1}
            max={20}
            valueLabelDisplay="on"
            onChange={(event) => setCountriesNumber(event.target.value)}
            style={{
              color: colors.greenAccent[300],
            }}
          />
          <Typography>Number of countries</Typography>
        </Box>
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
        {showYear && (
          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              alignSelf: "right",
              position: "absolute",
              marginTop: 150,
            }}
          >
            {year}
          </p>
        )}
      </Box>
      <Box height="75vh" className="chart">
        <HistogramChart data={data} />
      </Box>
    </Box>
  );
};

export default Histogram;
