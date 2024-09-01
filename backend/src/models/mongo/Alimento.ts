import mongoose, { Schema, Document } from "mongoose";

// Interface e Schema para Alimento
interface IAlimento extends Document {
  idAlimento: number;
  quantidade: number;
  tipoRefeicao: string;
}

const AlimentoSchema: Schema = new Schema({
  idAlimento: { type: Number, required: true },
  quantidade: { type: Number, required: true },
  tipoRefeicao: { type: String, required: true },
});

const Alimento = mongoose.model<IAlimento>("Alimento", AlimentoSchema);
export default Alimento;
