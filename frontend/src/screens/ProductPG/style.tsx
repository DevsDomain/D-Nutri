import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF4E3",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4C956C",
    marginBottom: 20,
  },
  rowAdjuster: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  adjusterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  circleButton: {
    padding: 5,
  },
  adjusterText: {
    fontSize: 16,
    marginHorizontal: 10,
    color: "#4C956C",
  },
  nutrientsSummaryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "#F4E1D2",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  nutrientSummary: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4C956C",
  },
  tableContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  rowTableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    backgroundColor: "#F4E1D2",
  },
  rowTable: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  headerCell: {
    fontWeight: "bold",
    color: "#4C956C",
    flex: 1,
  },
  tableCell: {
    color: "#4C956C",
    flex: 1,
  },
  registerButton: {
    backgroundColor: "#4C956C",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

  export default styles