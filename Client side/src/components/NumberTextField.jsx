import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import { tokens } from "../theme";

export default function NumberTextField(props) {
  const [results, setResults] = useState([]);
  const [value, setValue] = useState(props.value);
  const colors = tokens();

  //get all the data for the inputs
  useEffect(() => {
      let arr = [];
      for (let i = 5; i <= 100; i++) arr.push(i);
      setResults(arr);
  }, []);

  //set the data in the inputs
  useEffect(() => {
    setValue(props.value);
  }, [results]);

  return (
    <Box
      backgroundColor={colors.primary[400]}
      width={130}
    >
      <Autocomplete
        value={props.value}
        getOptionLabel={(results) => `${results}`}
        options={results}
        isOptionEqualToValue={(option, value) => option === value}
        noOptionsText={"No available "}
        renderOption={(props, results) => (
          <Box
            component="li"
            {...props}
            key={results}
          >
            {results}
          </Box>
        )}
        renderInput={(params) => (
          <TextField {...params} label={props.type} />
        )}
        onChange={(event, newValue) => {
          props.handleChange(newValue, props.type, props.index);
          setValue(newValue);
        }}
      />
    </Box>
  );
};