import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";
import LiveSearch from "../../components/LiveSearch";
import { api_production } from "../../service/service";
import { useEffect, useState } from "react";
import MultipleSelect from "../../components/MultipleSelect";
import {
  CONST_CATEGORY,
  CONST_REPORTER,
  CONST_YEAR,
} from "../../data/ConstVariables";

const Pie = () => {
  const [country, setCountry] = useState(CONST_REPORTER);
  const [year, setYear] = useState(CONST_YEAR);
  const [products, setProducts] = useState([CONST_CATEGORY]);
  const [alignment, setAlignment] = useState("Import");
  const [data, setData] = useState([]);
  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) setAlignment(newAlignment);
  };

  // changing the country/year
  const liveSearchChange = (value, type) => {
    if (type === "year") setYear(value);
    else setCountry(value);
  };

  // changing the products
  const multipleSelectChange = (event, values) => {
    setProducts(values);
  };

  // getting the data according the parameters (country, products, year, flow)
  useEffect(() => {
    let url = `Products?`;
    if (country === null || year === null || products.length < 1) {
      setData([]);
    }
    url += `cou=${country.Code}&flow=${alignment}&year=${year}`;

    fetch(`${api_production}/` + url, {
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
          if (result.length < 1) return setData([]);
          let sum = 0;
          result.map((d, index) => (sum += d.Sum_values_of_product));
          let newData = result.map((d, index) => {
            return {
              id: d.Details,
              label: d.Code,
              value: ((d.Sum_values_of_product / sum) * 100).toFixed(2),
              color: d.Color,
            };
          });
          setData(newData);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  }, [country, year, products, alignment]);

  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Comparison with Pie Chart" />
      <Box height="75vh" className="chart">
        <Box display="flex" justifyContent="center" alignItems="center">
          <MultipleSelect
            type="category"
            handleChange={multipleSelectChange}
            values={products}
            limit={5}
            defaultVal={CONST_CATEGORY}
          />
        </Box>{" "}
        <br />
        <Box display="flex" justifyContent="space-evenly" alignItems="center">
          <LiveSearch
            type="country"
            chart="PieChart"
            handleChange={liveSearchChange}
          />
          <LiveSearch type="year" handleChange={liveSearchChange} />
          <ToggleButtonGroup
            color="secondary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="Export">Export</ToggleButton>
            <ToggleButton value="Import">Import</ToggleButton>
          </ToggleButtonGroup>
        </Box>{" "}
        <br />
        <PieChart data={data} />
      </Box>
    </Box>
  );
};

export default Pie;
