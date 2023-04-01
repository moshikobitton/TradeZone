import { View, StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import { styles } from "../components/GlobalStyle";
import { AccordionItem } from "react-native-accordion-list-view";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";

const FAQ = () => {
  const data = [
    {
      id: 1,
      title: "How can I use the bar chart?",
      body: "With the bar chart you can investigate the global trades and do comparison between states. In fact, the value there is the total sum of the product on selected year. You can select each year from 1990 to 2021. Notice, you can select up to 7 countries and see the differences.",
    },
    {
      id: 2,
      title: "How can I use the line chart?",
      body: "With the line chart you can investigate the global trades and do comparison between states over the years. In fact, the value there is the total sum of the product and you can see the progress over the years. Notice, you can select up to 7 countries and see the differences.",
    },
    {
      id: 3,
      title: "How can I use the pie chart?",
      body: "With the pie chart you can investigate the global trades and do comparison between categories over the years. In fact, the value there is the precent of the products from all the products that you chose. You can select each year from 1990 to 2021. Notice, you can select up to 5 products and see the differences.",
    },
    {
      id: 4,
      title: "How can I use the geo chart?",
      body: "With the geo chart you can investigate the global trades and do comparison between countries and products over the years. In fact, the value there is the accurate value in USD of the products that you chose. You can select each year from 1990 to 2021 (you need to use the slider). Notice, you can select up to 3 products and see the differences. Also, you can click the animation button and the computer will show you the changes over the years.",
    },
    {
      id: 5,
      title: "What is the term GDP?",
      body: "Gross domestic product (GDP) is a monetary measure of the market value or the market value of all the final goods and services produced and sold in a specific time period by a country or countries, generally without double counting the intermediate goods and services used up to produce them. GDP is most often used by the government of a single country to measure its economic health.",
    },
    {
      id: 6,
      title: "How we normalize the data?",
      body: "When we summed up the trade relations for each country we divided the amount by its GDP. Why? To maintain the relativity of each country to its trade relations because each country has a different amount of population and therefore we chose to normalize this way.",
    },
  ];

  return (
    <SafeAreaView flex={1} style={styles.container}>
      <ScrollView style={styleLocally.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <EvilIcons name="question" color="#70d8bd" size={30} />
          <Text style={styleLocally.headerStyle}>Frequently questions</Text>
        </View>
        {data.map((item) => (
          <AccordionItem
            key={item.id}
            customTitle={() => (
              <Text style={styleLocally.textTitle}>
                {item.id}) {item.title}
              </Text>
            )}
            customBody={() => (
              <Text style={styleLocally.textBody}>{item.body}</Text>
            )}
            customIcon={() => (
              <SimpleLineIcons name="arrow-right" color="#fff" size={16} />
            )}
            animationDuration={400}
            isOpen={true}
            onPress={(isOpen) => console.log(isOpen)}
            containerStyle={{ backgroundColor: "#141b2d", marginTop: 20 }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQ;

const styleLocally = StyleSheet.create({
  container: {
    paddingVertical: "2%",
    paddingHorizontal: "3%",
    height: "100%",
  },
  textTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "OpenSansBold",
  },
  textBody: {
    color: "#fff",
    marginTop: 10,
    fontFamily: "OpenSans",
  },
  headerStyle: {
    color: "#70d8bd",
    alignSelf: "flex-end",
    fontSize: 16,
    fontFamily: "OpenSansBold",
  },
});
