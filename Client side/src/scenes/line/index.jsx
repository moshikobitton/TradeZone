import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import LiveSearch from "../../components/LiveSearch";
import MultipleSelect from "../../components/MultipleSelect";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useContext } from "react";
import { ChartsContext } from "../global/Context";
import { useEffect } from "react";
import { api_production } from "../../service/service";
import { CONST_REPORTER } from "../../data/ConstVariables";

const Line = () => {
  const {
    setDataLineChart,
    alignmentLineChart,
    setAlignmentLineChart,
    categoryLineChart,
    setCategoryLineChart,
    countriesLineChart,
    setCountriesLineChart,
  } = useContext(ChartsContext);

  // changing the flow (Export/import)
  const importOrExportChange = (event, newAlignment) => {
    if (newAlignment !== null) setAlignmentLineChart(newAlignment);
  };

  // changing the countries
  const multipleSelectChange = (event, values) => {
    setCountriesLineChart(values);
  };

  // changing the category
  const liveSearchChange = (newValue, type, lastValue) => {
    setCategoryLineChart(newValue);
  };

  // getting the data according the parameters (countries, category, flow)
  useEffect(() => {
    if (categoryLineChart === null || countriesLineChart === null) {
      setDataLineChart([]);
      return;
    }
    const url = `${api_production}/Countries?category_id=${categoryLineChart.Code}&flow=${alignmentLineChart}`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(countriesLineChart),
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
          const arr = result.map((country) => {
            return {
              id: country.Code,
              data: [...country.Values_per_year],
            };
          });
          setDataLineChart(arr);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  }, [alignmentLineChart, categoryLineChart, countriesLineChart]);

  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Comparison With Line Chart" />
      <Box display="flex" justifyContent="space-evenly" alignItems="center">
        <MultipleSelect
          type="country"
          handleChange={multipleSelectChange}
          values={countriesLineChart}
          limit={5}
          defaultVal={CONST_REPORTER}
        />
      </Box>
      <br />
      <Box display="flex" justifyContent="space-evenly" alignItems="center">
        <LiveSearch
          type="category"
          chart="LineChart"
          handleChange={liveSearchChange}
        />
        <ToggleButtonGroup
          color="secondary"
          value={alignmentLineChart}
          exclusive
          onChange={importOrExportChange}
          aria-label="Platform"
        >
          <ToggleButton value="Export">Export</ToggleButton>
          <ToggleButton value="Import">Import</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;
