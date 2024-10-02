import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BBDEB5",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  card: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  foodType: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  quantity: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  circleButton: {
    padding: 10,
  },
  okButton: {
    marginTop: 20,
    backgroundColor: "#94df83",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  okButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  savedText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  
});

export default styles