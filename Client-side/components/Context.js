import { createContext, useState } from "react";
import {
  CONST_REPORTER,
  CONST_REPORTERS,
  CONST_CATEGORY,
  CONST_YEAR,
  CONST_PARTNER,
} from "./ConstVariables";

export const ChartsContext = createContext();

const Context = ({ children }) => {
  const [dataBarChart, setDataBarChart] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  const [categoryBarChart, setCategoryBarChart] = useState(CONST_CATEGORY.Code);
  const [year, setYear] = useState(CONST_YEAR);
  const [alignmentBarChart, setAlignmentBarChart] = useState("Export");
  const [countriesBarChart, setCountriesBarChart] = useState(CONST_REPORTERS);

  const [dataLineChart, setDataLineChart] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  const [categoryLineChart, setCategoryLineChart] = useState(
    CONST_CATEGORY.Code
  );
  const [alignmentLineChart, setAlignmentLineChart] = useState("Export");
  const [countriesLineChart, setCountriesLineChart] = useState([
    CONST_REPORTER,
  ]);

  const [categoriesPieChart, setCategoriesPieChart] = useState([
    CONST_CATEGORY,
  ]);
  const [alignmentPieChart, setAlignmentPieChart] = useState("Export");
  const [countryPieChart, setCountryPieChart] = useState(CONST_REPORTER);
  const [yearPieChart, setYearPieChart] = useState(CONST_YEAR);
  const [dataPieChart, setDataPieChart] = useState([]);
  //User Logged context
  const [userLogged, setUserLogged] = useState({
    UserId:-1,
    FirstName: "",
    LastName: "",
    Email: "",
    IsLogged: false,
    Image:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-9.jpg",
  });

  const [amountRegistered, setAmountRegistered] = useState(0);

  return (
    <ChartsContext.Provider
      value={{
        dataBarChart,
        setDataBarChart,
        categoryBarChart,
        setCategoryBarChart,
        year,
        setYear,
        alignmentBarChart,
        setAlignmentBarChart,
        countriesBarChart,
        setCountriesBarChart,
        dataLineChart,
        setDataLineChart,
        categoryLineChart,
        setCategoryLineChart,
        alignmentLineChart,
        setAlignmentLineChart,
        countriesLineChart,
        setCountriesLineChart,
        categoriesPieChart,
        setCategoriesPieChart,
        alignmentPieChart,
        setAlignmentPieChart,
        countryPieChart,
        setCountryPieChart,
        dataPieChart,
        setDataPieChart,
        yearPieChart,
        setYearPieChart,
        userLogged,
        setUserLogged,
        amountRegistered,
        setAmountRegistered,
      }}
    >
      {children}
    </ChartsContext.Provider>
  );
};

export default Context;
