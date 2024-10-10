import mongoose, { Schema, Document, Model } from "mongoose";

// Interface para MacroNutrientes
interface IMacroNutrientes {
  Proteina: number;
  Caloria: number;
  Carboidrato: number;
  gordura: number;
  sodio: number;
  acucar: number;
  dia: Date;
}

// Interface para Alimento
interface IAlimento {
  idAlimento: number;
  quantidade: number;
  tipoRefeicao: string;
}

// Interface para Metrica
export interface IMetrica {
  ImcAtual: number;
  TmbAtual: number;
  ImcIdeal: number;
  TmbIdeal: number;
}

// Interface para Ingestão de Água
export interface IAgua {
  ingestaoIdeal: number;
  ingestaoAtual: number;
}

// Interface para User
interface IUser {
  idUser:number;
  consumoAlimentos: IAlimento[];
  macroIdeal: IMacroNutrientes;
  macroReal: IMacroNutrientes;
  metrica: IMetrica;
  ingestaoAgua: IAgua;
  created_at: Date;
}

// Schema para Alimento (subdocumento)
const AlimentoSchema: Schema = new Schema({
  idAlimento: { type: Number, required: true },
  quantidade: { type: Number, required: true },
  tipoRefeicao: { type: String, required: true },
});

export const MacroNutrientesSchema: Schema = new Schema({
  Proteina: { type: Number, required: true, default: 0 },
  Caloria: { type: Number, required: true, default: 0 },
  Carboidrato: { type: Number, required: true, default: 0 },
  gordura: { type: Number, required: true, default: 0 },
  sodio: { type: Number, required: true, default: 0 },
  acucar: { type: Number, required: true, default: 0 },
  dia: { type: Date, required: true, default: Date.now },
});


// Schema para Metrica (subdocumento)
export const MetricaSchema: Schema = new Schema({
  ImcAtual: { type: Number, required: true, default: 0  },
  TmbAtual: { type: Number, required: true, default: 0  },
  ImcIdeal: { type: Number, required: true, default: 0  },
  TmbIdeal: { type: Number, required: true, default: 0  },
});

// Schema para Agua (subdocumento)
export const AguaSchema: Schema = new Schema({
  ingestaoIdeal: { type: Number, required: true, default: 0  },
  ingestaoAtual: { type: Number, required: true, default: 0  },
});

// Schema para User (documento principal)
const UserSchema: Schema = new Schema({
  idUser:Number,
  consumoAlimentos: [AlimentoSchema],
  macroIdeal: MacroNutrientesSchema,
  macroReal: MacroNutrientesSchema,
  metrica: MetricaSchema,
  ingestaoAgua: AguaSchema,
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
