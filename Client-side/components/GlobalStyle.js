import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141b2d",
  },
  text: {
    color: "#fff",
  },
  headerInput: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    padding: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
});

export const loginStyle = StyleSheet.create({
  container: {
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  },
  viewElement: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 25,
    justifyContent: "space-between",
    borderColor: "gray",
    borderWidth: "2px",
    backgroundColor: "#141b2d",
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    borderRadius: "10px",
  },
});
