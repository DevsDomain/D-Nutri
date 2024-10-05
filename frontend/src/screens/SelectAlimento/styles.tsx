import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF4E3",
    padding: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    marginRight: 10,
    color: "#777",
  },
  searchIcon: {
    marginRight: 10,
  },
  filterIcon: {
    marginLeft: "auto",
  },
  buttonContainer: {
    flexDirection: "row",
    height: 80,
    justifyContent: "center",
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
   
    
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 16,

    
  },
  activeButton: {   
    backgroundColor: "#FF9385",
    alignItems: "center",
    
   
  },
  inactiveButton: {    
    backgroundColor: "#FFF8EE",
    alignItems: "center",
    
  },
  activeButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    alignItems: "center",
  },
  inactiveButtonText: {
    color: "#FF9385",
    fontWeight: "bold",
    alignItems: "center",
  },
  scrollView: {
    marginBottom: 80,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  item: {
    flex: 1,
  },
  itemText: {
    color: "#343A40",
    fontSize: 16,
  },
});

export default styles