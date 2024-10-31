import Routes from "./src/routes";
import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Signika_400Regular } from "@expo-google-fonts/signika";
import { UserProvider } from "./src/context/userContext";
import { DateProvider } from "./src/context/dateContext";
import { PaperProvider } from "react-native-paper";
SplashScreen.preventAutoHideAsync(); // Manter a splash screen até as fontes serem carregadas

export default function App() {
  const [fontsLoaded] = useFonts({
    Signika_400Regular,
  });
  useEffect(() => {
    async function hideSplashScreen() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    hideSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Retorna null enquanto as fontes estão carregando
  }
  return (
    <PaperProvider>
      <UserProvider>
        <DateProvider>
          <Routes />
        </DateProvider>
      </UserProvider>
    </PaperProvider>

  )
}
