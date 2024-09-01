import mongoose, { Schema, Document } from "mongoose";

// Interface e Schema para Metrica
interface IMetrica extends Document {
  ImcAtual: number;
  TmbAtual: number;
  ImcIdeal: number;
  TmbIdeal: number;
}

const MetricaSchema: Schema = new Schema({
  ImcAtual: { type: Number, required: true },
  TmbAtual: { type: Number, required: true },
  ImcIdeal: { type: Number, required: true },
  TmbIdeal: { type: Number, required: true },
});

const Metrica = mongoose.model<IMetrica>("Metrica", MetricaSchema);
