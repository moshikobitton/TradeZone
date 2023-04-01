import LineChart from "../components/LineChart";
import { styles } from "../components/GlobalStyle";
import LiveSearch from "../components/LiveSearch";
import ButtonToggleGroup from "react-native-button-toggle-group";
import { View, Text } from "react-native";
import { useContext, useEffect } from "react";
import { ChartsContext } from "../components/Context";
import { api_production } from "../service/service";

const LineChartScreen = () => {
  const {
    dataLineChart,
    setDataLineChart,
    alignmentLineChart,
    setAlignmentLineChart,
    categoryLineChart,
    setCategoryLineChart,
    countriesLineChart,
    setCountriesLineChart,
  } = useContext(ChartsContext);

  // getting the data according the parameters (countries, category, flow)
  useEffect(() => {
    const url = `${api_production}/Countries?category_id=${categoryLineChart}&flow=${alignmentLineChart}`;
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
        (json) => {
          let newData = { labels: [], datasets: [{ data: [] }] };
          json.map((item) => {
            item.Values_per_year.map((coordinates) => {
              if (coordinates.x % 5 === 0) {
                newData.labels.push(coordinates.x);
                newData.datasets[0].data.push(coordinates.y);
              }
            });
          });
          setDataLineChart(newData);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  }, [alignmentLineChart, countriesLineChart, categoryLineChart]);

  // changing the category/year
  const liveSearchChange = (type, selected, results) => {
    if (type === "category") setCategoryLineChart(selected);
    else {
      if (results.length !== 0) {
        let countriesSelected = [];
        results.forEach((country) => {
          if (selected === country.key) {
            countriesSelected.push({
              Id: country.id,
              Name: country.value,
              Code: country.key,
            });
          }
        });
        setCountriesLineChart(countriesSelected);
      }
    }
  };

  return (
    <View flex={1} style={styles.container}>
      <LiveSearch type={"country"} handleChange={liveSearchChange} />
      <LiveSearch type={"category"} handleChange={liveSearchChange} />
      <ButtonToggleGroup
        style={{ width: 200, marginTop: 45, alignSelf: "center" }}
        textStyle={{ fontFamily: "OpenSansBold" }}
        highlightBackgroundColor={"#4cceac"}
        highlightTextColor={"#fff"}
        inactiveBackgroundColor={"#141b2d"}
        inactiveTextColor={"#fff"}
        values={["Export", "Import"]}
        value={alignmentLineChart}
        onSelect={(val) => setAlignmentLineChart(val)}
      />
      {dataLineChart.labels.length > 0 && (
        <View>
          <LineChart data={dataLineChart} />
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Values in Millions
          </Text>
        </View>
      )}
    </View>
  );
};

export default LineChartScreen;
