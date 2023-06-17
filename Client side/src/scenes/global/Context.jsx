import React, { createContext, useState } from "react";
import {
  CONST_REPORTER,
  CONST_CATEGORY,
  CONST_YEAR,
} from "../../data/ConstVariables";

export const ChartsContext = createContext();

// context for charts in the common screens
export default function Context({ children }) {
  const [dataBarChart, setDataBarChart] = useState([]);
  const [categoryBarChart, setCategoryBarChart] = useState(CONST_CATEGORY);
  const [year, setYear] = useState(CONST_YEAR);
  const [alignmentBarChart, setAlignmentBarChart] = useState("Export");
  const [countriesBarChart, setCountriesBarChart] = useState([CONST_REPORTER]);

  const [dataLineChart, setDataLineChart] = useState([]);
  const [categoryLineChart, setCategoryLineChart] = useState(CONST_CATEGORY);
  const [alignmentLineChart, setAlignmentLineChart] = useState("Export");
  const [countriesLineChart, setCountriesLineChart] = useState([
    CONST_REPORTER,
  ]);

  const [dataGeoChart, setDataGeoChart] = useState({
    data: [],
    max: 1,
  });
  const [alignmentGeoChart, setAlignmentGeoChart] = useState("Export");
  const [productsGeoChart, setProductsGeoChart] = useState([CONST_CATEGORY]);
  const [yearGeoChart, setYearGeoChart] = useState(CONST_YEAR);

  //User Logged context using localStorage for refreshing the page.
  let storedUser = localStorage.getItem("user");
  let initialUser = {
    UserId: -1,
    FirstName: "",
    LastName: "",
    Email: "",
    IsLogged: false,
    Image:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-9.jpg",
  };
  if (storedUser !== null) {
    initialUser = JSON.parse(storedUser);
  }
  const [userLogged, setUserLogged] = useState({
    UserId: initialUser.UserId,
    FirstName: initialUser.First_name,
    LastName: initialUser.Last_name,
    Email: initialUser.Email,
    IsLogged: initialUser.Email !== "" ? true : false,
    Image: initialUser.Image,
  });

  //Count the users.
  const [amountRegistered, setAmountRegistered] = useState(0);
  const [layout, setLayout] = useState("vertical");

  return (
    <ChartsContext.Provider
      value={{
        dataBarChart,
        setDataBarChart,
        dataLineChart,
        setDataLineChart,
        year,
        setYear,
        alignmentBarChart,
        setAlignmentBarChart,
        countriesLineChart,
        setCountriesLineChart,
        alignmentLineChart,
        setAlignmentLineChart,
        countriesBarChart,
        setCountriesBarChart,
        categoryBarChart,
        setCategoryBarChart,
        categoryLineChart,
        setCategoryLineChart,
        dataGeoChart,
        setDataGeoChart,
        alignmentGeoChart,
        setAlignmentGeoChart,
        yearGeoChart,
        setYearGeoChart,
        productsGeoChart,
        setProductsGeoChart,
        userLogged,
        setUserLogged,
        amountRegistered,
        setAmountRegistered,
        layout,
        setLayout,
      }}
    >
      {children}
    </ChartsContext.Provider>
  );
}
