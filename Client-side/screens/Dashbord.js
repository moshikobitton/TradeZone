import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Card } from "@rneui/base";
import { styles } from "../components/GlobalStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import TradesCarousel from "../components/TradesCarousel";
import ChartCarousel from "../components/ChartsCarousel";
import { api_production } from "../service/service";
import {
  getCountries,
  getProducts,
  getTotalTransactions,
  getNumOfRegistered
} from "../components/ServiceFunctions";
import { ChartsContext } from "../components/Context";
import { useEffect, useContext, useState } from "react";

const Dashbord = () => {
  const [top10Transactions, setTop10Transactions] = useState([]);
  const [numOfCountries, setNumOfCountries] = useState();
  const [numOfProducts, setNumOfProducts] = useState();
  const [totalTrades, setTotalTrades] = useState();
  const [charts, setCharts] = useState([]);

  const {
    dataBarChart,
    setDataBarChart,
    categoryBarChart,
    alignmentBarChart,
    countriesBarChart,
    year,
    dataLineChart,
    setDataLineChart,
    categoryLineChart,
    alignmentLineChart,
    countriesLineChart,
    dataPieChart,
    setAmountRegistered,
    setDataPieChart,
    categoriesPieChart,
    alignmentPieChart,
    countryPieChart,
    yearPieChart,
  } = useContext(ChartsContext);

  useEffect(() => {
    getTotalTransactions()
      .then((totalTransactions) => {
        const formattedNumber = totalTransactions.toLocaleString("en-US");
        setTotalTrades(formattedNumber);
      })
      .catch((error) => {
        console.error(error);
      });

    //Get all countries for the boxes details.
    getCountries()
      .then((countries) => {
        setNumOfCountries(countries.length);
      })
      .catch((error) => {
        console.error(error);
      });

    //Get all products for the boxes details.
    getProducts()
      .then((products) => {
        setNumOfProducts(products.length);
      })
      .catch((error) => {
        console.error(error);
      });

      getNumOfRegistered()
        .then((number) => {
          setAmountRegistered(number);
        })
        .catch((error) => {
          console.error(error);
        });

    fetch(`${api_production}/trades`, {
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
          setTop10Transactions(result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  }, []);

  // getting the data according the parameters (countries, category, year, flow)
  useEffect(() => {
    const url = `${api_production}/Countries?code=${categoryBarChart}&flow=${alignmentBarChart}&year=${year}`;
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
        (json) => {
          let newData = { labels: [], datasets: [{ data: [] }] };
          json.map((item) => {
            newData.labels.push(item.Code);
            newData.datasets[0].data.push(item.Sum);
          });
          setDataBarChart(newData);
          setCharts([...charts, { dataChart: newData, kind: "BarChart" }]);
        },
        (error) => {
          console.log("err post=", error);
        }
      );

    const secondUrl = `${api_production}/Countries?category_id=${categoryLineChart}&flow=${alignmentLineChart}`;
    fetch(secondUrl, {
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
          setCharts([...charts, { dataChart: newData, kind: "LineChart" }]);
        },
        (error) => {
          console.log("err post=", error);
        }
      );

    let thirdUrl = `${api_production}/Products?`;
    thirdUrl += `cou=${countryPieChart.Code}&flow=${alignmentPieChart}&year=${yearPieChart}`;
    fetch(thirdUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoriesPieChart),
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (json) => {
          let newData = [];
          newData = json.map((item) => {
            return {
              name: item.Details,
              productValue: item.Sum_values_of_product,
              color: item.Color,
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            };
          });
          setDataPieChart(newData);
          setCharts([...charts, { dataChart: newData, kind: "PieChart" }]);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  }, []);

  useEffect(() => {
    if (
      dataBarChart.labels.length > 0 &&
      dataLineChart.labels.length > 0 &&
      dataPieChart.length > 0
    )
      setCharts([
        { dataChart: dataBarChart, kind: "BarChart" },
        { dataChart: dataLineChart, kind: "LineChart" },
        { dataChart: dataPieChart, kind: "PieChart" },
      ]);
  }, [dataBarChart, dataLineChart, dataPieChart]);

  return (
    <ScrollView flex={1} style={styles.container}>
      <Text style={[styles.headerInput, { fontFamily: "OpenSansBold" }]}>
        A glimpse into the world of commerce
      </Text>
      <Card
        containerStyle={{
          borderRadius: 10,
          width: 330,
          alignSelf: "center",
          backgroundColor: "#1F2A40",
        }}
      >
        <FontAwesome
          name="exchange"
          size={30}
          style={stylesLocally.iconStyle}
        />
        <Card.Divider />
        <Card.Title style={stylesLocally.cardTitle}>
          {totalTrades} Trades
        </Card.Title>
      </Card>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Card containerStyle={stylesLocally.cardStyle}>
          <Ionicons
            name="flag-outline"
            size={30}
            style={stylesLocally.iconStyle}
          />
          <Card.Divider />
          <Card.Title style={stylesLocally.cardTitle}>
            {numOfCountries} Countries
          </Card.Title>
        </Card>
        <Card containerStyle={stylesLocally.cardStyle}>
          <Feather
            name="box"
            size={30}
            style={{ alignSelf: "center", marginBottom: 5, color: "#fff" }}
          />
          <Card.Divider />
          <Card.Title style={stylesLocally.cardTitle}>
            {numOfProducts} Products
          </Card.Title>
        </Card>
      </View>
      {top10Transactions.length > 0 && (
        <TradesCarousel data={top10Transactions} />
      )}
      {charts.length === 3 && <ChartCarousel data={charts} />}
    </ScrollView>
  );
};

const stylesLocally = StyleSheet.create({
  dividerStyle: {
    marginTop: 20,
    width: 350,
    alignSelf: "center",
  },
  cardStyle: {
    borderRadius: 10,
    width: 150,
    backgroundColor: "#1F2A40",
  },
  cardTitle: {
    color: "#fff",
    fontFamily: "OpenSansBold",
    fontSize: 16,
  },
  iconStyle: {
    alignSelf: "center",
    marginBottom: 5,
    color: "#fff",
  },
});

export default Dashbord;
