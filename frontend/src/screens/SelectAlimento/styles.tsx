import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 40,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 25,
    backgroundColor: '#FFF8EE', // Cor de fundo ao redor dos botões
  },
  toggleButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  activeButton: {
    backgroundColor: '#FF9385', // Cor do botão ativo
  },
  inactiveButton: {
    backgroundColor: '#FFF8EE', // Cor do botão inativo
  },
  activeButtonText: {
    color: '#FFFFFF', // Texto branco para o botão ativo
    textAlign: 'center',
  },
  inactiveButtonText: {
    color: '#FF8473', // Texto coral para o botão inativo
    textAlign: 'center',
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  addButton: {
    position: 'relative',
    bottom: 15,
  },
});

export default styles;
