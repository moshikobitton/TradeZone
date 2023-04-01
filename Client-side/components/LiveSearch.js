import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { styles } from "./GlobalStyle";
import { getCountries, getProducts } from "./ServiceFunctions";

const LiveSearch = ({ type, handleChange }) => {
  const [selected, setSelected] = useState("");
  const [results, setResults] = useState([]);

  //get all the data for the inputs
  useEffect(() => {
    if (type === "category") {
      getProducts()
        .then((result) => {
          const newItems = result.map((item) => {
            return {
              key: item.Code,
              value: item.Details,
            };
          });
          setResults(newItems);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (type === "year") {
      let arr = [];
      let index = 0;
      for (let i = 1990; i <= 2021; i++, index++) {
        let key = i;
        let value = i;
        arr[index] = { key, value };
      }
      setResults(arr);
    } else {
      getCountries()
        .then((result) => {
          const newItems = result.map((item) => {
            return {
              id: item.Id,
              key: item.Code,
              value: item.Name,
            };
          });
          setResults(newItems);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <View>
      <Text style={[styles.headerInput, { fontFamily: "OpenSansBold" }]}>
        {type}
      </Text>
      <SelectList
        arrowicon={<FontAwesome name="chevron-down" size={12} color={"#fff"} />}
        searchicon={
          <View style={{ marginRight: 20 }}>
            <FontAwesome name="search" size={12} color={"#fff"} />
          </View>
        }
        searchPlaceholder={""}
        closeicon={<FontAwesome name="close" size={12} color={"#fff"} />}
        inputStyles={{ color: "#fff", fontFamily: "OpenSans" }}
        labelStyles={{ color: "#fff", fontFamily: "OpenSans" }}
        onSelect={() => handleChange(type, selected, results)}
        setSelected={(val) => setSelected(val)}
        dropdownStyles={{ backgroundColor: "#fff" }}
        data={[{ key: null, value: "None" }, ...results]}
        defaultOption={
          type === "category"
            ? {
                key: "D303",
                value: "Air and spacecraft and related machinery",
              }
            : type === "year"
            ? { key: 1990, value: 1990 }
            : type === "to"
            ? { key: "ISR", value: "Israel" }
            : { key: "USA", value: "United States Of America" }
        }
      />
    </View>
  );
};

export default LiveSearch;
