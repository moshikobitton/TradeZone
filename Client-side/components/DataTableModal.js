import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

const DataTableModal = ({ rowData }) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (rowData !== undefined) setModalVisible(true);
    console.log(rowData);
  }, [rowData]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                fontSize: 20,
                color: "#fff",
                marginBottom: 15,
                fontFamily: "OpenSansBold",
              }}
            >
              Trade details
            </Text>
            {rowData !== undefined ? (
              <View style={{ alignItems: "flex-start" }}>
                <Text style={styles.modalText}>From : {rowData.obj.from}</Text>
                <Text style={styles.modalText}>To : {rowData.obj.to}</Text>
                <Text style={styles.modalText}>Year : {rowData.Year}</Text>
                <Text style={styles.modalText}>Value : {rowData.Value}M$</Text>
                <Text style={styles.modalText}>
                  Category : {rowData.obj.category}
                </Text>
              </View>
            ) : (
              ""
            )}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#141b2d",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#3e4396",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "OpenSans",
  },
  modalText: {
    marginBottom: 15,
    color: "#fff",
    fontFamily: "OpenSans",
  },
});

export default DataTableModal;
