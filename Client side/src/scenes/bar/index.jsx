import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import LiveSearch from "../../components/LiveSearch";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { api_production } from "../../service/service";
import { ChartsContext } from "../global/Context";
import MultipleSelect from "../../components/MultipleSelect";
import { CONST_REPORTER } from "../../data/ConstVariables";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const Bar = () => {
  const {
    categoryBarChart,
    setCategoryBarChart,
    year,
    setYear,
    setDataBarChart,
    setAlignmentBarChart,
    alignmentBarChart,
    countriesBarChart,
    setCountriesBarChart,
    layout,
    setLayout,
  } = useContext(ChartsContext);

  // changing the flow (Export/import)
  const importOrExportChange = (event, newAlignment) => {
    if (newAlignment !== null) setAlignmentBarChart(newAlignment);
  };

  // changing the category/year
  const liveSearchChange = (value, type) => {
    if (type === "category") setCategoryBarChart(value);
    else setYear(value);
  };

  // changing the countries
  const multipleSelectChange = (event, values) => {
    setCountriesBarChart(values);
  };

  // getting the data according the parameters (countries, category, year, flow)
  useEffect(() => {
    if (
      categoryBarChart === null ||
      countriesBarChart === null ||
      year === null
    ) {
      setDataBarChart([]);
      return;
    }
    const url = `${api_production}/Countries?code=${categoryBarChart.Code}&flow=${alignmentBarChart}&year=${year}`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(countriesBarChart),
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
          setDataBarChart(result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
    // eslint-disable-next-line
  }, [alignmentBarChart, categoryBarChart, year, countriesBarChart]);

  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Comparison with Bar Chart" />
      <Box display="flex" justifyContent="space-evenly" alignItems="center">
        <MultipleSelect
          type="country"
          handleChange={multipleSelectChange}
          values={countriesBarChart}
          limit={10}
          defaultVal={CONST_REPORTER}
        />
      </Box>
      <br />
      <Box display="flex" justifyContent="space-evenly" alignItems="center">
        <LiveSearch
          type="category"
          chart="BarChart"
          handleChange={liveSearchChange}
        />
        <LiveSearch
          type="year"
          chart="BarChart"
          handleChange={liveSearchChange}
        />
        <ToggleButtonGroup
          color="secondary"
          value={alignmentBarChart}
          exclusive
          onChange={importOrExportChange}
          aria-label="Platform"
        >
          <ToggleButton value="Export">Export</ToggleButton>
          <ToggleButton value="Import">Import</ToggleButton>
        </ToggleButtonGroup>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                color="secondary"
                onClick={() =>
                  layout === "vertical"
                    ? setLayout("horizontal")
                    : setLayout("vertical")
                }
                checked={layout === "vertical" ? false : true}
              />
            }
            label={layout}
          />
        </FormGroup>
      </Box>
      <Box height="75vh" className="chart">
        <BarChart layout={layout} />
      </Box>
    </Box>
  );
};

export default Bar;
