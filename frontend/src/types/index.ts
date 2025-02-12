import { ParamListBase } from "@react-navigation/native";
import { IuserLogin } from "./user";

export interface RootStackParamList extends ParamListBase {
  Home: undefined; // A tela Home não espera parâmetros
  Profile: undefined;
  EditProfile: undefined;
  termsOfUse: undefined;
  Settings: undefined;
  Login: undefined;
  Cadastro: undefined;
  Main: undefined; //era {user: IuserLogin} mas não é mais necessário
  Onboarding: undefined;
  Agua: undefined;
  Alimentacao: undefined;
  SelectAlimento: undefined;
  TabelaNutricional: { alimento: string };
  scanner: undefined;
  ProductDetails: { barcode: string };
  SelectRefeicao:{ barcode: string};
  ProductDetailsScreenPG: { barcode: string ,meal:string};

}
