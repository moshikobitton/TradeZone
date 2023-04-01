import { useContext, useEffect } from "react";
import { View } from "react-native";
import PieChart from "../components/PieChart";
import { styles } from "../components/GlobalStyle";
import { api_production } from "../service/service";
import LiveSearch from "../components/LiveSearch";
import ButtonToggleGroup from "react-native-button-toggle-group";
import { ChartsContext } from "../components/Context";
import { ScrollView } from "react-native-gesture-handler";
import MultiSelectComponent from "../components/MultiSelect";

const PieChartScreen = () => {
  const {
    dataPieChart,
    setDataPieChart,
    alignmentPieChart,
    setAlignmentPieChart,
    categoriesPieChart,
    setCategoriesPieChart,
    countryPieChart,
    setCountryPieChart,
    yearPieChart,
    setYearPieChart,
  } = useContext(ChartsContext);

  // changing the products
  const multipleSelectChange = (type, selected, results) => {
    if (type === "categories") {
      let categoriesSelected = [];
      results.forEach((category) => {
        selected.forEach((item) => {
          if (item === category.id) {
            categoriesSelected.push({
              Id: category.id,
              Name: category.value,
              Code: category.key,
            });
          }
        });
      });
      setCategoriesPieChart(categoriesSelected);
    }
  };

  const liveSearchChange = (type, selected) => {
    if (type === "country") setCountryPieChart(selected);
    else setYearPieChart(selected);
  };

  useEffect(() => {
    let url = `${api_production}/Products?`;
    if (
      countryPieChart === null ||
      yearPieChart === null ||
      categoriesPieChart.length < 1
    )
      setDataPieChart([]);
    url += `cou=${countryPieChart}&flow=${alignmentPieChart}&year=${yearPieChart}`;
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoriesPieChart),
    })
      .then((response) => response.json())
      .then((json) => {
        let newData =
          json.Message === undefined
            ? json.map((item) => {
                return {
                  name: item.Details,
                  productValue: item.Sum_values_of_product,
                  color: item.Color,
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
                };
              })
            : [];
        setDataPieChart(newData);
      })
      .catch((error) => console.error(error));
  }, [alignmentPieChart, categoriesPieChart, countryPieChart, yearPieChart]);

  return (
    <View flex={1} style={styles.container}>
      <MultiSelectComponent
        dropdownShown={false}
        type="categories"
        handleChange={multipleSelectChange}
        limit={5}
      />
      <ScrollView>
        <LiveSearch type="country" handleChange={liveSearchChange} />
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <LiveSearch type="year" handleChange={liveSearchChange} />
          <ButtonToggleGroup
            style={{ width: 200, marginTop: 45 }}
            textStyle={{ fontFamily: "OpenSansBold" }}
            highlightBackgroundColor="#4cceac"
            highlightTextColor="#fff"
            inactiveBackgroundColor="#141b2d"
            inactiveTextColor="#fff"
            values={["Export", "Import"]}
            value={alignmentPieChart}
            onSelect={(val) => setAlignmentPieChart(val)}
          />
        </View>
        <View style={{ overflow: "auto" }}>
          {dataPieChart.length > 0 && <PieChart data={dataPieChart} />}
        </View>
      </ScrollView>
    </View>
  );
};

export default PieChartScreen;
