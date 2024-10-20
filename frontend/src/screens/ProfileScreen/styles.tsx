import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ececec",
    padding: 0,
  },
  header: {
    width: "100%",
    padding: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BBDEB5",
  },
  headerTitle: {
    fontSize: 22,
  },

  // Modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginRight: 5,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  okButton: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
  okButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
