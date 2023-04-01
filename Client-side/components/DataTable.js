import { useState } from "react";
import { View } from "react-native";
import DataTable, { COL_TYPES } from "react-native-datatable-component";
import DataTableModal from "./DataTableModal";

export default function Datatable(props) {
  const [rowData, setRowData] = useState(undefined);

  return (
    <View>
      <DataTable
        data={props.data} // list of objects
        colNames={["From", "To", "Year", "Value", "Category", "info"]} //List of Strings
        colSettings={[
          { name: "From", type: COL_TYPES.STRING, width: "17%" },
          { name: "To", type: COL_TYPES.STRING, width: "13%" },
          { name: "Year", type: COL_TYPES.INT, width: "16%" },
          { name: "Value", type: COL_TYPES.INT, width: "19%" },
          { name: "Category", type: COL_TYPES.STRING, width: "27%" },
          { name: "info", type: COL_TYPES.CHECK_BOX, width: "9%" },
        ]} //List of Objects
        noOfPages={Math.ceil(props.data.length / 6) + 1} //number
        backgroundColor={"rgba(23,2,4,0.2)"} //Table Background Color
        headerLabelStyle={{
          color: "grey",
          fontSize: 14,
          textAlign: "left",
          padding: 1,
        }} //Text Style Works
        onRowSelect={(row) => (row.info ? setRowData(row) : undefined)}
      />
      <DataTableModal rowData={rowData} />
    </View>
  );
}
