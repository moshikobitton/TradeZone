import { Box } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import { tokens } from "../theme";
import { ChartsContext } from "../scenes/global/Context";
import { getCountries, getProducts } from "../data/ServiceFunctions";
import {
  CONST_CATEGORY,
  CONST_PARTNER,
  CONST_REPORTER,
  CONST_YEAR,
} from "../data/ConstVariables";

const LiveSearch = ({ type, handleChange, chart, defaultValue }) => {
  const { categoryBarChart, categoryLineChart, year } =
    useContext(ChartsContext);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");
  const colors = tokens();

  //get all the data for the inputs
  useEffect(() => {
    if (type === "category") {
      getProducts()
        .then((result) => {
          result =
            chart === "HistogramChart"
              ? [{ Id: 0, Details: "All", Code: "All" }, ...result]
              : result;
          setResults(result);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (type === "year") {
      let arr = chart === "HistogramChart" ? ["All"] : [];
      let index = chart === "HistogramChart" ? 1 : 0;
      for (let i = 1990; i <= 2021; i++, index++) arr[index] = i;
      setResults(arr);
    } else {
      getCountries()
        .then((result) => {
          setResults(result);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  //set the data in the inputs
  useEffect(() => {
    switch (type) {
      case "category":
        if (chart === "BarChart") setValue(categoryBarChart);
        if (chart === "LineChart") setValue(categoryLineChart);
        if (chart === "HistogramChart")
          setValue({ Id: 0, Details: "All", Code: "All" });
        else
          setValue(defaultValue !== undefined ? defaultValue : CONST_CATEGORY);
        break;

      case "year":
        if (chart === "BarChart") setValue(year);
        if (chart === "HistogramChart") setValue("All");
        else setValue(defaultValue !== undefined ? defaultValue : CONST_YEAR);
        break;

      case "partner":
        setValue(CONST_PARTNER);
        break;

      default: // reporter or country
        setValue(CONST_REPORTER);
        break;
    }
  }, [results]);

  return (
    <Box
      backgroundColor={colors.primary[400]}
      width={type === "category" ? 400 : 200}
    >
      <Autocomplete
        value={value}
        id="products_bar_chart"
        getOptionLabel={(results) => {
          if (type === "category") return `${results.Details}`;
          else if (type === "year") return `${results}`;
          else return `${results.Name}`;
        }}
        options={results}
        isOptionEqualToValue={(option, value) => {
          if (type === "category") return option.Details === value.Details;
          else if (type === "year") return option === value;
          else return option.Name === value.Name;
        }}
        noOptionsText={"No available " + type}
        renderOption={(props, results) => (
          <Box
            component="li"
            {...props}
            key={
              type === "category"
                ? results.Id
                : type === "year"
                ? results
                : results.Id
            }
          >
            {type === "category"
              ? results.Details
              : type === "year"
              ? results
              : results.Name}
          </Box>
        )}
        renderInput={(params) => (
          <TextField {...params} label={"Choose " + type} />
        )}
        onChange={(event, newValue) => {
          handleChange(newValue, type, chart);
          setValue(newValue);
        }}
      />
    </Box>
  );
};

export default LiveSearch;
