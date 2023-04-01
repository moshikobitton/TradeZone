import { View, Text } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { styles } from "./GlobalStyle";

const NewsLiveSearch = ({ setCategory }) => {
  const links = [
    { id: 1, key: "general", value: "General" },
    { id: 2, key: "business", value: "Business" },
    { id: 3, key: "entertainment", value: "Entertainment" },
    { id: 4, key: "health", value: "Health" },
    { id: 5, key: "science", value: "Science" },
    { id: 6, key: "sports", value: "Sports" },
    { id: 7, key: "technology", value: "Technology" },
  ];

  return (
    <View
      style={{
        marginTop: 20,
        width: 360,
        alignSelf: "center",
      }}
    >
      <Text style={[styles.headerInput, { fontFamily: "OpenSansBold" }]}>
        Choose category
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
        setSelected={(val) => setCategory(val)}
        dropdownStyles={{ backgroundColor: "#fff" }}
        data={links}
        defaultOption={{ id: 1, key: "general", value: "General" }}
      />
    </View>
  );
};

export default NewsLiveSearch;
