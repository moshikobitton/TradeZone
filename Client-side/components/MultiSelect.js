import { useEffect, useState } from "react";
import { View, Text, Button, Pressable } from "react-native";
import MultiSelect from "react-native-multiple-select";
import { getCountries, getProducts } from "./ServiceFunctions";
import { styles } from "./GlobalStyle";

const MultiSelectComponent = ({ type, handleChange, limit }) => {
  const [results, setResults] = useState([]);
  const [items, setItems] = useState([]);
  const [showTags, setShowTags] = useState(false);

  //get all the data for the inputs
  useEffect(() => {
    if (type === "categories") {
      getProducts()
        .then((result) => {
          const newItems = result.map((item) => {
            return {
              id: item.Id,
              key: item.Code,
              value: item.Details,
            };
          });
          setResults(newItems);
        })
        .catch((error) => {
          console.error(error);
        });
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

  const onSelectedItemsChange = (selectedItems) => {
    if (selectedItems.length <= limit && selectedItems !== 0) {
      handleChange(type, selectedItems, results);
      setItems(selectedItems);
    }
  };

  return (
    <View
      style={{
        width: 380,
        alignSelf: "center",
      }}
    >
      <Text style={[styles.headerInput, { fontFamily: "OpenSansBold" }]}>
        {type}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: 300,
            alignSelf: "left",
          }}
        >
          <MultiSelect
            hideTags={showTags}
            items={results}
            styleInputGroup={{
              backgroundColor: "#141b2d",
            }}
            styleMainWrapper={{ backgroundColor: "#141b2d", borderRadius: 10 }}
            styleItemsContainer={{
              maxHeight: 400,
              backgroundColor: "#141b2d",
              borderWidth: 1,
              borderColor: "#fff",
              borderRadius: 10,
            }}
            styleSelectorContainer={{
              backgroundColor: "#141b2d",
            }}
            styleDropdownMenuSubsection={{
              backgroundColor: "#141b2d",
              borderColor: "#fff",
              borderWidth: 0.5,
              borderRadius: 10,
              paddingLeft: 10,
            }}
            fontFamily="OpenSans"
            uniqueKey="id"
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={items}
            selectText={`Pick ${type}`}
            textColor="#fff"
            searchInputPlaceholderText="Search Items..."
            tagRemoveIconColor="#fff"
            tagBorderColor="#fff"
            tagTextColor="#fff"
            selectedItemTextColor="#fff"
            selectedItemIconColor="#fff"
            itemTextColor="#fff"
            itemFontFamily="OpenSans"
            displayKey="value"
            searchInputStyle={{ color: "#fff" }}
            hideSubmitButton={true}
          />
        </View>
        <Pressable
          style={{
            display: "flex",
            borderWidth: 1,
            borderColor: "#fff",
            width: 70,
            borderRadius: 10,
            height: 40,
          }}
          onPress={() => setShowTags((prev) => !prev)}
          title="Tags"
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: 16,
              fontFamily: "OpenSans",
              padding: 7,
            }}
          >
            Tags
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MultiSelectComponent;
