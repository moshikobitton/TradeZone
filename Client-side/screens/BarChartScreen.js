import { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import BarChart from "../components/BarChart";
import { styles } from "../components/GlobalStyle";
import { api_production } from "../service/service";
import MultiSelectComponent from "../components/MultiSelect";
import LiveSearch from "../components/LiveSearch";
import ButtonToggleGroup from "react-native-button-toggle-group";
import { ChartsContext } from "../components/Context";
import { ScrollView } from "react-native-gesture-handler";

const BarChartScreen = () => {
  const {
    categoryBarChart,
    setCategoryBarChart,
    year,
    setYear,
    dataBarChart,
    setDataBarChart,
    setAlignmentBarChart,
    alignmentBarChart,
    countriesBarChart,
    setCountriesBarChart,
  } = useContext(ChartsContext);

  // changing the countries
  const multipleSelectChange = (type, selected, results) => {
    if (type === "countries" && selected.length <= 3) {
      let countriesSelected = [];
      results.forEach((country) => {
        selected.forEach((item) => {
          if (item === country.id) {
            countriesSelected.push({
              Id: country.id,
              Name: country.value,
              Code: country.key,
            });
          }
        });
      });
      setCountriesBarChart(countriesSelected);
    }
  };

  // changing the category/year
  const liveSearchChange = (type, selected) => {
    if (type === "category") setCategoryBarChart(selected);
    else setYear(selected);
  };

  useEffect(() => {
    const url = `${api_production}/Countries?code=${categoryBarChart}&flow=${alignmentBarChart}&year=${year}`;
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(countriesBarChart),
    })
      .then((response) => response.json())
      .then((json) => {
        let newData = { labels: [], datasets: [{ data: [] }] };
        json.map((item) => {
          newData.labels.push(item.Code);
          newData.datasets[0].data.push(item.Sum);
        });
        setDataBarChart(newData);
      })
      .catch((error) => console.error(error));
  }, [alignmentBarChart, countriesBarChart, categoryBarChart, year]);

  return (
    <View flex={1} style={styles.container}>
      <MultiSelectComponent
        type={"countries"}
        handleChange={multipleSelectChange}
        limit={7}
      />
      <ScrollView flex={1}>
        <LiveSearch type={"category"} handleChange={liveSearchChange} />
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <LiveSearch type={"year"} handleChange={liveSearchChange} />
          <ButtonToggleGroup
            style={{ width: 200, marginTop: 45 }}
            textStyle={{ fontFamily: "OpenSansBold" }}
            highlightBackgroundColor={"#4cceac"}
            highlightTextColor={"#fff"}
            inactiveBackgroundColor={"#141b2d"}
            inactiveTextColor={"#fff"}
            values={["Export", "Import"]}
            value={alignmentBarChart}
            onSelect={(val) => setAlignmentBarChart(val)}
          />
        </View>
        <View style={{ marginTop: 50 }}>
          {dataBarChart.labels.length > 0 && (
            <View>
              <BarChart data={dataBarChart} />
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Values in Millions
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default BarChartScreen;
