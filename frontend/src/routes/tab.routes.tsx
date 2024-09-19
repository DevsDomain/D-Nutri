import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import AddScreen from "../screens/AddScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";

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
            iconName = "add-circle";
            size = 60; // Ícone maior
          } else if (route.name === "Favorites") {
            iconName = "heart";
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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{ tabBarIconStyle: { marginTop: -6 } }}
      />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen}                     options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
