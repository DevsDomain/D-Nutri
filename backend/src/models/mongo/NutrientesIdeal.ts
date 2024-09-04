import mongoose, { Schema, Document } from "mongoose";

// Interface e Schema para MacroNutrientesIdeal
interface IMacroNutrientesIdeal extends Document {
  Proteina: number;
  Caloria: number;
  Carboidrato: number;
  gordura: number;
  sodio: number;
  acucar: number;
  dia: Date;
}

const MacroNutrientesIdealSchema: Schema = new Schema({
  Proteina: { type: Number, required: true },
  Caloria: { type: Number, required: true },
  Carboidrato: { type: Number, required: true },
  gordura: { type: Number, required: true },
  sodio: { type: Number, required: true },
  acucar: { type: Number, required: true },
  dia: { type: Date, required: true },
});

const MacroNutrientesIdeal = mongoose.model<IMacroNutrientesIdeal>(
  "MacroNutrientesIdeal",
  MacroNutrientesIdealSchema
);

export default MacroNutrientesIdeal;
