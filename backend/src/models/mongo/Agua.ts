import mongoose, { Schema, Document } from "mongoose";

// Interface e Schema para Agua
interface IAgua extends Document {
  ingestaoIdeal: number;
  ingestaoAtual: number;
}

const AguaSchema: Schema = new Schema({
  ingestaoIdeal: { type: Number, required: true },
  ingestaoAtual: { type: Number, required: true },
});

const Agua = mongoose.model<IAgua>("Agua", AguaSchema);
export default Agua;
