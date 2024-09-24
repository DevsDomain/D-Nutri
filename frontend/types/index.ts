import { ParamListBase } from "@react-navigation/native";

export interface RootStackParamList extends ParamListBase {
  Home: undefined; // A tela Home não espera parâmetros
  Profile: undefined;
  Settings: undefined;
  Login: undefined;
  Cadastro: undefined;
  Main: undefined;
  Onboarding: undefined;
  Agua: undefined;
  Alimentacao: undefined;
  scanner: undefined;
  ProductDetails: { barcode: string };
}
