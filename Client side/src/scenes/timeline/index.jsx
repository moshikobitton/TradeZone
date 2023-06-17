import { Box } from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import MultipleSelect from "../../components/MultipleSelect";
import { CONST_CATEGORY } from "../../data/ConstVariables";
import TimelineChart from "../../components/TimelineChart";

const TimelineComponent = () => {
  const [products, setProducts] = useState([CONST_CATEGORY]);

  // changing the products
  const multipleSelectChange = (event, values) => {
    setProducts(values);
  };

  return (
    <Box m="20px">
      <Header
        title="Timeline Chart"
        subtitle="Explore the network type over the years"
      />
      <Box height="75vh" className="chart">
        <Box display="flex" justifyContent="center" alignItems="center">
          <MultipleSelect
            type="category"
            handleChange={multipleSelectChange}
            values={products}
            limit={10}
            defaultVal={CONST_CATEGORY}
          />
        </Box>{" "}
        <br />
        <TimelineChart products={products} />
      </Box>
    </Box>
  );
};

export default TimelineComponent;
