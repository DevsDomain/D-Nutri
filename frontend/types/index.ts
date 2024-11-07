import { ParamListBase } from "@react-navigation/native";
import { IuserLogin } from "../src/types/user";
export interface RootStackParamList extends ParamListBase {
  Profile: undefined;
  EditProfile: undefined;
  termsOfUse: undefined;
  Settings: undefined;
  Login: undefined;
  Cadastro: undefined;
  Main: undefined;
  Onboarding: undefined;
  Agua: undefined;
  Alimentacao: undefined;
  SelectAlimento: undefined;
  TabelaNutricional: undefined;
  AguaComponent: undefined;
  AlimentacaoComponent: undefined;
  scanner: undefined;
  ProductDetails: { barcode: string ,meal:string};
  ProductDetailsScreenPG: { barcode: string ,meal:string};
  SelectRefeicao:{ barcode: string };

}
