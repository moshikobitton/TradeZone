import { useEffect, useState } from "react";
import Network from "../../components/NetworkChart";
import {
  CONST_CATEGORY,
  CONST_YEAR,
  CONST_REPORTER,
} from "../../data/ConstVariables";
import { Box, Button, Typography } from "@mui/material";
import LiveSearch from "../../components/LiveSearch";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import CommunityModal from "../../components/CommunityModal";
import { api_python, api_production } from "../../service/service";
import { getCountries } from "../../data/ServiceFunctions";
import NumberTextField from "../../components/NumberTextField";
import NetworkLegends from "../../components/NetworkLegends";
import StateModal from "../../components/StateModal";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function index() {
  const location = useLocation();
  const { state } = location;
  const [year, setYear] = useState(
    state !== null ? parseInt(state.item[0]) : CONST_YEAR
  );
  const [product, setProduct] = useState(
    state !== null
      ? { Id: 10, Details: state.name, Code: state.code }
      : CONST_CATEGORY
  );
  const [percentage, setPercentage] = useState(100);
  const [first, setFirst] = useState(false);
  const [countries, setCountries] = useState({ size: 199, ind: "" });
  const [sendData, setSendData] = useState({ countries: [], trades: [] });
  const [communitiesBtn, setCommunitiesBtn] = useState(false);
  const [countrySelected, setCountrySelected] = useState(false);
  const [country, setCountry] = useState(CONST_REPORTER);
  const [statesTreeMap, setStatesTreeMap] = useState({});
  const [spinner, setSpinner] = useState(false);
  const networkTypeDict = {
    SM: "This network is Small-World",
    NN: "This network is neither Small-World nor Scale-Free",
    SF: "This network is Scale-Free",
  };

  const [networkType, setNetworkType] = useState("");
  const [communitiesSelection, setCommunitiesSelection] = useState([
    0, 1, 2, 3,
  ]);
  const [networkData, setNetworkData] = useState({
    data: { nodes: [], edges: [] },
    communitiesInfo: [],
    modularity: 0,
  });
  const colors = tokens();

  const continentsToNumbers = (name) => {
    let value = 0;
    switch (name) {
      case "Africa":
        value = 1;
        break;

      case "Oceania":
        value = 2;
        break;

      case "Europe":
        value = 3;
        break;

      case "Americas":
        value = 4;
        break;

      case "Asia":
        value = 5;
        break;
    }
    return value;
  };

  const getCountryLinks = (country) => {
    setCountrySelected(true);
    const countriesLinks =
      communitiesBtn == true
        ? networkData.communitiesInfo[country.group - 1].edges.filter(
            (cou) =>
              cou.target.code === country.code ||
              cou.source.code === country.code
          )
        : networkData.data.edges.filter(
            (cou) =>
              cou.target.code === country.code ||
              cou.source.code === country.code
          );

    const formattedData = countriesLinks.map((cou) => {
      if (cou.target.code === country.code) {
        return {
          name: cou.source.code,
          size: Math.log(cou.value),
          continent: continentsToNumbers(cou.source.continent),
          fullname: cou.source.name,
        };
      } else if (cou.source.code === country.code) {
        return {
          name: cou.target.code,
          size: Math.log(cou.value),
          continent: continentsToNumbers(cou.target.continent),
          fullname: cou.target.name,
        };
      }
    });
    formattedData.sort((a, b) => b.size - a.size);
    setStatesTreeMap(formattedData);
  };

  const liveSearchChange = (value, type) => {
    switch (type) {
      case "category":
        setProduct(value);
        break;

      case "year":
        setYear(value);
        break;

      case "country":
        value !== null ? setCountry(value) : setCountry("");
        break;
    }
  };

  const numberTextFieldChange = (value, name) => {
    setPercentage(parseInt(value));
  };

  const getNextCommunityIndex = (index) => {
    let newCommunitiesSelection = [...communitiesSelection];
    let value =
      (communitiesSelection[index] + 1) %
      (networkData.communitiesInfo.length + 1);
    newCommunitiesSelection[index] = value;
    setCommunitiesSelection(newCommunitiesSelection);
  };

  useEffect(() => {
    getCountries()
      .then((countries) => {
        setSendData((prev) => ({ countries, trades: prev.trades }));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (networkData.data.nodes.length > 0 && country !== null) {
      let newNetworkData = {
        data: {
          nodes: networkData.data.nodes,
          edges: networkData.data.edges,
          selected: country.Name,
        },
        communitiesInfo: networkData.communitiesInfo,
        modularity: networkData.modularity,
      };
      setNetworkData(newNetworkData);
    }
  }, [country]);

  useEffect(() => {
    if (product === null || year === null) return;

    if (percentage == 100)
      fetch(`${api_production}/Trades?year=${year}&ind=${product.Code}`, {
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
            setSendData((prev) => ({
              countries: prev.countries,
              trades: result,
            }));
          },
          (error) => {
            console.log("err GET=", error);
          }
        );
    else {
      let numOfCountries = Math.floor((1 / 100) * percentage * countries.size);
      fetch(
        `${api_production}/Trades?year=${year}&ind=${product.Code}&percentage=${numOfCountries}`,
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          }),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then(
          (result) => {
            setSendData((prev) => ({
              countries: prev.countries,
              trades: result,
            }));
          },
          (error) => {
            console.log("err GET=", error);
          }
        );
    }
  }, [percentage]);

  useEffect(() => {
    if (product === null || year === null) return;

    if (percentage == 100 && first)
      fetch(`${api_production}/Trades?year=${year}&ind=${product.Code}`, {
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
            setSendData((prev) => ({
              countries: prev.countries,
              trades: result,
            }));
          },
          (error) => {
            console.log("err GET=", error);
          }
        );
    else {
      setFirst(true);
      setPercentage(100);
    }
  }, [product, year]);

  useEffect(() => {
    if (sendData.countries.length > 0 && sendData.trades.length > 0) {
      setSpinner(true);
      fetch(`${api_python}/newman`, {
        method: "POST",
        body: JSON.stringify(sendData),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          return res.json();
        })
        .then(
          (result) => {
            setNetworkData(result);
            setSpinner(false);
            setCountries((prev) =>
              prev.ind !== product.Code
                ? { size: result.data.nodes.length, ind: product.Code }
                : prev
            );
          },
          (error) => {
            console.log("err post=", error);
          }
        );

      fetch(`${api_production}/Products/NetowrkType`, {
        method: "POST",
        body: JSON.stringify([product]),
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
            setNetworkType(networkTypeDict[result[0].TimelineSquare[year]]);
          },
          (error) => {
            console.log("err post=", error);
          }
        );
    }
  }, [sendData]);

  useEffect(() => {}, [communitiesSelection]);

  return (
    <Box m="20px" width={1570}>
      <Header
        title="Network"
        subtitle="Detect communities with Network Chart"
      />
      <Box display="flex" justifyContent="space-evenly" alignItems="center">
        <LiveSearch
          type="year"
          handleChange={liveSearchChange}
          defaultValue={year}
        />
        <LiveSearch
          type="category"
          handleChange={liveSearchChange}
          defaultValue={product}
        />
        <LiveSearch type="country" handleChange={liveSearchChange} />
        <Box width="8%" textAlign="center">
          <NumberTextField
            type="Number of countries (%)"
            value={percentage}
            handleChange={numberTextFieldChange}
          />
        </Box>
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontWeight: "bold",
          }}
          onClick={() => setCommunitiesBtn((prev) => !prev)}
        >
          {!communitiesBtn ? "Communities" : "Network"}
        </Button>
        <NetworkLegends color={colors.blueAccent[700]} />
      </Box>{" "}
      <br />
      {spinner ? (
        <LoadingSpinner />
      ) : (
        <Box
          ml="20px"
          height={800}
          width={1520}
          border={!communitiesBtn ? `1px solid ${colors.grey[100]}` : ""}
          borderRadius="4px"
          className="chart"
        >
          {communitiesBtn ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {[0, 1, 2, 3].map((index) => (
                <Box
                  height={"50%"}
                  width={"50%"}
                  border={`1px solid ${colors.grey[100]}`}
                  borderRadius="10px"
                  key={index}
                >
                  <Box
                    flexDirection={"row"}
                    display={"flex"}
                    width={"60%"}
                    justifyContent={"space-between"}
                  >
                    <Button
                      sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontWeight: "bold",
                      }}
                      onClick={(e) => getNextCommunityIndex(index)}
                    >
                      Next community
                    </Button>
                    <Typography color={colors.grey[100]} variant="h5">
                      {networkData.communitiesInfo[
                        communitiesSelection[index]
                      ] !== undefined
                        ? networkData.communitiesInfo[
                            communitiesSelection[index]
                          ].networkType
                        : networkType}
                    </Typography>
                  </Box>
                  <Network
                    getCountryLinks={getCountryLinks}
                    data={
                      networkData.communitiesInfo[
                        communitiesSelection[index]
                      ] !== undefined
                        ? {
                            nodes:
                              networkData.communitiesInfo[
                                communitiesSelection[index]
                              ].nodes,
                            edges:
                              networkData.communitiesInfo[
                                communitiesSelection[index]
                              ].edges,
                            selected: country.Name,
                          }
                        : networkData.data
                    }
                    height={600}
                    width={760}
                  />
                </Box>
              ))}
            </div>
          ) : (
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <CommunityModal
                    data={networkData.communitiesInfo}
                    modularity={networkData.modularity}
                  />
                </div>
              </div>
              <Network
                data={networkData.data}
                height={800}
                width={1520}
                getCountryLinks={getCountryLinks}
              />
            </div>
          )}
        </Box>
      )}
      {countrySelected && product && year && (
        <StateModal
          product={product.Details}
          year={year}
          country={country.Name}
          open={countrySelected}
          setCountrySelected={setCountrySelected}
          data={statesTreeMap}
        />
      )}
    </Box>
  );
}
