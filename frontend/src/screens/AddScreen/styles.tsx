import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d0e8cc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  card: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
  },
  mealText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
  },
});


export default styles