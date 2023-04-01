import { View, Text } from "react-native";
import { styles } from "../components/GlobalStyle";
import DataTable from "../components/DataTable";
import LiveSearch from "../components/LiveSearch";
import { useState, useEffect, useCallback} from "react";
import { useFocusEffect } from '@react-navigation/native';
import { api_production } from "../service/service";
import {
  CONST_CATEGORY_CODE,
  CONST_YEAR,
  CONST_REPORTER,
  CONST_PARTNER,
} from "../components/ConstVariables";
import { getCountries, getProducts } from "../components/ServiceFunctions";

const Audit = () => {
  const [data, setData] = useState([]);
  const [from, setFrom] = useState(CONST_REPORTER);
  const [to, setTo] = useState(CONST_PARTNER);
  const [category, setCategory] = useState(CONST_CATEGORY_CODE);
  const [year, setYear] = useState(CONST_YEAR);

  const productsDict = {};
  const countriesDict = {};

  const liveSearchChange = (type, selected, results) => {
    if (type === "category") setCategory(selected);
    else if (type === "year") setYear(selected);
    else if (type === "from") setFrom(selected);
    else setTo(selected);
  };

  useFocusEffect(
    useCallback(() => {
      getProducts().then(
        (result) => {
          result.map((pro) => (productsDict[pro.Code] = pro.Details));
        },
        (error) => {
          console.log("err GET=", error);
        }
      );

      getCountries().then(
        (result) => {
          result.map((cou) => (countriesDict[cou.Code] = cou.Name));
        },
        (error) => {
          console.log("err GET=", error);
        }
      );
  }));

  useEffect(() => {
    let empty = true;
    let url = `Trades?`;
    if (from !== "None" && from !== null) {
      empty = false;
      url += `couISO=${from}`;
      to !== "None" && to !== null
        ? (url += `&parISO=${to}`)
        : (url += `&flow=X`);
    } else {
      if (to !== "None" && to !== null) {
        url += `couISO=${to}&flow=M`;
        empty = false;
      }
    }
    if (year !== "None" && year !== null) {
      empty = false;
      url += `&year=${year}`;
    }
    if (category !== "None" && category !== null) {
      empty = false;
      url += `&ind=${category}`;
    }
    if (empty) return setData([]);

    fetch(`${api_production}/` + url, {
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
          if(result === null) return;
          let newData =
            result.length === undefined
              ? [
                  {
                    From: result.CouISO,
                    To: result.ParISO,
                    Year: result.Year,
                    Value: Math.floor(result.Value),
                    Category: result.Indicator,
                    info: false,
                    obj: {
                      category: productsDict[result.Indicator],
                      from: countriesDict[result.CouISO],
                      to: countriesDict[result.ParISO],
                    },
                    doHighlight: { textColor: "#fff" },
                  },
                ]
              : result.map((row) => {
                  return {
                    From: row.CouISO,
                    To: row.ParISO,
                    Year: row.Year,
                    Value: Math.floor(row.Value),
                    Category: row.Indicator,
                    info: false,
                    obj: {
                      category: productsDict[row.Indicator],
                      from: countriesDict[row.CouISO],
                      to: countriesDict[row.ParISO],
                    },
                    doHighlight: { textColor: "#fff" },
                  };
                });
          setData(newData);
        },
        (error) => {
          console.log("err GET=", error);
        }
      );
  }, [from, to, year, category]);

  return (
    <View flex={1} style={styles.container}>

          <LiveSearch type="from" handleChange={liveSearchChange} />
          <LiveSearch type="to" handleChange={liveSearchChange} />

          <LiveSearch type="category" handleChange={liveSearchChange} />
          <LiveSearch type="year" handleChange={liveSearchChange} />

      {data.length > 0 && (
        <View>
          <DataTable data={data} />
        </View>
      )}
    </View>
  );
};

export default Audit;
