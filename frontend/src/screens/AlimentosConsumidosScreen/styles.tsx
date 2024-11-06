import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaf0e5",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4C956C",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#4C956C",
    textAlign: "center",
    marginTop: 50,
  },
  scrollView: {
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E76F51",
  },
  itemRefeicao: {
    fontSize: 16,
    color: "#4C956C",
  },
  itemQuantidade: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },
  itemNutrients: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  nutrient: {
    fontSize: 14,
    color: "#777",
    marginRight: 10,
  },
  footer: {
    backgroundColor: "transparent",
    padding: 3,
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  footerText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#4C956C",
    marginBottom: 5,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  loadingWait: {
    flex: 1,
    justifyContent: "center",
  },
  loadingHorizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default styles;
