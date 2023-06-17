import Modal from "@mui/material/Modal";
import { tokens } from "../theme";
import { useState } from "react";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";
import { Box, Typography } from "@mui/material";

//styling the modal
const colors = tokens();
const style = {
  position: "absolute",
  top: "45%",
  left: "55%",
  transform: "translate(-50%, -50%)",
  bgcolor: colors.primary[500],
  border: `1px solid ${colors.grey[100]}`,
  borderRadius: "4px",
};

export default function StateModal(props) {
  const [open, setOpen] = useState(props.open);
  const [product, setProduct] = useState(props.product);
  const [country, setCountry] = useState(props.country);
  const [year, setYear] = useState(props.year);
  const handleClose = () => {
    props.setCountrySelected(false);
    setOpen(false);
  };

  const numbersToContinent = (number) => {
    let value = "";
    switch (number) {
      case 1:
        value = "Africa";
        break;

      case 2:
        value = "Oceania";
        break;

      case 3:
        value = "Europe";
        break;

      case 4:
        value = "Americas";
        break;

      case 5:
        value = "Asia";
        break;
    }
    return value;
  };

  const COLORS = ["#8889DD", "#9597E4", "#8DC77B", "#A5D297", "#E2CF45"];

  function CustomizedContent(props) {
    const { depth, x, y, width, height, colors, name, continent } = props;
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: depth < 2 ? colors[continent] : "#ffffff00",
            stroke: "#fff",
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {depth === 1 ? (
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor="middle"
            fill="#fff"
            fontSize={14}
          >
            {name}
          </text>
        ) : null}
      </g>
    );
  }

  //set tooltip
  const tooltipFormatter = (value, name, entry) => {
    const { payload } = entry;
    return [
      <>
        <p>
          Name: <b>{payload.fullname}</b>
        </p>
        <p>
          Continent: <b>{numbersToContinent(payload.continent)}</b>
        </p>
        <p>
          Value: <b>{Math.exp(payload.value).toFixed(2)}$</b>
        </p>
      </>,
    ];
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...style, width: "60%", height: "80%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: 3,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: 20,
              padding: "25px",
              backgroundColor: colors.blueAccent[700],
              borderRadius: 5,
              width: "fit-content",
            }}
          >
            {country}
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: 20,
              padding: "25px",
              backgroundColor: colors.blueAccent[700],
              borderRadius: 5,
              width: "fit-content",
            }}
          >
            {product}
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: 20,
              padding: "25px",
              backgroundColor: colors.blueAccent[700],
              borderRadius: 5,
              width: "fit-content",
            }}
          >
            {year}
          </Typography>
        </Box>
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            width={"100%"}
            height={"100%"}
            data={props.data}
            aspectRatio={4 / 3}
            dataKey="size"
            stroke="#fff"
            fill="#8884d8"
            content={<CustomizedContent colors={COLORS} />}
          >
            <Tooltip formatter={tooltipFormatter} />
          </Treemap>
        </ResponsiveContainer>
      </Box>
    </Modal>
  );
}
