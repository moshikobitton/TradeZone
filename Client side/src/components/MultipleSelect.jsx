import { Autocomplete, Box, TextField } from "@mui/material";
import { getCountries, getProducts } from "../data/ServiceFunctions";
import { useState, useEffect } from "react";
import { tokens } from "../theme";

export default function MultipleSelect(props) {
  const [results, setResults] = useState([]);
  const colors = tokens();

  //get all the data for the inputs
  useEffect(() => {
    if (props.type === "category") {
      getProducts()
        .then((result) => {
          setResults(result);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      getCountries()
        .then((result) => {
          setResults(result);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <Box backgroundColor={colors.primary[400]}>
      <Autocomplete
        multiple
        limitTags={5}
        value={props.values}
        getOptionDisabled={() =>
          props.values.length === props.limit ? true : false
        }
        isOptionEqualToValue={(option, value) =>
          props.type === "year" ? option === value : option.Id === value.Id
        }
        id="multiple-limit-tags"
        options={results}
        getOptionLabel={(option) => {
          if (props.type === "category") return option.Details;
          else if (props.type === "year") return option;
          else return option.Name;
        }}
        renderOption={(params, results) => (
          <Box
            component="li"
            {...params}
            key={
              props.type === "category"
                ? results.Id
                : props.type === "year"
                ? results
                : results.Id
            }
          >
            {props.type === "category"
              ? results.Details
              : props.type === "year"
              ? results
              : results.Name}
          </Box>
        )}
        defaultValue={[props.defaultVal]}
        renderInput={(params) => (
          <TextField {...params} label={"Choose " + props.type} />
        )}
        onChange={(e, array) => props.handleChange(e, array)}
        sx={{ width: "1200px" }}
      />
    </Box>
  );
}
