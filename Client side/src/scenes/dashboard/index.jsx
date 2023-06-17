import { Box, IconButton, Typography } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import FlagIcon from "@mui/icons-material/Flag";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeoMap from "../../components/GeoMap";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import { useEffect, useContext, useState } from "react";
import { ChartsContext } from "../global/Context";
import { api_production } from "../../service/service";
import {
  getCountries,
  getNumOfRegistered,
  getProducts,
  getTotalTransactions,
} from "../../data/ServiceFunctions";
import ImportExportIcon from "@mui/icons-material/ImportExport";

const Dashboard = () => {
  const colors = tokens();
  const [top10Transactions, setTop10Transactions] = useState([]);
  const [numOfCountries, setNumOfCountries] = useState();
  const [numOfProducts, setNumOfProducts] = useState();
  const [totalTrades, setTotalTrades] = useState();

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

  const {
    setDataBarChart,
    categoryLineChart,
    categoryBarChart,
    year,
    alignmentLineChart,
    alignmentBarChart,
    setDataLineChart,
    countriesBarChart,
    countriesLineChart,
    setDataGeoChart,
    dataGeoChart,
    alignmentGeoChart,
    productsGeoChart,
    yearGeoChart,
    setAmountRegistered,
    layout,
  } = useContext(ChartsContext);
  const [showBarChart, setShowBarChart] = useState(false);

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
          setShowBarChart(true);
        },
        (error) => {
          console.log("err post=", error);
        }
      );

    if (categoryLineChart === null || countriesLineChart === null) {
      setDataLineChart([]);
      return;
    }
    const secondUrl = `${api_production}/Countries?category_id=${categoryLineChart.Code}&flow=${alignmentLineChart}`;
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

    if (dataGeoChart.data.length === 0) {
      const thirdUrl = `${api_production}/Countries?flow=${alignmentGeoChart}&year=${yearGeoChart}`;
      fetch(thirdUrl, {
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
    }
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="DASHBOARD"
          subtitle="A glimpse into the world of commerce"
        />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          borderRadius="10px"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={numOfCountries}
            subtitle="Total Countries"
            icon={
              <FlagIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          borderRadius="10px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={numOfProducts}
            subtitle="Number of Products"
            icon={
              <CategoryIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          borderRadius="10px"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalTrades}
            subtitle="Total Trades"
            icon={
              <ImportExportIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          borderRadius="10px"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {alignmentLineChart} of products over the years
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          borderRadius="10px"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Top 10 Transactions
            </Typography>
          </Box>
          {top10Transactions.map((transaction, i) => (
            <Box
              key={`${transaction.ID}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {`Export: ${transaction.CouISO}`}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {`Import: ${transaction.ParISO}`}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.Year}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${Math.round(transaction.Value).toLocaleString("en-US")}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          borderRadius="10px"
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity Specific Year
          </Typography>
          <Box height="250px" mt="-20px" className="chart">
            {showBarChart && <BarChart isDashboard={true} layout={layout} />}
          </Box>
        </Box>
        <Box
          borderRadius="10px"
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px" className="chart">
            <GeoMap isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
