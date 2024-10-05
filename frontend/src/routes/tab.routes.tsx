import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import AddScreen from "../screens/AddScreen";
import FavoritesScreen from "../screens/AlimentosConsumidosScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SelectAlimento from "../screens/SelectAlimento";
import ScannerScreen from "../screens/BarcodeScreen";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = "";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Add") {
            iconName = "barcode-sharp";
            size = 60; // Ícone maior
          } else if (route.name === "Favorites") {
            iconName = "clipboard";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return (
            <Ionicons
              name={iconName}
              size={size || 30}
              color={focused ? "#94df83" : "#C0C0C0"}
            />
          );
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIconStyle: { marginTop: -8 },
          headerShown: false,
          title: "Home",
          headerStyle: {
            backgroundColor: "#BBDEB5", // Cor do cabeçalho
          },
          headerTitleStyle: {
            color: "#000000",
          },
          // Adicionar StatusBar
          header: () => (
            <>
              <StatusBar backgroundColor="#BBDEB5" barStyle="dark-content" />
            </>
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={SelectAlimento}
        options={{
          tabBarIconStyle: { marginTop: -8 },

          headerShown: false,
          title: "Selecione o tipo de Refeição",
          headerStyle: {
            backgroundColor: "#BBDEB5", // Cor de fundo do cabeçalho
          },
          headerTitleStyle: {
            color: "#000000", // Cor do título, ajustada para melhor contraste com o fundo
          },
        }} />

      <Tab.Screen
        name="Add"
        component={ScannerScreen}
        options={{
          tabBarIconStyle: { marginTop: -8 },

          headerShown: false,
          title: "Selecione o tipo de Refeição",
          headerStyle: {
            backgroundColor: "#BBDEB5", // Cor de fundo do cabeçalho
          },
          headerTitleStyle: {
            color: "#000000", // Cor do título, ajustada para melhor contraste com o fundo
          },
        }}
      />

      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIconStyle: { marginTop: -8 },

          headerShown: true,
          title: "Perfl de Usuário",
          headerStyle: {
            backgroundColor: "#BBDEB5",
          },
          headerTitleStyle: {
            color: "#000000",
          },
          header: () => (
            <>
              <StatusBar backgroundColor="#BBDEB5" barStyle="dark-content" />
            </>
          ),
        }}
      />

    </Tab.Navigator>
  );
}
