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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Divider } from "@rneui/themed";

const { width: windowWidth } = Dimensions.get("window");

const INITIAL_INDEX = 0;
export default function TradesCarousel({ data }) {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);

  function handleCarouselScrollEnd(item, index) {
    setCurrentIndex(index);
  }

  function renderItem({ item, index }) {
    const { CouISO, ParISO, Year, Value } = item;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.item}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
        }}
      >
        <View>
          <Text style={styles.titleText}>
            {Value.toLocaleString("en-US") + " M$"}
          </Text>
          <Divider />
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <Text style={styles.titleText}>{CouISO}</Text>
            <FontAwesome
              name="long-arrow-right"
              size={30}
              style={{ alignSelf: "center", marginBottom: 5, color: "#fff" }}
            />
            <Text style={styles.titleText}>{ParISO}</Text>
          </View>
          <Text style={styles.titleText}>{Year}</Text>
        </View>
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
          marginTop: 20,
          fontFamily: "OpenSansBold",
        }}
      >
        Top Trades
      </Text>
      <Carousel
        style={styles.carousel}
        data={data}
        renderItem={renderItem}
        itemWidth={0.7 * windowWidth}
        inActiveOpacity={0.3}
        containerWidth={windowWidth}
        onScrollEnd={handleCarouselScrollEnd}
        ref={carouselRef}
      />
      <SimplePaginationDot currentIndex={currentIndex} length={data.length} />
    </View>
  );
}

const styles = StyleSheet.create({
  carousel: {
    aspectRatio: 1.5,
    height: 220,
    alignSelf: "center",
  },
  item: {
    backgroundColor: "#1F2A40",
    borderRadius: 5,
  },
  titleText: {
    fontFamily: "OpenSansBold",
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 10,
  },
});
