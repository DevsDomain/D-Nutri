import StackRoutes from "./stack.routes";
import { NavigationContainer } from "@react-navigation/native";
import TabRoutes from "./tab.routes";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import AuthRoutes from "./auth.routes";
import AsyncStorage from '@react-native-async-storage/async-storage';

const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log("Armazenamento limpo com sucesso!");
  } catch (error) {
    console.error("Erro ao limpar o armazenamento:", error);
  }
};


export default function Routes() {
  const userContext = useContext(UserContext);
  const user = userContext?.user; 

  return (
    <NavigationContainer>

      {user ?
        <>
          <StackRoutes/>
        </>
        : <AuthRoutes/>}

    </NavigationContainer>
  );
}
