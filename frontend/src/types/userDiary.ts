// Type for MacroNutrientes
export interface IMacroNutrientes {
    Proteina: number;
    Caloria: number;
    Carboidrato: number;
    gordura: number;
    sodio: number;
    acucar: number;
    dia: Date;
  }
  
  // Type for Alimento
  export interface IAlimento {
    idAlimento: number;
    quantidade: number;
    tipoRefeicao: string;
  }
  
  // Type for Metrica
  export interface IMetrica {
    ImcAtual: number;
    TmbAtual: number;
    ImcIdeal: number;
    TmbIdeal: number;
  }
  
  // Type for Ingestão de Água
  export interface IAgua {
    ingestaoIdeal: number;
    ingestaoAtual: number;
  }
  
  // Type for User
  export interface IUser {
    idUser: number;
    consumoAlimentos: IAlimento[];
    macroIdeal: IMacroNutrientes;
    macroReal: IMacroNutrientes;
    metrica: IMetrica;
    ingestaoAgua: IAgua;
    created_at: Date;
  }
  
  export interface IUserData{
    TMB:number;
    altura:number;
    genero:string;
    meta:string;
    nomeUsuario:string;
    peso:number;
  }