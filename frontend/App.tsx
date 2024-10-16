import Routes from "./src/routes";
import { Platform } from "react-native"; // Para verificar a plataforma
import process from "process"; // Importe o módulo process

// Corrige o erro do process.nextTick no React Native
if (Platform.OS !== "web") {
  if (typeof global.process === "undefined") {
    global.process = process;
  }
  process.nextTick = setImmediate;
}

export default function App() {
  return <Routes />;
}
