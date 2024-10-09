import { ParamListBase } from "@react-navigation/native";

export interface RootStackParamList extends ParamListBase {
  Home: undefined; // A tela Home não espera parâmetros
  Profile: undefined;
  EditProfile: undefined;
  termsOfUse: undefined;
  Settings: undefined;
  Login: undefined;
  Cadastro: undefined;
  Main: {today:string};
  Onboarding: undefined;
  Agua: undefined;
  Alimentacao: undefined;
  SelectAlimento: undefined;
  TabelaNutricional: undefined;
  AguaComponent: undefined;
  AlimentacaoComponent: undefined;
  scanner: undefined;
  ProductDetails: { barcode: string };
}
