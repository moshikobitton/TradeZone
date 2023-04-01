import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import Carousel from "react-native-anchor-carousel";
import SimplePaginationDot from "./SimplePaginationDot";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

const INITIAL_INDEX = 0;
export default function TradesCarousel({ data }) {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);

  function handleCarouselScrollEnd(item, index) {
    setCurrentIndex(index);
  }

  function renderItem({ item, index }) {
    const { dataChart, kind } = item;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={
          kind === "PieChart"
            ? styles.pie
            : kind === "BarChart"
            ? styles.bar
            : styles.line
        }
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
        }}
      >
        {kind === "BarChart" && <BarChart data={dataChart} />}
        {kind === "LineChart" && <LineChart data={dataChart} />}
        {kind === "PieChart" && <PieChart data={dataChart} />}
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <Text
        style={{
          color: "#fff",
          textAlign: "center",
          fontSize: 16,
          fontFamily: "OpenSansBold",
          marginTop: 30,
        }}
      >
        Charts
      </Text>
      <Carousel
        data={data}
        renderItem={renderItem}
        inActiveOpacity={0}
        onScrollEnd={handleCarouselScrollEnd}
        ref={carouselRef}
      />
      <SimplePaginationDot currentIndex={currentIndex} length={data.length} />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    width: Dimensions.get("window").width,
  },
  line: {
    width: Dimensions.get("window").width,
    alignSelf: "center",
  },
  pie: {
    width: Dimensions.get("window").width + 30,
    alignSelf: "center",
  },
});
