import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { api_production } from "../../service/service";
import LiveSearch from "../../components/LiveSearch";
import {
  CONST_CATEGORY,
  CONST_PARTNER,
  CONST_REPORTER,
  CONST_YEAR,
} from "../../data/ConstVariables";
import { getCountries, getProducts } from "../../data/ServiceFunctions";

const productsDict = {};
const countriesDict = {};

const Search = () => {
  const colors = tokens();
  const [data, setData] = useState([]);
  const [reporter, setReporter] = useState(CONST_REPORTER);
  const [partner, setPartner] = useState(CONST_PARTNER);
  const [year, setYear] = useState(CONST_YEAR);
  const [product, setProduct] = useState(CONST_CATEGORY);

  const liveSearchChange = (value, type) => {
    if (type === "partner") setPartner(value);
    else if (type === "reporter") setReporter(value);
    else if (type === "category") setProduct(value);
    else setYear(value);
  };

  const columns = [
    {
      field: "id",
      headerAlign: "left",
      align: "left",
      headerName: "Id",
    },
    {
      field: "CouISO",
      headerName: "Reporter",
      headerAlign: "left",
      flex: 1,
      align: "left",
      renderCell: ({ row: { CouISO } }) => {
        return <Typography>{countriesDict[CouISO]}</Typography>;
      },
    },
    {
      field: "ParISO",
      headerName: "Partner",
      flex: 1,
      headerAlign: "left",
      align: "left",
      renderCell: ({ row: { ParISO } }) => {
        return <Typography>{countriesDict[ParISO]}</Typography>;
      },
    },
    {
      field: "Year",
      headerName: "Year",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "Value",
      headerName: "Value (M$)",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "Indicator",
      headerName: "Category",
      flex: 1,
      headerAlign: "left",
      align: "left",
      renderCell: ({ row: { Indicator } }) => {
        return <Typography>{productsDict[Indicator]}</Typography>;
      },
    },
  ];

  useEffect(() => {
    getProducts().then(
      (result) => {
        result.map((pro) => (productsDict[pro.Code] = pro.Details));
      },
      (error) => {
        console.log("err GET=", error);
      }
    );

    getCountries().then(
      (result) => {
        result.map((cou) => (countriesDict[cou.Code] = cou.Name));
      },
      (error) => {
        console.log("err GET=", error);
      }
    );
  }, []);

  const searchBtn = () => {
    let empty = true;
    let url = `Trades?`;
    if (reporter !== undefined && reporter !== null) {
      empty = false;
      url += `couISO=${reporter.Code}`;
      partner !== undefined && partner !== null
        ? (url += `&parISO=${partner.Code}`)
        : (url += `&flow=X`);
    } else {
      if (partner !== undefined && partner !== null) {
        url += `couISO=${partner.Code}&flow=M`;
        empty = false;
      }
    }
    if (year !== undefined && year !== null) {
      empty = false;
      url += `&year=${year}`;
    }
    if (product !== undefined && product !== null) {
      empty = false;
      url += `&ind=${product.Code}`;
    }
    if (empty)
      return alert(
        "Please fill at least one of the fields (Reporter/Partner/Product/Year)."
      );

    fetch(`${api_production}/` + url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setData(result.length === undefined ? [result] : result);
        },
        (error) => {
          console.log("err GET=", error);
        }
      );
  };

  return (
    <Box m="20px">
      <Header title="Audit" subtitle="The audit of the trades" />
      <Box display="flex" justifyContent="space-evenly" alignItems="baseline">
        <LiveSearch
          currentCountry={null}
          type="reporter"
          handleChange={liveSearchChange}
        />
        <LiveSearch
          currentCountry={null}
          type="partner"
          handleChange={liveSearchChange}
        />
        <LiveSearch type="year" handleChange={liveSearchChange} />
        <LiveSearch type="category" handleChange={liveSearchChange} />
        <Button
          onClick={searchBtn}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: 3,
            height: 30,
            marginBottom: "auto",
          }}
        >
          Search
        </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Search;
